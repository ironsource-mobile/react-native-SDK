package com.ironsource.react_native_mediation

import android.graphics.Color
import android.view.LayoutInflater
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReadableArray
import com.facebook.react.bridge.ReadableMap
import com.facebook.react.uimanager.SimpleViewManager
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.annotations.ReactProp
import com.ironsource.mediationsdk.ads.nativead.LevelPlayNativeAd
import com.ironsource.mediationsdk.ads.nativead.NativeAdLayout
import com.ironsource.react_native_mediation.IronConstants.LP_NATIVE_AD_ON_AD_CLICKED
import com.ironsource.react_native_mediation.IronConstants.LP_NATIVE_AD_ON_AD_IMPRESSION
import com.ironsource.react_native_mediation.IronConstants.LP_NATIVE_AD_ON_AD_LOADED
import com.ironsource.react_native_mediation.IronConstants.LP_NATIVE_AD_ON_AD_LOAD_FAILED

/**
 * Manager abstract class for creating instances of RCTLevelPlayNativeAdView with build-in templates and custom layouts.
 * This factory is responsible for creating instances of RCTLevelPlayNativeAdView and bind their views
 * to the native ad created.
 *
 * @param layoutId The layout id used for custom native ad layout.
 */
abstract class RCTLevelPlayNativeAdViewManager(
  private var reactApplicationContext: ReactApplicationContext,
  private val layoutId: Int? = null
) : SimpleViewManager<RCTLevelPlayNativeAdView>() {

  override fun getName(): String {
    return DEFAULT_VIEW_TYPE
  }

  override fun createViewInstance(context: ThemedReactContext): RCTLevelPlayNativeAdView {
    return RCTLevelPlayNativeAdView(context)
  }

  override fun onDropViewInstance(view: RCTLevelPlayNativeAdView) {
    super.onDropViewInstance(view)
    view.destroyAd()
  }

  override fun receiveCommand(
    root: RCTLevelPlayNativeAdView,
    commandId: String?,
    args: ReadableArray?
  ) {
    super.receiveCommand(root, commandId, args)
    when (commandId?.toInt()) {
      COMMAND_LOAD -> root.loadAd()
      COMMAND_DESTROY -> root.destroyAd()
    }
  }

  // This override the events to be expected
  // in the react-native side, for example:
  // Send event with name LevelPlay:NativeAd:onAdLoadedEvent
  // will be mapped to onAdLoadedEvent and this is
  // the callback name that should be used.
  override fun getExportedCustomDirectEventTypeConstants(): MutableMap<String, Any> {
    return mutableMapOf(
      LP_NATIVE_AD_ON_AD_LOADED to mapOf("registrationName" to "onAdLoadedEvent"),
      LP_NATIVE_AD_ON_AD_LOAD_FAILED to mapOf("registrationName" to "onAdLoadFailedEvent"),
      LP_NATIVE_AD_ON_AD_IMPRESSION to mapOf("registrationName" to "onAdImpressionEvent"),
      LP_NATIVE_AD_ON_AD_CLICKED to mapOf("registrationName" to "onAdClickedEvent"),
    )
  }

  override fun getCommandsMap(): MutableMap<String, Int> {
    return mutableMapOf(
      "loadAd" to 1,
      "destroyAd" to 2,
    )
  }

  @ReactProp(name = "creationParams")
  fun setCreationParams(view: RCTLevelPlayNativeAdView, value: ReadableMap?) {
    // Extract creation params
    val placement = value?.getString("placement") ?: ""
    val templateStyle = toMap(value?.getMap("templateStyle"))
    val templateType = value?.getString("templateType") ?: ""
    val viewType = value?.getString("viewType")
    // Parse LevelPlayNativeAdElementStyle objects
    val titleElementStyle = parseElementStyle(templateStyle["titleStyle"] as? Map<String, Any?>)
    val bodyElementStyle = parseElementStyle(templateStyle["bodyStyle"] as? Map<String, Any?>)
    val advertiserElementStyle = parseElementStyle(templateStyle["advertiserStyle"] as? Map<String, Any?>)
    val callToActionElementStyle = parseElementStyle(templateStyle["callToActionStyle"] as? Map<String, Any?>)
    // Create the template style from parsed element styles(if exist)
    val levelPlayNativeAdTemplateStyle = LevelPlayNativeAdTemplateStyle(titleElementStyle, bodyElementStyle, advertiserElementStyle, callToActionElementStyle)
    // Create the native ad layout
    val layoutInflater = LayoutInflater.from(reactApplicationContext)
    val nativeAdLayout = if (layoutId != null && layoutId > 0) {
      // This is the case of custom native ad view creation - layoutId provided
      try {
        layoutInflater.inflate(layoutId, null) as NativeAdLayout
      } catch (e: Exception) {
        throw  IllegalArgumentException("Unsupported layoutId: $layoutId")
      }
    } else {
      // This is the case of template native ad view
      when(templateType) {
        "SMALL" -> layoutInflater.inflate(R.layout.small_level_play_native_ad_template, null) as NativeAdLayout
        "MEDIUM" -> layoutInflater.inflate(R.layout.medium_level_play_native_ad_template, null) as NativeAdLayout
        else -> throw IllegalArgumentException("Unsupported templateType: $templateType")
      }
    }
    view.setCreationParams(placement, nativeAdLayout, templateType, levelPlayNativeAdTemplateStyle, viewType) { nativeAd ->
      // When native is loaded, this Unit is triggered to
      // notify the ad has been loaded and developer needs
      // to bind it to the layout.
      bindNativeAdToView(nativeAd, nativeAdLayout)
    }
  }

  private fun toMap(readableMap: ReadableMap?): Map<String, Any?> {
    val map = mutableMapOf<String, Any?>()

    readableMap?.toHashMap()?.let { hashMap ->
      hashMap.forEach { (key, value) ->
        map[key] = value
      }
    }

    return map
  }

  /**
   * This function extract styles values from map and create instance of LevelPlayNativeAdElementStyle
   *
   * @param styleMap The style map used to extract the styling elements
   * @return The LevelPlayNativeAdElementStyle instance
   */
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

  abstract fun bindNativeAdToView(nativeAd: LevelPlayNativeAd?, nativeAdLayout: NativeAdLayout)

  companion object {
    const val DEFAULT_VIEW_TYPE = "levelPlayNativeAdViewType"
    private const val COMMAND_LOAD = 1
    private const val COMMAND_DESTROY = 2
  }
}
