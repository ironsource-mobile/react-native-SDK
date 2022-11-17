package com.ironsource.react_native_mediation

import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.ReactApplicationContext
import com.ironsource.mediationsdk.logger.IronSourceError
import com.ironsource.mediationsdk.model.Placement
import com.ironsource.mediationsdk.sdk.RewardedVideoListener
import com.ironsource.mediationsdk.sdk.RewardedVideoManualListener
import com.ironsource.react_native_mediation.IronConstants.ON_RV_AD_CLICKED
import com.ironsource.react_native_mediation.IronConstants.ON_RV_AD_CLOSED
import com.ironsource.react_native_mediation.IronConstants.ON_RV_AD_ENDED
import com.ironsource.react_native_mediation.IronConstants.ON_RV_AD_LOAD_FAILED
import com.ironsource.react_native_mediation.IronConstants.ON_RV_AD_OPENED
import com.ironsource.react_native_mediation.IronConstants.ON_RV_AD_READY
import com.ironsource.react_native_mediation.IronConstants.ON_RV_AD_REWARDED
import com.ironsource.react_native_mediation.IronConstants.ON_RV_AD_SHOW_FAILED
import com.ironsource.react_native_mediation.IronConstants.ON_RV_AD_STARTED
import com.ironsource.react_native_mediation.IronConstants.ON_RV_AVAILABILITY_CHANGED
import com.ironsource.react_native_mediation.Utils.Companion.sendEvent

class RCTRewardedVideoListener(private val reactApplicationContext: ReactApplicationContext) :
    RewardedVideoListener, RewardedVideoManualListener {
    override fun onRewardedVideoAdOpened() {
        sendEvent(reactApplicationContext, ON_RV_AD_OPENED)
    }

    override fun onRewardedVideoAdClosed() {
        sendEvent(reactApplicationContext, ON_RV_AD_CLOSED)
    }

    override fun onRewardedVideoAvailabilityChanged(isAvailable: Boolean) {
        val args = Arguments.createMap().apply { putBoolean("isAvailable", isAvailable) }
        sendEvent(reactApplicationContext, ON_RV_AVAILABILITY_CHANGED, args)
    }

    override fun onRewardedVideoAdStarted() {
        sendEvent(reactApplicationContext, ON_RV_AD_STARTED)
    }

    override fun onRewardedVideoAdEnded() {
        sendEvent(reactApplicationContext, ON_RV_AD_ENDED)
    }

    override fun onRewardedVideoAdRewarded(placement: Placement) {
        sendEvent(reactApplicationContext, ON_RV_AD_REWARDED, placement.toReadableMap())
    }

    override fun onRewardedVideoAdShowFailed(error: IronSourceError) {
        sendEvent(reactApplicationContext, ON_RV_AD_SHOW_FAILED, error.toReadableMap())
    }

    override fun onRewardedVideoAdClicked(placement: Placement) {
        sendEvent(reactApplicationContext, ON_RV_AD_CLICKED, placement.toReadableMap())
    }

    /** RV Manual Load Listener =================================================================**/
    override fun onRewardedVideoAdReady() {
        sendEvent(reactApplicationContext, ON_RV_AD_READY)
    }

    override fun onRewardedVideoAdLoadFailed(error: IronSourceError) {
        sendEvent(reactApplicationContext, ON_RV_AD_LOAD_FAILED, error.toReadableMap())
    }
}