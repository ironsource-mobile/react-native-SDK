import { IronSourceError, IronSourceRVPlacement } from '../models';
/**
 * @deprecated This class has been deprecated as of SDK 7.3.0. Please use LevelPlayRewardedVideoEvents instead.
 */
export declare const RewardedVideoEvents: {
    onRewardedVideoAdOpened: {
        setListener: (listener: () => void) => void;
        removeListener: () => void;
    };
    onRewardedVideoAdClosed: {
        setListener: (listener: () => void) => void;
        removeListener: () => void;
    };
    onRewardedVideoAvailabilityChanged: {
        setListener: (listener: (isAvailable: boolean) => void) => void;
        removeListener: () => void;
    };
    onRewardedVideoAdStarted: {
        setListener: (listener: () => void) => void;
        removeListener: () => void;
    };
    onRewardedVideoAdEnded: {
        setListener: (listener: () => void) => void;
        removeListener: () => void;
    };
    onRewardedVideoAdRewarded: {
        setListener: (listener: (placement: IronSourceRVPlacement) => void) => void;
        removeListener: () => void;
    };
    onRewardedVideoAdShowFailed: {
        setListener: (listener: (error: IronSourceError) => void) => void;
        removeListener: () => void;
    };
    onRewardedVideoAdClicked: {
        setListener: (listener: (placement: IronSourceRVPlacement) => void) => void;
        removeListener: () => void;
    };
    onRewardedVideoAdReady: {
        setListener: (listener: () => void) => void;
        removeListener: () => void;
    };
    onRewardedVideoAdLoadFailed: {
        setListener: (listener: (error: IronSourceError) => void) => void;
        removeListener: () => void;
    };
    removeAllListeners: () => void;
};
//# sourceMappingURL=RewardedVideoEvents.d.ts.map