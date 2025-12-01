package com.unity3d.reactnative

import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.ironsource.mediationsdk.config.ConfigFile
import com.unity3d.reactnative.LevelPlayConstants.E_ILLEGAL_ARGUMENT

class LevelPlayConfigModule(reactContext: ReactApplicationContext) :
  ReactContextBaseJavaModule(reactContext) {

  companion object {
    const val NAME = "LevelPlayConfig"
  }

  override fun getName(): String {
    return NAME
  }

  /** Internal Config API  =================================================================== **/

  /**
   * Only called internally in the process of init on the React Native plugin
   */
  @ReactMethod
  fun setPluginData(
    pluginType: String,
    pluginVersion: String,
    reactNativeVersion: String,
    promise: Promise
  ) {
    if (pluginType.isEmpty()) {
      return promise.reject(E_ILLEGAL_ARGUMENT, "pluginType must be provided.")
    }
    if (pluginVersion.isEmpty()) {
      return promise.reject(E_ILLEGAL_ARGUMENT, "pluginVersion must be provided.")
    }

    ConfigFile.getConfigFile().setPluginData(pluginType, pluginVersion, reactNativeVersion)
    return promise.resolve(null)
  }
}

