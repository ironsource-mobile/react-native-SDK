import { NativeEventEmitter, NativeModules } from "react-native";
import { levelPlayAdInfoFromMap, levelPlayAdErrorFromMap, levelPlayRewardFromMap } from "./utils";
const {
  LevelPlayMediation
} = NativeModules;
const eventEmitter = new NativeEventEmitter(LevelPlayMediation);
const {
  ON_INTERSTITIAL_AD_LOADED,
  ON_INTERSTITIAL_AD_LOAD_FAILED,
  ON_INTERSTITIAL_AD_INFO_CHANGED,
  ON_INTERSTITIAL_AD_DISPLAYED,
  ON_INTERSTITIAL_AD_DISPLAY_FAILED,
  ON_INTERSTITIAL_AD_CLICKED,
  ON_INTERSTITIAL_AD_CLOSED,
  ON_REWARDED_AD_LOADED,
  ON_REWARDED_AD_LOAD_FAILED,
  ON_REWARDED_AD_INFO_CHANGED,
  ON_REWARDED_AD_DISPLAYED,
  ON_REWARDED_AD_DISPLAY_FAILED,
  ON_REWARDED_AD_CLICKED,
  ON_REWARDED_AD_CLOSED,
  ON_REWARDED_AD_REWARDED
} = LevelPlayMediation.getConstants();

/**
 * Manages instances of LevelPlay interstitial ads.
 */
export class LevelPlayAdObjectManager {
  constructor() {
    this.interstitialAdsMap = new Map();
    this.rewardedAdsMap = new Map();
    this.handleInterstitialMethodCalls();
    this.handleRewardedMethodCalls();
  }

  // Public static method to provide access to the singleton instance
  static getInstance() {
    if (!LevelPlayAdObjectManager.instance) {
      LevelPlayAdObjectManager.instance = new LevelPlayAdObjectManager();
    }
    return LevelPlayAdObjectManager.instance;
  }

  // Interstitial Ad

