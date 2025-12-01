package com.unity3d.reactnative

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReadableMap
import com.facebook.react.module.annotations.ReactModule
import com.facebook.react.uimanager.SimpleViewManager
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.ViewManagerDelegate
import com.facebook.react.viewmanagers.LevelPlayBannerAdViewManagerDelegate
import com.facebook.react.viewmanagers.LevelPlayBannerAdViewManagerInterface

@ReactModule(name = LevelPlayBannerAdViewManagerShared.NAME)
class LevelPlayBannerAdViewManager(
  reactApplicationContext: ReactApplicationContext
) : SimpleViewManager<LevelPlayBannerAdView>(),
    LevelPlayBannerAdViewManagerInterface<LevelPlayBannerAdView> {

  private val shared = LevelPlayBannerAdViewManagerShared(reactApplicationContext)

  private val delegate: ViewManagerDelegate<LevelPlayBannerAdView> =
    LevelPlayBannerAdViewManagerDelegate(this)

  override fun getDelegate(): ViewManagerDelegate<LevelPlayBannerAdView> = delegate

  override fun getName(): String = shared.getName()

  override fun createViewInstance(context: ThemedReactContext): LevelPlayBannerAdView {
    return shared.createViewInstance(context)
  }

  override fun onDropViewInstance(view: LevelPlayBannerAdView) {
    super.onDropViewInstance(view)
    shared.onDropViewInstance(view)
  }

  // Fabric interface methods
  override fun loadAd(view: LevelPlayBannerAdView) {
    shared.loadAd(view)
  }

  override fun destroy(view: LevelPlayBannerAdView) {
    shared.destroy(view)
  }

  override fun pauseAutoRefresh(view: LevelPlayBannerAdView) {
    shared.pauseAutoRefresh(view)
  }

  override fun resumeAutoRefresh(view: LevelPlayBannerAdView) {
    shared.resumeAutoRefresh(view)
  }

  override fun setCreationParams(view: LevelPlayBannerAdView, value: ReadableMap?) {
    shared.setCreationParams(view, value)
  }

  override fun getExportedCustomDirectEventTypeConstants(): MutableMap<String, Any>? {
    return shared.getExportedCustomDirectEventTypeConstants()
  }
}


