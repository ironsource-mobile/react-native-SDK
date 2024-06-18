function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
import * as React from 'react';
import { useRef, useCallback, useEffect, useState } from 'react';
import { LevelPlayNativeAdComponent } from './LevelPlayNativeAdComponent';

// Defining the type of the LevelPlayNativeAdView React component

// Props interface for the LevelPlayNativeAdView component

// Native events for the LevelPlayNativeAdView component

// React component for displaying native ads
export function LevelPlayNativeAdView(props) {
  // Access props directly
  const templateType = props.templateType;
  const templateStyle = props.templateStyle;
  const viewType = props.viewType;
  const nativeAd = props.nativeAd;
  const style = props.style;
  const otherProps = {
    ...props
  }; // Exclude known props

  // A reference to the nativeAdView
  const nativeAdViewRef = useRef(null);

  // State for holding the NativeComponent
  const [NativeComponent, setNativeComponent] = useState(null);
  useEffect(() => {
    // Set nativeAdViewRef and viewType
    nativeAd?.setNativeAdViewRef(nativeAdViewRef);
    nativeAd?.setViewType(viewType || 'levelPlayNativeAdViewType');

    // Get the native component based on viewType
    const component = LevelPlayNativeAdComponent(viewType || 'levelPlayNativeAdViewType');
    setNativeComponent(component);
  }, []);

  // Save the nativeAdViewRef element
  const saveElement = useCallback(element => {
    if (element) {
      nativeAdViewRef.current = element;
    }
  }, []);

  // Function to extract completed native ad
  function extractCompletedNativeAd(levelPlayNativeAd) {
    if (nativeAd == null) return levelPlayNativeAd;
    nativeAd.title = levelPlayNativeAd.title;
    nativeAd.body = levelPlayNativeAd.body;
    nativeAd.advertiser = levelPlayNativeAd.advertiser;
    nativeAd.callToAction = levelPlayNativeAd.callToAction;
    nativeAd.icon = levelPlayNativeAd.icon;
    return nativeAd;
  }

  // Handle the native ad events:
  const onAdLoadedEvent = useCallback(event => {
    if (nativeAd?.listener?.onAdLoaded) {
      nativeAd?.listener?.onAdLoaded(extractCompletedNativeAd(event.nativeEvent.nativeAd), event.nativeEvent.adInfo);
    }
  }, []);
  const onAdLoadFailedEvent = event => {
    if (nativeAd?.listener?.onAdLoadFailed) {
      nativeAd?.listener?.onAdLoadFailed(extractCompletedNativeAd(event.nativeEvent.nativeAd), event.nativeEvent.error);
    }
  };
  const onAdClickedEvent = event => {
    if (nativeAd?.listener?.onAdClicked) {
      nativeAd?.listener?.onAdClicked(extractCompletedNativeAd(event.nativeEvent.nativeAd), event.nativeEvent.adInfo);
    }
  };
  const onAdImpressionEvent = event => {
    if (nativeAd?.listener?.onAdImpression) {
      nativeAd?.listener?.onAdImpression(extractCompletedNativeAd(event.nativeEvent.nativeAd), event.nativeEvent.adInfo);
    }
  };
  if (!NativeComponent) {
    return null; // Render nothing if the component is not set yet
  }
  return /*#__PURE__*/React.createElement(NativeComponent, _extends({
    creationParams: {
      placement: nativeAd?.placement ?? '',
      templateStyle: templateStyle,
      templateType: templateType,
      viewType: viewType
    },
    ref: saveElement,
    onAdLoadedEvent: onAdLoadedEvent,
    onAdLoadFailedEvent: onAdLoadFailedEvent,
    onAdClickedEvent: onAdClickedEvent,
    onAdImpressionEvent: onAdImpressionEvent,
    style: style
  }, otherProps));
}

/// LevelPlayTemplateType - native ad template options
export let LevelPlayTemplateType = /*#__PURE__*/function (LevelPlayTemplateType) {
  LevelPlayTemplateType["Small"] = "SMALL";
  LevelPlayTemplateType["Medium"] = "MEDIUM";
  return LevelPlayTemplateType;
}({});
;

/// LevelPlayNativeTemplateFontStyle - native element font style options
export let LevelPlayNativeTemplateFontStyle = /*#__PURE__*/function (LevelPlayNativeTemplateFontStyle) {
  LevelPlayNativeTemplateFontStyle["Normal"] = "normal";
  LevelPlayNativeTemplateFontStyle["Bold"] = "bold";
  LevelPlayNativeTemplateFontStyle["Italic"] = "italic";
  LevelPlayNativeTemplateFontStyle["Monospace"] = "monospace";
  return LevelPlayNativeTemplateFontStyle;
}({});

/// LevelPlayNativeAdElementStyle - styling options for every ad element

/// LevelPlayNativeAdElementStyle - class holder for all available styling element
//# sourceMappingURL=LevelPlayNativeAdView.js.map