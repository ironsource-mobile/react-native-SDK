package com.unity3d.reactnative

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReadableArray
import com.facebook.react.bridge.ReadableMap
import com.facebook.react.module.annotations.ReactModule
import com.facebook.react.uimanager.SimpleViewManager
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.ViewManagerDelegate
import com.facebook.react.uimanager.annotations.ReactProp
import com.facebook.react.viewmanagers.LevelPlayNativeAdViewManagerDelegate
import com.facebook.react.viewmanagers.LevelPlayNativeAdViewManagerInterface
import com.ironsource.mediationsdk.ads.nativead.LevelPlayNativeAd
import com.ironsource.mediationsdk.ads.nativead.NativeAdLayout

/**
 * New architecture (Fabric) implementation for LevelPlayNativeAdViewManager.
 * Implements the generated interface and delegates to the shared helper.
 */
@ReactModule(name = LevelPlayNativeAdViewManagerShared.NAME)
abstract class LevelPlayNativeAdViewManager(
  reactApplicationContext: ReactApplicationContext,
  layoutId: Int? = null
) : SimpleViewManager<LevelPlayNativeAdView>(),
    LevelPlayNativeAdViewManagerInterface<LevelPlayNativeAdView> {

  private val shared = LevelPlayNativeAdViewManagerShared(reactApplicationContext, layoutId)

  private val delegate: ViewManagerDelegate<LevelPlayNativeAdView> =
    LevelPlayNativeAdViewManagerDelegate(this)

  override fun getDelegate(): ViewManagerDelegate<LevelPlayNativeAdView> = delegate

  override fun getName(): String = shared.getName()

  override fun createViewInstance(context: ThemedReactContext): LevelPlayNativeAdView {
    return shared.createViewInstance(context)
  }

  override fun onDropViewInstance(view: LevelPlayNativeAdView) {
    super.onDropViewInstance(view)
    shared.onDropViewInstance(view)
  }

  // Fabric command methods
  override fun loadAd(view: LevelPlayNativeAdView) {
    shared.loadAd(view)
  }

  override fun destroyAd(view: LevelPlayNativeAdView) {
    shared.destroyAd(view)
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
  override fun setCreationParams(view: LevelPlayNativeAdView, value: ReadableMap?) {
    shared.setCreationParams(view, value) { nativeAd, nativeAdLayout ->
      bindNativeAdToView(nativeAd, nativeAdLayout)
    }
  }

  abstract fun bindNativeAdToView(nativeAd: LevelPlayNativeAd?, nativeAdLayout: NativeAdLayout)
}


