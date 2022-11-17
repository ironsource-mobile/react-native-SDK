"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RewardedVideoEvents = void 0;

var _reactNative = require("react-native");

var _models = require("../models");

var _Availability = require("../models/Availability");

var _utils = require("../models/utils");

// The Main Module
const {
  IronSourceMediation
} = _reactNative.NativeModules; // Event Name Constants defined on each platform

const {
  ON_RV_AD_OPENED,
  ON_RV_AD_CLOSED,
  ON_RV_AVAILABILITY_CHANGED,
  ON_RV_AD_REWARDED,
  ON_RV_AD_SHOW_FAILED,
  ON_RV_AD_CLICKED,
  ON_RV_AD_STARTED,
  ON_RV_AD_ENDED,
  // Manual Load RV Events
  ON_RV_AD_READY,
  ON_RV_AD_LOAD_FAILED
} = IronSourceMediation.getConstants(); // Create an EventEmitter to subscribe to RewardedVideoListener callbacks

const eventEmitter = new _reactNative.NativeEventEmitter(IronSourceMediation);
/**
 * RV Listener Callback Events Handler APIs
 */

/**
 * Android: onRewardedVideoAdOpened
 *     iOS: rewardedVideoDidOpen
 */

const onRewardedVideoAdOpened = {
  setListener: listener => {
    eventEmitter.removeAllListeners(ON_RV_AD_OPENED);
    eventEmitter.addListener(ON_RV_AD_OPENED, () => listener());
  },
  removeListener: () => eventEmitter.removeAllListeners(ON_RV_AD_OPENED)
};
/**
 * Android: onRewardedVideoAdClosed
 *     iOS: rewardedVideoDidClose
 */

const onRewardedVideoAdClosed = {
  setListener: listener => {
    eventEmitter.removeAllListeners(ON_RV_AD_CLOSED);
    eventEmitter.addListener(ON_RV_AD_CLOSED, () => listener());
  },
  removeListener: () => eventEmitter.removeAllListeners(ON_RV_AD_CLOSED)
};
/**
 * Android: onRewardedVideoAvailabilityChanged
 *     iOS: rewardedVideoHasChangedAvailability
 */

const onRewardedVideoAvailabilityChanged = {
  setListener: listener => {
    eventEmitter.removeAllListeners(ON_RV_AVAILABILITY_CHANGED);
    eventEmitter.addListener(ON_RV_AVAILABILITY_CHANGED, availabilityObj => {
      const {
        isAvailable
      } = (0, _utils.decode)(_Availability.availabilityCodec, availabilityObj);
      listener(isAvailable);
    });
  },
  removeListener: () => eventEmitter.removeAllListeners(ON_RV_AVAILABILITY_CHANGED)
};
/**
 * Android: onRewardedVideoAdStarted
 *     iOS: rewardedVideoDidStart
 */

const onRewardedVideoAdStarted = {
  setListener: listener => {
    eventEmitter.removeAllListeners(ON_RV_AD_STARTED);
    eventEmitter.addListener(ON_RV_AD_STARTED, () => listener());
  },
  removeListener: () => eventEmitter.removeAllListeners(ON_RV_AD_STARTED)
};
/**
 * Android: onRewardedVideoAdEnded
 *     iOS: rewardedVideoDidEnd
 */

const onRewardedVideoAdEnded = {
  setListener: listener => {
    eventEmitter.removeAllListeners(ON_RV_AD_ENDED);
    eventEmitter.addListener(ON_RV_AD_ENDED, () => listener());
  },
  removeListener: () => eventEmitter.removeAllListeners(ON_RV_AD_ENDED)
};
/**
 * Android: onRewardedVideoAdRewarded
 *     iOS: didReceiveRewardForPlacement
 */

const onRewardedVideoAdRewarded = {
  setListener: listener => {
    eventEmitter.removeAllListeners(ON_RV_AD_REWARDED);
    eventEmitter.addListener(ON_RV_AD_REWARDED, placementObj => listener((0, _utils.decode)(_models.ironSourceRVPlacementCodec, placementObj)));
  },
  removeListener: () => eventEmitter.removeAllListeners(ON_RV_AD_REWARDED)
};
/**
 * Android: onRewardedVideoAdShowFailed
 *     iOS: rewardedVideoDidFailToShowWithError
 */

const onRewardedVideoAdShowFailed = {
  setListener: listener => {
    eventEmitter.removeAllListeners(ON_RV_AD_SHOW_FAILED);
    eventEmitter.addListener(ON_RV_AD_SHOW_FAILED, errorObj => listener((0, _utils.decode)(_models.ironSourceErrorCodec, errorObj)));
  },
  removeListener: () => eventEmitter.removeAllListeners(ON_RV_AD_SHOW_FAILED)
};
/**
 * Android: onRewardedVideoAdClicked
 *     iOS: didClickRewardedVideo
 */

const onRewardedVideoAdClicked = {
  setListener: listener => {
    eventEmitter.removeAllListeners(ON_RV_AD_CLICKED);
    eventEmitter.addListener(ON_RV_AD_CLICKED, placementObj => listener((0, _utils.decode)(_models.ironSourceRVPlacementCodec, placementObj)));
  },
  removeListener: () => {
    eventEmitter.removeAllListeners(ON_RV_AD_CLICKED);
  }
};
/**
 * Manual Load RV
 * Android: onRewardedVideoAdReady
 *     iOS: rewardedVideoDidLoad
 */

const onRewardedVideoAdReady = {
  setListener: listener => {
    eventEmitter.removeAllListeners(ON_RV_AD_READY);
    eventEmitter.addListener(ON_RV_AD_READY, () => listener());
  },
  removeListener: () => {
    eventEmitter.removeAllListeners(ON_RV_AD_CLICKED);
  }
};
/**
 * Manual Load RV
 * Android: onRewardedVideoAdLoadFailed
 *     iOS: rewardedVideoDidFailToLoadWithError
 */

const onRewardedVideoAdLoadFailed = {
  setListener: listener => {
    eventEmitter.removeAllListeners(ON_RV_AD_LOAD_FAILED);
    eventEmitter.addListener(ON_RV_AD_LOAD_FAILED, errorObj => listener((0, _utils.decode)(_models.ironSourceErrorCodec, errorObj)));
  },
  removeListener: () => eventEmitter.removeAllListeners(ON_RV_AD_LOAD_FAILED)
};

const removeAllListeners = () => {
  onRewardedVideoAdOpened.removeListener();
  onRewardedVideoAdClosed.removeListener();
  onRewardedVideoAvailabilityChanged.removeListener();
  onRewardedVideoAdStarted.removeListener();
  onRewardedVideoAdEnded.removeListener();
  onRewardedVideoAdRewarded.removeListener();
  onRewardedVideoAdShowFailed.removeListener();
  onRewardedVideoAdClicked.removeListener();
  onRewardedVideoAdReady.removeListener();
  onRewardedVideoAdLoadFailed.removeListener();
};

const RewardedVideoEvents = {
  onRewardedVideoAdOpened,
  onRewardedVideoAdClosed,
  onRewardedVideoAvailabilityChanged,
  onRewardedVideoAdStarted,
  onRewardedVideoAdEnded,
  onRewardedVideoAdRewarded,
  onRewardedVideoAdShowFailed,
  onRewardedVideoAdClicked,
  onRewardedVideoAdReady,
  onRewardedVideoAdLoadFailed,
  removeAllListeners
};
exports.RewardedVideoEvents = RewardedVideoEvents;
//# sourceMappingURL=RewardedVideoEvents.js.map