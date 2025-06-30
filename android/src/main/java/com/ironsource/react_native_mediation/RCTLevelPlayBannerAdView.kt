package com.ironsource.react_native_mediation

import android.content.Context
import android.view.Choreographer
import android.widget.FrameLayout
import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.ReactContext
import com.ironsource.react_native_mediation.LevelPlayUtils.Companion.sendEventToParticularUI
import com.unity3d.mediation.LevelPlayAdError
import com.unity3d.mediation.LevelPlayAdInfo
import com.unity3d.mediation.LevelPlayAdSize
import com.unity3d.mediation.banner.LevelPlayBannerAdView
import com.unity3d.mediation.banner.LevelPlayBannerAdViewListener

class RCTLevelPlayBannerAdView(private val context: Context) : FrameLayout(context), LevelPlayBannerAdViewListener {
  private var reactContext: ReactContext = context as ReactContext
  var adUnitId: String = ""
  var adSize: LevelPlayAdSize? = null
  var placement: String = ""
  private var levelPlayBanner: LevelPlayBannerAdView? = null

  fun initializeBanner() {
    levelPlayBanner = LevelPlayBannerAdView(context, adUnitId)
    if (adSize != null)
      levelPlayBanner!!.setAdSize(adSize!!)
    levelPlayBanner!!.setPlacementName(placement)
    levelPlayBanner!!.setBannerListener(this)

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
    sendEventToParticularUI(reactContext, id, IronConstants.ON_BANNER_AD_GENERATED_ADID, map)
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
    sendEventToParticularUI(reactContext, id, IronConstants.ON_BANNER_AD_LOAD_FAILED, map)
  }

  override fun onAdLoaded(adInfo: LevelPlayAdInfo) {
    val map = Arguments.createMap()
    map.putMap("adInfo", adInfo.toReadableMap())
    sendEventToParticularUI(reactContext, id, IronConstants.ON_BANNER_AD_LOADED, map)
  }

  override fun onAdDisplayed(adInfo: LevelPlayAdInfo) {
    val map = Arguments.createMap()
    map.putMap("adInfo", adInfo.toReadableMap())
    sendEventToParticularUI(reactContext, id, IronConstants.ON_BANNER_AD_DISPLAYED, map)
  }

  override fun onAdDisplayFailed(adInfo: LevelPlayAdInfo, error: LevelPlayAdError) {
    val map = Arguments.createMap()
    map.putMap("adInfo", adInfo.toReadableMap())
    map.putMap("error", error.toReadableMap())
    sendEventToParticularUI(reactContext, id, IronConstants.ON_BANNER_AD_DISPLAY_FAILED, map)
  }

  override fun onAdClicked(adInfo: LevelPlayAdInfo) {
    val map = Arguments.createMap()
    map.putMap("adInfo", adInfo.toReadableMap())
    sendEventToParticularUI(reactContext, id, IronConstants.ON_BANNER_AD_CLICKED, map)
  }

  override fun onAdExpanded(adInfo: LevelPlayAdInfo) {
    val map = Arguments.createMap()
    map.putMap("adInfo", adInfo.toReadableMap())
    sendEventToParticularUI(reactContext, id, IronConstants.ON_BANNER_AD_EXPANDED, map)
  }

  override fun onAdCollapsed(adInfo: LevelPlayAdInfo) {
    val map = Arguments.createMap()
    map.putMap("adInfo", adInfo.toReadableMap())
    sendEventToParticularUI(reactContext, id, IronConstants.ON_BANNER_AD_COLLAPSED, map)
  }

  override fun onAdLeftApplication(adInfo: LevelPlayAdInfo) {
    val map = Arguments.createMap()
    map.putMap("adInfo", adInfo.toReadableMap())
    sendEventToParticularUI(reactContext, id, IronConstants.ON_BANNER_AD_LEFT_APPLICATION, map)
  }
}
