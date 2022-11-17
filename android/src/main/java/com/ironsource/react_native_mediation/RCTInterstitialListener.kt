package com.ironsource.react_native_mediation

import com.facebook.react.bridge.ReactApplicationContext
import com.ironsource.mediationsdk.logger.IronSourceError
import com.ironsource.mediationsdk.sdk.InterstitialListener
import com.ironsource.react_native_mediation.IronConstants.ON_IS_AD_CLICKED
import com.ironsource.react_native_mediation.IronConstants.ON_IS_AD_CLOSED
import com.ironsource.react_native_mediation.IronConstants.ON_IS_AD_LOAD_FAILED
import com.ironsource.react_native_mediation.IronConstants.ON_IS_AD_OPENED
import com.ironsource.react_native_mediation.IronConstants.ON_IS_AD_READY
import com.ironsource.react_native_mediation.IronConstants.ON_IS_AD_SHOW_FAILED
import com.ironsource.react_native_mediation.IronConstants.ON_IS_AD_SHOW_SUCCEEDED
import com.ironsource.react_native_mediation.Utils.Companion.sendEvent

class RCTInterstitialListener(private val reactApplicationContext: ReactApplicationContext) :
    InterstitialListener {
    
    override fun onInterstitialAdReady() {
        sendEvent(reactApplicationContext, ON_IS_AD_READY)
    }

    override fun onInterstitialAdLoadFailed(error: IronSourceError) {
        sendEvent(reactApplicationContext, ON_IS_AD_LOAD_FAILED, error.toReadableMap())
    }

    override fun onInterstitialAdOpened() {
        sendEvent(reactApplicationContext, ON_IS_AD_OPENED)
    }

    override fun onInterstitialAdClosed() {
        sendEvent(reactApplicationContext, ON_IS_AD_CLOSED)
    }

    override fun onInterstitialAdShowSucceeded() {
        sendEvent(reactApplicationContext, ON_IS_AD_SHOW_SUCCEEDED)
    }

    override fun onInterstitialAdShowFailed(error: IronSourceError) {
        sendEvent(reactApplicationContext, ON_IS_AD_SHOW_FAILED, error.toReadableMap())
    }

    override fun onInterstitialAdClicked() {
        sendEvent(reactApplicationContext, ON_IS_AD_CLICKED)
    }
}