package com.unity3d.reactnative

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReadableMap
import com.facebook.react.uimanager.ThemedReactContext
import com.unity3d.reactnative.LevelPlayConstants.ON_AD_CLICKED_EVENT
import com.unity3d.reactnative.LevelPlayConstants.ON_AD_COLLAPSED_EVENT
import com.unity3d.reactnative.LevelPlayConstants.ON_AD_DISPLAYED_EVENT
import com.unity3d.reactnative.LevelPlayConstants.ON_AD_DISPLAY_FAILED_EVENT
import com.unity3d.reactnative.LevelPlayConstants.ON_AD_EXPANDED_EVENT
import com.unity3d.reactnative.LevelPlayConstants.ON_AD_ID_GENERATED_EVENT
import com.unity3d.reactnative.LevelPlayConstants.ON_AD_LEFT_APPLICATION_EVENT
import com.unity3d.reactnative.LevelPlayConstants.ON_AD_LOADED_EVENT
import com.unity3d.reactnative.LevelPlayConstants.ON_AD_LOAD_FAILED_EVENT

class LevelPlayBannerAdViewManagerShared(
  private val reactApplicationContext: ReactApplicationContext
) {

  fun getName(): String {
    return NAME
  }

  fun createViewInstance(context: ThemedReactContext): LevelPlayBannerAdView {
    return LevelPlayBannerAdView(context)
  }

  fun onDropViewInstance(view: LevelPlayBannerAdView) {
    view.destroy()
  }

  fun receiveCommand(root: LevelPlayBannerAdView, commandId: String?) {
    when (commandId) {
      COMMAND_LOAD -> root.loadAd()
      COMMAND_DESTROY -> root.destroy()
      COMMAND_RESUME -> root.resumeAutoRefresh()
      COMMAND_PAUSE -> root.pauseAutoRefresh()
    }
  }

  fun loadAd(view: LevelPlayBannerAdView) {
    view.loadAd()
  }

  fun destroy(view: LevelPlayBannerAdView) {
    view.destroy()
  }

  fun pauseAutoRefresh(view: LevelPlayBannerAdView) {
    view.pauseAutoRefresh()
  }

  fun resumeAutoRefresh(view: LevelPlayBannerAdView) {
    view.resumeAutoRefresh()
  }

  fun getExportedCustomDirectEventTypeConstants(): MutableMap<String, Any> {
    return mutableMapOf(
      ON_AD_LOADED_EVENT to mapOf("registrationName" to ON_AD_LOADED_EVENT),
      ON_AD_LOAD_FAILED_EVENT to mapOf("registrationName" to ON_AD_LOAD_FAILED_EVENT),
      ON_AD_DISPLAYED_EVENT to mapOf("registrationName" to ON_AD_DISPLAYED_EVENT),
      ON_AD_DISPLAY_FAILED_EVENT to mapOf("registrationName" to ON_AD_DISPLAY_FAILED_EVENT),
      ON_AD_CLICKED_EVENT to mapOf("registrationName" to ON_AD_CLICKED_EVENT),
      ON_AD_COLLAPSED_EVENT to mapOf("registrationName" to ON_AD_COLLAPSED_EVENT),
      ON_AD_EXPANDED_EVENT to mapOf("registrationName" to ON_AD_EXPANDED_EVENT),
      ON_AD_LEFT_APPLICATION_EVENT to mapOf("registrationName" to ON_AD_LEFT_APPLICATION_EVENT),
      ON_AD_ID_GENERATED_EVENT to mapOf("registrationName" to ON_AD_ID_GENERATED_EVENT),
    )
  }

  fun setCreationParams(view: LevelPlayBannerAdView, value: ReadableMap?) {
    view.setCreationParams(value)
  }

  companion object {
    const val NAME = "LevelPlayBannerAdView"
    const val COMMAND_LOAD = "loadAd"
    const val COMMAND_DESTROY = "destroy"
    const val COMMAND_RESUME = "resumeAutoRefresh"
    const val COMMAND_PAUSE = "pauseAutoRefresh"
  }
}


