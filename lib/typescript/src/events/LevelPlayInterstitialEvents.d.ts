import type { IronSourceError, IronSourceAdInfo } from '../models';
/**
 * @deprecated This module [LevelPlayInterstitialEvents] is deprecated and will be removed in future releases.
 * Use IronSource.setLevelPlayInterstitialListener instead.
 *
 * Migration example:
 *
 * Before:
 *
 * import { LevelPlayInterstitialEvents } from 'ironsource-mediation';
 *
 * LevelPlayInterstitialEvents.onAdReady.setListener(yourListener);
 * // Rest of listeners...
 *
 * After:
 *
 * import { IronSource } from 'ironsource-mediation';
 *
 * const listener: LevelPlayInterstitialListener = {
 *   onAdReady: (adInfo: IronSourceAdInfo) => {},
 *   onAdLoadFailed: (error: IronSourceError) => {},
 *   onAdOpened: (adInfo: IronSourceAdInfo) => {},
 *   onAdClosed: (adInfo: IronSourceAdInfo) => {},
 *   onAdShowFailed: (error: IronSourceError, adInfo: IronSourceAdInfo) => {},
 *   onAdClicked: (adInfo: IronSourceAdInfo) => {},
 *   onAdShowSucceeded: (adInfo: IronSourceAdInfo) => {},
 * }
 * IronSource.setLevelPlayInterstitialListener(listener);
 */
export declare const LevelPlayInterstitialEvents: {
    onAdReady: {
        setListener: (listener: (adInfo: IronSourceAdInfo) => void) => void;
        removeListener: () => void;
    };
    onAdLoadFailed: {
        setListener: (listener: (error: IronSourceError) => void) => void;
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
    onAdShowFailed: {
        setListener: (listener: (error: IronSourceError, adInfo: IronSourceAdInfo) => void) => void;
        removeListener: () => void;
    };
    onAdClicked: {
        setListener: (listener: (adInfo: IronSourceAdInfo) => void) => void;
        removeListener: () => void;
    };
    onAdShowSucceeded: {
        setListener: (listener: (adInfo: IronSourceAdInfo) => void) => void;
        removeListener: () => void;
    };
    removeAllListeners: () => void;
};
//# sourceMappingURL=LevelPlayInterstitialEvents.d.ts.map