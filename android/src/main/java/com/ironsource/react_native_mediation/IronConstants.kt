package com.ironsource.react_native_mediation

object IronConstants {
    /** Error Constants =========================================================================**/
    const val E_ACTIVITY_IS_NULL = "E_ACTIVITY_IS_NULL"
    const val E_ILLEGAL_ARGUMENT = "E_ILLEGAL_ARGUMENT"
    const val E_UNEXPECTED = "E_UNEXPECTED"

    /** Listener Event Constants ================================================================**/
    // RV Listener
    const val ON_RV_AD_OPENED = "onRewardedVideoAdOpened"
    const val ON_RV_AD_CLOSED = "onRewardedVideoAdClosed"
    const val ON_RV_AVAILABILITY_CHANGED = "onRewardedVideoAvailabilityChanged"
    const val ON_RV_AD_REWARDED = "onRewardedVideoAdRewarded"
    const val ON_RV_AD_SHOW_FAILED = "onRewardedVideoAdShowFailed"
    const val ON_RV_AD_CLICKED = "onRewardedVideoAdClicked"
    const val ON_RV_AD_STARTED = "onRewardedVideoAdStarted"
    const val ON_RV_AD_ENDED = "onRewardedVideoAdEnded"

    // RV Manual Load Listener
    const val ON_RV_AD_READY = "onRewardedVideoAdReady"
    const val ON_RV_AD_LOAD_FAILED = "onRewardedVideoAdLoadFailed"

    // IS Listener
    const val ON_IS_AD_READY = "onInterstitialAdReady"
    const val ON_IS_AD_LOAD_FAILED = "onInterstitialAdLoadFailed"
    const val ON_IS_AD_OPENED = "onInterstitialAdOpened"
    const val ON_IS_AD_CLOSED = "onInterstitialAdClosed"
    const val ON_IS_AD_SHOW_SUCCEEDED = "onInterstitialAdShowSucceeded"
    const val ON_IS_AD_SHOW_FAILED = "onInterstitialAdShowFailed"
    const val ON_IS_AD_CLICKED = "onInterstitialAdClicked"

    // BN Listener
    const val ON_BN_AD_LOADED = "onBannerAdLoaded"
    const val ON_BN_AD_LOAD_FAILED = "onBannerAdLoadFailed"
    const val ON_BN_AD_CLICKED = "onBannerAdClicked"
    const val ON_BN_AD_SCREEN_PRESENTED = "onBannerAdScreenPresented"
    const val ON_BN_AD_SCREEN_DISMISSED = "onBannerAdScreenDismissed"
    const val ON_BN_AD_LEFT_APPLICATION = "onBannerAdLeftApplication"

    // OW Listener
    const val ON_OW_AVAILABILITY_CHANGED = "onOfferwallAvailabilityChanged"
    const val ON_OW_OPENED = "onOfferwallOpened"
    const val ON_OW_SHOW_FAILED = "onOfferwallShowFailed"
    const val ON_OW_AD_CREDITED = "onOfferwallAdCredited"
    const val ON_OW_CREDITS_FAILED = "onGetOfferwallCreditsFailed"
    const val ON_OW_CLOSED = "onOfferwallClosed"

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

    // For JS Event Constants mapping
    fun getEventConstants(): MutableMap<String, Any> = hashMapOf(
        // RV Listener Events
        "ON_RV_AD_OPENED" to ON_RV_AD_OPENED,
        "ON_RV_AD_CLOSED" to ON_RV_AD_CLOSED,
        "ON_RV_AVAILABILITY_CHANGED" to ON_RV_AVAILABILITY_CHANGED,
        "ON_RV_AD_REWARDED" to ON_RV_AD_REWARDED,
        "ON_RV_AD_SHOW_FAILED" to ON_RV_AD_SHOW_FAILED,
        "ON_RV_AD_CLICKED" to ON_RV_AD_CLICKED,
        "ON_RV_AD_STARTED" to ON_RV_AD_STARTED,
        "ON_RV_AD_ENDED" to ON_RV_AD_ENDED,

        // RV Manual Load Listener Events
        "ON_RV_AD_READY" to ON_RV_AD_READY,
        "ON_RV_AD_LOAD_FAILED" to ON_RV_AD_LOAD_FAILED,

        // IS Listener Events
        "ON_IS_AD_READY" to ON_IS_AD_READY,
        "ON_IS_AD_LOAD_FAILED" to ON_IS_AD_LOAD_FAILED,
        "ON_IS_AD_OPENED" to ON_IS_AD_OPENED,
        "ON_IS_AD_CLOSED" to ON_IS_AD_CLOSED,
        "ON_IS_AD_SHOW_SUCCEEDED" to ON_IS_AD_SHOW_SUCCEEDED,
        "ON_IS_AD_SHOW_FAILED" to ON_IS_AD_SHOW_FAILED,
        "ON_IS_AD_CLICKED" to ON_IS_AD_CLICKED,

        // BN Listener Events
        "ON_BN_AD_LOADED" to ON_BN_AD_LOADED,
        "ON_BN_AD_LOAD_FAILED" to ON_BN_AD_LOAD_FAILED,
        "ON_BN_AD_CLICKED" to ON_BN_AD_CLICKED,
        "ON_BN_AD_SCREEN_PRESENTED" to ON_BN_AD_SCREEN_PRESENTED,
        "ON_BN_AD_SCREEN_DISMISSED" to ON_BN_AD_SCREEN_DISMISSED,
        "ON_BN_AD_LEFT_APPLICATION" to ON_BN_AD_LEFT_APPLICATION,

        // OW Listener Events
        "ON_OW_AVAILABILITY_CHANGED" to ON_OW_AVAILABILITY_CHANGED,
        "ON_OW_OPENED" to ON_OW_OPENED,
        "ON_OW_SHOW_FAILED" to ON_OW_SHOW_FAILED,
        "ON_OW_AD_CREDITED" to ON_OW_AD_CREDITED,
        "ON_OW_CREDITS_FAILED" to ON_OW_CREDITS_FAILED,
        "ON_OW_CLOSED" to ON_OW_CLOSED,

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
    )
}