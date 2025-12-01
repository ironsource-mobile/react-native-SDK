package com.unity3d.reactnative

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReadableArray
import com.facebook.react.bridge.ReadableMap
import com.facebook.react.uimanager.SimpleViewManager
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.annotations.ReactProp

class LevelPlayBannerAdViewManager(
  reactApplicationContext: ReactApplicationContext
) : SimpleViewManager<LevelPlayBannerAdView>() {

  private val shared = LevelPlayBannerAdViewManagerShared(reactApplicationContext)

  override fun getName(): String = shared.getName()

  override fun createViewInstance(context: ThemedReactContext): LevelPlayBannerAdView {
    return shared.createViewInstance(context)
  }

  override fun onDropViewInstance(view: LevelPlayBannerAdView) {
    super.onDropViewInstance(view)
    shared.onDropViewInstance(view)
  }

  override fun receiveCommand(
    root: LevelPlayBannerAdView,
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
  fun setCreationParams(view: LevelPlayBannerAdView, value: ReadableMap?) {
    shared.setCreationParams(view, value)
  }
}