  handleInterstitialMethodCalls() {
    eventEmitter.removeAllListeners(ON_INTERSTITIAL_AD_LOADED);
    eventEmitter.removeAllListeners(ON_INTERSTITIAL_AD_LOAD_FAILED);
    eventEmitter.removeAllListeners(ON_INTERSTITIAL_AD_INFO_CHANGED);
    eventEmitter.removeAllListeners(ON_INTERSTITIAL_AD_DISPLAYED);
    eventEmitter.removeAllListeners(ON_INTERSTITIAL_AD_DISPLAY_FAILED);
    eventEmitter.removeAllListeners(ON_INTERSTITIAL_AD_CLICKED);
    eventEmitter.removeAllListeners(ON_INTERSTITIAL_AD_CLOSED);
    eventEmitter.addListener(ON_INTERSTITIAL_AD_LOADED, data => {
      const adId = String(data.adId);
      const adInfo = levelPlayAdInfoFromMap(data.adInfo);
      const listener = this.interstitialAdsMap.get(adId)?.getListener();
      listener?.onAdLoaded(adInfo);
    });
    eventEmitter.addListener(ON_INTERSTITIAL_AD_LOAD_FAILED, data => {
      const adId = String(data.adId);
      const error = levelPlayAdErrorFromMap(data.error);
      const listener = this.interstitialAdsMap.get(adId)?.getListener();
      listener?.onAdLoadFailed(error);
    });
    eventEmitter.addListener(ON_INTERSTITIAL_AD_INFO_CHANGED, data => {
      const adId = String(data.adId);
      const adInfo = levelPlayAdInfoFromMap(data.adInfo);
      const listener = this.interstitialAdsMap.get(adId)?.getListener();
      listener?.onAdInfoChanged?.(adInfo);
    });
    eventEmitter.addListener(ON_INTERSTITIAL_AD_DISPLAYED, data => {
      const adId = String(data.adId);
      const adInfo = levelPlayAdInfoFromMap(data.adInfo);
      const listener = this.interstitialAdsMap.get(adId)?.getListener();
      listener?.onAdDisplayed?.(adInfo);
    });
    eventEmitter.addListener(ON_INTERSTITIAL_AD_DISPLAY_FAILED, data => {
      const adId = String(data.adId);
      const error = levelPlayAdErrorFromMap(data.error);
      const adInfo = levelPlayAdInfoFromMap(data.adInfo);
      const listener = this.interstitialAdsMap.get(adId)?.getListener();
      listener?.onAdDisplayFailed?.(error, adInfo);
    });
    eventEmitter.addListener(ON_INTERSTITIAL_AD_CLICKED, data => {
      const adId = String(data.adId);
      const adInfo = levelPlayAdInfoFromMap(data.adInfo);
      const listener = this.interstitialAdsMap.get(adId)?.getListener();
      listener?.onAdClicked?.(adInfo);
    });
    eventEmitter.addListener(ON_INTERSTITIAL_AD_CLOSED, data => {
      const adId = String(data.adId);
      const adInfo = levelPlayAdInfoFromMap(data.adInfo);
      const listener = this.interstitialAdsMap.get(adId)?.getListener();
      listener?.onAdClosed?.(adInfo);
    });
  }
  async createInterstitialAd(interstitialAd) {
    // Call native module to create the ad and get back an adId string
    const adId = await LevelPlayMediation.createInterstitialAd({
      adUnitId: interstitialAd.adUnitId,
      ...(interstitialAd.bidFloor != null && {
        bidFloor: interstitialAd.bidFloor
      })
    });
    // Store the ad instance in the map if it's not already present
    if (!this.interstitialAdsMap.has(adId)) {
      // Assign the returned ID to the ad object
      interstitialAd.adId = adId;
      // Add the ad to the map using its ID as key for future reference
      this.interstitialAdsMap.set(adId, interstitialAd);
    }
    return interstitialAd.adId;
  }
  async loadInterstitialAd(interstitialAd) {
    // If adId is empty or undefined, create the ad first to get an adId
    const adId = !interstitialAd.adId ? await this.createInterstitialAd(interstitialAd) : interstitialAd.adId;

    // Call native module to load the ad using its adId
    await LevelPlayMediation.loadInterstitialAd({
      adId: adId
    });
  }
  async showInterstitialAd(adId, placementName) {
    if (this.interstitialAdsMap.has(adId)) {
      await LevelPlayMediation.showInterstitialAd({
        adId: adId,
        placementName: placementName
      });
    }
  }
  async isInterstitialAdReady(adId) {
    return await LevelPlayMediation.isInterstitialAdReady({
      adId: adId
    });
  }

  // Rewarded Ad

