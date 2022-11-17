"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BannerEvents = void 0;

var _reactNative = require("react-native");

var _models = require("../models");

var _utils = require("../models/utils");

// The Main Module
const {
  IronSourceMediation
} = _reactNative.NativeModules; // Event Name Constants defined on each platform

const {
  ON_BN_AD_LOADED,
  ON_BN_AD_LOAD_FAILED,
  ON_BN_AD_CLICKED,
  ON_BN_AD_SCREEN_PRESENTED,
  ON_BN_AD_SCREEN_DISMISSED,
  ON_BN_AD_LEFT_APPLICATION
} = IronSourceMediation.getConstants(); // Create an EventEmitter to subscribe to BannerListener callbacks

const eventEmitter = new _reactNative.NativeEventEmitter(IronSourceMediation);
/**
 * BN Listener Callback Events Handler APIs
 */

/**
 * Android: onBannerAdLoaded
 *     iOS: bannerDidLoad
 */

const onBannerAdLoaded = {
  setListener: listener => {
    eventEmitter.removeAllListeners(ON_BN_AD_LOADED);
    eventEmitter.addListener(ON_BN_AD_LOADED, () => listener());
  },
  removeListener: () => eventEmitter.removeAllListeners(ON_BN_AD_LOADED)
};
/**
 * Android: onBannerAdLoadFailed
 *     iOS: bannerDidFailToLoadWithError
 */

const onBannerAdLoadFailed = {
  setListener: listener => {
    eventEmitter.removeAllListeners(ON_BN_AD_LOAD_FAILED);
    eventEmitter.addListener(ON_BN_AD_LOAD_FAILED, errorObj => listener((0, _utils.decode)(_models.ironSourceErrorCodec, errorObj)));
  },
  removeListener: () => eventEmitter.removeAllListeners(ON_BN_AD_LOAD_FAILED)
};
/**
 * Android: onBannerAdClicked
 *     iOS: didClickBanner
 */

const onBannerAdClicked = {
  setListener: listener => {
    eventEmitter.removeAllListeners(ON_BN_AD_CLICKED);
    eventEmitter.addListener(ON_BN_AD_CLICKED, () => listener());
  },
  removeListener: () => eventEmitter.removeAllListeners(ON_BN_AD_CLICKED)
};
/**
 * Android: onBannerAdScreenPresented
 *     iOS: bannerWillPresentScreen
 */

const onBannerAdScreenPresented = {
  setListener: listener => {
    eventEmitter.removeAllListeners(ON_BN_AD_SCREEN_PRESENTED);
    eventEmitter.addListener(ON_BN_AD_SCREEN_PRESENTED, () => listener());
  },
  removeListener: () => eventEmitter.removeAllListeners(ON_BN_AD_SCREEN_PRESENTED)
};
/**
 * Android: onBannerAdScreenDismissed
 *     iOS: bannerDidDismissScreen
 */

const onBannerAdScreenDismissed = {
  setListener: listener => {
    eventEmitter.removeAllListeners(ON_BN_AD_SCREEN_DISMISSED);
    eventEmitter.addListener(ON_BN_AD_SCREEN_DISMISSED, () => listener());
  },
  removeListener: () => eventEmitter.removeAllListeners(ON_BN_AD_SCREEN_DISMISSED)
};
/**
 * Android: onBannerAdLeftApplication
 *     iOS: bannerWillLeaveApplication
 *
 * Called when a user would be taken out of the application context.
 */

const onBannerAdLeftApplication = {
  setListener: listener => {
    eventEmitter.removeAllListeners(ON_BN_AD_LEFT_APPLICATION);
    eventEmitter.addListener(ON_BN_AD_LEFT_APPLICATION, () => listener());
  },
  removeListener: () => eventEmitter.removeAllListeners(ON_BN_AD_LEFT_APPLICATION)
};

const removeAllListeners = () => {
  onBannerAdLoaded.removeListener();
  onBannerAdLoadFailed.removeListener();
  onBannerAdClicked.removeListener();
  onBannerAdScreenPresented.removeListener();
  onBannerAdScreenDismissed.removeListener();
  onBannerAdLeftApplication.removeListener();
};

const BannerEvents = {
  onBannerAdLoaded,
  onBannerAdLoadFailed,
  onBannerAdClicked,
  onBannerAdScreenPresented,
  onBannerAdScreenDismissed,
  onBannerAdLeftApplication,
  removeAllListeners
};
exports.BannerEvents = BannerEvents;
//# sourceMappingURL=BannerEvents.js.map