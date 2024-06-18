package com.ironsource.react_native_mediation

object IronConstants {
    /** Error Constants =========================================================================**/
    const val E_ACTIVITY_IS_NULL = "E_ACTIVITY_IS_NULL"
    const val E_ILLEGAL_ARGUMENT = "E_ILLEGAL_ARGUMENT"
    const val E_UNEXPECTED = "E_UNEXPECTED"

    /** Listener Event Constants ================================================================**/
    // ARM ImpressionDataListener
    const val ON_IMPRESSION_SUCCESS = "onImpressionSuccess"

    // InitializationListener
    const val ON_INITIALIZATION_COMPLETE = "onInitializationComplete"

    /** LevelPlayListener Event Constants =======================================================**/
    private const val LEVEL_PLAY_PREFIX = "LevelPlay"

    // RV
    private const val RV_PREFIX = "RV"
    const val LP_RV_ON_AD_AVAILABLE = "$LEVEL_PLAY_PREFIX:$RV_PREFIX:onAdAvailable"
    const val LP_RV_ON_AD_UNAVAILABLE = "$LEVEL_PLAY_PREFIX:$RV_PREFIX:onAdUnavailable"
    const val LP_RV_ON_AD_OPENED = "$LEVEL_PLAY_PREFIX:$RV_PREFIX:onAdOpened"
    const val LP_RV_ON_AD_CLOSED = "$LEVEL_PLAY_PREFIX:$RV_PREFIX:onAdClosed"
    const val LP_RV_ON_AD_REWARDED = "$LEVEL_PLAY_PREFIX:$RV_PREFIX:onAdRewarded"
    const val LP_RV_ON_AD_SHOW_FAILED = "$LEVEL_PLAY_PREFIX:$RV_PREFIX:onAdShowFailed"
    const val LP_RV_ON_AD_CLICKED = "$LEVEL_PLAY_PREFIX:$RV_PREFIX:onAdClicked"

    // MANUAL RV
    private const val MANUAL_RV_PREFIX = "ManualRV"
    const val LP_MANUAL_RV_ON_AD_READY = "$LEVEL_PLAY_PREFIX:$MANUAL_RV_PREFIX:onAdReady"
    const val LP_MANUAL_RV_ON_AD_LOAD_FAILED =
        "$LEVEL_PLAY_PREFIX:$MANUAL_RV_PREFIX:onAdLoadFailed"

    // IS
    private const val IS_PREFIX = "IS"
    const val LP_IS_ON_AD_READY = "$LEVEL_PLAY_PREFIX:$IS_PREFIX:onAdReady"
    const val LP_IS_ON_AD_LOAD_FAILED = "$LEVEL_PLAY_PREFIX:$IS_PREFIX:onAdLoadFailed"
    const val LP_IS_ON_AD_OPENED = "$LEVEL_PLAY_PREFIX:$IS_PREFIX:onAdOpened"
    const val LP_IS_ON_AD_CLOSED = "$LEVEL_PLAY_PREFIX:$IS_PREFIX:onAdClosed"
    const val LP_IS_ON_AD_SHOW_FAILED = "$LEVEL_PLAY_PREFIX:$IS_PREFIX:onAdShowFailed"
    const val LP_IS_ON_AD_CLICKED = "$LEVEL_PLAY_PREFIX:$IS_PREFIX:onAdClicked"
    const val LP_IS_ON_AD_SHOW_SUCCEEDED = "$LEVEL_PLAY_PREFIX:$IS_PREFIX:onAdShowSucceeded"

    // BN
    private const val BN_PREFIX = "BN"
    const val LP_BN_ON_AD_LOADED = "$LEVEL_PLAY_PREFIX:$BN_PREFIX:onAdLoaded"
    const val LP_BN_ON_AD_LOAD_FAILED = "$LEVEL_PLAY_PREFIX:$BN_PREFIX:onAdLoadFailed"
    const val LP_BN_ON_AD_CLICKED = "$LEVEL_PLAY_PREFIX:$BN_PREFIX:onAdClicked"
    const val LP_BN_ON_AD_SCREEN_PRESENTED = "$LEVEL_PLAY_PREFIX:$BN_PREFIX:onAdScreenPresented"
    const val LP_BN_ON_AD_SCREEN_DISMISSED = "$LEVEL_PLAY_PREFIX:$BN_PREFIX:onAdScreenDismissed"
    const val LP_BN_ON_AD_LEFT_APPLICATION = "$LEVEL_PLAY_PREFIX:$BN_PREFIX:onAdLeftApplication"

