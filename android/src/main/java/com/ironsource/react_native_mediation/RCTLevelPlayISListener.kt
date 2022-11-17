package com.ironsource.react_native_mediation

import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.ReactApplicationContext
import com.ironsource.mediationsdk.adunit.adapter.utility.AdInfo
import com.ironsource.mediationsdk.logger.IronSourceError
import com.ironsource.mediationsdk.sdk.LevelPlayInterstitialListener
import com.ironsource.react_native_mediation.IronConstants.LP_IS_ON_AD_CLICKED
import com.ironsource.react_native_mediation.IronConstants.LP_IS_ON_AD_CLOSED
import com.ironsource.react_native_mediation.IronConstants.LP_IS_ON_AD_LOAD_FAILED
import com.ironsource.react_native_mediation.IronConstants.LP_IS_ON_AD_OPENED
import com.ironsource.react_native_mediation.IronConstants.LP_IS_ON_AD_READY
import com.ironsource.react_native_mediation.IronConstants.LP_IS_ON_AD_SHOW_FAILED
import com.ironsource.react_native_mediation.IronConstants.LP_IS_ON_AD_SHOW_SUCCEEDED
import com.ironsource.react_native_mediation.Utils.Companion.sendEvent

/**
 * New IS Listener from 7.2.3
 * TODO: Ask if the AdInfo could be null
 */
class RCTLevelPlayISListener(private val reactApplicationContext: ReactApplicationContext) :
    LevelPlayInterstitialListener {

    override fun onAdReady(adInfo: AdInfo) {
        sendEvent(reactApplicationContext, LP_IS_ON_AD_READY, adInfo.toReadableMap())
    }

    override fun onAdLoadFailed(error: IronSourceError) {
        sendEvent(reactApplicationContext, LP_IS_ON_AD_LOAD_FAILED, error.toReadableMap())
    }

    override fun onAdOpened(adInfo: AdInfo) {
        sendEvent(reactApplicationContext, LP_IS_ON_AD_OPENED, adInfo.toReadableMap())
    }

    override fun onAdClosed(adInfo: AdInfo) {
        sendEvent(reactApplicationContext, LP_IS_ON_AD_CLOSED, adInfo.toReadableMap())
    }

    override fun onAdShowFailed(error: IronSourceError, adInfo: AdInfo) {
        val map = Arguments.createMap()
        map.putMap("error", error.toReadableMap())
        map.putMap("adInfo", adInfo.toReadableMap())
        sendEvent(reactApplicationContext, LP_IS_ON_AD_SHOW_FAILED, map)
    }

    override fun onAdClicked(adInfo: AdInfo) {
        sendEvent(reactApplicationContext, LP_IS_ON_AD_CLICKED, adInfo.toReadableMap())
    }

    override fun onAdShowSucceeded(adInfo: AdInfo) {
        sendEvent(reactApplicationContext, LP_IS_ON_AD_SHOW_SUCCEEDED, adInfo.toReadableMap())
    }
}