package com.ironsource.react_native_mediation

import com.facebook.react.bridge.ReactApplicationContext
import com.ironsource.mediationsdk.adunit.adapter.utility.AdInfo
import com.ironsource.mediationsdk.logger.IronSourceError
import com.ironsource.mediationsdk.sdk.LevelPlayBannerListener
import com.ironsource.react_native_mediation.LevelPlayUtils.Companion.sendEvent

/**
 * New IS Listener from 7.2.3
 * TODO: Ask if the AdInfo could be null
 */
class RCTLevelPlayBNListener(
    private val reactAppContext: ReactApplicationContext,
    val onBannerAdLoadFailedCallBack: () -> Unit
) :
    LevelPlayBannerListener {

    override fun onAdLoaded(adInfo: AdInfo) {
        sendEvent(reactAppContext, IronConstants.LP_BN_ON_AD_LOADED, adInfo.toReadableMap())
    }

    override fun onAdLoadFailed(error: IronSourceError) {
        onBannerAdLoadFailedCallBack()
        sendEvent(reactAppContext, IronConstants.LP_BN_ON_AD_LOAD_FAILED, error.toReadableMap())
    }

    override fun onAdClicked(adInfo: AdInfo) {
        sendEvent(reactAppContext, IronConstants.LP_BN_ON_AD_CLICKED, adInfo.toReadableMap())
    }

    override fun onAdScreenPresented(adInfo: AdInfo) {
        sendEvent(
            reactAppContext,
            IronConstants.LP_BN_ON_AD_SCREEN_PRESENTED,
            adInfo.toReadableMap()
        )
    }

    override fun onAdScreenDismissed(adInfo: AdInfo) {
        sendEvent(
            reactAppContext,
            IronConstants.LP_BN_ON_AD_SCREEN_DISMISSED,
            adInfo.toReadableMap()
        )
    }

    override fun onAdLeftApplication(adInfo: AdInfo) {
        sendEvent(
            reactAppContext,
            IronConstants.LP_BN_ON_AD_LEFT_APPLICATION,
            adInfo.toReadableMap()
        )
    }
}
