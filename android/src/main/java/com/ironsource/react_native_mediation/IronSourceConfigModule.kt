package com.ironsource.react_native_mediation

import android.util.Log
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.ironsource.mediationsdk.config.ConfigFile
import com.ironsource.react_native_mediation.IronConstants.E_ILLEGAL_ARGUMENT

class IronSourceConfigModule(reactContext: ReactApplicationContext) :
    ReactContextBaseJavaModule(reactContext) {

    override fun getName(): String {
        return "IronSourceConfig"
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
        Log.d(TAG, "pluginType $pluginType, pluginVersion $pluginVersion")
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
