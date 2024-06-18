package com.ironsource.react_native_mediation

import android.util.Log
import com.facebook.react.ReactPackage
import com.facebook.react.bridge.NativeModule
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.uimanager.ViewManager

class IronSourceMediationPackage : ReactPackage {
  override fun createNativeModules(reactContext: ReactApplicationContext): List<NativeModule> {
    return listOf(IronSourceMediationModule(reactContext), IronSourceConfigModule(reactContext))
  }
  override fun createViewManagers(reactContext: ReactApplicationContext): List<ViewManager<*, *>> {
    // Default view manager registration(SMALL and MEDIUM templates)
    registerViewManager(RCTLevelPlayNativeAdViewManager.DEFAULT_VIEW_TYPE) { _ -> RCTLevelPlayNativeAdViewManagerTemplate(reactContext) }
    // Return all of the managers registered(default and by developer)
    return getCustomViewManagers().map { it(reactContext) }
  }

  companion object {
    private val nativeAdViewManagers = hashMapOf<String, (ReactApplicationContext) -> RCTLevelPlayNativeAdViewManager>()

    fun registerViewManager(viewTypeId: String, factory: (ReactApplicationContext) -> RCTLevelPlayNativeAdViewManager) {
      if (nativeAdViewManagers.containsKey(viewTypeId)) {
        Log.e(TAG, "A native ad view manager with ID $viewTypeId already exists.")
        return
      }
      nativeAdViewManagers[viewTypeId] = factory
    }

    fun getCustomViewManagers(): List<(ReactApplicationContext) -> RCTLevelPlayNativeAdViewManager> {
      return nativeAdViewManagers.values.toList()
    }
  }
}
