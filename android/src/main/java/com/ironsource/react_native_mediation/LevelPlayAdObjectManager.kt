package com.ironsource.react_native_mediation

import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.ReactApplicationContext
import com.ironsource.react_native_mediation.IronConstants.ON_INTERSTITIAL_AD_CLICKED
import com.ironsource.react_native_mediation.IronConstants.ON_INTERSTITIAL_AD_CLOSED
import com.ironsource.react_native_mediation.IronConstants.ON_INTERSTITIAL_AD_DISPLAYED
import com.ironsource.react_native_mediation.IronConstants.ON_INTERSTITIAL_AD_DISPLAY_FAILED
import com.ironsource.react_native_mediation.IronConstants.ON_INTERSTITIAL_AD_INFO_CHANGED
import com.ironsource.react_native_mediation.IronConstants.ON_INTERSTITIAL_AD_LOADED
import com.ironsource.react_native_mediation.IronConstants.ON_INTERSTITIAL_AD_LOAD_FAILED
import com.ironsource.react_native_mediation.IronConstants.ON_REWARDED_AD_CLICKED
import com.ironsource.react_native_mediation.IronConstants.ON_REWARDED_AD_CLOSED
import com.ironsource.react_native_mediation.IronConstants.ON_REWARDED_AD_DISPLAYED
import com.ironsource.react_native_mediation.IronConstants.ON_REWARDED_AD_DISPLAY_FAILED
import com.ironsource.react_native_mediation.IronConstants.ON_REWARDED_AD_INFO_CHANGED
import com.ironsource.react_native_mediation.IronConstants.ON_REWARDED_AD_LOADED
import com.ironsource.react_native_mediation.IronConstants.ON_REWARDED_AD_LOAD_FAILED
import com.ironsource.react_native_mediation.IronConstants.ON_REWARDED_AD_REWARDED
import com.ironsource.react_native_mediation.LevelPlayUtils.Companion.sendEvent
import com.unity3d.mediation.LevelPlayAdError
import com.unity3d.mediation.LevelPlayAdInfo
import com.unity3d.mediation.interstitial.LevelPlayInterstitialAd
import com.unity3d.mediation.interstitial.LevelPlayInterstitialAdListener
import com.unity3d.mediation.rewarded.LevelPlayReward
import com.unity3d.mediation.rewarded.LevelPlayRewardedAd
import com.unity3d.mediation.rewarded.LevelPlayRewardedAdListener

/**
 * Manages instances of LevelPlay interstitial ads.
 */
