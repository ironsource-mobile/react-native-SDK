package com.ironsource.react_native_mediation

import android.util.Log
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContext
import com.facebook.react.bridge.ReadableMap
import com.facebook.react.bridge.WritableMap
import com.facebook.react.modules.core.DeviceEventManagerModule
import com.facebook.react.uimanager.events.RCTEventEmitter
import com.ironsource.mediationsdk.IronSource

class LevelPlayUtils {
    companion object {

      // DeviceEventManagerModule.RCTDeviceEventEmitter.emit(eventName, params)
        // is used for emitting global events that can be handled anywhere in the
        // application.
        fun sendEvent(
            reactApplicationContext: ReactApplicationContext,
            eventName: String,
            params: ReadableMap? = null
        ) {
            reactApplicationContext.currentActivity?.runOnUiThread {
                Log.d(TAG, "name:$eventName, params: $params")
                reactApplicationContext
                    .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)
                    .emit(eventName, params)
            } ?: Log.w(TAG, "Cannot send JS event - Activity is null")
        }

      // RCTEventEmitter.receiveEvent(id, eventName, params)
      // is used for emitting events that are specific to a
      // particular UI component or view, identified by its ID.
      fun sendEventToParticularUI(
        reactContext: ReactContext,
        id: Int,
        eventName: String,
        map: WritableMap? = null
      ) {
        reactContext
          .getJSModule(RCTEventEmitter::class.java)
          .receiveEvent(id, eventName, map)
      }

        fun parseAdUnit(adUnit: String): IronSource.AD_UNIT? {
          // Parse ad unit and if invalid, default to Null
          return when (adUnit.uppercase()) {
            "REWARDED_VIDEO" -> IronSource.AD_UNIT.REWARDED_VIDEO
            "INTERSTITIAL" -> IronSource.AD_UNIT.INTERSTITIAL
            "BANNER" -> IronSource.AD_UNIT.BANNER
            "NATIVE_AD" -> IronSource.AD_UNIT.NATIVE_AD
            else -> null
          }
        }
    }
}

const val TAG = "LevelPlayReactPlugin"
