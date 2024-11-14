import { NativeModules } from 'react-native';
import { LevelPlayAdObjectManager } from '../utils/LevelPlayAdObjectManager';
const {
  IronSourceMediation
} = NativeModules;
const levelPlayObjectManager = LevelPlayAdObjectManager.getInstance();

/**
 * Represents a LevelPlay interstitial ad.
 */
export class LevelPlayInterstitialAd {
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
    return await IronSourceMediation.isInterstitialAdPlacementCapped({
      placementName: placementName
    });
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
    await levelPlayObjectManager.showInterstitialAd(this.adObjectId, placementName ?? '');
  }

  /**
   * Checks if the interstitial ad is ready to be shown.
   * @returns A promise that resolves to a boolean indicating whether the ad is ready.
   */
  async isAdReady() {
    return await levelPlayObjectManager.isInterstitialAdReady(this.adObjectId);
  }

  /**
   * Removes the interstitial ad.
   * @returns A promise that resolves when the ad is removed.
   */
  async remove() {
    await levelPlayObjectManager.removeAd(this.adObjectId);
  }
}
//# sourceMappingURL=LevelPlayInterstitialAd.js.map