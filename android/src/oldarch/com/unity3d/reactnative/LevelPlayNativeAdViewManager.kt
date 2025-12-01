package com.unity3d.reactnative

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReadableArray
import com.facebook.react.uimanager.SimpleViewManager
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.annotations.ReactProp
import com.facebook.react.bridge.ReadableMap
import com.ironsource.mediationsdk.ads.nativead.LevelPlayNativeAd
import com.ironsource.mediationsdk.ads.nativead.NativeAdLayout

/**
 * Old architecture implementation for LevelPlayNativeAdViewManager.
 * Extends SimpleViewManager and delegates to the shared helper.
 */
abstract class LevelPlayNativeAdViewManager(
  reactApplicationContext: ReactApplicationContext,
  layoutId: Int? = null
) : SimpleViewManager<LevelPlayNativeAdView>() {

  private val shared = LevelPlayNativeAdViewManagerShared(reactApplicationContext, layoutId)

  override fun getName(): String = shared.getName()

  override fun createViewInstance(context: ThemedReactContext): LevelPlayNativeAdView {
    return shared.createViewInstance(context)
  }

  override fun onDropViewInstance(view: LevelPlayNativeAdView) {
    super.onDropViewInstance(view)
    shared.onDropViewInstance(view)
  }

  override fun receiveCommand(
    root: LevelPlayNativeAdView,
    commandId: String?,
    args: ReadableArray?
  ) {
    super.receiveCommand(root, commandId, args)
    shared.receiveCommand(root, commandId)
  }

  override fun getExportedCustomDirectEventTypeConstants(): MutableMap<String, Any> {
    return shared.getExportedCustomDirectEventTypeConstants()
  }

  @ReactProp(name = "creationParams")
  fun setCreationParams(view: LevelPlayNativeAdView, value: ReadableMap?) {
    shared.setCreationParams(view, value) { nativeAd, nativeAdLayout ->
      bindNativeAdToView(nativeAd, nativeAdLayout)
    }
  }

  abstract fun bindNativeAdToView(nativeAd: LevelPlayNativeAd?, nativeAdLayout: NativeAdLayout)
}


