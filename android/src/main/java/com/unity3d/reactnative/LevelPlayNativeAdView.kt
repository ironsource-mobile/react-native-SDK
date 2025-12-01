package com.unity3d.reactnative

import android.content.Context
import android.graphics.Color
import android.graphics.Typeface
import android.graphics.drawable.GradientDrawable
import android.view.Choreographer
import android.view.LayoutInflater
import android.view.View
import android.widget.Button
import android.widget.FrameLayout
import android.widget.TextView
import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.ReactContext
import com.facebook.react.bridge.ReadableMap
import com.ironsource.mediationsdk.ads.nativead.LevelPlayNativeAd
import com.ironsource.mediationsdk.ads.nativead.LevelPlayNativeAdListener
import com.ironsource.mediationsdk.ads.nativead.NativeAdLayout
import com.ironsource.mediationsdk.adunit.adapter.utility.AdInfo
import com.ironsource.mediationsdk.logger.IronSourceError
import com.unity3d.reactnative.LevelPlayUtils.Companion.sendEventToParticularUI

/**
 * Represents a native ad view that can be displayed in a React-Native app.
 * This view handles the display and interaction of native ads received from IronSource.
 */
class LevelPlayNativeAdView(context: Context) : FrameLayout(context), LevelPlayNativeAdListener {
  private var reactContext: ReactContext = context as ReactContext
  private var placement: String = ""
  var nativeAdLayout: NativeAdLayout? = null // Make it public so manager can access it
  private var templateStyles: LevelPlayNativeAdTemplateStyle? = null
  private var viewType: String? = null
  private var templateType: String = ""
  private var nativeAd: LevelPlayNativeAd? = null
  private var onBindLevelPlayNativeAdView: ((LevelPlayNativeAd?) -> Unit)? = null

  private fun applyStyles(titleView: TextView?, bodyView: TextView?, advertiserView: TextView?, callToActionView: Button?) {
    templateStyles?.let { styles ->
      styles.mainBackgroundColor?.let {
        nativeAdLayout?.setBackgroundColor(it)
      }
      applyStyle(titleView, styles.titleStyle)
      applyStyle(bodyView, styles.bodyStyle)
      applyStyle(advertiserView, styles.advertiserStyle)
      applyStyle(callToActionView, styles.callToActionStyle)
    }
  }

  private fun applyStyle(view: TextView?, style: LevelPlayNativeAdElementStyle?) {
    view?.apply {
      style?.let { it ->
        it.textColor?.let { setTextColor(it) }
        it.fontStyle?.let { setTypeface(null, parseFontStyle(it)) }
        it.textSize?.let { textSize = it }
        createBackgroundDrawable(it)?.let { background = it }
      }
    }
  }

  private fun parseFontStyle(fontStyle: String?): Int {
    if (fontStyle != null) {
      return if (fontStyle.lowercase().contains("bold")) {
        Typeface.BOLD
      } else if (fontStyle.lowercase().contains("italic")) {
        Typeface.ITALIC
      } else if (fontStyle.lowercase().contains("monospace")) {
        Typeface.MONOSPACE.style
      } else {
        Typeface.NORMAL
      }
    }
    return Typeface.NORMAL
  }

  private fun createBackgroundDrawable(style: LevelPlayNativeAdElementStyle): GradientDrawable? {
    val backgroundColor = style.backgroundColor
    val cornerRadius = style.cornerRadius

    // Check if either background color or corner radius is not null
    if (backgroundColor != null || cornerRadius != null) {
      val drawable = GradientDrawable()
      drawable.shape = GradientDrawable.RECTANGLE // Default shape is rectangle

      // Set background color if not null
      backgroundColor?.let { drawable.setColor(it) }

      // Set corner radius if not null
      cornerRadius?.let { drawable.cornerRadius = it }

      return drawable
    }
    return null // Return null if both background color and corner radius are null
  }

