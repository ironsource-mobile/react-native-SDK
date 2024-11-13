import React from 'react';
import { type NativeMethods, type ViewProps } from 'react-native';
import { type LevelPlayAdError, type LevelPlayAdInfo, LevelPlayAdSize, type LevelPlayBannerAdViewListener } from '../models';
export type LevelPlayBannerAdViewType = React.Component<LevelPlayBannerAdViewProps> & NativeMethods;
export interface LevelPlayBannerAdViewMethods {
    loadAd: () => void;
    destroy: () => void;
    pauseAutoRefresh: () => void;
    resumeAutoRefresh: () => void;
}
export interface LevelPlayBannerAdViewProps extends ViewProps {
    adUnitId: string;
    adSize: LevelPlayAdSize;
    listener?: LevelPlayBannerAdViewListener;
    placementName: string | null;
}
export type LevelPlayBannerAdViewNativeEvents = {
    onAdLoadedEvent(event: {
        nativeEvent: {
            adInfo: LevelPlayAdInfo;
        };
    }): void;
    onAdLoadFailedEvent(event: {
        nativeEvent: {
            error: LevelPlayAdError;
        };
    }): void;
    onAdDisplayedEvent(event: {
        nativeEvent: {
            adInfo: LevelPlayAdInfo;
        };
    }): void;
    onAdDisplayFailedEvent(event: {
        nativeEvent: {
            adInfo: LevelPlayAdInfo;
            error: LevelPlayAdError;
        };
    }): void;
    onAdClickedEvent(event: {
        nativeEvent: {
            adInfo: LevelPlayAdInfo;
        };
    }): void;
    onAdExpandedEvent(event: {
        nativeEvent: {
            adInfo: LevelPlayAdInfo;
        };
    }): void;
    onAdCollapsedEvent(event: {
        nativeEvent: {
            adInfo: LevelPlayAdInfo;
        };
    }): void;
    onAdLeftApplicationEvent(event: {
        nativeEvent: {
            adInfo: LevelPlayAdInfo;
        };
    }): void;
};
/**
 * LevelPlay React component for displaying banner ads
 */
export declare const LevelPlayBannerAdView: React.ForwardRefExoticComponent<LevelPlayBannerAdViewProps & React.RefAttributes<LevelPlayBannerAdViewMethods>>;
//# sourceMappingURL=LevelPlayBannerAdView.d.ts.map