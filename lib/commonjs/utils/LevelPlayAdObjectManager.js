"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelPlayAdObjectManager = void 0;
var _reactNative = require("react-native");
var _utils = require("./utils");
var _NativeLevelPlayMediation = _interopRequireDefault(require("../specs/NativeLevelPlayMediation"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const eventEmitter = new _reactNative.NativeEventEmitter(_NativeLevelPlayMediation.default);
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
} = _NativeLevelPlayMediation.default.getConstants();

/**
 * Manages instances of LevelPlay interstitial ads.
 */
class LevelPlayAdObjectManager {
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
      const adInfo = (0, _utils.levelPlayAdInfoFromMap)(data.adInfo);
      const listener = this.interstitialAdsMap.get(adId)?.getListener();
      listener?.onAdLoaded(adInfo);
    });
    eventEmitter.addListener(ON_INTERSTITIAL_AD_LOAD_FAILED, data => {
      const adId = String(data.adId);
      const error = (0, _utils.levelPlayAdErrorFromMap)(data.error);
      const listener = this.interstitialAdsMap.get(adId)?.getListener();
      listener?.onAdLoadFailed(error);
    });
    eventEmitter.addListener(ON_INTERSTITIAL_AD_INFO_CHANGED, data => {
      const adId = String(data.adId);
      const adInfo = (0, _utils.levelPlayAdInfoFromMap)(data.adInfo);
      const listener = this.interstitialAdsMap.get(adId)?.getListener();
      listener?.onAdInfoChanged?.(adInfo);
    });
    eventEmitter.addListener(ON_INTERSTITIAL_AD_DISPLAYED, data => {
      const adId = String(data.adId);
      const adInfo = (0, _utils.levelPlayAdInfoFromMap)(data.adInfo);
      const listener = this.interstitialAdsMap.get(adId)?.getListener();
      listener?.onAdDisplayed?.(adInfo);
    });
    eventEmitter.addListener(ON_INTERSTITIAL_AD_DISPLAY_FAILED, data => {
      const adId = String(data.adId);
      const error = (0, _utils.levelPlayAdErrorFromMap)(data.error);
      const adInfo = (0, _utils.levelPlayAdInfoFromMap)(data.adInfo);
      const listener = this.interstitialAdsMap.get(adId)?.getListener();
      listener?.onAdDisplayFailed?.(error, adInfo);
    });
    eventEmitter.addListener(ON_INTERSTITIAL_AD_CLICKED, data => {
      const adId = String(data.adId);
      const adInfo = (0, _utils.levelPlayAdInfoFromMap)(data.adInfo);
      const listener = this.interstitialAdsMap.get(adId)?.getListener();
      listener?.onAdClicked?.(adInfo);
    });
    eventEmitter.addListener(ON_INTERSTITIAL_AD_CLOSED, data => {
      const adId = String(data.adId);
      const adInfo = (0, _utils.levelPlayAdInfoFromMap)(data.adInfo);
      const listener = this.interstitialAdsMap.get(adId)?.getListener();
      listener?.onAdClosed?.(adInfo);
    });
  }
  async createInterstitialAd(interstitialAd) {
    // Call native module to create the ad and get back an adId string
    // Pass -1 for bidFloor if not set (old architecture compatibility)
    const adId = await _NativeLevelPlayMediation.default.createInterstitialAd(interstitialAd.adUnitId, interstitialAd.bidFloor ?? -1);
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
    await _NativeLevelPlayMediation.default.loadInterstitialAd(adId);
  }
  async showInterstitialAd(adId, placementName) {
    if (this.interstitialAdsMap.has(adId)) {
      await _NativeLevelPlayMediation.default.showInterstitialAd(adId, placementName);
    }
  }
  async isInterstitialAdReady(adId) {
    return await _NativeLevelPlayMediation.default.isInterstitialAdReady(adId);
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
      const adInfo = (0, _utils.levelPlayAdInfoFromMap)(data.adInfo);
      const listener = this.rewardedAdsMap.get(adId)?.getListener();
      listener?.onAdLoaded(adInfo);
    });
    eventEmitter.addListener(ON_REWARDED_AD_LOAD_FAILED, data => {
      const adId = String(data.adId);
      const error = (0, _utils.levelPlayAdErrorFromMap)(data.error);
      const listener = this.rewardedAdsMap.get(adId)?.getListener();
      listener?.onAdLoadFailed(error);
    });
    eventEmitter.addListener(ON_REWARDED_AD_INFO_CHANGED, data => {
      const adId = String(data.adId);
      const adInfo = (0, _utils.levelPlayAdInfoFromMap)(data.adInfo);
      const listener = this.rewardedAdsMap.get(adId)?.getListener();
      listener?.onAdInfoChanged?.(adInfo);
    });
    eventEmitter.addListener(ON_REWARDED_AD_DISPLAYED, data => {
      const adId = String(data.adId);
      const adInfo = (0, _utils.levelPlayAdInfoFromMap)(data.adInfo);
      const listener = this.rewardedAdsMap.get(adId)?.getListener();
      listener?.onAdDisplayed?.(adInfo);
    });
    eventEmitter.addListener(ON_REWARDED_AD_DISPLAY_FAILED, data => {
      const adId = String(data.adId);
      const error = (0, _utils.levelPlayAdErrorFromMap)(data.error);
      const adInfo = (0, _utils.levelPlayAdInfoFromMap)(data.adInfo);
      const listener = this.rewardedAdsMap.get(adId)?.getListener();
      listener?.onAdDisplayFailed?.(error, adInfo);
    });
    eventEmitter.addListener(ON_REWARDED_AD_CLICKED, data => {
      const adId = String(data.adId);
      const adInfo = (0, _utils.levelPlayAdInfoFromMap)(data.adInfo);
      const listener = this.rewardedAdsMap.get(adId)?.getListener();
      listener?.onAdClicked?.(adInfo);
    });
    eventEmitter.addListener(ON_REWARDED_AD_CLOSED, data => {
      const adId = String(data.adId);
      const adInfo = (0, _utils.levelPlayAdInfoFromMap)(data.adInfo);
      const listener = this.rewardedAdsMap.get(adId)?.getListener();
      listener?.onAdClosed?.(adInfo);
    });
    eventEmitter.addListener(ON_REWARDED_AD_REWARDED, data => {
      const adId = String(data.adId);
      const reward = (0, _utils.levelPlayRewardFromMap)(data.reward);
      const adInfo = (0, _utils.levelPlayAdInfoFromMap)(data.adInfo);
      const listener = this.rewardedAdsMap.get(adId)?.getListener();
      listener?.onAdRewarded?.(reward, adInfo);
    });
  }
  async createRewardedAd(rewardedAd) {
    // Call native module to create the ad and get back an adId string
    // Pass -1 for bidFloor if not set (old architecture compatibility)
    const adId = await _NativeLevelPlayMediation.default.createRewardedAd(rewardedAd.adUnitId, rewardedAd.bidFloor ?? -1);
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
    await _NativeLevelPlayMediation.default.loadRewardedAd(adId);
  }
  async showRewardedAd(adId, placementName) {
    if (this.rewardedAdsMap.has(adId)) {
      await _NativeLevelPlayMediation.default.showRewardedAd(adId, placementName);
    }
  }
  async isRewardedAdReady(adId) {
    return await _NativeLevelPlayMediation.default.isRewardedAdReady(adId);
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
      await _NativeLevelPlayMediation.default.removeAd(adId);
    }
  }
  async removeAllAds() {
    this.interstitialAdsMap.clear();
    this.rewardedAdsMap.clear();
    await _NativeLevelPlayMediation.default.removeAllAds();
  }
}
exports.LevelPlayAdObjectManager = LevelPlayAdObjectManager;
//# sourceMappingURL=LevelPlayAdObjectManager.js.map