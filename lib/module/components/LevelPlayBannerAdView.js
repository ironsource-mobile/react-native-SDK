function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
import React, { forwardRef, useImperativeHandle } from 'react';
import { useCallback, useRef, useState } from 'react';
import { findNodeHandle, Platform, requireNativeComponent, UIManager } from 'react-native';
import { levelPlayAdInfoFromMap } from '../utils/utils';

// Object represents native component
const LevelPlayBannerAdComponent = requireNativeComponent('levelPlayBannerAdView');

// Defining the type of the LevelPlayBannerAdView React component

// Defining the banner ad view methods to be exposed

// Props interface for the LevelPlayBannerAdView compoenent

// Native events for the LevelPlayBannerAdView component

/**
 * LevelPlay React component for displaying banner ads
 */
export const LevelPlayBannerAdView = /*#__PURE__*/forwardRef((props, ref) => {
  // Access props directly
  const {
    adUnitId,
    adSize,
    listener,
    placementName,
    ...otherProps
  } = props;

  // A local reference to the bannerAdView
  const bannerAdViewRef = useRef(null);

  // State to store the adId received from native
  const [internalAdId, setInternalAdId] = useState('');

  // Save the bannerAdViewRef element
  const saveElement = useCallback(element => {
    if (element) {
      bannerAdViewRef.current = element;
    }
  }, []);

  // A method to load the banner ad
  const loadAd = useCallback(() => {
    if (bannerAdViewRef.current) {
      const viewId = findNodeHandle(bannerAdViewRef.current);
      const command = UIManager.getViewManagerConfig('levelPlayBannerAdView').Commands.loadAd;
      const finalCommand = Platform.OS === 'ios' ? command : command.toString();
      UIManager.dispatchViewManagerCommand(viewId, finalCommand, []);
    }
  }, []);

  // A method to destroy the banner ad
  const destroy = useCallback(() => {
    if (bannerAdViewRef.current) {
      const viewId = findNodeHandle(bannerAdViewRef.current);
      const command = UIManager.getViewManagerConfig('levelPlayBannerAdView').Commands.destroy;
      const finalCommand = Platform.OS === 'ios' ? command : command.toString();
      UIManager.dispatchViewManagerCommand(viewId, finalCommand, []);
    }
  }, []);

  // A method to resume the auto refresh of the banner after it is paused
  const resumeAutoRefresh = useCallback(() => {
    if (bannerAdViewRef.current) {
      const viewId = findNodeHandle(bannerAdViewRef.current);
      const command = UIManager.getViewManagerConfig('levelPlayBannerAdView').Commands.resumeAutoRefresh;
      const finalCommand = Platform.OS === 'ios' ? command : command.toString();
      UIManager.dispatchViewManagerCommand(viewId, finalCommand, []);
    }
  }, []);

  // A method to pause the auto refresh of loaded banner add
  const pauseAutoRefresh = useCallback(() => {
    if (bannerAdViewRef.current) {
      const viewId = findNodeHandle(bannerAdViewRef.current);
      const command = UIManager.getViewManagerConfig('levelPlayBannerAdView').Commands.pauseAutoRefresh;
      const finalCommand = Platform.OS === 'ios' ? command : command.toString();
      UIManager.dispatchViewManagerCommand(viewId, finalCommand, []);
    }
  }, []);

  // Expose methods to the parent using useImperativeHandle
  useImperativeHandle(ref, () => ({
    loadAd,
    destroy,
    resumeAutoRefresh,
    pauseAutoRefresh,
    getAdId: () => internalAdId
  }), [loadAd, destroy, resumeAutoRefresh, pauseAutoRefresh, internalAdId]);

  // Handle the banner ad events:
  const onAdLoadedEvent = useCallback(event => {
    listener?.onAdLoaded(levelPlayAdInfoFromMap(event.nativeEvent.adInfo));
  }, [listener]);
  const onAdLoadFailedEvent = useCallback(event => {
    listener?.onAdLoadFailed(event.nativeEvent.error);
  }, [listener]);
  const onAdDisplayedEvent = useCallback(event => {
    listener?.onAdDisplayed?.(levelPlayAdInfoFromMap(event.nativeEvent.adInfo));
  }, [listener]);
  const onAdDisplayFailedEvent = useCallback(event => {
    listener?.onAdDisplayFailed?.(levelPlayAdInfoFromMap(event.nativeEvent.adInfo), event.nativeEvent.error);
  }, [listener]);
  const onAdClickedEvent = useCallback(event => {
    listener?.onAdClicked?.(levelPlayAdInfoFromMap(event.nativeEvent.adInfo));
  }, [listener]);
  const onAdExpandedEvent = useCallback(event => {
    listener?.onAdExpanded?.(levelPlayAdInfoFromMap(event.nativeEvent.adInfo));
  }, [listener]);
  const onAdCollapsedEvent = useCallback(event => {
    listener?.onAdCollapsed?.(levelPlayAdInfoFromMap(event.nativeEvent.adInfo));
  }, [listener]);
  const onAdLeftApplicationEvent = useCallback(event => {
    listener?.onAdLeftApplication?.(levelPlayAdInfoFromMap(event.nativeEvent.adInfo));
  }, [listener]);

  // Handle the new event
  const onAdIdGeneratedEvent = useCallback(event => {
    const adId = event.nativeEvent.adId;
    setInternalAdId(adId); // Update the internal state with the new ad ID
  }, []);
  return /*#__PURE__*/React.createElement(LevelPlayBannerAdComponent, _extends({
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