  handleRewardedMethodCalls() {
    eventEmitter.removeAllListeners(ON_REWARDED_AD_LOADED);
    eventEmitter.removeAllListeners(ON_REWARDED_AD_LOAD_FAILED);
    eventEmitter.removeAllListeners(ON_REWARDED_AD_INFO_CHANGED);
    eventEmitter.removeAllListeners(ON_REWARDED_AD_DISPLAYED);
    eventEmitter.removeAllListeners(ON_REWARDED_AD_DISPLAY_FAILED);
    eventEmitter.removeAllListeners(ON_REWARDED_AD_CLICKED);
    eventEmitter.removeAllListeners(ON_REWARDED_AD_CLOSED);
    eventEmitter.removeAllListeners(ON_REWARDED_AD_REWARDED);
    eventEmitter.addListener(ON_REWARDED_AD_LOADED, data => {
      const adId = String(data.adId);
      const adInfo = levelPlayAdInfoFromMap(data.adInfo);
      const listener = this.rewardedAdsMap.get(adId)?.getListener();
      listener?.onAdLoaded(adInfo);
    });
    eventEmitter.addListener(ON_REWARDED_AD_LOAD_FAILED, data => {
      const adId = String(data.adId);
      const error = levelPlayAdErrorFromMap(data.error);
      const listener = this.rewardedAdsMap.get(adId)?.getListener();
      listener?.onAdLoadFailed(error);
    });
    eventEmitter.addListener(ON_REWARDED_AD_INFO_CHANGED, data => {
      const adId = String(data.adId);
      const adInfo = levelPlayAdInfoFromMap(data.adInfo);
      const listener = this.rewardedAdsMap.get(adId)?.getListener();
      listener?.onAdInfoChanged?.(adInfo);
    });
    eventEmitter.addListener(ON_REWARDED_AD_DISPLAYED, data => {
      const adId = String(data.adId);
      const adInfo = levelPlayAdInfoFromMap(data.adInfo);
      const listener = this.rewardedAdsMap.get(adId)?.getListener();
      listener?.onAdDisplayed?.(adInfo);
    });
    eventEmitter.addListener(ON_REWARDED_AD_DISPLAY_FAILED, data => {
      const adId = String(data.adId);
      const error = levelPlayAdErrorFromMap(data.error);
      const adInfo = levelPlayAdInfoFromMap(data.adInfo);
      const listener = this.rewardedAdsMap.get(adId)?.getListener();
      listener?.onAdDisplayFailed?.(error, adInfo);
    });
    eventEmitter.addListener(ON_REWARDED_AD_CLICKED, data => {
      const adId = String(data.adId);
      const adInfo = levelPlayAdInfoFromMap(data.adInfo);
      const listener = this.rewardedAdsMap.get(adId)?.getListener();
      listener?.onAdClicked?.(adInfo);
    });
    eventEmitter.addListener(ON_REWARDED_AD_CLOSED, data => {
      const adId = String(data.adId);
      const adInfo = levelPlayAdInfoFromMap(data.adInfo);
      const listener = this.rewardedAdsMap.get(adId)?.getListener();
      listener?.onAdClosed?.(adInfo);
    });
    eventEmitter.addListener(ON_REWARDED_AD_REWARDED, data => {
      const adId = String(data.adId);
      const reward = levelPlayRewardFromMap(data.reward);
      const adInfo = levelPlayAdInfoFromMap(data.adInfo);
      const listener = this.rewardedAdsMap.get(adId)?.getListener();
      listener?.onAdRewarded?.(reward, adInfo);
    });
  }
  async createRewardedAd(rewardedAd) {
    // Call native module to create the ad and get back an adId string
    const adId = await LevelPlayMediation.createRewardedAd({
      adUnitId: rewardedAd.adUnitId,
      ...(rewardedAd.bidFloor != null && {
        bidFloor: rewardedAd.bidFloor
      })
    });
    // Store the ad instance in the map if it's not already present
    if (!this.rewardedAdsMap.has(adId)) {
      // Assign the returned ID to the ad object
      rewardedAd.adId = adId;
      // Add the ad to the map using its ID as key for future reference
      this.rewardedAdsMap.set(adId, rewardedAd);
    }
    return rewardedAd.adId;
  }
  async loadRewardedAd(rewardedAd) {
    // If adId is empty or undefined, create the ad first to get an adId
    const adId = !rewardedAd.adId ? await this.createRewardedAd(rewardedAd) : rewardedAd.adId;

    // Call native module to load the ad using its adId
    await LevelPlayMediation.loadRewardedAd({
      adId: adId
    });
  }
  async showRewardedAd(adId, placementName) {
    if (this.rewardedAdsMap.has(adId)) {
      await LevelPlayMediation.showRewardedAd({
        adId: adId,
        placementName: placementName
      });
    }
  }
  async isRewardedAdReady(adId) {
    return await LevelPlayMediation.isRewardedAdReady({
      adId: adId
    });
  }

  // Shared Methods

  async removeAd(adId) {
    let wasRemoved = false;
    if (this.interstitialAdsMap && this.interstitialAdsMap.has(adId)) {
      this.interstitialAdsMap.delete(adId);
      wasRemoved = true;
    }
    if (this.rewardedAdsMap && this.rewardedAdsMap.has(adId)) {
      this.rewardedAdsMap.delete(adId);
      wasRemoved = true;
    }
    if (wasRemoved) {
      await LevelPlayMediation.removeAd({
        adId: adId
      });
    }
  }
  async removeAllAds() {
    this.interstitialAdsMap.clear();
    this.rewardedAdsMap.clear();
    await LevelPlayMediation.removeAllAds();
  }
}
//# sourceMappingURL=LevelPlayAdObjectManager.js.map