package com.unity3d.reactnative

object LevelPlayConstants {
    /** Error Constants =========================================================================**/
    const val E_ILLEGAL_ARGUMENT = "E_ILLEGAL_ARGUMENT"

    /** Listener Event Constants ================================================================**/
    // LevelPlay Init
    const val ON_INIT_FAILED = "onInitFailed"
    const val ON_INIT_SUCCESS = "onInitSuccess"

    // LevelPlay ImpressionData
    const val ON_IMPRESSION_SUCCESS = "onImpressionSuccess"

    // LevelPlay Interstitial Ad
    const val ON_INTERSTITIAL_AD_LOADED = "onInterstitialAdLoaded"
    const val ON_INTERSTITIAL_AD_LOAD_FAILED = "onInterstitialAdLoadFailed"
    const val ON_INTERSTITIAL_AD_INFO_CHANGED = "onInterstitialAdInfoChanged"
    const val ON_INTERSTITIAL_AD_DISPLAYED = "onInterstitialAdDisplayed"
    const val ON_INTERSTITIAL_AD_DISPLAY_FAILED = "onInterstitialAdDisplayFailed"
    const val ON_INTERSTITIAL_AD_CLICKED = "onInterstitialAdClicked"
    const val ON_INTERSTITIAL_AD_CLOSED = "onInterstitialAdClosed"

    // LevelPlay Rewarded Ad
    const val ON_REWARDED_AD_LOADED = "onRewardedAdLoaded"
    const val ON_REWARDED_AD_LOAD_FAILED = "onRewardedAdLoadFailed"
    const val ON_REWARDED_AD_INFO_CHANGED = "onRewardedAdInfoChanged"
    const val ON_REWARDED_AD_DISPLAYED = "onRewardedAdDisplayed"
    const val ON_REWARDED_AD_DISPLAY_FAILED = "onRewardedAdDisplayFailed"
    const val ON_REWARDED_AD_CLICKED = "onRewardedAdClicked"
    const val ON_REWARDED_AD_CLOSED = "onRewardedAdClosed"
    const val ON_REWARDED_AD_REWARDED = "onRewardedAdRewarded"

    //LevelPlay Events (Fabric compatible - generic events for all ad types)
    const val ON_AD_LOADED_EVENT = "onAdLoadedEvent"
    const val ON_AD_LOAD_FAILED_EVENT = "onAdLoadFailedEvent"
    const val ON_AD_DISPLAYED_EVENT = "onAdDisplayedEvent"
    const val ON_AD_DISPLAY_FAILED_EVENT = "onAdDisplayFailedEvent"
    const val ON_AD_CLICKED_EVENT = "onAdClickedEvent"
    const val ON_AD_COLLAPSED_EVENT = "onAdCollapsedEvent"
    const val ON_AD_EXPANDED_EVENT = "onAdExpandedEvent"
    const val ON_AD_LEFT_APPLICATION_EVENT = "onAdLeftApplicationEvent"
    const val ON_AD_IMPRESSION_EVENT = "onAdImpressionEvent"
    const val ON_AD_ID_GENERATED_EVENT = "onAdIdGeneratedEvent"

  // For JS Event Constants mapping
    fun getEventConstants(): MutableMap<String, Any> = hashMapOf(
        // LevelPlay Init
        "ON_INIT_FAILED" to ON_INIT_FAILED,
        "ON_INIT_SUCCESS" to ON_INIT_SUCCESS,

        // LevelPlay ImpressionData
        "ON_IMPRESSION_SUCCESS" to ON_IMPRESSION_SUCCESS,

        // LevelPlay Interstitial Ad
        "ON_INTERSTITIAL_AD_LOADED" to ON_INTERSTITIAL_AD_LOADED,
        "ON_INTERSTITIAL_AD_LOAD_FAILED" to ON_INTERSTITIAL_AD_LOAD_FAILED,
        "ON_INTERSTITIAL_AD_INFO_CHANGED" to ON_INTERSTITIAL_AD_INFO_CHANGED,
        "ON_INTERSTITIAL_AD_DISPLAYED" to ON_INTERSTITIAL_AD_DISPLAYED,
        "ON_INTERSTITIAL_AD_DISPLAY_FAILED" to ON_INTERSTITIAL_AD_DISPLAY_FAILED,
        "ON_INTERSTITIAL_AD_CLICKED" to ON_INTERSTITIAL_AD_CLICKED,
        "ON_INTERSTITIAL_AD_CLOSED" to ON_INTERSTITIAL_AD_CLOSED,

        // LevelPlay Rewarded Ad
        "ON_REWARDED_AD_LOADED" to ON_REWARDED_AD_LOADED,
        "ON_REWARDED_AD_LOAD_FAILED" to ON_REWARDED_AD_LOAD_FAILED,
        "ON_REWARDED_AD_INFO_CHANGED" to ON_REWARDED_AD_INFO_CHANGED,
        "ON_REWARDED_AD_DISPLAYED" to ON_REWARDED_AD_DISPLAYED,
        "ON_REWARDED_AD_DISPLAY_FAILED" to ON_REWARDED_AD_DISPLAY_FAILED,
        "ON_REWARDED_AD_CLICKED" to ON_REWARDED_AD_CLICKED,
        "ON_REWARDED_AD_CLOSED" to ON_REWARDED_AD_CLOSED,
        "ON_REWARDED_AD_REWARDED" to ON_REWARDED_AD_REWARDED
    )
}
