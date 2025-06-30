import { NativeModules } from 'react-native';
import { LevelPlayAdObjectManager } from '../utils/LevelPlayAdObjectManager';
const {
  IronSourceMediation
} = NativeModules;
const levelPlayObjectManager = LevelPlayAdObjectManager.getInstance();

/**
 * Represents a LevelPlay rewarded ad.
 */
export class LevelPlayRewardedAd {
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
    await levelPlayObjectManager.showRewardedAd(this.adId, placementName ?? '');
  }

  /**
   * Checks if the rewarded ad is ready to be shown.
   * @returns A promise that resolves to a boolean indicating whether the ad is ready.
   */
  async isAdReady() {
    return await levelPlayObjectManager.isRewardedAdReady(this.adId);
  }

  /**
   * Removes the rewarded ad.
   * @returns A promise that resolves when the ad is removed.
   */
  async remove() {
    await levelPlayObjectManager.removeAd(this.adId);
  }
}
//# sourceMappingURL=LevelPlayRewardedAd.js.map