class LevelPlayAdObjectManager(
  private val reactApplicationContext: ReactApplicationContext
) {
  private val interstitialAdsMap = hashMapOf<String, LevelPlayInterstitialAd>()
  private val rewardedAdsMap = hashMapOf<String, LevelPlayRewardedAd>()

  // Interstitial Ad Methods
  fun createInterstitialAd(adUnitId: String): String {
    // Create the interstitial ad
    val interstitialAd = LevelPlayInterstitialAd(adUnitId)
    // Set the listener for the interstitial ad
    interstitialAd.setListener(createInterstitialAdListener(interstitialAd.adId))
    // Store the interstitial ad in the map
    interstitialAdsMap[interstitialAd.adId] = interstitialAd
    // Return the unique adId for the created ad object
    return interstitialAd.adId
  }

  fun loadInterstitialAd(adId: String) {
    // Retrieve the interstitial ad from the map and load it if found
    interstitialAdsMap[adId]?.loadAd()
  }

  fun showInterstitialAd(adId: String, placementName: String?) {

    reactApplicationContext.currentActivity?.let { activity ->
      interstitialAdsMap[adId]?.showAd(activity, placementName)
    }
  }

  fun isInterstitialAdReady(adId: String): Boolean {
    return interstitialAdsMap[adId]?.isAdReady() ?: false
  }

  private fun createInterstitialAdListener(adId: String): LevelPlayInterstitialAdListener {
    return object : LevelPlayInterstitialAdListener {
      override fun onAdLoaded(adInfo: LevelPlayAdInfo) {
        val args = Arguments.createMap()
        args.putString("adId", adId)
        args.putMap("adInfo", adInfo.toReadableMap())
        sendEvent(reactApplicationContext, ON_INTERSTITIAL_AD_LOADED, args)
      }

      override fun onAdLoadFailed(error: LevelPlayAdError) {
        val args = Arguments.createMap()
        args.putString("adId", adId)
        args.putMap("error", error.toReadableMap())
        sendEvent(reactApplicationContext, ON_INTERSTITIAL_AD_LOAD_FAILED, args)
      }

      override fun onAdInfoChanged(adInfo: LevelPlayAdInfo) {
        val args = Arguments.createMap()
        args.putString("adId", adId)
        args.putMap("adInfo", adInfo.toReadableMap())
        sendEvent(reactApplicationContext, ON_INTERSTITIAL_AD_INFO_CHANGED, args)
      }

      override fun onAdDisplayed(adInfo: LevelPlayAdInfo) {
        val args = Arguments.createMap()
        args.putString("adId", adId)
        args.putMap("adInfo", adInfo.toReadableMap())
        sendEvent(reactApplicationContext, ON_INTERSTITIAL_AD_DISPLAYED, args)
      }

      override fun onAdDisplayFailed(error: LevelPlayAdError, adInfo: LevelPlayAdInfo) {
        val args = Arguments.createMap()
        args.putString("adId", adId)
        args.putMap("error", error.toReadableMap())
        args.putMap("adInfo", adInfo.toReadableMap())
        sendEvent(reactApplicationContext, ON_INTERSTITIAL_AD_DISPLAY_FAILED, args)
      }

      override fun onAdClicked(adInfo: LevelPlayAdInfo) {
        val args = Arguments.createMap()
        args.putString("adId", adId)
        args.putMap("adInfo", adInfo.toReadableMap())
        sendEvent(reactApplicationContext, ON_INTERSTITIAL_AD_CLICKED, args)
      }

      override fun onAdClosed(adInfo: LevelPlayAdInfo) {
        val args = Arguments.createMap()
        args.putString("adId", adId)
        args.putMap("adInfo", adInfo.toReadableMap())
        sendEvent(reactApplicationContext, ON_INTERSTITIAL_AD_CLOSED, args)
      }
    }
  }

  // Rewarded Ad Methods
  fun createRewardedAd(adUnitId: String): String {
    // Create the rewarded ad
    val rewardedAd = LevelPlayRewardedAd(adUnitId)
    // Set the listener for the rewarded ad
    rewardedAd.setListener(createRewardedAdListener(rewardedAd.adId))
    // Store the rewarded ad in the map
    rewardedAdsMap[rewardedAd.adId] = rewardedAd
    // Return the unique adId for the created ad object
    return rewardedAd.adId
  }

  fun loadRewardedAd(adId: String) {
    // Retrieve the rewarded ad from the map and load it if found
    rewardedAdsMap[adId]?.loadAd()
  }

  fun showRewardedAd(adId: String, placementName: String?) {
    reactApplicationContext.currentActivity?.let { activity ->
      rewardedAdsMap[adId]?.showAd(activity, placementName)
    }
  }


  fun isRewardedAdReady(adId: String): Boolean {
    return rewardedAdsMap[adId]?.isAdReady() ?: false
  }

  private fun createRewardedAdListener(adId: String): LevelPlayRewardedAdListener {
    return object : LevelPlayRewardedAdListener {
      override fun onAdLoaded(adInfo: LevelPlayAdInfo) {
        val args = Arguments.createMap()
        args.putString("adId",adId)
        args.putMap("adInfo", adInfo.toReadableMap())
        sendEvent(reactApplicationContext, ON_REWARDED_AD_LOADED, args)
      }

      override fun onAdLoadFailed(error: LevelPlayAdError) {
        val args = Arguments.createMap()
        args.putString("adId",adId)
        args.putMap("error", error.toReadableMap())
        sendEvent(reactApplicationContext, ON_REWARDED_AD_LOAD_FAILED, args)
      }

      override fun onAdInfoChanged(adInfo: LevelPlayAdInfo) {
        val args = Arguments.createMap()
        args.putString("adId",adId)
        args.putMap("adInfo", adInfo.toReadableMap())
        sendEvent(reactApplicationContext, ON_REWARDED_AD_INFO_CHANGED, args)
      }

      override fun onAdDisplayed(adInfo: LevelPlayAdInfo) {
        val args = Arguments.createMap()
        args.putString("adId",adId)
        args.putMap("adInfo", adInfo.toReadableMap())
        sendEvent(reactApplicationContext, ON_REWARDED_AD_DISPLAYED, args)
      }

      override fun onAdDisplayFailed(error: LevelPlayAdError, adInfo: LevelPlayAdInfo) {
        val args = Arguments.createMap()
        args.putString("adId",adId)
        args.putMap("error", error.toReadableMap())
        args.putMap("adInfo", adInfo.toReadableMap())
        sendEvent(reactApplicationContext, ON_REWARDED_AD_DISPLAY_FAILED, args)
      }

      override fun onAdClicked(adInfo: LevelPlayAdInfo) {
        val args = Arguments.createMap()
        args.putString("adId",adId)
        args.putMap("adInfo", adInfo.toReadableMap())
        sendEvent(reactApplicationContext, ON_REWARDED_AD_CLICKED, args)
      }

      override fun onAdClosed(adInfo: LevelPlayAdInfo) {
        val args = Arguments.createMap()
        args.putString("adId",adId)
        args.putMap("adInfo", adInfo.toReadableMap())
        sendEvent(reactApplicationContext, ON_REWARDED_AD_CLOSED, args)
      }

      override fun onAdRewarded(reward: LevelPlayReward, adInfo: LevelPlayAdInfo) {
        val args = Arguments.createMap()
        args.putString("adId",adId)
        args.putMap("adInfo", adInfo.toReadableMap())
        args.putMap("reward", reward.toReadableMap())
        sendEvent(reactApplicationContext, ON_REWARDED_AD_REWARDED, args)
      }
    }
  }

  // Shared Methods

  fun removeAd(adId: String) {
    if (interstitialAdsMap.containsKey(adId))
      interstitialAdsMap.remove(adId)
    if (rewardedAdsMap.containsKey(adId))
      rewardedAdsMap.remove(adId)
  }

  fun removeAllAds() {
    interstitialAdsMap.clear()
    rewardedAdsMap.clear()
  }
}
