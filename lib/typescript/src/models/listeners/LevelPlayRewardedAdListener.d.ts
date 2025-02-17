import type { LevelPlayAdError } from "../LevelPlayAdError";
import type { LevelPlayAdInfo } from "../LevelPlayAdInfo";
import type { LevelPlayReward } from "../LevelPlayReward";
/**
 * Interface for handling LevelPlayRewardedAd events
 */
export interface LevelPlayRewardedAdListener {
    /**
     * Invoked each time a rewarded ad was loaded.
     * [adInfo] includes information about the loaded ad
     *
     * Android: onAdLoaded
     *     iOS: didLoadAdWithAdInfo
     */
    onAdLoaded: (adInfo: LevelPlayAdInfo) => void;
    /**
     * Invoked when the rewarded ad loading process has failed.
     * [error] includes information about the error
     *
     * Android: onAdLoadFailed
     *     iOS: didFailToLoadAdWithAdUnitId
     */
    onAdLoadFailed: (error: LevelPlayAdError) => void;
    /**
     * Triggered when ad was reloaded and ad info updated.
     * [adInfo] includes information about the loaded ad
     *
     * Android: onAdInfoChanged
     *     iOS: didChangeAdInfo
     */
    onAdInfoChanged?: (adInfo: LevelPlayAdInfo) => void;
    /**
     * Triggered when an rewarded ad is displayed.
     * [adInfo] includes information about the loaded ad
     *
     * Android: onAdDisplayed
     *     iOS: didDisplayAdWithAdInfo
     */
    onAdDisplayed: (adInfo: LevelPlayAdInfo) => void;
    /**
     * Triggered when an rewarded ad fails to show.
     * [adInfo] includes information about the loaded ad
     * [error] includes information about the error
     *
     * Android: onAdDisplayFailed
     *     iOS: didFailToDisplayAdWithAdInfo
     */
    onAdDisplayFailed?: (error: LevelPlayAdError, adInfo: LevelPlayAdInfo) => void;
    /**
     * Invoked when end user clicks on the rewarded ad.
     * [adInfo] includes information about the loaded ad
     *
     * Android: onAdClicked
     *     iOS: didClickWithAdInfo
     */
    onAdClicked?: (adInfo: LevelPlayAdInfo) => void;
    /**
     * Triggered when an rewarded ad is closed.
     * [adInfo] includes information about the loaded ad
     *
     * Android: onAdClosed
     *     iOS: didCloseAdWithAdInfo
     */
    onAdClosed?: (adInfo: LevelPlayAdInfo) => void;
    /**
     * Triggered when an rewarded ad is rewarded.
     * [adInfo] includes information about the loaded ad
     *
     * Android: onAdRewarded
     *     iOS: didRewardAdWithAdInfo
     */
    onAdRewarded: (reward: LevelPlayReward, adInfo: LevelPlayAdInfo) => void;
}
//# sourceMappingURL=LevelPlayRewardedAdListener.d.ts.map