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
  private val interstitialAdsMap = hashMapOf<Int, LevelPlayInterstitialAd>()
  private val rewardedAdsMap = hashMapOf<Int, LevelPlayRewardedAd>()

  // Interstitial Ad Methods
  fun loadInterstitialAd(adObjectId: Int, adUnitId: String) {
    // Check if an interstitial ad already exists for this adObjectId
    val existingAd = interstitialAdsMap[adObjectId]

    if (existingAd != null) {
      // Ad exists, load the existing ad
      existingAd.loadAd()
      return
    }

    // Ad doesn't exist, create a new one
    val interstitialAd = LevelPlayInterstitialAd(adUnitId)
    interstitialAd.setListener(createInterstitialAdListener(adObjectId))

    // Store the new ad instance in the map and load it
    interstitialAdsMap[adObjectId] = interstitialAd
    interstitialAd.loadAd()
  }

  fun showInterstitialAd(adObjectId: Int, placementName: String?) {
    reactApplicationContext.currentActivity?.let { activity ->
      interstitialAdsMap[adObjectId]?.showAd(activity, placementName)
    }
  }


  fun isInterstitialAdReady(adObjectId: Int): Boolean {
    return interstitialAdsMap[adObjectId]?.isAdReady() ?: false
  }

  private fun createInterstitialAdListener(adObjectId: Int): LevelPlayInterstitialAdListener {
    return object : LevelPlayInterstitialAdListener {
      override fun onAdLoaded(adInfo: LevelPlayAdInfo) {
        val args = Arguments.createMap()
        args.putInt("adObjectId", adObjectId)
        args.putMap("adInfo", adInfo.toReadableMap())
        sendEvent(reactApplicationContext, ON_INTERSTITIAL_AD_LOADED, args)
      }

      override fun onAdLoadFailed(error: LevelPlayAdError) {
        val args = Arguments.createMap()
        args.putInt("adObjectId", adObjectId)
        args.putMap("error", error.toReadableMap())
        sendEvent(reactApplicationContext, ON_INTERSTITIAL_AD_LOAD_FAILED, args)
      }

      override fun onAdInfoChanged(adInfo: LevelPlayAdInfo) {
        val args = Arguments.createMap()
        args.putInt("adObjectId", adObjectId)
        args.putMap("adInfo", adInfo.toReadableMap())
        sendEvent(reactApplicationContext, ON_INTERSTITIAL_AD_INFO_CHANGED, args)
      }

      override fun onAdDisplayed(adInfo: LevelPlayAdInfo) {
        val args = Arguments.createMap()
        args.putInt("adObjectId", adObjectId)
        args.putMap("adInfo", adInfo.toReadableMap())
        sendEvent(reactApplicationContext, ON_INTERSTITIAL_AD_DISPLAYED, args)
      }

      override fun onAdDisplayFailed(error: LevelPlayAdError, adInfo: LevelPlayAdInfo) {
        val args = Arguments.createMap()
        args.putInt("adObjectId", adObjectId)
        args.putMap("error", error.toReadableMap())
        args.putMap("adInfo", adInfo.toReadableMap())
        sendEvent(reactApplicationContext, ON_INTERSTITIAL_AD_DISPLAY_FAILED, args)
      }

      override fun onAdClicked(adInfo: LevelPlayAdInfo) {
        val args = Arguments.createMap()
        args.putInt("adObjectId", adObjectId)
        args.putMap("adInfo", adInfo.toReadableMap())
        sendEvent(reactApplicationContext, ON_INTERSTITIAL_AD_CLICKED, args)
      }

      override fun onAdClosed(adInfo: LevelPlayAdInfo) {
        val args = Arguments.createMap()
        args.putInt("adObjectId", adObjectId)
        args.putMap("adInfo", adInfo.toReadableMap())
        sendEvent(reactApplicationContext, ON_INTERSTITIAL_AD_CLOSED, args)
      }
    }
  }

  // Rewarded Ad Methods
  fun loadRewardedAd(adObjectId: Int, adUnitId: String) {
    // Check if an rewarded ad already exists for this adObjectId
    val existingAd = rewardedAdsMap[adObjectId]

    if (existingAd != null) {
      // Ad exists, load the existing ad
      existingAd.loadAd()
      return
    }

    // Ad doesn't exist, create a new one
    val rewardedAd = LevelPlayRewardedAd(adUnitId)
    rewardedAd.setListener(createRewardedAdListener(adObjectId))

    // Store the new ad instance in the map and load it
    rewardedAdsMap[adObjectId] = rewardedAd
    rewardedAd.loadAd()
  }

  fun showRewardedAd(adObjectId: Int, placementName: String?) {
    reactApplicationContext.currentActivity?.let { activity ->
      rewardedAdsMap[adObjectId]?.showAd(activity, placementName)
    }
  }


  fun isRewardedAdReady(adObjectId: Int): Boolean {
    return rewardedAdsMap[adObjectId]?.isAdReady() ?: false
  }

  private fun createRewardedAdListener(adObjectId: Int): LevelPlayRewardedAdListener {
    return object : LevelPlayRewardedAdListener {
      override fun onAdLoaded(adInfo: LevelPlayAdInfo) {
        val args = Arguments.createMap()
        args.putInt("adObjectId", adObjectId)
        args.putMap("adInfo", adInfo.toReadableMap())
        sendEvent(reactApplicationContext, ON_REWARDED_AD_LOADED, args)
      }

      override fun onAdLoadFailed(error: LevelPlayAdError) {
        val args = Arguments.createMap()
        args.putInt("adObjectId", adObjectId)
        args.putMap("error", error.toReadableMap())
        sendEvent(reactApplicationContext, ON_REWARDED_AD_LOAD_FAILED, args)
      }

      override fun onAdInfoChanged(adInfo: LevelPlayAdInfo) {
        val args = Arguments.createMap()
        args.putInt("adObjectId", adObjectId)
        args.putMap("adInfo", adInfo.toReadableMap())
        sendEvent(reactApplicationContext, ON_REWARDED_AD_INFO_CHANGED, args)
      }

      override fun onAdDisplayed(adInfo: LevelPlayAdInfo) {
        val args = Arguments.createMap()
        args.putInt("adObjectId", adObjectId)
        args.putMap("adInfo", adInfo.toReadableMap())
        sendEvent(reactApplicationContext, ON_REWARDED_AD_DISPLAYED, args)
      }

      override fun onAdDisplayFailed(error: LevelPlayAdError, adInfo: LevelPlayAdInfo) {
        val args = Arguments.createMap()
        args.putInt("adObjectId", adObjectId)
        args.putMap("error", error.toReadableMap())
        args.putMap("adInfo", adInfo.toReadableMap())
        sendEvent(reactApplicationContext, ON_REWARDED_AD_DISPLAY_FAILED, args)
      }

      override fun onAdClicked(adInfo: LevelPlayAdInfo) {
        val args = Arguments.createMap()
        args.putInt("adObjectId", adObjectId)
        args.putMap("adInfo", adInfo.toReadableMap())
        sendEvent(reactApplicationContext, ON_REWARDED_AD_CLICKED, args)
      }

      override fun onAdClosed(adInfo: LevelPlayAdInfo) {
        val args = Arguments.createMap()
        args.putInt("adObjectId", adObjectId)
        args.putMap("adInfo", adInfo.toReadableMap())
        sendEvent(reactApplicationContext, ON_REWARDED_AD_CLOSED, args)
      }

      override fun onAdRewarded(reward: LevelPlayReward, adInfo: LevelPlayAdInfo) {
        val args = Arguments.createMap()
        args.putInt("adObjectId", adObjectId)
        args.putMap("adInfo", adInfo.toReadableMap())
        args.putMap("reward", reward.toReadableMap())
        sendEvent(reactApplicationContext, ON_REWARDED_AD_REWARDED, args)
      }
    }
  }

  // Shared Methods

  fun removeAd(adObjectId: Int) {
    if (interstitialAdsMap.containsKey(adObjectId))
      interstitialAdsMap.remove(adObjectId)
    if (rewardedAdsMap.containsKey(adObjectId))
      rewardedAdsMap.remove(adObjectId)
  }

  fun removeAllAds() {
    interstitialAdsMap.clear()
    rewardedAdsMap.clear()
  }
}
