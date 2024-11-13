import type {IronSourceAdInfo} from "../IronSourceAdInfo";
import type { LevelPlayRewardedVideoBaseListener } from "./LevelPlayRewardedVideoBaseListener";

/**
 * Interface for handling LevelPlayRewardedVideo events
 */
export interface LevelPlayRewardedVideoListener extends LevelPlayRewardedVideoBaseListener {
  /**
   * Indicates that there's an available ad.
   * [adInfo] includes information about the ad that was loaded successfully
   * 
   * Android: onAdAvailable
   *     iOS: hasAvailableAdWithAdInfo
   */
  onAdAvailable?: (adInfo: IronSourceAdInfo) => void;
  /**
   * Indicates that no ads are available to be displayed.
   * 
   * Android: onAdUnavailable
   *     iOS: hasNoAvailableAd
   */
  onAdUnavailable?: () => void;
}