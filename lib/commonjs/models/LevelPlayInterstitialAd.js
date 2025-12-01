"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelPlayInterstitialAd = void 0;
var _LevelPlayAdObjectManager = require("../utils/LevelPlayAdObjectManager");
var _NativeLevelPlayMediation = _interopRequireDefault(require("../specs/NativeLevelPlayMediation"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const levelPlayObjectManager = _LevelPlayAdObjectManager.LevelPlayAdObjectManager.getInstance();

/**
 * Represents a LevelPlay interstitial ad.
 */
class LevelPlayInterstitialAd {
  adId = '';
  constructor(adUnitId) {
    this.adUnitId = adUnitId;
  }
  setListener(listener) {
    this.listener = listener;
  }
  getListener() {
    return this.listener;
  }
  setBidFloor(bidFloor) {
    this.bidFloor = bidFloor;
  }
  getBidFloor() {
    return this.bidFloor;
  }

  /**
   * Checks if a specific ad placement is capped.
   * @param placementName - The name of the ad placement to check.
   * @returns A promise that resolves to a boolean indicating whether the placement is capped.
   */
  static async isPlacementCapped(placementName) {
    return await _NativeLevelPlayMediation.default.isInterstitialAdPlacementCapped(placementName);
  }

  /**
   * Loads the interstitial ad.
   * @returns A promise that resolves when the ad is loaded.
   */
  async loadAd() {
    await levelPlayObjectManager.loadInterstitialAd(this);
  }

  /**
   * Shows the interstitial ad.
   * @param placementName - The name of the ad placement, or null for the default placement.
   * @returns A promise that resolves when the ad is shown.
   */
  async showAd(placementName = '') {
    await levelPlayObjectManager.showInterstitialAd(this.adId, placementName ?? '');
  }

  /**
   * Checks if the interstitial ad is ready to be shown.
   * @returns A promise that resolves to a boolean indicating whether the ad is ready.
   */
  async isAdReady() {
    return await levelPlayObjectManager.isInterstitialAdReady(this.adId);
  }

  /**
   * Removes the interstitial ad.
   * @returns A promise that resolves when the ad is removed.
   */
  async remove() {
    await levelPlayObjectManager.removeAd(this.adId);
  }
}
exports.LevelPlayInterstitialAd = LevelPlayInterstitialAd;
//# sourceMappingURL=LevelPlayInterstitialAd.js.map