import * as React from 'react';
import { useRef, useCallback, useEffect, useState } from 'react';
import type {NativeMethods, ViewProps, ColorValue} from 'react-native'
import {LevelPlayNativeAd, type IronSourceAdInfo, type IronSourceError} from "ironsource-mediation";
import {LevelPlayNativeAdComponent} from './LevelPlayNativeAdComponent';

// Defining the type of the LevelPlayNativeAdView React component
export type LevelPlayNativeAdViewType = React.Component<LevelPlayNativeAdViewProps> & NativeMethods

// Props interface for the LevelPlayNativeAdView component
export interface LevelPlayNativeAdViewProps extends ViewProps {
  templateType?: LevelPlayTemplateType; // Type of native ad template
  templateStyle?: LevelPlayNativeAdTemplateStyle; // Style for native ad elements
  viewType?: string; // Type of the native ad view
  nativeAd: LevelPlayNativeAd | null; // Native ad data
}

// Native events for the LevelPlayNativeAdView component
export type LevelPlayNativeAdViewNativeEvents = {
  onAdLoadedEvent(event: { nativeEvent: { nativeAd: LevelPlayNativeAd; adInfo: IronSourceAdInfo } }): void;
  onAdLoadFailedEvent(event: { nativeEvent: { nativeAd: LevelPlayNativeAd; error: IronSourceError } }): void;
  onAdClickedEvent(event: { nativeEvent: { nativeAd: LevelPlayNativeAd; adInfo: IronSourceAdInfo } }): void;
  onAdImpressionEvent(event: { nativeEvent: { nativeAd: LevelPlayNativeAd; adInfo: IronSourceAdInfo } }): void;
};

// React component for displaying native ads
export function LevelPlayNativeAdView(props : LevelPlayNativeAdViewProps) {
    // Access props directly
    const templateType = props.templateType;
    const templateStyle = props.templateStyle;
    const viewType = props.viewType;
    const nativeAd = props.nativeAd;
    const style = props.style;
    const otherProps = { ...props }; // Exclude known props

  // A reference to the nativeAdView
  const nativeAdViewRef = useRef<LevelPlayNativeAdViewType | null>(null);

  // State for holding the NativeComponent
  const [NativeComponent, setNativeComponent] = useState<any>(null);

  useEffect(() => {
    // Set nativeAdViewRef and viewType
    nativeAd?.setNativeAdViewRef(nativeAdViewRef);
    nativeAd?.setViewType(viewType || 'levelPlayNativeAdViewType');

    // Get the native component based on viewType
    const component = LevelPlayNativeAdComponent(viewType || 'levelPlayNativeAdViewType');
    setNativeComponent(component);

  }, []);

  // Save the nativeAdViewRef element
  const saveElement = useCallback((element: LevelPlayNativeAdViewType | null) => {
      if (element) {
        nativeAdViewRef.current = element
      }
    },
    []);

  // Function to extract completed native ad
  function extractCompletedNativeAd(levelPlayNativeAd: LevelPlayNativeAd) {
    if (nativeAd == null) return levelPlayNativeAd;

    nativeAd.title = levelPlayNativeAd.title;
    nativeAd.body = levelPlayNativeAd.body;
    nativeAd.advertiser = levelPlayNativeAd.advertiser;
    nativeAd.callToAction = levelPlayNativeAd.callToAction;
    nativeAd.icon = levelPlayNativeAd.icon;
    return nativeAd;
  }

  // Handle the native ad events:
  const onAdLoadedEvent = useCallback((event: { nativeEvent: { nativeAd: LevelPlayNativeAd; adInfo: IronSourceAdInfo } }) => {
    if (nativeAd?.listener?.onAdLoaded) {
      nativeAd?.listener?.onAdLoaded(extractCompletedNativeAd(event.nativeEvent.nativeAd), event.nativeEvent.adInfo);
    }
  }, []);

  const onAdLoadFailedEvent = (event: { nativeEvent: { nativeAd: LevelPlayNativeAd; error: IronSourceError } }) => {
    if (nativeAd?.listener?.onAdLoadFailed) {
      nativeAd?.listener?.onAdLoadFailed(extractCompletedNativeAd(event.nativeEvent.nativeAd), event.nativeEvent.error);
    }
  };

  const onAdClickedEvent = (event: { nativeEvent: { nativeAd: LevelPlayNativeAd; adInfo: IronSourceAdInfo } }) => {
    if (nativeAd?.listener?.onAdClicked) {
      nativeAd?.listener?.onAdClicked(extractCompletedNativeAd(event.nativeEvent.nativeAd), event.nativeEvent.adInfo);
    }
  };

  const onAdImpressionEvent = (event: { nativeEvent: { nativeAd: LevelPlayNativeAd; adInfo: IronSourceAdInfo } }) => {
    if (nativeAd?.listener?.onAdImpression) {
      nativeAd?.listener?.onAdImpression(extractCompletedNativeAd(event.nativeEvent.nativeAd), event.nativeEvent.adInfo);
    }
  };

  if (!NativeComponent) {
    return null; // Render nothing if the component is not set yet
  }

  return (
    <NativeComponent
      creationParams={{
        placement: nativeAd?.placement ?? '',
        templateStyle: templateStyle,
        templateType: templateType,
        viewType: viewType
      }}
      ref={saveElement}
      onAdLoadedEvent={onAdLoadedEvent}
      onAdLoadFailedEvent={onAdLoadFailedEvent}
      onAdClickedEvent={onAdClickedEvent}
      onAdImpressionEvent={onAdImpressionEvent}
      style={style}
      {...otherProps}/>
  )
}


/// LevelPlayTemplateType - native ad template options
export enum LevelPlayTemplateType {
  Small = 'SMALL',
  Medium = 'MEDIUM'
};

/// LevelPlayNativeTemplateFontStyle - native element font style options
export enum LevelPlayNativeTemplateFontStyle {
  Normal = 'normal',
  Bold = 'bold',
  Italic = 'italic',
  Monospace = 'monospace'
}

/// LevelPlayNativeAdElementStyle - styling options for every ad element
export interface LevelPlayNativeAdElementStyle {
  backgroundColor?: ColorValue;
  textSize?: number;
  textColor?: ColorValue;
  fontStyle?: LevelPlayNativeTemplateFontStyle;
  cornerRadius?: number;
}

/// LevelPlayNativeAdElementStyle - class holder for all available styling element
export interface LevelPlayNativeAdTemplateStyle {
  titleStyle?: LevelPlayNativeAdElementStyle;
  bodyStyle?: LevelPlayNativeAdElementStyle;
  advertiserStyle?: LevelPlayNativeAdElementStyle;
  callToActionStyle?: LevelPlayNativeAdElementStyle;
}
