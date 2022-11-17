package com.ironsource.react_native_mediation

import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.ReactApplicationContext
import com.ironsource.mediationsdk.logger.IronSourceError
import com.ironsource.mediationsdk.sdk.OfferwallListener
import com.ironsource.react_native_mediation.IronConstants.ON_OW_AD_CREDITED
import com.ironsource.react_native_mediation.IronConstants.ON_OW_AVAILABILITY_CHANGED
import com.ironsource.react_native_mediation.IronConstants.ON_OW_CLOSED
import com.ironsource.react_native_mediation.IronConstants.ON_OW_CREDITS_FAILED
import com.ironsource.react_native_mediation.IronConstants.ON_OW_OPENED
import com.ironsource.react_native_mediation.IronConstants.ON_OW_SHOW_FAILED
import com.ironsource.react_native_mediation.Utils.Companion.sendEvent

class RCTOfferwallListener(private val reactApplicationContext: ReactApplicationContext) :
    OfferwallListener {

    override fun onOfferwallAvailable(isAvailable: Boolean) {
        val args = Arguments.createMap().apply { putBoolean("isAvailable", isAvailable) }
        sendEvent(reactApplicationContext, ON_OW_AVAILABILITY_CHANGED, args)
    }

    override fun onOfferwallOpened() {
        sendEvent(reactApplicationContext, ON_OW_OPENED)
    }

    override fun onOfferwallShowFailed(error: IronSourceError) {
        sendEvent(reactApplicationContext, ON_OW_SHOW_FAILED, error.toReadableMap())
    }

    override fun onOfferwallAdCredited(
        credits: Int,
        totalCredits: Int,
        totalCreditsFlag: Boolean
    ): Boolean {
        val args = Arguments.createMap().apply {
            putInt("credits", credits)
            putInt("totalCredits", totalCredits)
            putBoolean("totalCreditsFlag", totalCreditsFlag)
        }
        sendEvent(reactApplicationContext, ON_OW_AD_CREDITED, args)
        // always return true.
        return true
    }

    override fun onGetOfferwallCreditsFailed(error: IronSourceError) {
        sendEvent(reactApplicationContext, ON_OW_CREDITS_FAILED, error.toReadableMap())
    }

    override fun onOfferwallClosed() {
        sendEvent(reactApplicationContext, ON_OW_CLOSED)
    }
}