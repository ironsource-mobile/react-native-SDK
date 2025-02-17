import type {IronSourceAdInfo} from "../IronSourceAdInfo";
import type { IronSourceRVPlacement } from "../IronSourceRVPlacement";
import type {IronSourceError} from "../errors";

/**
 * Interface for handling LevelPlayRewardedVideo base events
 * 
 * @deprecated Use {@link LevelPlayRewardedAdListener} instead.
 */
export interface LevelPlayRewardedVideoBaseListener {
    /**
     * The Rewarded Video ad view has opened.
     * [adInfo] includes information about the loaded ad
     * 
     * Android: onAdOpened
     *     iOS: didOpenWithAdInfo
     */
    onAdOpened?: (adInfo: IronSourceAdInfo) => void;
    /**
     * The Rewarded Video ad view is about to be closed.
     * [adInfo] includes information about the loaded ad
     * 
     * Android: onAdClosed
     *     iOS: didCloseWithAdInfo
     */
    onAdClosed?: (adInfo: IronSourceAdInfo) => void;
    /**
     * The user completed watching the video, and should be rewarded.
     * [placement] placement will include the reward data.
     * [adInfo] includes information about the loaded ad
     * 
     * Android: onAdRewarded
     *     iOS: didReceiveRewardForPlacement
     */
    onAdRewarded?: (placement: IronSourceRVPlacement, adInfo: IronSourceAdInfo) => void; 
    /**
     * The rewarded video ad failed to show.
     * [error] includes information about the error
     * [adInfo] includes information about the loaded ad
     * 
     * Android: onAdShowFailed
     *     iOS: didFailToShowWithError
     */
    onAdShowFailed?: (error: IronSourceError, adInfo: IronSourceAdInfo) => void;    
    /**
     * Invoked when the video ad was clicked.
     * This callback is not supported by all networks, and we recommend using it
     * only if it's supported by all networks you included in your build.
     * [placement] placement will include the reward data.
     * [adInfo] includes information about the loaded ad
     * 
     * Android: onAdClicked
     *     iOS: didClick
     */
    onAdClicked?: (placement: IronSourceRVPlacement, adInfo: IronSourceAdInfo) => void;
}
