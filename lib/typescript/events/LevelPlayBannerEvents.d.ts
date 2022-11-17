import { IronSourceAdInfo, IronSourceError } from '../models';
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
