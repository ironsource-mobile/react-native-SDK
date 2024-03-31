import { IronSourceError, IronSourceRVPlacement, IronSourceAdInfo } from '../models';
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