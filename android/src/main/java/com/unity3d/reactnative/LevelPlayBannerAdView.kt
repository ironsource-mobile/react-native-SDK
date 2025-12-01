package com.unity3d.reactnative

import android.content.Context
import android.view.Choreographer
import android.widget.FrameLayout
import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.ReactContext
import com.facebook.react.bridge.ReadableMap
import com.unity3d.reactnative.LevelPlayUtils.Companion.sendEventToParticularUI
import com.unity3d.mediation.LevelPlayAdError
import com.unity3d.mediation.LevelPlayAdInfo
import com.unity3d.mediation.LevelPlayAdSize
import com.unity3d.mediation.banner.LevelPlayBannerAdView
import com.unity3d.mediation.banner.LevelPlayBannerAdViewListener

class LevelPlayBannerAdView(private val context: Context) : FrameLayout(context), LevelPlayBannerAdViewListener {
  private var reactContext: ReactContext = context as ReactContext
  var adUnitId: String = ""
  var adSize: LevelPlayAdSize? = null
  var placementName: String = ""
  private var bidFloor: Double? = null
  private var levelPlayBanner: LevelPlayBannerAdView? = null

  fun setCreationParams(value: ReadableMap?) {
    placementName = value?.getString("placementName") ?: ""
    adUnitId = value?.getString("adUnitId") ?: ""
    adSize = getLevelPlayAdSize(context, value?.getMap("adSize"))
    if (value != null && value.hasKey("bidFloor"))
      bidFloor = value.getDouble("bidFloor")

    initializeBanner()
  }

  private fun initializeBanner() {
    val adConfigBuilder = LevelPlayBannerAdView.Config.Builder()

    if (adSize != null)
      adConfigBuilder.setAdSize(adSize!!)

    if (bidFloor != null)
      adConfigBuilder.setBidFloor(bidFloor!!)

    adConfigBuilder.setPlacementName(placementName)
    val adConfig = adConfigBuilder.build()

    levelPlayBanner = LevelPlayBannerAdView(context, adUnitId, adConfig)
    levelPlayBanner!!.bannerListener = this

    // Set the banner ad view
    addView(levelPlayBanner)

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

    // send the adId to the react-native side
    val map = Arguments.createMap()
    map.putString("adId", levelPlayBanner!!.adId)
    sendEventToParticularUI(reactContext, id, LevelPlayConstants.ON_AD_ID_GENERATED_EVENT, map)
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

  fun loadAd() {
    levelPlayBanner?.loadAd()
  }

  fun destroy() {
    levelPlayBanner?.destroy()
  }

  fun resumeAutoRefresh() {
    levelPlayBanner?.resumeAutoRefresh()
  }

  fun pauseAutoRefresh() {
    levelPlayBanner?.pauseAutoRefresh()
  }

  override fun onAdLoadFailed(error: LevelPlayAdError) {
    val map = Arguments.createMap()
    map.putMap("error", error.toReadableMap())
    sendEventToParticularUI(reactContext, id, LevelPlayConstants.ON_AD_LOAD_FAILED_EVENT, map)
  }

  override fun onAdLoaded(adInfo: LevelPlayAdInfo) {
    val map = Arguments.createMap()
    map.putMap("adInfo", adInfo.toReadableMap())
    sendEventToParticularUI(reactContext, id, LevelPlayConstants.ON_AD_LOADED_EVENT, map)
  }

  override fun onAdDisplayed(adInfo: LevelPlayAdInfo) {
    val map = Arguments.createMap()
    map.putMap("adInfo", adInfo.toReadableMap())
    sendEventToParticularUI(reactContext, id, LevelPlayConstants.ON_AD_DISPLAYED_EVENT, map)
  }

  override fun onAdDisplayFailed(adInfo: LevelPlayAdInfo, error: LevelPlayAdError) {
    val map = Arguments.createMap()
    map.putMap("adInfo", adInfo.toReadableMap())
    map.putMap("error", error.toReadableMap())
    sendEventToParticularUI(reactContext, id, LevelPlayConstants.ON_AD_DISPLAY_FAILED_EVENT, map)
  }

  override fun onAdClicked(adInfo: LevelPlayAdInfo) {
    val map = Arguments.createMap()
    map.putMap("adInfo", adInfo.toReadableMap())
    sendEventToParticularUI(reactContext, id, LevelPlayConstants.ON_AD_CLICKED_EVENT, map)
  }

  override fun onAdExpanded(adInfo: LevelPlayAdInfo) {
    val map = Arguments.createMap()
    map.putMap("adInfo", adInfo.toReadableMap())
    sendEventToParticularUI(reactContext, id, LevelPlayConstants.ON_AD_EXPANDED_EVENT, map)
  }

  override fun onAdCollapsed(adInfo: LevelPlayAdInfo) {
    val map = Arguments.createMap()
    map.putMap("adInfo", adInfo.toReadableMap())
    sendEventToParticularUI(reactContext, id, LevelPlayConstants.ON_AD_COLLAPSED_EVENT, map)
  }

  override fun onAdLeftApplication(adInfo: LevelPlayAdInfo) {
    val map = Arguments.createMap()
    map.putMap("adInfo", adInfo.toReadableMap())
    sendEventToParticularUI(reactContext, id, LevelPlayConstants.ON_AD_LEFT_APPLICATION_EVENT, map)
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
}

