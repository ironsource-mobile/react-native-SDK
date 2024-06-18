import type { IronSourceAdInfo, IronSourceError } from '../models';
/**
 * @deprecated This module [LevelPlayBannerEvents] is deprecated and will be removed in future releases.
 * Use IronSource.setLevelPlayBannerListener instead.
 *
 * Migration example:
 *
 * Before:
 *
 * import { LevelPlayBannerEvents } from 'ironsource-mediation';
 *
 * LevelPlayBannerEvents.onAdLoaded.setListener(yourListener);
 * // Rest of listeners...
 *
 * After:
 *
 * import { IronSource } from 'ironsource-mediation';
 *
 * const listener: LevelPlayBannerListener = {
 *   onAdLoaded: (adInfo: IronSourceAdInfo) => {},
 *   onAdLoadFailed: (error: IronSourceError) => {},
 *   onAdClicked: (adInfo: IronSourceAdInfo) => {},
 *   onAdScreenPresented: (adInfo: IronSourceAdInfo) => {},
 *   onAdScreenDismissed: (adInfo: IronSourceAdInfo) => {},
 *   onAdLeftApplication: (adInfo: IronSourceAdInfo) => {},
 * }
 * IronSource.setLevelPlayBannerListener(listener);
 */
export declare const LevelPlayBannerEvents: {
    onAdLoaded: {
        setListener: (listener: (adInfo: IronSourceAdInfo) => void) => void;
        removeListener: () => void;
    };
    onAdLoadFailed: {
        setListener: (listener: (error: IronSourceError) => void) => void;
        removeListener: () => void;
    };
    onAdClicked: {
        setListener: (listener: (adInfo: IronSourceAdInfo) => void) => void;
        removeListener: () => void;
    };
    onAdScreenPresented: {
        setListener: (listener: (adInfo: IronSourceAdInfo) => void) => void;
        removeListener: () => void;
    };
    onAdScreenDismissed: {
        setListener: (listener: (adInfo: IronSourceAdInfo) => void) => void;
        removeListener: () => void;
    };
    onAdLeftApplication: {
        setListener: (listener: (adInfo: IronSourceAdInfo) => void) => void;
        removeListener: () => void;
    };
    removeAllListeners: () => void;
};
//# sourceMappingURL=LevelPlayBannerEvents.d.ts.map