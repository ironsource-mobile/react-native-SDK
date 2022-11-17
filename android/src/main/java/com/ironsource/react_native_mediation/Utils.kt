package com.ironsource.react_native_mediation

import android.util.Log
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReadableMap
import com.facebook.react.modules.core.DeviceEventManagerModule

class Utils {
    companion object {
        fun sendEvent(
            reactApplicationContext: ReactApplicationContext,
            eventName: String,
            params: ReadableMap? = null
        ) {
            val TAG = "SendEvent"
            reactApplicationContext.currentActivity?.runOnUiThread {
                Log.d(TAG, "name:$eventName, params: $params")
                reactApplicationContext
                    .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)
                    .emit(eventName, params)
            } ?: Log.w(TAG, "Cannot send JS event - Activity is null")
        }
    }
}