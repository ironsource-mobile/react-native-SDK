function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
import * as React from 'react';
import { useRef, useCallback, useEffect, useState, useImperativeHandle } from 'react';
import { requireNativeComponent } from 'react-native';
import { levelPlayNativeAdFromMap, adInfoFromMap, ironSourceErrorFromMap } from '../utils/utils';
import LevelPlayNativeAdViewComponent, { Commands } from '../specs/LevelPlayNativeAdViewNativeComponent';
// Object to cache native components
const componentCache = {};

/**
 * Retrieves or creates a native component for a given viewType.
 *
 * @param viewType The type of the native component to be retrieved or created.
 * @returns A HostComponent representing the native component with specified props and events.
 */
const LevelPlayNativeAdComponent = viewType => {
  if (!componentCache[viewType]) {
    if (viewType !== 'LevelPlayNativeAdView') {
      // Custom layout - developer creates their own native module extending the abstract manager
      // Use requireNativeComponent since custom modules are created dynamically by developers
      componentCache[viewType] = requireNativeComponent(viewType);
    } else {
      // Built-in templates (Small/Medium) - uses template manager with XIB files
      componentCache[viewType] = LevelPlayNativeAdViewComponent;
    }
  }
  return componentCache[viewType];
};

// Defining the type of the LevelPlayNativeAdView React component

// Defining the native ad view methods to be exposed

// Props interface for the LevelPlayNativeAdView component

// Native events for the LevelPlayNativeAdView component

/**
 * LevelPlay React component for displaying native ads
 */
export const LevelPlayNativeAdView = /*#__PURE__*/React.forwardRef((props, ref) => {
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

  // Command methods (moved from LevelPlayNativeAd)
  const loadAd = useCallback(() => {
    nativeAdViewRef.current && Commands.loadAd(nativeAdViewRef.current);
  }, []);
  const destroyAd = useCallback(() => {
    nativeAdViewRef.current && Commands.destroyAd(nativeAdViewRef.current);
  }, []);
  useEffect(() => {
    // Assign callbacks to the native ad model using setter methods
    if (nativeAd) {
      nativeAd.setLoadAdCallback(loadAd);
      nativeAd.setDestroyAdCallback(destroyAd);
    }

    // Get the native component based on viewType
    const component = LevelPlayNativeAdComponent(viewType || 'LevelPlayNativeAdView');
    setNativeComponent(component);
  }, [viewType, loadAd, destroyAd, nativeAd]);

  // Expose methods to the parent using useImperativeHandle
  useImperativeHandle(ref, () => ({
    loadAd,
    destroyAd
  }), [loadAd, destroyAd]);

  // Save the nativeAdViewRef element
  const saveElement = useCallback(element => {
    if (element) {
      nativeAdViewRef.current = element;
    }
  }, []);

  // Handle the native ad events:
  const onAdLoadedEvent = useCallback(event => {
    if (nativeAd?.listener?.onAdLoaded && nativeAd) {
      nativeAd.listener.onAdLoaded(levelPlayNativeAdFromMap(event.nativeEvent.nativeAd, nativeAd), adInfoFromMap(event.nativeEvent.adInfo));
    }
  }, [nativeAd]);
  const onAdLoadFailedEvent = useCallback(event => {
    if (nativeAd?.listener?.onAdLoadFailed && nativeAd) {
      nativeAd.listener.onAdLoadFailed(levelPlayNativeAdFromMap(event.nativeEvent.nativeAd, nativeAd), ironSourceErrorFromMap(event.nativeEvent.error));
    }
  }, [nativeAd]);
  const onAdClickedEvent = useCallback(event => {
    if (nativeAd?.listener?.onAdClicked && nativeAd) {
      nativeAd.listener.onAdClicked(levelPlayNativeAdFromMap(event.nativeEvent.nativeAd, nativeAd), adInfoFromMap(event.nativeEvent.adInfo));
    }
  }, [nativeAd]);
  const onAdImpressionEvent = useCallback(event => {
    if (nativeAd?.listener?.onAdImpression && nativeAd) {
      nativeAd.listener.onAdImpression(levelPlayNativeAdFromMap(event.nativeEvent.nativeAd, nativeAd), adInfoFromMap(event.nativeEvent.adInfo));
    }
  }, [nativeAd]);
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
});

/// LevelPlayTemplateType - native ad template options
export let LevelPlayTemplateType = /*#__PURE__*/function (LevelPlayTemplateType) {
  LevelPlayTemplateType["Small"] = "SMALL";
  LevelPlayTemplateType["Medium"] = "MEDIUM";
  return LevelPlayTemplateType;
}({});

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