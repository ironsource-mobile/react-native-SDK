import { LevelPlayAdObjectManager } from '../utils/LevelPlayAdObjectManager'
import type { LevelPlayInterstitialAdListener } from './listeners/LevelPlayInterstitialAdListener'
import NativeLevelPlayMediation from '../specs/NativeLevelPlayMediation'

const levelPlayObjectManager = LevelPlayAdObjectManager.getInstance()

/**
 * Represents a LevelPlay interstitial ad.
 */
export class LevelPlayInterstitialAd {
  adUnitId: string
  adId: string = ''
  listener: LevelPlayInterstitialAdListener | null | undefined
  bidFloor: number | null | undefined

  constructor(adUnitId: string) {
    this.adUnitId = adUnitId
  }

  setListener(listener: LevelPlayInterstitialAdListener): void {
    this.listener = listener
  }

  getListener(): LevelPlayInterstitialAdListener | null | undefined {
    return this.listener
  }

  setBidFloor(bidFloor: number): void {
    this.bidFloor = bidFloor
  }

  getBidFloor(): number | null | undefined {
    return this.bidFloor
  }

  /**
   * Checks if a specific ad placement is capped.
   * @param placementName - The name of the ad placement to check.
   * @returns A promise that resolves to a boolean indicating whether the placement is capped.
   */
  static async isPlacementCapped(placementName: string): Promise<boolean> {
    return await NativeLevelPlayMediation.isInterstitialAdPlacementCapped(
      placementName
    )
  }

  /**
   * Loads the interstitial ad.
   * @returns A promise that resolves when the ad is loaded.
   */
  async loadAd(): Promise<void> {
    await levelPlayObjectManager.loadInterstitialAd(this)
  }

  /**
   * Shows the interstitial ad.
   * @param placementName - The name of the ad placement, or null for the default placement.
   * @returns A promise that resolves when the ad is shown.
   */
  async showAd(placementName: string | null = ''): Promise<void> {
    await levelPlayObjectManager.showInterstitialAd(
      this.adId,
      placementName ?? ''
    )
  }

  /**
   * Checks if the interstitial ad is ready to be shown.
   * @returns A promise that resolves to a boolean indicating whether the ad is ready.
   */
  async isAdReady(): Promise<boolean> {
    return await levelPlayObjectManager.isInterstitialAdReady(this.adId)
  }

  /**
   * Removes the interstitial ad.
   * @returns A promise that resolves when the ad is removed.
   */
  async remove(): Promise<void> {
    await levelPlayObjectManager.removeAd(this.adId)
  }
}
