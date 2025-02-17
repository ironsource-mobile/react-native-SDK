"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelPlayRewardedAd = void 0;
var _reactNative = require("react-native");
var _LevelPlayAdObjectManager = require("../utils/LevelPlayAdObjectManager");
const {
  IronSourceMediation
} = _reactNative.NativeModules;
const levelPlayObjectManager = _LevelPlayAdObjectManager.LevelPlayAdObjectManager.getInstance();

/**
 * Represents a LevelPlay rewarded ad.
 */
class LevelPlayRewardedAd {
  constructor(adUnitId) {
    this.adUnitId = adUnitId;
    this.adObjectId = levelPlayObjectManager.generateAdObjectId();
  }
  setListener(listener) {
    this.listener = listener;
  }
  getListener() {
    return this.listener;
  }

  /**
   * Checks if a specific ad placement is capped.
   * @param placementName - The name of the ad placement to check.
   * @returns A promise that resolves to a boolean indicating whether the placement is capped.
   */
  static async isPlacementCapped(placementName) {
    return await IronSourceMediation.isRewardedAdPlacementCapped({
      placementName: placementName
    });
  }

  /**
   * Loads the rewarded ad.
   * @returns A promise that resolves when the ad is loaded.
   */
  async loadAd() {
    await levelPlayObjectManager.loadRewardedAd(this);
  }

  /**
   * Shows the rewarded ad.
   * @param placementName - The name of the ad placement, or null for the default placement.
   * @returns A promise that resolves when the ad is shown.
   */
  async showAd(placementName = '') {
    await levelPlayObjectManager.showRewardedAd(this.adObjectId, placementName ?? '');
  }

  /**
   * Checks if the rewarded ad is ready to be shown.
   * @returns A promise that resolves to a boolean indicating whether the ad is ready.
   */
  async isAdReady() {
    return await levelPlayObjectManager.isRewardedAdReady(this.adObjectId);
  }

  /**
   * Removes the rewarded ad.
   * @returns A promise that resolves when the ad is removed.
   */
  async remove() {
    await levelPlayObjectManager.removeAd(this.adObjectId);
  }
}
exports.LevelPlayRewardedAd = LevelPlayRewardedAd;
//# sourceMappingURL=LevelPlayRewardedAd.js.map