import { NativeEventEmitter, NativeModules } from 'react-native';
import { errorAdInfoCodec } from '../models/nestedCodecs';
import { ironSourceErrorCodec, ironSourceAdInfoCodec } from '../models';
import { decode } from '../models/utils';

// The Main Module
const {
  IronSourceMediation
} = NativeModules;
// Event Name Constants defined on each platform
const {
  LP_IS_ON_AD_READY,
  LP_IS_ON_AD_LOAD_FAILED,
  LP_IS_ON_AD_OPENED,
  LP_IS_ON_AD_CLOSED,
  LP_IS_ON_AD_SHOW_FAILED,
  LP_IS_ON_AD_CLICKED,
  LP_IS_ON_AD_SHOW_SUCCEEDED
} = IronSourceMediation.getConstants();

// Create an EventEmitter to subscribe to RewardedVideoListener callbacks
const eventEmitter = new NativeEventEmitter(IronSourceMediation);

/**
 * LevelPlay IS Listener Callback Events Handler APIs
 */

/**
 * Android: onAdReady
 *     iOS: didLoadWithAdInfo
 */
const onAdReady = {
  setListener: listener => {
    eventEmitter.removeAllListeners(LP_IS_ON_AD_READY);
    eventEmitter.addListener(LP_IS_ON_AD_READY, adInfoObj => {
      listener(decode(ironSourceAdInfoCodec, adInfoObj));
    });
  },
  removeListener: () => eventEmitter.removeAllListeners(LP_IS_ON_AD_READY)
};

/**
 * Android: onAdLoadFailed
 *     iOS: didFailToLoadWithError
 */
const onAdLoadFailed = {
  setListener: listener => {
    eventEmitter.removeAllListeners(LP_IS_ON_AD_LOAD_FAILED);
    eventEmitter.addListener(LP_IS_ON_AD_LOAD_FAILED, errorObj => listener(decode(ironSourceErrorCodec, errorObj)));
  },
  removeListener: () => eventEmitter.removeAllListeners(LP_IS_ON_AD_LOAD_FAILED)
};

/**
 * Android: onAdOpened
 *     iOS: didOpenWithAdInfo
 */
const onAdOpened = {
  setListener: listener => {
    eventEmitter.removeAllListeners(LP_IS_ON_AD_OPENED);
    eventEmitter.addListener(LP_IS_ON_AD_OPENED, adInfoObj => {
      listener(decode(ironSourceAdInfoCodec, adInfoObj));
    });
  },
  removeListener: () => eventEmitter.removeAllListeners(LP_IS_ON_AD_OPENED)
};

/**
 * Android: onAdClosed
 *     iOS: didCloseWithAdInfo
 */
const onAdClosed = {
  setListener: listener => {
    eventEmitter.removeAllListeners(LP_IS_ON_AD_CLOSED);
    eventEmitter.addListener(LP_IS_ON_AD_CLOSED, adInfoObj => {
      listener(decode(ironSourceAdInfoCodec, adInfoObj));
    });
  },
  removeListener: () => eventEmitter.removeAllListeners(LP_IS_ON_AD_CLOSED)
};

/**
 * Android: onAdShowFailed
 *     iOS: didFailToShowWithError
 */
const onAdShowFailed = {
  setListener: listener => {
    eventEmitter.removeAllListeners(LP_IS_ON_AD_SHOW_FAILED);
    eventEmitter.addListener(LP_IS_ON_AD_SHOW_FAILED, obj => {
      const {
        error,
        adInfo
      } = decode(errorAdInfoCodec, obj);
      listener(error, adInfo);
    });
  },
  removeListener: () => eventEmitter.removeAllListeners(LP_IS_ON_AD_SHOW_FAILED)
};

/**
 * Android: onAdClicked
 *     iOS: didClickWithAdInfo
 */
const onAdClicked = {
  setListener: listener => {
    eventEmitter.removeAllListeners(LP_IS_ON_AD_CLICKED);
    eventEmitter.addListener(LP_IS_ON_AD_CLICKED, adInfoObj => {
      listener(decode(ironSourceAdInfoCodec, adInfoObj));
    });
  },
  removeListener: () => eventEmitter.removeAllListeners(LP_IS_ON_AD_CLICKED)
};

/**
 * Android: onAdShowSucceeded
 *     iOS: didShowWithAdInfo
 */
const onAdShowSucceeded = {
  setListener: listener => {
    eventEmitter.removeAllListeners(LP_IS_ON_AD_SHOW_SUCCEEDED);
    eventEmitter.addListener(LP_IS_ON_AD_SHOW_SUCCEEDED, adInfoObj => {
      listener(decode(ironSourceAdInfoCodec, adInfoObj));
    });
  },
  removeListener: () => {
    eventEmitter.removeAllListeners(LP_IS_ON_AD_SHOW_SUCCEEDED);
  }
};
const removeAllListeners = () => {
  onAdReady.removeListener();
  onAdLoadFailed.removeListener();
  onAdOpened.removeListener();
  onAdClosed.removeListener();
  onAdShowFailed.removeListener();
  onAdClicked.removeListener();
  onAdShowSucceeded.removeListener();
};

/**
 * @deprecated This module [LevelPlayInterstitialEvents] is deprecated and will be removed in future releases.
 * Use IronSource.setLevelPlayInterstitialListener instead.
 * 
 * Migration example:
 * 
 * Before:
 * 
 * import { LevelPlayInterstitialEvents } from 'ironsource-mediation';
 * 
 * LevelPlayInterstitialEvents.onAdReady.setListener(yourListener);
 * // Rest of listeners...
 * 
 * After:
 * 
 * import { IronSource } from 'ironsource-mediation';
 * 
 * const listener: LevelPlayInterstitialListener = {
 *   onAdReady: (adInfo: IronSourceAdInfo) => {},
 *   onAdLoadFailed: (error: IronSourceError) => {},
 *   onAdOpened: (adInfo: IronSourceAdInfo) => {},
 *   onAdClosed: (adInfo: IronSourceAdInfo) => {},
 *   onAdShowFailed: (error: IronSourceError, adInfo: IronSourceAdInfo) => {},
 *   onAdClicked: (adInfo: IronSourceAdInfo) => {},
 *   onAdShowSucceeded: (adInfo: IronSourceAdInfo) => {},
 * }
 * IronSource.setLevelPlayInterstitialListener(listener);
 */
export const LevelPlayInterstitialEvents = {
  onAdReady,
  onAdLoadFailed,
  onAdOpened,
  onAdClosed,
  onAdShowFailed,
  onAdClicked,
  onAdShowSucceeded,
  removeAllListeners
};
//# sourceMappingURL=LevelPlayInterstitialEvents.js.map