  /**
   * Loads the native ad.
   * If the native ad object is not initialized, it creates a new one using LevelPlayNativeAd.Builder
   * and sets the placement name and listener. Then, it loads the ad.
   */
  fun loadAd() {
    if (nativeAd == null) {
      // If nativeAd is not initialized, create a new one
      nativeAd = LevelPlayNativeAd.Builder()
        .withPlacementName(placement)
        .withListener(this)
        .build()
    }
    // Load the ad
    nativeAd?.loadAd()
  }

  /**
   * Destroys the native ad.
   */
  fun destroyAd() {
    // Destroy the native ad
    nativeAd?.destroyAd()
    // Set nativeAd to null
    nativeAd = null
  }

  /**
   * Sets the creation params from React Native.
   * Parses the ReadableMap and initializes the native ad view.
   *
   * @param value The ReadableMap containing all creation parameters
   * @param layoutId Optional custom layout resource ID
   * @param onBindLevelPlayNativeAdView Callback to bind the ad to the layout
   */
  fun setCreationParams(
    value: ReadableMap?,
    layoutId: Int?,
    onBindLevelPlayNativeAdView: (LevelPlayNativeAd?) -> Unit
  ) {
    // Extract creation params
    placement = value?.getString("placement") ?: ""
    val templateStyle = getTemplateStyleMap(value?.getMap("templateStyle"))
    templateType = value?.getString("templateType") ?: ""
    viewType = value?.getString("viewType")

    // Parse LevelPlayNativeAdElementStyle objects
    val mainBackgroundColor = parseColor(templateStyle["mainBackgroundColor"] as? String)
    val titleElementStyle = parseElementStyle(templateStyle["titleStyle"] as? Map<String, Any?>)
    val bodyElementStyle = parseElementStyle(templateStyle["bodyStyle"] as? Map<String, Any?>)
    val advertiserElementStyle = parseElementStyle(templateStyle["advertiserStyle"] as? Map<String, Any?>)
    val callToActionElementStyle = parseElementStyle(templateStyle["callToActionStyle"] as? Map<String, Any?>)

    // Create the template style from parsed element styles(if exist)
    templateStyles = LevelPlayNativeAdTemplateStyle(mainBackgroundColor, titleElementStyle, bodyElementStyle, advertiserElementStyle, callToActionElementStyle)

    // Create the native ad layout
    nativeAdLayout = getNativeAdLayout(context, layoutId, templateType)

    // Store the callback to notify when the ad is loaded
    // and the developer should bind it to the layout
    this.onBindLevelPlayNativeAdView = onBindLevelPlayNativeAdView

    // Set the native ad layout
    addView(nativeAdLayout)

    // Schedule a callback to run on the next frame synchronization point
    Choreographer.getInstance().postFrameCallback(object: Choreographer.FrameCallback {
      override fun doFrame(frameTimeNanos: Long) {
        // Manually layout children to ensure correct measurement and layout
        manuallyLayoutChildren()

        // Dispatch global layout event to notify listeners observing layout changes
        viewTreeObserver.dispatchOnGlobalLayout()

        // Schedule the next frame callback to continue updating the layout
        Choreographer.getInstance().postFrameCallback(this)
      }
    })
  }

  /**
   * Layout all children properly
   */
  private fun manuallyLayoutChildren() {
    measure(
      MeasureSpec.makeMeasureSpec(width, MeasureSpec.EXACTLY),
      MeasureSpec.makeMeasureSpec(height, MeasureSpec.EXACTLY))

    layout(left, top, right, bottom)
  }

