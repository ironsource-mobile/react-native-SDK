package com.ironsource.react_native_mediation

import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.ReactApplicationContext
import com.ironsource.mediationsdk.adunit.adapter.utility.AdInfo
import com.ironsource.mediationsdk.logger.IronSourceError
import com.ironsource.mediationsdk.model.Placement
import com.ironsource.mediationsdk.sdk.LevelPlayRewardedVideoListener
import com.ironsource.mediationsdk.sdk.LevelPlayRewardedVideoManualListener
import com.ironsource.react_native_mediation.IronConstants.LP_MANUAL_RV_ON_AD_LOAD_FAILED
import com.ironsource.react_native_mediation.IronConstants.LP_MANUAL_RV_ON_AD_READY
import com.ironsource.react_native_mediation.IronConstants.LP_RV_ON_AD_AVAILABLE
import com.ironsource.react_native_mediation.IronConstants.LP_RV_ON_AD_CLICKED
import com.ironsource.react_native_mediation.IronConstants.LP_RV_ON_AD_CLOSED
import com.ironsource.react_native_mediation.IronConstants.LP_RV_ON_AD_OPENED
import com.ironsource.react_native_mediation.IronConstants.LP_RV_ON_AD_REWARDED
import com.ironsource.react_native_mediation.IronConstants.LP_RV_ON_AD_SHOW_FAILED
import com.ironsource.react_native_mediation.Utils.Companion.sendEvent

/**
 * New RV Listener from 7.2.3
 * TODO: Ask if the AdInfo could be null
 */
class RCTLevelPlayRVListener(private val reactApplicationContext: ReactApplicationContext) :
    LevelPlayRewardedVideoListener, LevelPlayRewardedVideoManualListener {

    override fun onAdAvailable(adInfo: AdInfo) {
        sendEvent(reactApplicationContext, LP_RV_ON_AD_AVAILABLE, adInfo.toReadableMap())
    }

    override fun onAdUnavailable() {
        sendEvent(reactApplicationContext, IronConstants.LP_RV_ON_AD_UNAVAILABLE)
    }

    override fun onAdOpened(adInfo: AdInfo) {
        sendEvent(reactApplicationContext, LP_RV_ON_AD_OPENED, adInfo.toReadableMap())
    }

    override fun onAdClosed(adInfo: AdInfo) {
        sendEvent(reactApplicationContext, LP_RV_ON_AD_CLOSED, adInfo.toReadableMap())
    }

    override fun onAdRewarded(placement: Placement, adInfo: AdInfo) {
        val map = Arguments.createMap()
        map.putMap("placement", placement.toReadableMap())
        map.putMap("adInfo", adInfo.toReadableMap())
        sendEvent(reactApplicationContext, LP_RV_ON_AD_REWARDED, map)
    }

    override fun onAdShowFailed(error: IronSourceError, adInfo: AdInfo) {
        val map = Arguments.createMap()
        map.putMap("error", error.toReadableMap())
        map.putMap("adInfo", adInfo.toReadableMap())
        sendEvent(reactApplicationContext, LP_RV_ON_AD_SHOW_FAILED, map)
    }

    override fun onAdClicked(placement: Placement, adInfo: AdInfo) {
        val map = Arguments.createMap()
        map.putMap("placement", placement.toReadableMap())
        map.putMap("adInfo", adInfo.toReadableMap())
        sendEvent(reactApplicationContext, LP_RV_ON_AD_CLICKED, map)
    }

    /** Manual RV Events ========================================================================**/
    override fun onAdReady(adInfo: AdInfo) {
        sendEvent(reactApplicationContext, LP_MANUAL_RV_ON_AD_READY, adInfo.toReadableMap())
    }

    override fun onAdLoadFailed(error: IronSourceError) {
        sendEvent(reactApplicationContext, LP_MANUAL_RV_ON_AD_LOAD_FAILED, error.toReadableMap())
    }
}