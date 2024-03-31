import { IronSourceError } from '../models';
/**
 * @deprecated This class has been deprecated as of SDK 7.3.0. Please use LevelPlayBannerEvents instead.
 */
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
//# sourceMappingURL=BannerEvents.d.ts.map