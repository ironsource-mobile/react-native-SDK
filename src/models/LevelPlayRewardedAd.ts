import { NativeModules } from 'react-native'
import { LevelPlayAdObjectManager } from '../utils/LevelPlayAdObjectManager'
import type { LevelPlayRewardedAdListener } from './listeners/LevelPlayRewardedAdListener'

const { IronSourceMediation } = NativeModules
const levelPlayObjectManager = LevelPlayAdObjectManager.getInstance()

/**
 * Represents a LevelPlay rewarded ad.
 */
export class LevelPlayRewardedAd {
  adUnitId: string
  adObjectId: number
  listener: LevelPlayRewardedAdListener | null | undefined

  constructor(adUnitId: string) {
    this.adUnitId = adUnitId
    this.adObjectId = levelPlayObjectManager.generateAdObjectId()
  }

  setListener(listener: LevelPlayRewardedAdListener): void {
    this.listener = listener
  }

  getListener(): LevelPlayRewardedAdListener | null | undefined {
    return this.listener
  }

  /**
   * Checks if a specific ad placement is capped.
   * @param placementName - The name of the ad placement to check.
   * @returns A promise that resolves to a boolean indicating whether the placement is capped.
   */
  static async isPlacementCapped(placementName: string): Promise<boolean> {
    return await IronSourceMediation.isRewardedAdPlacementCapped({
      placementName: placementName,
    })
  }

  /**
   * Loads the rewarded ad.
   * @returns A promise that resolves when the ad is loaded.
   */
  async loadAd(): Promise<void> {
    await levelPlayObjectManager.loadRewardedAd(this)
  }

  /**
   * Shows the rewarded ad.
   * @param placementName - The name of the ad placement, or null for the default placement.
   * @returns A promise that resolves when the ad is shown.
   */
  async showAd(placementName: string | null = ''): Promise<void> {
    await levelPlayObjectManager.showRewardedAd(this.adObjectId, placementName ?? '')
  }

  /**
   * Checks if the rewarded ad is ready to be shown.
   * @returns A promise that resolves to a boolean indicating whether the ad is ready.
   */
  async isAdReady(): Promise<boolean> {
    return await levelPlayObjectManager.isRewardedAdReady(this.adObjectId)
  }

  /**
   * Removes the rewarded ad.
   * @returns A promise that resolves when the ad is removed.
   */
  async remove(): Promise<void> {
    await levelPlayObjectManager.removeAd(this.adObjectId)
  }
}
