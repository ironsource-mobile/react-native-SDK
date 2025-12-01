import * as React from 'react';
import { type NativeMethods, type ViewProps, type ColorValue } from 'react-native';
import { type AdInfo, type IronSourceError, LevelPlayNativeAd } from '../models';
export type LevelPlayNativeAdViewType = React.Component<LevelPlayNativeAdViewCreationParams> & NativeMethods;
export type LevelPlayNativeAdViewCreationParams = {
    creationParams: {
        templateType?: LevelPlayTemplateType;
        templateStyle?: LevelPlayNativeAdTemplateStyle;
        viewType?: string;
        nativeAd: LevelPlayNativeAd | null;
    };
};
export interface LevelPlayNativeAdViewMethods {
    loadAd(): void;
    destroyAd(): void;
}
export interface LevelPlayNativeAdViewProps extends ViewProps {
    templateType?: LevelPlayTemplateType;
    templateStyle?: LevelPlayNativeAdTemplateStyle;
    viewType?: string;
    nativeAd: LevelPlayNativeAd | null;
}
export type LevelPlayNativeAdViewNativeEvents = {
    onAdLoadedEvent(event: {
        nativeEvent: {
            nativeAd: LevelPlayNativeAd;
            adInfo: AdInfo;
        };
    }): void;
    onAdLoadFailedEvent(event: {
        nativeEvent: {
            nativeAd: LevelPlayNativeAd;
            error: IronSourceError;
        };
    }): void;
    onAdClickedEvent(event: {
        nativeEvent: {
            nativeAd: LevelPlayNativeAd;
            adInfo: AdInfo;
        };
    }): void;
    onAdImpressionEvent(event: {
        nativeEvent: {
            nativeAd: LevelPlayNativeAd;
            adInfo: AdInfo;
        };
    }): void;
};
/**
 * LevelPlay React component for displaying native ads
 */
export declare const LevelPlayNativeAdView: React.ForwardRefExoticComponent<LevelPlayNativeAdViewProps & React.RefAttributes<LevelPlayNativeAdViewMethods>>;
export declare enum LevelPlayTemplateType {
    Small = "SMALL",
    Medium = "MEDIUM"
}
export declare enum LevelPlayNativeTemplateFontStyle {
    Normal = "normal",
    Bold = "bold",
    Italic = "italic",
    Monospace = "monospace"
}
export interface LevelPlayNativeAdElementStyle {
    backgroundColor?: ColorValue;
    textSize?: number;
    textColor?: ColorValue;
    fontStyle?: LevelPlayNativeTemplateFontStyle;
    cornerRadius?: number;
}
export interface LevelPlayNativeAdTemplateStyle {
    mainBackgroundColor?: ColorValue;
    titleStyle?: LevelPlayNativeAdElementStyle;
    bodyStyle?: LevelPlayNativeAdElementStyle;
    advertiserStyle?: LevelPlayNativeAdElementStyle;
    callToActionStyle?: LevelPlayNativeAdElementStyle;
}
//# sourceMappingURL=LevelPlayNativeAdView.d.ts.map