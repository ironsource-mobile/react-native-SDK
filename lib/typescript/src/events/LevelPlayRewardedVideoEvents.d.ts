import type { IronSourceError, IronSourceRVPlacement, IronSourceAdInfo } from '../models';
/**
 * @deprecated This module [LevelPlayRewardedVideoEvents] is deprecated and will be removed in future releases.
 * Use IronSource.setLevelPlayRewardedVideoListener or IronSource.setLevelPlayRewardedVideoManualListener instead.
 *
 * Migration example:
 *
 * Before:
 *
 * import { LevelPlayInterstitialEvents } from 'ironsource-mediation';
 *
 * LevelPlayRewardedVideoEvents.onAdRewarded.setListener(yourListener);
 * // Rest of listeners...
 *
 * // If Manual load
 * IronSource.setLevelPlayRewardedVideoManualListener();
 *
 *
 * After:
 *
 * import { IronSource } from 'ironsource-mediation';
 *
 * // For Rewarded Video
 * const listener: LevelPlayRewardedVideoListener = {
 *  onAdAvailable: (adInfo: IronSourceAdInfo) => {},
 *  onAdUnAvailable: () => {},
 *  onAdOpened: (adInfo: IronSourceAdInfo) => {},
 *  onAdClosed: (adInfo: IronSourceAdInfo) => {},
 *  onAdRewarded: (placement: IronSourceRVPlacement, adInfo: IronSourceAdInfo) => {},
 *  onAdShowFailed: (error: IronSourceError, adInfo: IronSourceAdInfo) => {},
 *  onAdClicked: (placement: IronSourceRVPlacement, adInfo: IronSourceAdInfo) => {},
 * };
 * IronSource.setLevelPlayRewardedVideoManualListener(listener);
 *
 * // For Manual Rewarded Video
 * const listener: LevelPlayRewardedVideoManualListener = {
 *  onAdOpened: (adInfo: IronSourceAdInfo) => {},
 *  onAdClosed: (adInfo: IronSourceAdInfo) => {},
 *  onAdRewarded: (placement: IronSourceRVPlacement, adInfo: IronSourceAdInfo) => {},
 *  onAdShowFailed: (error: IronSourceError, adInfo: IronSourceAdInfo) => {},
 *  onAdClicked: (placement: IronSourceRVPlacement, adInfo: IronSourceAdInfo) => {},
 *  onAdReady: (adInfo: IronSourceAdInfo) => {},
 *  onAdLoadFailed: () => {},
 * };
 * IronSource.setLevelPlayRewardedVideoManualListener(listener);
 */
export declare const LevelPlayRewardedVideoEvents: {
    onAdAvailable: {
        setListener: (listener: (adInfo: IronSourceAdInfo) => void) => void;
        removeListener: () => void;
    };
    onAdUnavailable: {
        setListener: (listener: () => void) => void;
        removeListener: () => void;
    };
    onAdOpened: {
        setListener: (listener: (adInfo: IronSourceAdInfo) => void) => void;
        removeListener: () => void;
    };
    onAdClosed: {
        setListener: (listener: (adInfo: IronSourceAdInfo) => void) => void;
        removeListener: () => void;
    };
    onAdRewarded: {
        setListener: (listener: (placement: IronSourceRVPlacement, adInfo: IronSourceAdInfo) => void) => void;
        removeListener: () => void;
    };
    onAdShowFailed: {
        setListener: (listener: (error: IronSourceError, adInfo: IronSourceAdInfo) => void) => void;
        removeListener: () => void;
    };
    onAdClicked: {
        setListener: (listener: (placement: IronSourceRVPlacement, adInfo: IronSourceAdInfo) => void) => void;
        removeListener: () => void;
    };
    onAdReady: {
        setListener: (listener: (adInfo: IronSourceAdInfo) => void) => void;
        removeListener: () => void;
    };
    onAdLoadFailed: {
        setListener: (listener: (error: IronSourceError) => void) => void;
        removeListener: () => void;
    };
    removeAllListeners: () => void;
};
//# sourceMappingURL=LevelPlayRewardedVideoEvents.d.ts.map