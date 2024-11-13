package com.ironsource.react_native_mediation

import android.util.Log
import com.facebook.react.ReactPackage
import com.facebook.react.bridge.NativeModule
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.uimanager.SimpleViewManager
import com.facebook.react.uimanager.ViewManager

class IronSourceMediationPackage : ReactPackage {
  override fun createNativeModules(reactContext: ReactApplicationContext): List<NativeModule> {
    return listOf(IronSourceMediationModule(reactContext), IronSourceConfigModule(reactContext))
  }
  override fun createViewManagers(reactContext: ReactApplicationContext): List<ViewManager<*, *>> {
    // Native ad view manager registry(SMALL and MEDIUM templates)
    registerViewManager(RCTLevelPlayNativeAdViewManager.MANAGER_NAME) { _ -> RCTLevelPlayNativeAdViewManagerTemplate(reactContext) }
    // Banner ad view manager registry
    registerViewManager(RCTLevelPlayBannerAdViewManager.MANAGER_NAME) { _ -> RCTLevelPlayBannerAdViewManager(reactContext) }
    // Return all of the managers registered(default and by developer)
    return getCustomViewManagers().map { it(reactContext) }
  }

  companion object {
    private val viewManagers = hashMapOf<String, (ReactApplicationContext) -> SimpleViewManager<*>>()

    fun registerViewManager(viewTypeId: String, factory: (ReactApplicationContext) -> SimpleViewManager<*>) {
      if (viewManagers.containsKey(viewTypeId)) {
        Log.e(TAG, "A view manager with ID $viewTypeId already exists.")
        return
      }
      viewManagers[viewTypeId] = factory
    }

    fun getCustomViewManagers(): List<(ReactApplicationContext) -> SimpleViewManager<*>> {
      return viewManagers.values.toList()
    }
  }
}
