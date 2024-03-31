import { IronSourceError, IronSourceAdInfo } from '../models';
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