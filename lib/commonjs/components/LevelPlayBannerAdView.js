"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelPlayBannerAdView = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
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
    pauseAutoRefresh
  }), [loadAd, destroy, resumeAutoRefresh, pauseAutoRefresh]);

  // Handle the banner ad events:
  const onAdLoadedEvent = (0, _react.useCallback)(event => {
    listener?.onAdLoaded(event.nativeEvent.adInfo);
  }, [listener]);
  const onAdLoadFailedEvent = (0, _react.useCallback)(event => {
    listener?.onAdLoadFailed(event.nativeEvent.error);
  }, [listener]);
  const onAdDisplayedEvent = (0, _react.useCallback)(event => {
    listener?.onAdDisplayed?.(event.nativeEvent.adInfo);
  }, [listener]);
  const onAdDisplayFailedEvent = (0, _react.useCallback)(event => {
    listener?.onAdDisplayFailed?.(event.nativeEvent.adInfo, event.nativeEvent.error);
  }, [listener]);
  const onAdClickedEvent = (0, _react.useCallback)(event => {
    listener?.onAdClicked?.(event.nativeEvent.adInfo);
  }, [listener]);
  const onAdExpandedEvent = (0, _react.useCallback)(event => {
    listener?.onAdExpanded?.(event.nativeEvent.adInfo);
  }, [listener]);
  const onAdCollapsedEvent = (0, _react.useCallback)(event => {
    listener?.onAdCollapsed?.(event.nativeEvent.adInfo);
  }, [listener]);
  const onAdLeftApplicationEvent = (0, _react.useCallback)(event => {
    listener?.onAdLeftApplication?.(event.nativeEvent.adInfo);
  }, [listener]);
  return /*#__PURE__*/_react.default.createElement(LevelPlayBannerAdComponent, _extends({
    ref: saveElement,
    adUnitId: adUnitId,
    adSize: adSize,
    listener: listener,
    placementName: placementName
  }, otherProps, {
    onAdLoadedEvent: onAdLoadedEvent,
    onAdLoadFailedEvent: onAdLoadFailedEvent,
    onAdDisplayedEvent: onAdDisplayedEvent,
    onAdDisplayFailedEvent: onAdDisplayFailedEvent,
    onAdClickedEvent: onAdClickedEvent,
    onAdExpandedEvent: onAdExpandedEvent,
    onAdCollapsedEvent: onAdCollapsedEvent,
    onAdLeftApplicationEvent: onAdLeftApplicationEvent
  }));
});
//# sourceMappingURL=LevelPlayBannerAdView.js.map