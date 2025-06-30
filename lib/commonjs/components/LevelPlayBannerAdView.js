"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelPlayBannerAdView = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _utils = require("../utils/utils");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
// Object represents native component
const LevelPlayBannerAdComponent = (0, _reactNative.requireNativeComponent)('levelPlayBannerAdView');

// Defining the type of the LevelPlayBannerAdView React component

// Defining the banner ad view methods to be exposed

// Props interface for the LevelPlayBannerAdView compoenent

// Native events for the LevelPlayBannerAdView component

/**
 * LevelPlay React component for displaying banner ads
 */
const LevelPlayBannerAdView = exports.LevelPlayBannerAdView = /*#__PURE__*/(0, _react.forwardRef)((props, ref) => {
  // Access props directly
  const {
    adUnitId,
    adSize,
    listener,
    placementName,
    ...otherProps
  } = props;

  // A local reference to the bannerAdView
  const bannerAdViewRef = (0, _react.useRef)(null);

  // State to store the adId received from native
  const [internalAdId, setInternalAdId] = (0, _react.useState)('');

  // Save the bannerAdViewRef element
  const saveElement = (0, _react.useCallback)(element => {
    if (element) {
      bannerAdViewRef.current = element;
    }
  }, []);

  // A method to load the banner ad
  const loadAd = (0, _react.useCallback)(() => {
    if (bannerAdViewRef.current) {
      const viewId = (0, _reactNative.findNodeHandle)(bannerAdViewRef.current);
      const command = _reactNative.UIManager.getViewManagerConfig('levelPlayBannerAdView').Commands.loadAd;
      const finalCommand = _reactNative.Platform.OS === 'ios' ? command : command.toString();
      _reactNative.UIManager.dispatchViewManagerCommand(viewId, finalCommand, []);
    }
  }, []);

  // A method to destroy the banner ad
  const destroy = (0, _react.useCallback)(() => {
    if (bannerAdViewRef.current) {
      const viewId = (0, _reactNative.findNodeHandle)(bannerAdViewRef.current);
      const command = _reactNative.UIManager.getViewManagerConfig('levelPlayBannerAdView').Commands.destroy;
      const finalCommand = _reactNative.Platform.OS === 'ios' ? command : command.toString();
      _reactNative.UIManager.dispatchViewManagerCommand(viewId, finalCommand, []);
    }
  }, []);

  // A method to resume the auto refresh of the banner after it is paused
  const resumeAutoRefresh = (0, _react.useCallback)(() => {
    if (bannerAdViewRef.current) {
      const viewId = (0, _reactNative.findNodeHandle)(bannerAdViewRef.current);
      const command = _reactNative.UIManager.getViewManagerConfig('levelPlayBannerAdView').Commands.resumeAutoRefresh;
      const finalCommand = _reactNative.Platform.OS === 'ios' ? command : command.toString();
      _reactNative.UIManager.dispatchViewManagerCommand(viewId, finalCommand, []);
    }
  }, []);

  // A method to pause the auto refresh of loaded banner add
  const pauseAutoRefresh = (0, _react.useCallback)(() => {
    if (bannerAdViewRef.current) {
      const viewId = (0, _reactNative.findNodeHandle)(bannerAdViewRef.current);
      const command = _reactNative.UIManager.getViewManagerConfig('levelPlayBannerAdView').Commands.pauseAutoRefresh;
      const finalCommand = _reactNative.Platform.OS === 'ios' ? command : command.toString();
      _reactNative.UIManager.dispatchViewManagerCommand(viewId, finalCommand, []);
    }
  }, []);

  // Expose methods to the parent using useImperativeHandle
  (0, _react.useImperativeHandle)(ref, () => ({
    loadAd,
    destroy,
    resumeAutoRefresh,
    pauseAutoRefresh,
    getAdId: () => internalAdId
  }), [loadAd, destroy, resumeAutoRefresh, pauseAutoRefresh, internalAdId]);

  // Handle the banner ad events:
  const onAdLoadedEvent = (0, _react.useCallback)(event => {
    listener?.onAdLoaded((0, _utils.levelPlayAdInfoFromMap)(event.nativeEvent.adInfo));
  }, [listener]);
  const onAdLoadFailedEvent = (0, _react.useCallback)(event => {
    listener?.onAdLoadFailed(event.nativeEvent.error);
  }, [listener]);
  const onAdDisplayedEvent = (0, _react.useCallback)(event => {
    listener?.onAdDisplayed?.((0, _utils.levelPlayAdInfoFromMap)(event.nativeEvent.adInfo));
  }, [listener]);
  const onAdDisplayFailedEvent = (0, _react.useCallback)(event => {
    listener?.onAdDisplayFailed?.((0, _utils.levelPlayAdInfoFromMap)(event.nativeEvent.adInfo), event.nativeEvent.error);
  }, [listener]);
  const onAdClickedEvent = (0, _react.useCallback)(event => {
    listener?.onAdClicked?.((0, _utils.levelPlayAdInfoFromMap)(event.nativeEvent.adInfo));
  }, [listener]);
  const onAdExpandedEvent = (0, _react.useCallback)(event => {
    listener?.onAdExpanded?.((0, _utils.levelPlayAdInfoFromMap)(event.nativeEvent.adInfo));
  }, [listener]);
  const onAdCollapsedEvent = (0, _react.useCallback)(event => {
    listener?.onAdCollapsed?.((0, _utils.levelPlayAdInfoFromMap)(event.nativeEvent.adInfo));
  }, [listener]);
  const onAdLeftApplicationEvent = (0, _react.useCallback)(event => {
    listener?.onAdLeftApplication?.((0, _utils.levelPlayAdInfoFromMap)(event.nativeEvent.adInfo));
  }, [listener]);

  // Handle the new event
  const onAdIdGeneratedEvent = (0, _react.useCallback)(event => {
    const adId = event.nativeEvent.adId;
    setInternalAdId(adId); // Update the internal state with the new ad ID
  }, []);
  return /*#__PURE__*/_react.default.createElement(LevelPlayBannerAdComponent, _extends({
    ref: saveElement,
    creationParams: {
      adUnitId: adUnitId,
      adSize: adSize,
      placementName: placementName ?? ''
    }
  }, otherProps, {
    onAdLoadedEvent: onAdLoadedEvent,
    onAdLoadFailedEvent: onAdLoadFailedEvent,
    onAdDisplayedEvent: onAdDisplayedEvent,
    onAdDisplayFailedEvent: onAdDisplayFailedEvent,
    onAdClickedEvent: onAdClickedEvent,
    onAdExpandedEvent: onAdExpandedEvent,
    onAdCollapsedEvent: onAdCollapsedEvent,
    onAdLeftApplicationEvent: onAdLeftApplicationEvent,
    onAdIdGeneratedEvent: onAdIdGeneratedEvent
  }));
});
//# sourceMappingURL=LevelPlayBannerAdView.js.map