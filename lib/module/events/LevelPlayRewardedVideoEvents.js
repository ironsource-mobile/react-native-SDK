import { NativeEventEmitter, NativeModules } from 'react-native';
import { errorAdInfoCodec, placementAdInfoCodec } from '../models/nestedCodecs';
import { ironSourceErrorCodec, ironSourceAdInfoCodec } from '../models';
import { decode } from '../models/utils'; // The Main Module

const {
  IronSourceMediation
} = NativeModules; // Event Name Constants defined on each platform

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
} = IronSourceMediation.getConstants(); // Create an EventEmitter to subscribe to RewardedVideoListener callbacks

const eventEmitter = new NativeEventEmitter(IronSourceMediation);
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
      listener(decode(ironSourceAdInfoCodec, adInfoObj));
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
      listener(decode(ironSourceAdInfoCodec, adInfoObj));
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
      listener(decode(ironSourceAdInfoCodec, adInfoObj));
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
      } = decode(placementAdInfoCodec, obj);
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
      } = decode(errorAdInfoCodec, obj);
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
      } = decode(placementAdInfoCodec, obj);
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
      listener(decode(ironSourceAdInfoCodec, adInfoObj));
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
    eventEmitter.addListener(LP_MANUAL_RV_ON_AD_LOAD_FAILED, errorObj => listener(decode(ironSourceErrorCodec, errorObj)));
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

export const LevelPlayRewardedVideoEvents = {
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