"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelPlayTemplateType = exports.LevelPlayNativeTemplateFontStyle = exports.LevelPlayNativeAdView = void 0;
var _react = _interopRequireWildcard(require("react"));
var React = _react;
var _reactNative = require("react-native");
var _utils = require("../utils/utils");
var _LevelPlayNativeAdViewNativeComponent = _interopRequireWildcard(require("../specs/LevelPlayNativeAdViewNativeComponent"));
var cache;
function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var r, c, a = Object.defineProperty, n = { __proto__: null, default: e }; if (Object(e) !== e) return n; if (cache || "function" != typeof WeakMap || (cache = new WeakMap()), cache) { if (cache.has(e)) return cache.get(e); cache.set(e, n); } for (c in e) "default" !== c && {}.hasOwnProperty.call(e, c) && ((r = a && Object.getOwnPropertyDescriptor(e, c)) && (r.get || r.set) ? a(n, c, r) : n[c] = e[c]); return n; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
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
      componentCache[viewType] = (0, _reactNative.requireNativeComponent)(viewType);
    } else {
      // Built-in templates (Small/Medium) - uses template manager with XIB files
      componentCache[viewType] = _LevelPlayNativeAdViewNativeComponent.default;
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
const LevelPlayNativeAdView = exports.LevelPlayNativeAdView = /*#__PURE__*/React.forwardRef((props, ref) => {
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
  const nativeAdViewRef = (0, _react.useRef)(null);

  // State for holding the NativeComponent
  const [NativeComponent, setNativeComponent] = (0, _react.useState)(null);

  // Command methods (moved from LevelPlayNativeAd)
  const loadAd = (0, _react.useCallback)(() => {
    nativeAdViewRef.current && _LevelPlayNativeAdViewNativeComponent.Commands.loadAd(nativeAdViewRef.current);
  }, []);
  const destroyAd = (0, _react.useCallback)(() => {
    nativeAdViewRef.current && _LevelPlayNativeAdViewNativeComponent.Commands.destroyAd(nativeAdViewRef.current);
  }, []);
  (0, _react.useEffect)(() => {
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
  (0, _react.useImperativeHandle)(ref, () => ({
    loadAd,
    destroyAd
  }), [loadAd, destroyAd]);

  // Save the nativeAdViewRef element
  const saveElement = (0, _react.useCallback)(element => {
    if (element) {
      nativeAdViewRef.current = element;
    }
  }, []);

  // Handle the native ad events:
  const onAdLoadedEvent = (0, _react.useCallback)(event => {
    if (nativeAd?.listener?.onAdLoaded && nativeAd) {
      nativeAd.listener.onAdLoaded((0, _utils.levelPlayNativeAdFromMap)(event.nativeEvent.nativeAd, nativeAd), (0, _utils.adInfoFromMap)(event.nativeEvent.adInfo));
    }
  }, [nativeAd]);
  const onAdLoadFailedEvent = (0, _react.useCallback)(event => {
    if (nativeAd?.listener?.onAdLoadFailed && nativeAd) {
      nativeAd.listener.onAdLoadFailed((0, _utils.levelPlayNativeAdFromMap)(event.nativeEvent.nativeAd, nativeAd), (0, _utils.ironSourceErrorFromMap)(event.nativeEvent.error));
    }
  }, [nativeAd]);
  const onAdClickedEvent = (0, _react.useCallback)(event => {
    if (nativeAd?.listener?.onAdClicked && nativeAd) {
      nativeAd.listener.onAdClicked((0, _utils.levelPlayNativeAdFromMap)(event.nativeEvent.nativeAd, nativeAd), (0, _utils.adInfoFromMap)(event.nativeEvent.adInfo));
    }
  }, [nativeAd]);
  const onAdImpressionEvent = (0, _react.useCallback)(event => {
    if (nativeAd?.listener?.onAdImpression && nativeAd) {
      nativeAd.listener.onAdImpression((0, _utils.levelPlayNativeAdFromMap)(event.nativeEvent.nativeAd, nativeAd), (0, _utils.adInfoFromMap)(event.nativeEvent.adInfo));
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
let LevelPlayTemplateType = exports.LevelPlayTemplateType = /*#__PURE__*/function (LevelPlayTemplateType) {
  LevelPlayTemplateType["Small"] = "SMALL";
  LevelPlayTemplateType["Medium"] = "MEDIUM";
  return LevelPlayTemplateType;
}({}); /// LevelPlayNativeTemplateFontStyle - native element font style options
let LevelPlayNativeTemplateFontStyle = exports.LevelPlayNativeTemplateFontStyle = /*#__PURE__*/function (LevelPlayNativeTemplateFontStyle) {
  LevelPlayNativeTemplateFontStyle["Normal"] = "normal";
  LevelPlayNativeTemplateFontStyle["Bold"] = "bold";
  LevelPlayNativeTemplateFontStyle["Italic"] = "italic";
  LevelPlayNativeTemplateFontStyle["Monospace"] = "monospace";
  return LevelPlayNativeTemplateFontStyle;
}({}); /// LevelPlayNativeAdElementStyle - styling options for every ad element
/// LevelPlayNativeAdElementStyle - class holder for all available styling element
//# sourceMappingURL=LevelPlayNativeAdView.js.map