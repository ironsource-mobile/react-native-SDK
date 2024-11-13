"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelPlayNativeAdView = LevelPlayNativeAdView;
exports.LevelPlayTemplateType = exports.LevelPlayNativeTemplateFontStyle = void 0;
var _react = _interopRequireWildcard(require("react"));
var React = _react;
var _reactNative = require("react-native");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
// Object to cache native components
const componentCache = {};

/**
 * Retrieves or creates a native component for a given viewType and returns it as a HostComponent.
 * 
 * @param viewType The type of the native component to be retrieved or created.
 * @returns A HostComponent representing the native component with specified props and events.
 */
const LevelPlayNativeAdComponent = viewType => {
  if (!componentCache[viewType]) {
    componentCache[viewType] = (0, _reactNative.requireNativeComponent)(viewType);
  }
  return componentCache[viewType];
};

// Defining the type of the LevelPlayNativeAdView React component

// Props interface for the LevelPlayNativeAdView component

// Native events for the LevelPlayNativeAdView component

/**
 * LevelPlay React component for displaying native ads
 */
function LevelPlayNativeAdView(props) {
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
  (0, _react.useEffect)(() => {
    // Set nativeAdViewRef and viewType
    nativeAd?.setNativeAdViewRef(nativeAdViewRef);
    nativeAd?.setViewType(viewType || 'levelPlayNativeAdView');

    // Get the native component based on viewType
    const component = LevelPlayNativeAdComponent(viewType || 'levelPlayNativeAdView');
    setNativeComponent(component);
  }, []);

  // Save the nativeAdViewRef element
  const saveElement = (0, _react.useCallback)(element => {
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
  const onAdLoadedEvent = (0, _react.useCallback)(event => {
    if (nativeAd?.listener?.onAdLoaded) {
      nativeAd?.listener?.onAdLoaded(extractCompletedNativeAd(event.nativeEvent.nativeAd), event.nativeEvent.adInfo);
    }
  }, [nativeAd?.listener]);
  const onAdLoadFailedEvent = (0, _react.useCallback)(event => {
    if (nativeAd?.listener?.onAdLoadFailed) {
      nativeAd?.listener?.onAdLoadFailed(extractCompletedNativeAd(event.nativeEvent.nativeAd), event.nativeEvent.error);
    }
  }, [nativeAd?.listener]);
  const onAdClickedEvent = (0, _react.useCallback)(event => {
    if (nativeAd?.listener?.onAdClicked) {
      nativeAd?.listener?.onAdClicked(extractCompletedNativeAd(event.nativeEvent.nativeAd), event.nativeEvent.adInfo);
    }
  }, [nativeAd?.listener]);
  const onAdImpressionEvent = (0, _react.useCallback)(event => {
    if (nativeAd?.listener?.onAdImpression) {
      nativeAd?.listener?.onAdImpression(extractCompletedNativeAd(event.nativeEvent.nativeAd), event.nativeEvent.adInfo);
    }
  }, [nativeAd?.listener]);
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
let LevelPlayTemplateType = exports.LevelPlayTemplateType = /*#__PURE__*/function (LevelPlayTemplateType) {
  LevelPlayTemplateType["Small"] = "SMALL";
  LevelPlayTemplateType["Medium"] = "MEDIUM";
  return LevelPlayTemplateType;
}({});
;

/// LevelPlayNativeTemplateFontStyle - native element font style options
let LevelPlayNativeTemplateFontStyle = exports.LevelPlayNativeTemplateFontStyle = /*#__PURE__*/function (LevelPlayNativeTemplateFontStyle) {
  LevelPlayNativeTemplateFontStyle["Normal"] = "normal";
  LevelPlayNativeTemplateFontStyle["Bold"] = "bold";
  LevelPlayNativeTemplateFontStyle["Italic"] = "italic";
  LevelPlayNativeTemplateFontStyle["Monospace"] = "monospace";
  return LevelPlayNativeTemplateFontStyle;
}({}); /// LevelPlayNativeAdElementStyle - styling options for every ad element
/// LevelPlayNativeAdElementStyle - class holder for all available styling element
//# sourceMappingURL=LevelPlayNativeAdView.js.map