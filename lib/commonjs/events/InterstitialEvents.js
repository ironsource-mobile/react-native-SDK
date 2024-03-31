"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InterstitialEvents = void 0;
var _reactNative = require("react-native");
var _models = require("../models");
var _utils = require("../models/utils");
// The Main Module
const {
  IronSourceMediation
} = _reactNative.NativeModules;
// Event Name Constants defined on each platform
const {
  ON_IS_AD_READY,
  ON_IS_AD_LOAD_FAILED,
  ON_IS_AD_OPENED,
  ON_IS_AD_CLOSED,
  ON_IS_AD_SHOW_SUCCEEDED,
  ON_IS_AD_SHOW_FAILED,
  ON_IS_AD_CLICKED
} = IronSourceMediation.getConstants();

// Create an EventEmitter to subscribe to InterstitialListener callbacks
const eventEmitter = new _reactNative.NativeEventEmitter(IronSourceMediation);

/**
 * IS Listener Callback Events Handler APIs
 * These APIs have been deprecated as of SDK 7.3.0. Please use the alternate APIs in LevelPlayInterstitialEvents instead.
 */

/**
 * Android: onInterstitialAdReady
 *     iOS: interstitialDidLoad
 *
 * @deprecated This API has been deprecated as of SDK 7.3.0. Please use the alternate API in LevelPlayInterstitialEvents instead.
 */
const onInterstitialAdReady = {
  setListener: listener => {
    eventEmitter.removeAllListeners(ON_IS_AD_READY);
    eventEmitter.addListener(ON_IS_AD_READY, () => listener());
  },
  removeListener: () => eventEmitter.removeAllListeners(ON_IS_AD_READY)
};

/**
 * Android: onInterstitialAdLoadFailed
 *     iOS: interstitialDidFailToLoadWithError
 *
 * @deprecated This API has been deprecated as of SDK 7.3.0. Please use the alternate API in LevelPlayInterstitialEvents instead.
 */
const onInterstitialAdLoadFailed = {
  setListener: listener => {
    eventEmitter.removeAllListeners(ON_IS_AD_LOAD_FAILED);
    eventEmitter.addListener(ON_IS_AD_LOAD_FAILED, errorObj => listener((0, _utils.decode)(_models.ironSourceErrorCodec, errorObj)));
  },
  removeListener: () => eventEmitter.removeAllListeners(ON_IS_AD_LOAD_FAILED)
};

/**
 * Android: onInterstitialAdOpened
 *     iOS: interstitialDidOpen
 *
 * @deprecated This API has been deprecated as of SDK 7.3.0. Please use the alternate API in LevelPlayInterstitialEvents instead.
 */
const onInterstitialAdOpened = {
  setListener: listener => {
    eventEmitter.removeAllListeners(ON_IS_AD_OPENED);
    eventEmitter.addListener(ON_IS_AD_OPENED, () => listener());
  },
  removeListener: () => eventEmitter.removeAllListeners(ON_IS_AD_OPENED)
};

/**
 * Android: onInterstitialAdClosed
 *     iOS: interstitialDidClose
 *
 * @deprecated This API has been deprecated as of SDK 7.3.0. Please use the alternate API in LevelPlayInterstitialEvents instead.
 */
const onInterstitialAdClosed = {
  setListener: listener => {
    eventEmitter.removeAllListeners(ON_IS_AD_CLOSED);
    eventEmitter.addListener(ON_IS_AD_CLOSED, () => listener());
  },
  removeListener: () => eventEmitter.removeAllListeners(ON_IS_AD_CLOSED)
};

/**
 * Android: onInterstitialAdShowSucceeded
 *     iOS: interstitialDidShow
 *
 * @deprecated This API has been deprecated as of SDK 7.3.0. Please use the alternate API in LevelPlayInterstitialEvents instead.
 */
const onInterstitialAdShowSucceeded = {
  setListener: listener => {
    eventEmitter.removeAllListeners(ON_IS_AD_SHOW_SUCCEEDED);
    eventEmitter.addListener(ON_IS_AD_SHOW_SUCCEEDED, () => listener());
  },
  removeListener: () => eventEmitter.removeAllListeners(ON_IS_AD_SHOW_SUCCEEDED)
};

/**
 * Android: onInterstitialAdShowFailed
 *     iOS: interstitialDidFailToShowWithError
 *
 * @deprecated This API has been deprecated as of SDK 7.3.0. Please use the alternate API in LevelPlayInterstitialEvents instead.
 */
const onInterstitialAdShowFailed = {
  setListener: listener => {
    eventEmitter.removeAllListeners(ON_IS_AD_SHOW_FAILED);
    eventEmitter.addListener(ON_IS_AD_SHOW_FAILED, errorObj => listener((0, _utils.decode)(_models.ironSourceErrorCodec, errorObj)));
  },
  removeListener: () => eventEmitter.removeAllListeners(ON_IS_AD_SHOW_FAILED)
};

/**
 * Android: onInterstitialAdClicked
 *     iOS: didClickInterstitial
 *
 * @deprecated This API has been deprecated as of SDK 7.3.0. Please use the alternate API in LevelPlayInterstitialEvents instead.
 */
const onInterstitialAdClicked = {
  setListener: listener => {
    eventEmitter.removeAllListeners(ON_IS_AD_CLICKED);
    eventEmitter.addListener(ON_IS_AD_CLICKED, () => listener());
  },
  removeListener: () => eventEmitter.removeAllListeners(ON_IS_AD_CLICKED)
};

/**
 * @deprecated This API has been deprecated as of SDK 7.3.0. Please use the alternate API in LevelPlayInterstitialEvents instead.
 */
const removeAllListeners = () => {
  onInterstitialAdReady.removeListener();
  onInterstitialAdLoadFailed.removeListener();
  onInterstitialAdOpened.removeListener();
  onInterstitialAdClosed.removeListener();
  onInterstitialAdShowSucceeded.removeListener();
  onInterstitialAdShowFailed.removeListener();
  onInterstitialAdClicked.removeListener();
};

/**
 * @deprecated This class has been deprecated as of SDK 7.3.0. Please use LevelPlayInterstitialEvents instead.
 */
const InterstitialEvents = exports.InterstitialEvents = {
  onInterstitialAdReady,
  onInterstitialAdLoadFailed,
  onInterstitialAdOpened,
  onInterstitialAdClosed,
  onInterstitialAdShowSucceeded,
  onInterstitialAdShowFailed,
  onInterstitialAdClicked,
  removeAllListeners
};
//# sourceMappingURL=InterstitialEvents.js.map