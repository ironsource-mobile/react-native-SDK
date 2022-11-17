package com.ironsource.react_native_mediation

import com.facebook.react.bridge.ReactApplicationContext
import com.ironsource.mediationsdk.logger.IronSourceError
import com.ironsource.mediationsdk.sdk.BannerListener
import com.ironsource.react_native_mediation.Utils.Companion.sendEvent

/**
 * Banner Listener to send JS Events
 */
class RCTBannerListener(
    private val reactAppContext: ReactApplicationContext,
    val onBannerAdLoadFailedCallBack: () -> Unit
) :
    BannerListener {

    override fun onBannerAdLoaded() {
        sendEvent(reactAppContext, IronConstants.ON_BN_AD_LOADED)
    }

    override fun onBannerAdLoadFailed(error: IronSourceError) {
        onBannerAdLoadFailedCallBack()
        sendEvent(reactAppContext, IronConstants.ON_BN_AD_LOAD_FAILED, error.toReadableMap())
    }

    override fun onBannerAdClicked() {
        sendEvent(reactAppContext, IronConstants.ON_BN_AD_CLICKED)
    }

    override fun onBannerAdScreenPresented() {
        // not called by every network
        sendEvent(reactAppContext, IronConstants.ON_BN_AD_SCREEN_PRESENTED)
    }

    override fun onBannerAdScreenDismissed() {
        // not called by every network
        sendEvent(reactAppContext, IronConstants.ON_BN_AD_SCREEN_DISMISSED)
    }

    override fun onBannerAdLeftApplication() {
        sendEvent(reactAppContext, IronConstants.ON_BN_AD_LEFT_APPLICATION)
    }
}