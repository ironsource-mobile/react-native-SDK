import { NativeEventEmitter, NativeModules } from 'react-native';
import { ironSourceErrorCodec } from '../models';
import { decode } from '../models/utils'; // The Main Module

const {
  IronSourceMediation
} = NativeModules; // Event Name Constants defined on each platform

const {
  ON_IS_AD_READY,
  ON_IS_AD_LOAD_FAILED,
  ON_IS_AD_OPENED,
  ON_IS_AD_CLOSED,
  ON_IS_AD_SHOW_SUCCEEDED,
  ON_IS_AD_SHOW_FAILED,
  ON_IS_AD_CLICKED
} = IronSourceMediation.getConstants(); // Create an EventEmitter to subscribe to InterstitialListener callbacks

const eventEmitter = new NativeEventEmitter(IronSourceMediation);
/**
 * IS Listener Callback Events Handler APIs
 */

/**
 * Android: onInterstitialAdReady
 *     iOS: interstitialDidLoad
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
 */

const onInterstitialAdLoadFailed = {
  setListener: listener => {
    eventEmitter.removeAllListeners(ON_IS_AD_LOAD_FAILED);
    eventEmitter.addListener(ON_IS_AD_LOAD_FAILED, errorObj => listener(decode(ironSourceErrorCodec, errorObj)));
  },
  removeListener: () => eventEmitter.removeAllListeners(ON_IS_AD_LOAD_FAILED)
};
/**
 * Android: onInterstitialAdOpened
 *     iOS: interstitialDidOpen
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
 */

const onInterstitialAdShowFailed = {
  setListener: listener => {
    eventEmitter.removeAllListeners(ON_IS_AD_SHOW_FAILED);
    eventEmitter.addListener(ON_IS_AD_SHOW_FAILED, errorObj => listener(decode(ironSourceErrorCodec, errorObj)));
  },
  removeListener: () => eventEmitter.removeAllListeners(ON_IS_AD_SHOW_FAILED)
};
/**
 * Android: onInterstitialAdClicked
 *     iOS: didClickInterstitial
 */

const onInterstitialAdClicked = {
  setListener: listener => {
    eventEmitter.removeAllListeners(ON_IS_AD_CLICKED);
    eventEmitter.addListener(ON_IS_AD_CLICKED, () => listener());
  },
  removeListener: () => eventEmitter.removeAllListeners(ON_IS_AD_CLICKED)
};

const removeAllListeners = () => {
  onInterstitialAdReady.removeListener();
  onInterstitialAdLoadFailed.removeListener();
  onInterstitialAdOpened.removeListener();
  onInterstitialAdClosed.removeListener();
  onInterstitialAdShowSucceeded.removeListener();
  onInterstitialAdShowFailed.removeListener();
  onInterstitialAdClicked.removeListener();
};

export const InterstitialEvents = {
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