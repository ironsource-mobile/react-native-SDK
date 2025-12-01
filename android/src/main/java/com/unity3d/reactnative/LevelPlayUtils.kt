package com.unity3d.reactnative

import android.os.Handler
import android.os.Looper
import android.util.Log
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContext
import com.facebook.react.bridge.ReadableMap
import com.facebook.react.bridge.WritableMap
import com.facebook.react.modules.core.DeviceEventManagerModule
import com.facebook.react.uimanager.UIManagerHelper
import com.facebook.react.uimanager.events.Event

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
          reactApplicationContext
            .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)
            .emit(eventName, params)
        } ?: Log.w(TAG, "Cannot send JS event - Activity is null")
      }

      // This method dispatches events to UI components in both architectures.
      // It uses UIManagerHelper to get the appropriate event dispatcher
      // (Fabric or Paper) based on the view's surfaceId.
      fun sendEventToParticularUI(
        reactContext: ReactContext,
        viewId: Int,
        eventName: String,
        payload: WritableMap? = null
      ) {
        Handler(Looper.getMainLooper()).post {
          val eventDispatcher = UIManagerHelper.getEventDispatcherForReactTag(reactContext, viewId)
          if (eventDispatcher != null) {
            val surfaceId = UIManagerHelper.getSurfaceId(reactContext)
            eventDispatcher.dispatchEvent(OnViewEvent(surfaceId, viewId, eventName, payload))
          } else {
            Log.w(TAG, "Event dispatcher is null for viewId: $viewId")
          }
        }
      }
    }

    private class OnViewEvent(
      surfaceId: Int,
      viewId: Int,
      private val eventNameValue: String,
      private val payload: WritableMap?
    ) : Event<OnViewEvent>(surfaceId, viewId) {

      override fun getEventName(): String = eventNameValue

      override fun getEventData(): WritableMap? = payload
    }
}

const val TAG = "LevelPlayReactPlugin"
