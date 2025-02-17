import type { IronSourceError } from "../errors";
import type { IronSourceAdInfo } from "../IronSourceAdInfo";
import type { LevelPlayRewardedVideoBaseListener } from "./LevelPlayRewardedVideoBaseListener";
/**
 * Interface for handling LevelPlayRewardedVideo manual events
 *
 * @deprecated Use {@link LevelPlayRewardedAdListener} instead.
 */
export interface LevelPlayRewardedVideoManualListener extends LevelPlayRewardedVideoBaseListener {
    /**
     * Indicates that the Rewarded video ad was loaded successfully.
     * [adInfo] includes information about the loaded ad.
     *
     * Android: onAdReady
     *     iOS: didLoadWithAdInfo
     */
    onAdReady?: (adInfo: IronSourceAdInfo) => void;
    /**
     * Invoked when the rewarded video failed to load.
     * [error] includes information about the error.
     *
     * Android: onAdLoadFailed
     *     iOS: didFailToLoadWithError
     */
    onAdLoadFailed?: (error: IronSourceError) => void;
}
//# sourceMappingURL=LevelPlayRewardedVideoManualListener.d.ts.map