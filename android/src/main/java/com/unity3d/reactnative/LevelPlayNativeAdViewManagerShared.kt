package com.unity3d.reactnative

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReadableMap
import com.facebook.react.uimanager.ThemedReactContext
import com.ironsource.mediationsdk.ads.nativead.LevelPlayNativeAd
import com.ironsource.mediationsdk.ads.nativead.NativeAdLayout
import com.unity3d.reactnative.LevelPlayConstants.ON_AD_CLICKED_EVENT
import com.unity3d.reactnative.LevelPlayConstants.ON_AD_IMPRESSION_EVENT
import com.unity3d.reactnative.LevelPlayConstants.ON_AD_LOADED_EVENT
import com.unity3d.reactnative.LevelPlayConstants.ON_AD_LOAD_FAILED_EVENT

/**
 * Shared helper class containing all non-abstract logic for LevelPlayNativeAdViewManager.
 * This class is used by both old and new architecture wrappers.
 */
class LevelPlayNativeAdViewManagerShared(
  private val reactApplicationContext: ReactApplicationContext,
  private val layoutId: Int? = null
) {

  fun getName(): String {
    return NAME
  }

  fun createViewInstance(context: ThemedReactContext): LevelPlayNativeAdView {
    return LevelPlayNativeAdView(context)
  }

  fun onDropViewInstance(view: LevelPlayNativeAdView) {
    view.destroyAd()
  }

  fun receiveCommand(view: LevelPlayNativeAdView, commandId: String?) {
    when (commandId) {
      COMMAND_LOAD -> view.loadAd()
      COMMAND_DESTROY -> view.destroyAd()
    }
  }

  fun loadAd(view: LevelPlayNativeAdView) {
    view.loadAd()
  }

  fun destroyAd(view: LevelPlayNativeAdView) {
    view.destroyAd()
  }

  fun getExportedCustomDirectEventTypeConstants(): MutableMap<String, Any> {
    return mutableMapOf(
      ON_AD_LOADED_EVENT to mapOf("registrationName" to ON_AD_LOADED_EVENT),
      ON_AD_LOAD_FAILED_EVENT to mapOf("registrationName" to ON_AD_LOAD_FAILED_EVENT),
      ON_AD_IMPRESSION_EVENT to mapOf("registrationName" to ON_AD_IMPRESSION_EVENT),
      ON_AD_CLICKED_EVENT to mapOf("registrationName" to ON_AD_CLICKED_EVENT),
    )
  }

  fun setCreationParams(
    view: LevelPlayNativeAdView,
    value: ReadableMap?,
    bindNativeAdToView: (LevelPlayNativeAd?, NativeAdLayout) -> Unit
  ) {
    view.setCreationParams(value, layoutId) { nativeAd ->
      // When native ad is loaded, pass it with the layout to the manager's callback
      view.nativeAdLayout?.let { nativeAdLayout ->
        bindNativeAdToView(nativeAd, nativeAdLayout)
      }
    }
  }

  companion object {
    const val NAME = "LevelPlayNativeAdView"
    const val COMMAND_LOAD = "loadAd"
    const val COMMAND_DESTROY = "destroyAd"
  }
}