    // Native Ad
    private const val NATIVE_AD_PREFIX = "NATIVE_AD"
    const val LP_NATIVE_AD_ON_AD_LOADED = "$LEVEL_PLAY_PREFIX:$NATIVE_AD_PREFIX:onAdLoadedEvent"
    const val LP_NATIVE_AD_ON_AD_LOAD_FAILED = "$LEVEL_PLAY_PREFIX:$NATIVE_AD_PREFIX:onAdLoadFailedEvent"
    const val LP_NATIVE_AD_ON_AD_CLICKED = "$LEVEL_PLAY_PREFIX:$NATIVE_AD_PREFIX:onAdClickedEvent"
    const val LP_NATIVE_AD_ON_AD_IMPRESSION = "$LEVEL_PLAY_PREFIX:$NATIVE_AD_PREFIX:onAdImpressionEvent"

    // For JS Event Constants mapping
    fun getEventConstants(): MutableMap<String, Any> = hashMapOf(
        // ARM ImpressionDataListener Events
        "ON_IMPRESSION_SUCCESS" to ON_IMPRESSION_SUCCESS,

        // InitializationListener Events
        "ON_INITIALIZATION_COMPLETE" to ON_INITIALIZATION_COMPLETE,

        // LevelPlayListener Events
        // LP RV
        "LP_RV_ON_AD_AVAILABLE" to LP_RV_ON_AD_AVAILABLE,
        "LP_RV_ON_AD_UNAVAILABLE" to LP_RV_ON_AD_UNAVAILABLE,
        "LP_RV_ON_AD_OPENED" to LP_RV_ON_AD_OPENED,
        "LP_RV_ON_AD_CLOSED" to LP_RV_ON_AD_CLOSED,
        "LP_RV_ON_AD_REWARDED" to LP_RV_ON_AD_REWARDED,
        "LP_RV_ON_AD_SHOW_FAILED" to LP_RV_ON_AD_SHOW_FAILED,
        "LP_RV_ON_AD_CLICKED" to LP_RV_ON_AD_CLICKED,
        "LP_MANUAL_RV_ON_AD_READY" to LP_MANUAL_RV_ON_AD_READY,
        "LP_MANUAL_RV_ON_AD_LOAD_FAILED" to LP_MANUAL_RV_ON_AD_LOAD_FAILED,

        // LP IS
        "LP_IS_ON_AD_READY" to LP_IS_ON_AD_READY,
        "LP_IS_ON_AD_LOAD_FAILED" to LP_IS_ON_AD_LOAD_FAILED,
        "LP_IS_ON_AD_OPENED" to LP_IS_ON_AD_OPENED,
        "LP_IS_ON_AD_CLOSED" to LP_IS_ON_AD_CLOSED,
        "LP_IS_ON_AD_SHOW_FAILED" to LP_IS_ON_AD_SHOW_FAILED,
        "LP_IS_ON_AD_CLICKED" to LP_IS_ON_AD_CLICKED,
        "LP_IS_ON_AD_SHOW_SUCCEEDED" to LP_IS_ON_AD_SHOW_SUCCEEDED,

        // LP BN
        "LP_BN_ON_AD_LOADED" to LP_BN_ON_AD_LOADED,
        "LP_BN_ON_AD_LOAD_FAILED" to LP_BN_ON_AD_LOAD_FAILED,
        "LP_BN_ON_AD_CLICKED" to LP_BN_ON_AD_CLICKED,
        "LP_BN_ON_AD_SCREEN_PRESENTED" to LP_BN_ON_AD_SCREEN_PRESENTED,
        "LP_BN_ON_AD_SCREEN_DISMISSED" to LP_BN_ON_AD_SCREEN_DISMISSED,
        "LP_BN_ON_AD_LEFT_APPLICATION" to LP_BN_ON_AD_LEFT_APPLICATION,


        // Native Ad Listener Events
        "LP_NATIVE_AD_ON_AD_LOADED" to LP_NATIVE_AD_ON_AD_LOADED,
        "LP_NATIVE_AD_ON_AD_LOAD_FAILED" to LP_NATIVE_AD_ON_AD_LOAD_FAILED,
        "LP_NATIVE_AD_ON_AD_CLICKED" to LP_NATIVE_AD_ON_AD_CLICKED,
        "LP_NATIVE_AD_ON_AD_IMPRESSION" to LP_NATIVE_AD_ON_AD_IMPRESSION,
    )
}
