"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelPlayRewardedVideoEvents = void 0;
var _reactNative = require("react-native");
var _nestedCodecs = require("../models/nestedCodecs");
var _models = require("../models");
var _utils = require("../models/utils");
// The Main Module
const {
  IronSourceMediation
} = _reactNative.NativeModules;
// Event Name Constants defined on each platform
const {
  LP_RV_ON_AD_AVAILABLE,
  LP_RV_ON_AD_UNAVAILABLE,
  LP_RV_ON_AD_OPENED,
  LP_RV_ON_AD_CLOSED,
  LP_RV_ON_AD_REWARDED,
  LP_RV_ON_AD_SHOW_FAILED,
  LP_RV_ON_AD_CLICKED,
  // Manual Load RV Events
  LP_MANUAL_RV_ON_AD_READY,
  LP_MANUAL_RV_ON_AD_LOAD_FAILED
} = IronSourceMediation.getConstants();

// Create an EventEmitter to subscribe to RewardedVideoListener callbacks
const eventEmitter = new _reactNative.NativeEventEmitter(IronSourceMediation);

/**
 * LevelPlay RV Listener Callback Events Handler APIs
 */

/**
 * Android: onAdAvailable
 *     iOS: hasAvailableAdWithAdInfo
 */
const onAdAvailable = {
  setListener: listener => {
    eventEmitter.removeAllListeners(LP_RV_ON_AD_AVAILABLE);
    eventEmitter.addListener(LP_RV_ON_AD_AVAILABLE, adInfoObj => {
      listener((0, _utils.decode)(_models.ironSourceAdInfoCodec, adInfoObj));
    });
  },
  removeListener: () => eventEmitter.removeAllListeners(LP_RV_ON_AD_AVAILABLE)
};

/**
 * Android: onAdUnavailable
 *     iOS: hasNoAvailableAd
 */
const onAdUnavailable = {
  setListener: listener => {
    eventEmitter.removeAllListeners(LP_RV_ON_AD_UNAVAILABLE);
    eventEmitter.addListener(LP_RV_ON_AD_UNAVAILABLE, () => listener());
  },
  removeListener: () => eventEmitter.removeAllListeners(LP_RV_ON_AD_UNAVAILABLE)
};

/**
 * Android: onAdOpened
 *     iOS: didOpenWithAdInfo
 */
const onAdOpened = {
  setListener: listener => {
    eventEmitter.removeAllListeners(LP_RV_ON_AD_OPENED);
    eventEmitter.addListener(LP_RV_ON_AD_OPENED, adInfoObj => {
      listener((0, _utils.decode)(_models.ironSourceAdInfoCodec, adInfoObj));
    });
  },
  removeListener: () => eventEmitter.removeAllListeners(LP_RV_ON_AD_OPENED)
};

/**
 * Android: onAdClosed
 *     iOS: didCloseWithAdInfo
 */
const onAdClosed = {
  setListener: listener => {
    eventEmitter.removeAllListeners(LP_RV_ON_AD_CLOSED);
    eventEmitter.addListener(LP_RV_ON_AD_CLOSED, adInfoObj => {
      listener((0, _utils.decode)(_models.ironSourceAdInfoCodec, adInfoObj));
    });
  },
  removeListener: () => eventEmitter.removeAllListeners(LP_RV_ON_AD_CLOSED)
};

/**
 * Android: onAdRewarded
 *     iOS: didReceiveRewardForPlacement
 */
const onAdRewarded = {
  setListener: listener => {
    eventEmitter.removeAllListeners(LP_RV_ON_AD_REWARDED);
    eventEmitter.addListener(LP_RV_ON_AD_REWARDED, obj => {
      const {
        placement,
        adInfo
      } = (0, _utils.decode)(_nestedCodecs.placementAdInfoCodec, obj);
      listener(placement, adInfo);
    });
  },
  removeListener: () => eventEmitter.removeAllListeners(LP_RV_ON_AD_REWARDED)
};

/**
 * Android: onAdShowFailed
 *     iOS: didFailToShowWithError
 */
const onAdShowFailed = {
  setListener: listener => {
    eventEmitter.removeAllListeners(LP_RV_ON_AD_SHOW_FAILED);
    eventEmitter.addListener(LP_RV_ON_AD_SHOW_FAILED, obj => {
      const {
        error,
        adInfo
      } = (0, _utils.decode)(_nestedCodecs.errorAdInfoCodec, obj);
      listener(error, adInfo);
    });
  },
  removeListener: () => eventEmitter.removeAllListeners(LP_RV_ON_AD_SHOW_FAILED)
};

/**
 * Android: onAdClicked
 *     iOS: didClick
 */
const onAdClicked = {
  setListener: listener => {
    eventEmitter.removeAllListeners(LP_RV_ON_AD_CLICKED);
    eventEmitter.addListener(LP_RV_ON_AD_CLICKED, obj => {
      const {
        placement,
        adInfo
      } = (0, _utils.decode)(_nestedCodecs.placementAdInfoCodec, obj);
      listener(placement, adInfo);
    });
  },
  removeListener: () => eventEmitter.removeAllListeners(LP_RV_ON_AD_CLICKED)
};

/**
 * Manual Load RV
 * Android: onAdReady
 *     iOS: didLoadWithAdInfo
 */
const onAdReady = {
  setListener: listener => {
    eventEmitter.removeAllListeners(LP_MANUAL_RV_ON_AD_READY);
    eventEmitter.addListener(LP_MANUAL_RV_ON_AD_READY, adInfoObj => {
      listener((0, _utils.decode)(_models.ironSourceAdInfoCodec, adInfoObj));
    });
  },
  removeListener: () => {
    eventEmitter.removeAllListeners(LP_MANUAL_RV_ON_AD_READY);
  }
};

/**
 * Manual Load RV
 * Android: onAdLoadFailed
 *     iOS: didFailToLoadWithError
 */
const onAdLoadFailed = {
  setListener: listener => {
    eventEmitter.removeAllListeners(LP_MANUAL_RV_ON_AD_LOAD_FAILED);
    eventEmitter.addListener(LP_MANUAL_RV_ON_AD_LOAD_FAILED, errorObj => listener((0, _utils.decode)(_models.ironSourceErrorCodec, errorObj)));
  },
  removeListener: () => eventEmitter.removeAllListeners(LP_MANUAL_RV_ON_AD_LOAD_FAILED)
};
const removeAllListeners = () => {
  onAdAvailable.removeListener();
  onAdUnavailable.removeListener();
  onAdOpened.removeListener();
  onAdClosed.removeListener();
  onAdRewarded.removeListener();
  onAdShowFailed.removeListener();
  onAdClicked.removeListener();
  onAdReady.removeListener();
  onAdLoadFailed.removeListener();
};
const LevelPlayRewardedVideoEvents = exports.LevelPlayRewardedVideoEvents = {
  onAdAvailable,
  onAdUnavailable,
  onAdOpened,
  onAdClosed,
  onAdRewarded,
  onAdShowFailed,
  onAdClicked,
  onAdReady,
  onAdLoadFailed,
  removeAllListeners
};
//# sourceMappingURL=LevelPlayRewardedVideoEvents.js.map