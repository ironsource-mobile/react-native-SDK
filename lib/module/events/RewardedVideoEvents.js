import { NativeEventEmitter, NativeModules } from 'react-native';
import { ironSourceErrorCodec, ironSourceRVPlacementCodec } from '../models';
import { availabilityCodec } from '../models/Availability';
import { decode } from '../models/utils';

// The Main Module
const {
  IronSourceMediation
} = NativeModules;
// Event Name Constants defined on each platform
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
} = IronSourceMediation.getConstants();

// Create an EventEmitter to subscribe to RewardedVideoListener callbacks
const eventEmitter = new NativeEventEmitter(IronSourceMediation);

/**
 * RV Listener Callback Events Handler APIs
 * These APIs have been deprecated as of SDK 7.3.0. Please use the alternate APIs in LevelPlayRewardedVideoEvents instead.
 */

/**
 * Android: onRewardedVideoAdOpened
 *     iOS: rewardedVideoDidOpen
 *
 * @deprecated This API has been deprecated as of SDK 7.3.0. Please use the alternate API in LevelPlayRewardedVideoEvents instead.
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
 *
 * @deprecated This API has been deprecated as of SDK 7.3.0. Please use the alternate API in LevelPlayRewardedVideoEvents instead.
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
 *
 * @deprecated This API has been deprecated as of SDK 7.3.0. Please use the alternate API in LevelPlayRewardedVideoEvents instead.
 */
const onRewardedVideoAvailabilityChanged = {
  setListener: listener => {
    eventEmitter.removeAllListeners(ON_RV_AVAILABILITY_CHANGED);
    eventEmitter.addListener(ON_RV_AVAILABILITY_CHANGED, availabilityObj => {
      const {
        isAvailable
      } = decode(availabilityCodec, availabilityObj);
      listener(isAvailable);
    });
  },
  removeListener: () => eventEmitter.removeAllListeners(ON_RV_AVAILABILITY_CHANGED)
};

/**
 * Android: onRewardedVideoAdStarted
 *     iOS: rewardedVideoDidStart
 *
 * @deprecated This API has been deprecated as of SDK 7.3.0. Please use the alternate API in LevelPlayRewardedVideoEvents instead.
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
 *
 * @deprecated This API has been deprecated as of SDK 7.3.0. Please use the alternate API in LevelPlayRewardedVideoEvents instead.
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
 *
 * @deprecated This API has been deprecated as of SDK 7.3.0. Please use the alternate API in LevelPlayRewardedVideoEvents instead.
 */
const onRewardedVideoAdRewarded = {
  setListener: listener => {
    eventEmitter.removeAllListeners(ON_RV_AD_REWARDED);
    eventEmitter.addListener(ON_RV_AD_REWARDED, placementObj => listener(decode(ironSourceRVPlacementCodec, placementObj)));
  },
  removeListener: () => eventEmitter.removeAllListeners(ON_RV_AD_REWARDED)
};

/**
 * Android: onRewardedVideoAdShowFailed
 *     iOS: rewardedVideoDidFailToShowWithError
 *
 * @deprecated This API has been deprecated as of SDK 7.3.0. Please use the alternate API in LevelPlayRewardedVideoEvents instead.
 */
const onRewardedVideoAdShowFailed = {
  setListener: listener => {
    eventEmitter.removeAllListeners(ON_RV_AD_SHOW_FAILED);
    eventEmitter.addListener(ON_RV_AD_SHOW_FAILED, errorObj => listener(decode(ironSourceErrorCodec, errorObj)));
  },
  removeListener: () => eventEmitter.removeAllListeners(ON_RV_AD_SHOW_FAILED)
};

/**
 * Android: onRewardedVideoAdClicked
 *     iOS: didClickRewardedVideo
 *
 * @deprecated This API has been deprecated as of SDK 7.3.0. Please use the alternate API in LevelPlayRewardedVideoEvents instead.
 */
const onRewardedVideoAdClicked = {
  setListener: listener => {
    eventEmitter.removeAllListeners(ON_RV_AD_CLICKED);
    eventEmitter.addListener(ON_RV_AD_CLICKED, placementObj => listener(decode(ironSourceRVPlacementCodec, placementObj)));
  },
  removeListener: () => {
    eventEmitter.removeAllListeners(ON_RV_AD_CLICKED);
  }
};

/**
 * Manual Load RV
 * Android: onRewardedVideoAdReady
 *     iOS: rewardedVideoDidLoad
 *
 * @deprecated This API has been deprecated as of SDK 7.3.0. Please use the alternate API in LevelPlayRewardedVideoEvents instead.
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
 *
 * @deprecated This API has been deprecated as of SDK 7.3.0. Please use the alternate API in LevelPlayRewardedVideoEvents instead.
 */
const onRewardedVideoAdLoadFailed = {
  setListener: listener => {
    eventEmitter.removeAllListeners(ON_RV_AD_LOAD_FAILED);
    eventEmitter.addListener(ON_RV_AD_LOAD_FAILED, errorObj => listener(decode(ironSourceErrorCodec, errorObj)));
  },
  removeListener: () => eventEmitter.removeAllListeners(ON_RV_AD_LOAD_FAILED)
};

/**
 * @deprecated This API has been deprecated as of SDK 7.3.0. Please use the alternate API in LevelPlayRewardedVideoEvents instead.
 */
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

/**
 * @deprecated This class has been deprecated as of SDK 7.3.0. Please use LevelPlayRewardedVideoEvents instead.
 */
export const RewardedVideoEvents = {
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
//# sourceMappingURL=RewardedVideoEvents.js.map