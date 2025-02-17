"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelPlayAdObjectManager = void 0;
var _reactNative = require("react-native");
var _utils = require("./utils");
const {
  IronSourceMediation
} = _reactNative.NativeModules;
const eventEmitter = new _reactNative.NativeEventEmitter(IronSourceMediation);
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
} = IronSourceMediation.getConstants();

/**
 * Manages instances of LevelPlay interstitial ads.
 */
class LevelPlayAdObjectManager {
  constructor() {
    this.interstitialAdsMap = new Map();
    this.rewardedAdsMap = new Map();
    this.adObjectId = 0;
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
      const adObjectId = Number(data.adObjectId);
      const adInfo = (0, _utils.levelPlayAdInfoFromMap)(data.adInfo);
      const listener = this.interstitialAdsMap.get(adObjectId)?.getListener();
      listener?.onAdLoaded(adInfo);
    });
    eventEmitter.addListener(ON_INTERSTITIAL_AD_LOAD_FAILED, data => {
      const adObjectId = Number(data.adObjectId);
      const error = (0, _utils.levelPlayAdErrorFromMap)(data.error);
      const listener = this.interstitialAdsMap.get(adObjectId)?.getListener();
      listener?.onAdLoadFailed(error);
    });
    eventEmitter.addListener(ON_INTERSTITIAL_AD_INFO_CHANGED, data => {
      const adObjectId = Number(data.adObjectId);
      const adInfo = (0, _utils.levelPlayAdInfoFromMap)(data.adInfo);
      const listener = this.interstitialAdsMap.get(adObjectId)?.getListener();
      listener?.onAdInfoChanged?.(adInfo);
    });
    eventEmitter.addListener(ON_INTERSTITIAL_AD_DISPLAYED, data => {
      const adObjectId = Number(data.adObjectId);
      const adInfo = (0, _utils.levelPlayAdInfoFromMap)(data.adInfo);
      const listener = this.interstitialAdsMap.get(adObjectId)?.getListener();
      listener?.onAdDisplayed?.(adInfo);
    });
    eventEmitter.addListener(ON_INTERSTITIAL_AD_DISPLAY_FAILED, data => {
      const adObjectId = Number(data.adObjectId);
      const error = (0, _utils.levelPlayAdErrorFromMap)(data.error);
      const adInfo = (0, _utils.levelPlayAdInfoFromMap)(data.adInfo);
      const listener = this.interstitialAdsMap.get(adObjectId)?.getListener();
      listener?.onAdDisplayFailed?.(error, adInfo);
    });
    eventEmitter.addListener(ON_INTERSTITIAL_AD_CLICKED, data => {
      const adObjectId = Number(data.adObjectId);
      const adInfo = (0, _utils.levelPlayAdInfoFromMap)(data.adInfo);
      const listener = this.interstitialAdsMap.get(adObjectId)?.getListener();
      listener?.onAdClicked?.(adInfo);
    });
    eventEmitter.addListener(ON_INTERSTITIAL_AD_CLOSED, data => {
      const adObjectId = Number(data.adObjectId);
      const adInfo = (0, _utils.levelPlayAdInfoFromMap)(data.adInfo);
      const listener = this.interstitialAdsMap.get(adObjectId)?.getListener();
      listener?.onAdClosed?.(adInfo);
    });
  }
  async loadInterstitialAd(interstitialAd) {
    let adObjectId = interstitialAd.adObjectId;
    let adUnitId = interstitialAd.adUnitId;
    if (!this.interstitialAdsMap.has(adObjectId)) {
      this.interstitialAdsMap.set(adObjectId, interstitialAd);
    }
    await IronSourceMediation.loadInterstitialAd({
      adObjectId: adObjectId,
      adUnitId: adUnitId
    });
  }
  async showInterstitialAd(adObjectId, placementName) {
    if (this.interstitialAdsMap.has(adObjectId)) {
      await IronSourceMediation.showInterstitialAd({
        adObjectId: adObjectId,
        placementName: placementName
      });
    }
  }
  async isInterstitialAdReady(adObjectId) {
    return await IronSourceMediation.isInterstitialAdReady({
      adObjectId: adObjectId
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
      const adObjectId = Number(data.adObjectId);
      const adInfo = (0, _utils.levelPlayAdInfoFromMap)(data.adInfo);
      const listener = this.rewardedAdsMap.get(adObjectId)?.getListener();
      listener?.onAdLoaded(adInfo);
    });
    eventEmitter.addListener(ON_REWARDED_AD_LOAD_FAILED, data => {
      const adObjectId = Number(data.adObjectId);
      const error = (0, _utils.levelPlayAdErrorFromMap)(data.error);
      const listener = this.rewardedAdsMap.get(adObjectId)?.getListener();
      listener?.onAdLoadFailed(error);
    });
    eventEmitter.addListener(ON_REWARDED_AD_INFO_CHANGED, data => {
      const adObjectId = Number(data.adObjectId);
      const adInfo = (0, _utils.levelPlayAdInfoFromMap)(data.adInfo);
      const listener = this.rewardedAdsMap.get(adObjectId)?.getListener();
      listener?.onAdInfoChanged?.(adInfo);
    });
    eventEmitter.addListener(ON_REWARDED_AD_DISPLAYED, data => {
      const adObjectId = Number(data.adObjectId);
      const adInfo = (0, _utils.levelPlayAdInfoFromMap)(data.adInfo);
      const listener = this.rewardedAdsMap.get(adObjectId)?.getListener();
      listener?.onAdDisplayed?.(adInfo);
    });
    eventEmitter.addListener(ON_REWARDED_AD_DISPLAY_FAILED, data => {
      const adObjectId = Number(data.adObjectId);
      const error = (0, _utils.levelPlayAdErrorFromMap)(data.error);
      const adInfo = (0, _utils.levelPlayAdInfoFromMap)(data.adInfo);
      const listener = this.rewardedAdsMap.get(adObjectId)?.getListener();
      listener?.onAdDisplayFailed?.(error, adInfo);
    });
    eventEmitter.addListener(ON_REWARDED_AD_CLICKED, data => {
      const adObjectId = Number(data.adObjectId);
      const adInfo = (0, _utils.levelPlayAdInfoFromMap)(data.adInfo);
      const listener = this.rewardedAdsMap.get(adObjectId)?.getListener();
      listener?.onAdClicked?.(adInfo);
    });
    eventEmitter.addListener(ON_REWARDED_AD_CLOSED, data => {
      const adObjectId = Number(data.adObjectId);
      const adInfo = (0, _utils.levelPlayAdInfoFromMap)(data.adInfo);
      const listener = this.rewardedAdsMap.get(adObjectId)?.getListener();
      listener?.onAdClosed?.(adInfo);
    });
    eventEmitter.addListener(ON_REWARDED_AD_REWARDED, data => {
      const adObjectId = Number(data.adObjectId);
      const reward = (0, _utils.levelPlayRewardFromMap)(data.reward);
      const adInfo = (0, _utils.levelPlayAdInfoFromMap)(data.adInfo);
      const listener = this.rewardedAdsMap.get(adObjectId)?.getListener();
      listener?.onAdRewarded?.(reward, adInfo);
    });
  }
  async loadRewardedAd(rewardedAd) {
    let adObjectId = rewardedAd.adObjectId;
    let adUnitId = rewardedAd.adUnitId;
    if (!this.rewardedAdsMap.has(adObjectId)) {
      this.rewardedAdsMap.set(adObjectId, rewardedAd);
    }
    await IronSourceMediation.loadRewardedAd({
      adObjectId: adObjectId,
      adUnitId: adUnitId
    });
  }
  async showRewardedAd(adObjectId, placementName) {
    if (this.rewardedAdsMap.has(adObjectId)) {
      await IronSourceMediation.showRewardedAd({
        adObjectId: adObjectId,
        placementName: placementName
      });
    }
  }
  async isRewardedAdReady(adObjectId) {
    return await IronSourceMediation.isRewardedAdReady({
      adObjectId: adObjectId
    });
  }

  // Shared Methods

  async removeAd(adObjectId) {
    let wasRemoved = false;
    if (this.interstitialAdsMap && this.interstitialAdsMap.has(adObjectId)) {
      this.interstitialAdsMap.delete(adObjectId);
      wasRemoved = true;
    }
    if (this.rewardedAdsMap && this.rewardedAdsMap.has(adObjectId)) {
      this.rewardedAdsMap.delete(adObjectId);
      wasRemoved = true;
    }
    if (wasRemoved) {
      await IronSourceMediation.removeAd({
        adObjectId: adObjectId
      });
    }
  }
  async removeAllAds() {
    this.interstitialAdsMap.clear();
    this.rewardedAdsMap.clear();
    await IronSourceMediation.removAllAds();
  }
  generateAdObjectId() {
    return this.adObjectId++;
  }
}
exports.LevelPlayAdObjectManager = LevelPlayAdObjectManager;
//# sourceMappingURL=LevelPlayAdObjectManager.js.map