import * as React from 'react';
import type { NativeMethods, ViewProps, ColorValue } from 'react-native';
import { LevelPlayNativeAd, type IronSourceAdInfo, type IronSourceError } from "ironsource-mediation";
export type LevelPlayNativeAdViewType = React.Component<LevelPlayNativeAdViewProps> & NativeMethods;
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
            adInfo: IronSourceAdInfo;
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
            adInfo: IronSourceAdInfo;
        };
    }): void;
    onAdImpressionEvent(event: {
        nativeEvent: {
            nativeAd: LevelPlayNativeAd;
            adInfo: IronSourceAdInfo;
        };
    }): void;
};
export declare function LevelPlayNativeAdView(props: LevelPlayNativeAdViewProps): React.JSX.Element | null;
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
    titleStyle?: LevelPlayNativeAdElementStyle;
    bodyStyle?: LevelPlayNativeAdElementStyle;
    advertiserStyle?: LevelPlayNativeAdElementStyle;
    callToActionStyle?: LevelPlayNativeAdElementStyle;
}
//# sourceMappingURL=LevelPlayNativeAdView.d.ts.map