  override fun onAdLoaded(nativeAd: LevelPlayNativeAd?, adInfo: AdInfo?) {
    val map = Arguments.createMap()
    map.putMap("nativeAd", nativeAd.toReadableMap())
    map.putMap("adInfo", adInfo?.toReadableMap())

    // Apply styles before binding the views
    applyStyles(
      nativeAdLayout!!.findViewById(R.id.adTitle),
      nativeAdLayout!!.findViewById(R.id.adBody),
      nativeAdLayout!!.findViewById(R.id.adAdvertiser),
      nativeAdLayout!!.findViewById(R.id.adCallToAction))

    // Invoke the binding method
    onBindLevelPlayNativeAdView?.invoke(nativeAd)

    // Notify React-Native that the ad has been loaded
    sendEventToParticularUI(reactContext, id, LevelPlayConstants.ON_AD_LOADED_EVENT, map)

    // Visible the ad
    nativeAdLayout!!.visibility = View.VISIBLE
  }

  override fun onAdLoadFailed(nativeAd: LevelPlayNativeAd?, error: IronSourceError?) {
    val map = Arguments.createMap()
    map.putMap("nativeAd", nativeAd.toReadableMap())
    map.putMap("error", error?.toReadableMap())
    sendEventToParticularUI(reactContext, id, LevelPlayConstants.ON_AD_LOAD_FAILED_EVENT, map)
  }

  override fun onAdClicked(nativeAd: LevelPlayNativeAd?, adInfo: AdInfo?) {
    val map = Arguments.createMap()
    map.putMap("nativeAd", nativeAd.toReadableMap())
    map.putMap("adInfo", adInfo?.toReadableMap())
    sendEventToParticularUI(reactContext, id, LevelPlayConstants.ON_AD_CLICKED_EVENT, map)
  }

  override fun onAdImpression(nativeAd: LevelPlayNativeAd?, adInfo: AdInfo?) {
    val map = Arguments.createMap()
    map.putMap("nativeAd", nativeAd.toReadableMap())
    map.putMap("adInfo", adInfo?.toReadableMap())
    sendEventToParticularUI(reactContext, id, LevelPlayConstants.ON_AD_IMPRESSION_EVENT, map)
  }

  private fun getTemplateStyleMap(readableMap: ReadableMap?): Map<String, Any?> {
    val map = mutableMapOf<String, Any?>()

    readableMap?.toHashMap()?.let { hashMap ->
      hashMap.forEach { (key, value) ->
        map[key] = value
      }
    }

    return map
  }

  private fun parseElementStyle(styleMap: Map<String, Any?>?): LevelPlayNativeAdElementStyle? {
    return styleMap?.let {
      val backgroundColor = parseColor(it["backgroundColor"] as? String)
      val textSize = (it["textSize"] as? Double)?.toFloat()
      val textColor = parseColor(it["textColor"] as? String)
      val fontStyle = it["fontStyle"] as? String
      val cornerRadius = (it["cornerRadius"] as? Double)?.toFloat()
      LevelPlayNativeAdElementStyle(backgroundColor, textSize, textColor, fontStyle, cornerRadius)
    }
  }

  private fun parseColor(colorString: String?): Int? {
    return if (colorString != null) {
      Color.parseColor(colorString)
    } else {
      null
    }
  }

  private fun getNativeAdLayout(context: Context, layoutId: Int?, templateType: String): NativeAdLayout {
    val layoutInflater = LayoutInflater.from(context)
    return if (layoutId != null && layoutId > 0) {
      // This is the case of custom native ad view creation - layoutId provided
      try {
        layoutInflater.inflate(layoutId, null) as NativeAdLayout
      } catch (e: Exception) {
        throw IllegalArgumentException("Unsupported layoutId: $layoutId")
      }
    } else {
      // This is the case of template native ad view
      when(templateType) {
        "SMALL" -> layoutInflater.inflate(R.layout.small_level_play_native_ad_template, null) as NativeAdLayout
        "MEDIUM" -> layoutInflater.inflate(R.layout.medium_level_play_native_ad_template, null) as NativeAdLayout
        else -> throw IllegalArgumentException("Unsupported templateType: $templateType")
      }
    }
  }
}

