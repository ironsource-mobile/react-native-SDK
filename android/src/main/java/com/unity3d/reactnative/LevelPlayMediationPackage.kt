package com.unity3d.reactnative

import android.util.Log
import com.facebook.react.TurboReactPackage
import com.facebook.react.bridge.NativeModule
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.module.model.ReactModuleInfo
import com.facebook.react.module.model.ReactModuleInfoProvider
import com.facebook.react.uimanager.ViewManager

class LevelPlayMediationPackage : TurboReactPackage() {

  override fun getModule(name: String, reactContext: ReactApplicationContext): NativeModule? {
    return when (name) {
      LevelPlayMediationModuleShared.NAME -> LevelPlayMediationModule(reactContext)
      LevelPlayConfigModule.NAME -> LevelPlayConfigModule(reactContext)
      else -> null
    }
  }

  override fun getReactModuleInfoProvider(): ReactModuleInfoProvider {
    return ReactModuleInfoProvider {
      val moduleInfos = mutableMapOf<String, ReactModuleInfo>()
      val isTurboModule = BuildConfig.IS_NEW_ARCHITECTURE_ENABLED

      moduleInfos[LevelPlayMediationModuleShared.NAME] = ReactModuleInfo(
        LevelPlayMediationModuleShared.NAME,
        LevelPlayMediationModuleShared.NAME,
        false, // canOverrideExistingModule
        false, // needsEagerInit
        true,  // hasConstants
        false, // isCxxModule
        isTurboModule // isTurboModule
      )

      moduleInfos[LevelPlayConfigModule.NAME] = ReactModuleInfo(
        LevelPlayConfigModule.NAME,
        LevelPlayConfigModule.NAME,
        false, // canOverrideExistingModule
        false, // needsEagerInit
        false, // hasConstants
        false, // isCxxModule
        false  // isTurboModule (config module is not a turbo module)
      )

      moduleInfos
    }
  }

  override fun createViewManagers(reactContext: ReactApplicationContext): List<ViewManager<*, *>> {
    // Native ad view manager registry(SMALL and MEDIUM templates)
    registerViewManager(LevelPlayNativeAdViewManagerShared.NAME) { _ ->
      LevelPlayNativeAdViewManagerTemplate(reactContext)
    }
    // Banner ad view manager registry
    registerViewManager(LevelPlayBannerAdViewManagerShared.NAME) { _ ->
      LevelPlayBannerAdViewManager(reactContext)
    }
    // Return all of the managers registered(default and by developer)
    return getCustomViewManagers().map { it(reactContext) }
  }

  companion object {
    private val viewManagers = hashMapOf<String, (ReactApplicationContext) -> ViewManager<*, *>>()

    fun registerViewManager(viewTypeId: String, factory: (ReactApplicationContext) -> ViewManager<*, *>) {
      if (viewManagers.containsKey(viewTypeId)) {
        Log.e(TAG, "A view manager with ID $viewTypeId already exists.")
        return
      }
      viewManagers[viewTypeId] = factory
    }

    fun getCustomViewManagers(): List<(ReactApplicationContext) -> ViewManager<*, *>> {
      return viewManagers.values.toList()
    }
  }
}

