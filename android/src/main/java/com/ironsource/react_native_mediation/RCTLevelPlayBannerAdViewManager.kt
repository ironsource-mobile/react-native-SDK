package com.ironsource.react_native_mediation

import android.content.Context
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReadableArray
import com.facebook.react.bridge.ReadableMap
import com.facebook.react.uimanager.SimpleViewManager
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.annotations.ReactProp
import com.ironsource.react_native_mediation.IronConstants.ON_BANNER_AD_CLICKED
import com.ironsource.react_native_mediation.IronConstants.ON_BANNER_AD_COLLAPSED
import com.ironsource.react_native_mediation.IronConstants.ON_BANNER_AD_DISPLAYED
import com.ironsource.react_native_mediation.IronConstants.ON_BANNER_AD_DISPLAY_FAILED
import com.ironsource.react_native_mediation.IronConstants.ON_BANNER_AD_EXPANDED
import com.ironsource.react_native_mediation.IronConstants.ON_BANNER_AD_LEFT_APPLICATION
import com.ironsource.react_native_mediation.IronConstants.ON_BANNER_AD_LOADED
import com.ironsource.react_native_mediation.IronConstants.ON_BANNER_AD_LOAD_FAILED
import com.ironsource.react_native_mediation.IronConstants.ON_BANNER_AD_GENERATED_ADID
import com.unity3d.mediation.LevelPlayAdSize

class RCTLevelPlayBannerAdViewManager(
  private var reactApplicationContext: ReactApplicationContext,
) : SimpleViewManager<RCTLevelPlayBannerAdView>() {

  override fun getName(): String {
    return MANAGER_NAME
  }

  override fun createViewInstance(context: ThemedReactContext): RCTLevelPlayBannerAdView {
    return RCTLevelPlayBannerAdView(context)
  }

  override fun onDropViewInstance(view: RCTLevelPlayBannerAdView) {
    super.onDropViewInstance(view)
    view.destroy()
  }

  override fun receiveCommand(
    root: RCTLevelPlayBannerAdView,
    commandId: String?,
    args: ReadableArray?
  ) {
    super.receiveCommand(root, commandId, args)
    when (commandId?.toInt()) {
      COMMAND_LOAD -> root.loadAd()
      COMMAND_DESTROY -> root.destroy()
      COMMAND_RESUME -> root.resumeAutoRefresh()
      COMMAND_PAUSE -> root.pauseAutoRefresh()
    }
  }

  override fun getExportedCustomDirectEventTypeConstants(): MutableMap<String, Any> {
    return mutableMapOf(
      ON_BANNER_AD_LOADED to mapOf("registrationName" to "onAdLoadedEvent"),
      ON_BANNER_AD_LOAD_FAILED to mapOf("registrationName" to "onAdLoadFailedEvent"),
      ON_BANNER_AD_DISPLAYED to mapOf("registrationName" to "onAdDisplayedEvent"),
      ON_BANNER_AD_DISPLAY_FAILED to mapOf("registrationName" to "onAdDisplayFailedEvent"),
      ON_BANNER_AD_CLICKED to mapOf("registrationName" to "onAdClickedEvent"),
      ON_BANNER_AD_COLLAPSED to mapOf("registrationName" to "onAdCollapsedEvent"),
      ON_BANNER_AD_EXPANDED to mapOf("registrationName" to "onAdExpandedEvent"),
      ON_BANNER_AD_LEFT_APPLICATION to mapOf("registrationName" to "onAdLeftApplicationEvent"),
      ON_BANNER_AD_GENERATED_ADID to mapOf("registrationName" to "onAdIdGeneratedEvent"),
    )
  }

  override fun getCommandsMap(): MutableMap<String, Int> {
    return mutableMapOf(
      "loadAd" to 1,
      "destroy" to 2,
      "resumeAutoRefresh" to 3,
      "pauseAutoRefresh" to 4,
    )
  }

  @ReactProp (name = "creationParams")
  fun setCreationParams(view: RCTLevelPlayBannerAdView, value: ReadableMap) {
    view.placement = value.getString("placement") ?: ""
    view.adUnitId = value.getString("adUnitId") ?: ""
    view.adSize = getLevelPlayAdSize(reactApplicationContext, value.getMap("adSize"))

    view.initializeBanner()
  }

  private fun getLevelPlayAdSize(context: Context?, adSizeMap: ReadableMap?): LevelPlayAdSize? {
    if (context == null || adSizeMap == null) return null

    val width = adSizeMap.getInt("width")
    val height = adSizeMap.getInt("height")
    val adLabel: String? = adSizeMap.getString("adLabel")
    val isAdaptive = adSizeMap.getBoolean("isAdaptive")

    // At this point, developer has provided ad size, which means checks for
    // width and height already performed by the sdk and no need to check again.
    return if (isAdaptive) {
      // Valid width provided as adaptive already called if entered here
      LevelPlayAdSize.createAdaptiveAdSize(context, width)
    } else if (adLabel.equals("BANNER", true)) {
      LevelPlayAdSize.BANNER
    } else if (adLabel.equals("LARGE", true)) {
      LevelPlayAdSize.LARGE
    } else if (adLabel.equals("MEDIUM_RECTANGLE", true)) {
      LevelPlayAdSize.MEDIUM_RECTANGLE
    } else if (adLabel.equals("CUSTOM", true)) {
      LevelPlayAdSize.createCustomSize(width, height)
    } else {
      null
    }
  }

  companion object {
    const val MANAGER_NAME = "levelPlayBannerAdView"
    private const val COMMAND_LOAD = 1
    private const val COMMAND_DESTROY = 2
    private const val COMMAND_RESUME = 3
    private const val COMMAND_PAUSE = 4
  }
}
