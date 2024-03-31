"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelPlayBannerEvents = void 0;
var _reactNative = require("react-native");
var _models = require("../models");
var _utils = require("../models/utils");
// The Main Module
const {
  IronSourceMediation
} = _reactNative.NativeModules;
// Event Name Constants defined on each platform
const {
  LP_BN_ON_AD_LOADED,
  LP_BN_ON_AD_LOAD_FAILED,
  LP_BN_ON_AD_CLICKED,
  LP_BN_ON_AD_SCREEN_PRESENTED,
  LP_BN_ON_AD_SCREEN_DISMISSED,
  LP_BN_ON_AD_LEFT_APPLICATION
} = IronSourceMediation.getConstants();

// Create an EventEmitter to subscribe to BannerListener callbacks
const eventEmitter = new _reactNative.NativeEventEmitter(IronSourceMediation);

/**
 * BN Listener Callback Events Handler APIs
 */

/**
 * Android: onAdLoaded
 *     iOS:
 */
const onAdLoaded = {
  setListener: listener => {
    eventEmitter.removeAllListeners(LP_BN_ON_AD_LOADED);
    eventEmitter.addListener(LP_BN_ON_AD_LOADED, adInfoObj => {
      listener((0, _utils.decode)(_models.ironSourceAdInfoCodec, adInfoObj));
    });
  },
  removeListener: () => eventEmitter.removeAllListeners(LP_BN_ON_AD_LOADED)
};

/**
 * Android: onAdLoadFailed
 *     iOS:
 */
const onAdLoadFailed = {
  setListener: listener => {
    eventEmitter.removeAllListeners(LP_BN_ON_AD_LOAD_FAILED);
    eventEmitter.addListener(LP_BN_ON_AD_LOAD_FAILED, errorObj => listener((0, _utils.decode)(_models.ironSourceErrorCodec, errorObj)));
  },
  removeListener: () => eventEmitter.removeAllListeners(LP_BN_ON_AD_LOAD_FAILED)
};

/**
 * Android: onAdClicked
 *     iOS:
 */
const onAdClicked = {
  setListener: listener => {
    eventEmitter.removeAllListeners(LP_BN_ON_AD_CLICKED);
    eventEmitter.addListener(LP_BN_ON_AD_CLICKED, adInfoObj => {
      listener((0, _utils.decode)(_models.ironSourceAdInfoCodec, adInfoObj));
    });
  },
  removeListener: () => eventEmitter.removeAllListeners(LP_BN_ON_AD_CLICKED)
};

/**
 * Android: onAdScreenPresented
 *     iOS:
 */
const onAdScreenPresented = {
  setListener: listener => {
    eventEmitter.removeAllListeners(LP_BN_ON_AD_SCREEN_PRESENTED);
    eventEmitter.addListener(LP_BN_ON_AD_SCREEN_PRESENTED, adInfoObj => {
      listener((0, _utils.decode)(_models.ironSourceAdInfoCodec, adInfoObj));
    });
  },
  removeListener: () => eventEmitter.removeAllListeners(LP_BN_ON_AD_SCREEN_PRESENTED)
};

/**
 * Android: onAdScreenDismissed
 *     iOS:
 */
const onAdScreenDismissed = {
  setListener: listener => {
    eventEmitter.removeAllListeners(LP_BN_ON_AD_SCREEN_DISMISSED);
    eventEmitter.addListener(LP_BN_ON_AD_SCREEN_DISMISSED, adInfoObj => {
      listener((0, _utils.decode)(_models.ironSourceAdInfoCodec, adInfoObj));
    });
  },
  removeListener: () => eventEmitter.removeAllListeners(LP_BN_ON_AD_SCREEN_DISMISSED)
};

/**
 * Android: onAdLeftApplication
 *     iOS:
 *
 * Called when a user would be taken out of the application context.
 */
const onAdLeftApplication = {
  setListener: listener => {
    eventEmitter.removeAllListeners(LP_BN_ON_AD_LEFT_APPLICATION);
    eventEmitter.addListener(LP_BN_ON_AD_LEFT_APPLICATION, adInfoObj => {
      listener((0, _utils.decode)(_models.ironSourceAdInfoCodec, adInfoObj));
    });
  },
  removeListener: () => eventEmitter.removeAllListeners(LP_BN_ON_AD_LEFT_APPLICATION)
};
const removeAllListeners = () => {
  onAdLoaded.removeListener();
  onAdLoadFailed.removeListener();
  onAdClicked.removeListener();
  onAdScreenPresented.removeListener();
  onAdScreenDismissed.removeListener();
  onAdLeftApplication.removeListener();
};
const LevelPlayBannerEvents = exports.LevelPlayBannerEvents = {
  onAdLoaded,
  onAdLoadFailed,
  onAdClicked,
  onAdScreenPresented,
  onAdScreenDismissed,
  onAdLeftApplication,
  removeAllListeners
};
//# sourceMappingURL=LevelPlayBannerEvents.js.map