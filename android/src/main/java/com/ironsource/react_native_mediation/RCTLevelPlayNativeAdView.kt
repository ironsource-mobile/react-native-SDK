package com.ironsource.react_native_mediation

import android.content.Context
import android.graphics.Typeface
import android.graphics.drawable.GradientDrawable
import android.view.Choreographer
import android.view.View
import android.widget.Button
import android.widget.FrameLayout
import android.widget.TextView
import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.ReactContext
import com.ironsource.mediationsdk.ads.nativead.LevelPlayNativeAd
import com.ironsource.mediationsdk.ads.nativead.LevelPlayNativeAdListener
import com.ironsource.mediationsdk.ads.nativead.NativeAdLayout
import com.ironsource.mediationsdk.adunit.adapter.utility.AdInfo
import com.ironsource.mediationsdk.logger.IronSourceError
import com.ironsource.react_native_mediation.LevelPlayUtils.Companion.sendEventToParticularUI

/**
 * Represents a native ad view that can be displayed in a React-Native app.
 * This view handles the display and interaction of native ads received from IronSource.
 */
class RCTLevelPlayNativeAdView(context: Context) : FrameLayout(context), LevelPlayNativeAdListener {
  private var reactContext: ReactContext = context as ReactContext
  private var placement: String = ""
  private var nativeAdLayout: NativeAdLayout? = null
  private var templateStyles: LevelPlayNativeAdTemplateStyle? = null
  private var viewType: String? = null
  private var templateType: String = ""
  private var nativeAd: LevelPlayNativeAd? = null
  private var onBindLevelPlayNativeAdView: ((LevelPlayNativeAd?) -> Unit)? = null

  private fun applyStyles(titleView: TextView, bodyView: TextView, advertiserView: TextView, callToActionView: Button) {
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
   * This function receive the extracted parameters received from
   * react-native side on view creation, apply the style
   * and save the values received. According to this parameters
   * the method display the correct xml attached to the
   * ad view type.
   *
   * @param placement The native ad placement
   * @param nativeAdLayout The native ad layout
   * @param templateType The native ad template type
   * @param templateStyles The styling options
   * @param viewType The template view type(built-in or custom)
   * @param onBindLevelPlayNativeAdView Unit function to later notify that ad has loaded
   *
   */
  fun setCreationParams(
    placement: String,
    nativeAdLayout: NativeAdLayout,
    templateType: String,
    templateStyles: LevelPlayNativeAdTemplateStyle,
    viewType: String?,
    onBindLevelPlayNativeAdView: (LevelPlayNativeAd?) -> Unit
  ) {
    // Store variables
    this.placement = placement
    this.nativeAdLayout = nativeAdLayout
    this.templateType = templateType
    this.templateStyles = templateStyles
    this.viewType = viewType
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

    onBindLevelPlayNativeAdView?.invoke(nativeAd)

    sendEventToParticularUI(reactContext, id, IronConstants.ON_NATIVE_AD_AD_LOADED, map)

    // Apply styles
    applyStyles(
      nativeAdLayout!!.findViewById(R.id.adTitle),
      nativeAdLayout!!.findViewById(R.id.adBody),
      nativeAdLayout!!.findViewById(R.id.adAdvertiser),
      nativeAdLayout!!.findViewById(R.id.adCallToAction))

    // Visible the ad
    nativeAdLayout!!.visibility = View.VISIBLE
  }

  override fun onAdLoadFailed(nativeAd: LevelPlayNativeAd?, error: IronSourceError?) {
    val map = Arguments.createMap()
    map.putMap("nativeAd", nativeAd.toReadableMap())
    map.putMap("error", error?.toReadableMap())
    sendEventToParticularUI(reactContext, id, IronConstants.ON_NATIVE_AD_AD_LOAD_FAILED, map)
  }

  override fun onAdClicked(nativeAd: LevelPlayNativeAd?, adInfo: AdInfo?) {
    val map = Arguments.createMap()
    map.putMap("nativeAd", nativeAd.toReadableMap())
    map.putMap("adInfo", adInfo?.toReadableMap())
    sendEventToParticularUI(reactContext, id, IronConstants.ON_NATIVE_AD_AD_CLICKED, map)
  }

  override fun onAdImpression(nativeAd: LevelPlayNativeAd?, adInfo: AdInfo?) {
    val map = Arguments.createMap()
    map.putMap("nativeAd", nativeAd.toReadableMap())
    map.putMap("adInfo", adInfo?.toReadableMap())
    sendEventToParticularUI(reactContext, id, IronConstants.ON_NATIVE_AD_AD_IMPRESSION, map)
  }
}
