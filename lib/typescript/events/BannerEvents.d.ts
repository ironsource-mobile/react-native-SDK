import { IronSourceError } from '../models';
export declare const BannerEvents: {
    onBannerAdLoaded: {
        setListener: (listener: () => void) => void;
        removeListener: () => void;
    };
    onBannerAdLoadFailed: {
        setListener: (listener: (error: IronSourceError) => void) => void;
        removeListener: () => void;
    };
    onBannerAdClicked: {
        setListener: (listener: () => void) => void;
        removeListener: () => void;
    };
    onBannerAdScreenPresented: {
        setListener: (listener: () => void) => void;
        removeListener: () => void;
    };
    onBannerAdScreenDismissed: {
        setListener: (listener: () => void) => void;
        removeListener: () => void;
    };
    onBannerAdLeftApplication: {
        setListener: (listener: () => void) => void;
        removeListener: () => void;
    };
    removeAllListeners: () => void;
};
