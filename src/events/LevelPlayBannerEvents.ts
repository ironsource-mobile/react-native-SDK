import { NativeEventEmitter, NativeModules } from 'react-native';
import { ironSourceAdInfoCodec, ironSourceErrorCodec } from '../models';
import type { IronSourceAdInfo, IronSourceError } from '../models';
import { decode } from '../models/utils';

// The Main Module
const { IronSourceMediation } = NativeModules;
// Event Name Constants defined on each platform
const {
  LP_BN_ON_AD_LOADED,
  LP_BN_ON_AD_LOAD_FAILED,
  LP_BN_ON_AD_CLICKED,
  LP_BN_ON_AD_SCREEN_PRESENTED,
  LP_BN_ON_AD_SCREEN_DISMISSED,
  LP_BN_ON_AD_LEFT_APPLICATION,
} = IronSourceMediation.getConstants();

// Create an EventEmitter to subscribe to BannerListener callbacks
const eventEmitter = new NativeEventEmitter(IronSourceMediation);

/**
 * Android: onAdLoaded
 *     iOS:
 */
const onAdLoaded = {
  setListener: (listener: (adInfo: IronSourceAdInfo) => void) => {
    eventEmitter.removeAllListeners(LP_BN_ON_AD_LOADED);
    eventEmitter.addListener(LP_BN_ON_AD_LOADED, (adInfoObj: unknown) => {
      listener(decode(ironSourceAdInfoCodec, adInfoObj));
    });
  },
  removeListener: () => eventEmitter.removeAllListeners(LP_BN_ON_AD_LOADED),
};

/**
 * Android: onAdLoadFailed
 *     iOS:
 */
const onAdLoadFailed = {
  setListener: (listener: (error: IronSourceError) => void) => {
    eventEmitter.removeAllListeners(LP_BN_ON_AD_LOAD_FAILED);
    eventEmitter.addListener(LP_BN_ON_AD_LOAD_FAILED, (errorObj: unknown) =>
      listener(decode(ironSourceErrorCodec, errorObj))
    );
  },
  removeListener: () => eventEmitter.removeAllListeners(LP_BN_ON_AD_LOAD_FAILED),
};

/**
 * Android: onAdClicked
 *     iOS:
 */
const onAdClicked = {
  setListener: (listener: (adInfo: IronSourceAdInfo) => void) => {
    eventEmitter.removeAllListeners(LP_BN_ON_AD_CLICKED);
    eventEmitter.addListener(LP_BN_ON_AD_CLICKED, (adInfoObj: unknown) => {
      listener(decode(ironSourceAdInfoCodec, adInfoObj));
    });
  },
  removeListener: () => eventEmitter.removeAllListeners(LP_BN_ON_AD_CLICKED),
};

/**
 * Android: onAdScreenPresented
 *     iOS:
 */
const onAdScreenPresented = {
  setListener: (listener: (adInfo: IronSourceAdInfo) => void) => {
    eventEmitter.removeAllListeners(LP_BN_ON_AD_SCREEN_PRESENTED);
    eventEmitter.addListener(
      LP_BN_ON_AD_SCREEN_PRESENTED,
      (adInfoObj: unknown) => {
        listener(decode(ironSourceAdInfoCodec, adInfoObj));
      }
    );
  },
  removeListener: () => eventEmitter.removeAllListeners(LP_BN_ON_AD_SCREEN_PRESENTED),
};

/**
 * Android: onAdScreenDismissed
 *     iOS:
 */
const onAdScreenDismissed = {
  setListener: (listener: (adInfo: IronSourceAdInfo) => void) => {
    eventEmitter.removeAllListeners(LP_BN_ON_AD_SCREEN_DISMISSED);
    eventEmitter.addListener(
      LP_BN_ON_AD_SCREEN_DISMISSED,
      (adInfoObj: unknown) => {
        listener(decode(ironSourceAdInfoCodec, adInfoObj));
      }
    );
  },
  removeListener: () => eventEmitter.removeAllListeners(LP_BN_ON_AD_SCREEN_DISMISSED),
};

/**
 * Android: onAdLeftApplication
 *     iOS:
 *
 * Called when a user would be taken out of the application context.
 */
const onAdLeftApplication = {
  setListener: (listener: (adInfo: IronSourceAdInfo) => void) => {
    eventEmitter.removeAllListeners(LP_BN_ON_AD_LEFT_APPLICATION);
    eventEmitter.addListener(
      LP_BN_ON_AD_LEFT_APPLICATION,
      (adInfoObj: unknown) => {
        listener(decode(ironSourceAdInfoCodec, adInfoObj));
      }
    );
  },
  removeListener: () => eventEmitter.removeAllListeners(LP_BN_ON_AD_LEFT_APPLICATION),
};

const removeAllListeners = () => {
  onAdLoaded.removeListener();
  onAdLoadFailed.removeListener();
  onAdClicked.removeListener();
  onAdScreenPresented.removeListener();
  onAdScreenDismissed.removeListener();
  onAdLeftApplication.removeListener();
};

/**
 * @deprecated This module [LevelPlayBannerEvents] is deprecated and will be removed in future releases.
 * Use IronSource.setLevelPlayBannerListener instead.
 * 
 * Migration example:
 * 
 * Before:
 * 
 * import { LevelPlayBannerEvents } from 'ironsource-mediation';
 * 
 * LevelPlayBannerEvents.onAdLoaded.setListener(yourListener);
 * // Rest of listeners...
 * 
 * After:
 * 
 * import { IronSource } from 'ironsource-mediation';
 * 
 * const listener: LevelPlayBannerListener = {
 *   onAdLoaded: (adInfo: IronSourceAdInfo) => {},
 *   onAdLoadFailed: (error: IronSourceError) => {},
 *   onAdClicked: (adInfo: IronSourceAdInfo) => {},
 *   onAdScreenPresented: (adInfo: IronSourceAdInfo) => {},
 *   onAdScreenDismissed: (adInfo: IronSourceAdInfo) => {},
 *   onAdLeftApplication: (adInfo: IronSourceAdInfo) => {},
 * }
 * IronSource.setLevelPlayBannerListener(listener);
 */
export const LevelPlayBannerEvents = {
  onAdLoaded,
  onAdLoadFailed,
  onAdClicked,
  onAdScreenPresented,
  onAdScreenDismissed,
  onAdLeftApplication,
  removeAllListeners,
};
