import { NativeEventEmitter, NativeModules } from 'react-native'
import { errorAdInfoCodec } from '../models/nestedCodecs'
import {
  ironSourceErrorCodec,
  IronSourceError,
  IronSourceAdInfo,
  ironSourceAdInfoCodec,
} from '../models'
import { decode } from '../models/utils'

// The Main Module
const { IronSourceMediation } = NativeModules
// Event Name Constants defined on each platform
const {
  LP_IS_ON_AD_READY,
  LP_IS_ON_AD_LOAD_FAILED,
  LP_IS_ON_AD_OPENED,
  LP_IS_ON_AD_CLOSED,
  LP_IS_ON_AD_SHOW_FAILED,
  LP_IS_ON_AD_CLICKED,
  LP_IS_ON_AD_SHOW_SUCCEEDED,
} = IronSourceMediation.getConstants()

// Create an EventEmitter to subscribe to RewardedVideoListener callbacks
const eventEmitter = new NativeEventEmitter(IronSourceMediation)

/**
 * LevelPlay IS Listener Callback Events Handler APIs
 */

/**
 * Android: onAdAvailable
 *     iOS: didLoadWithAdInfo
 */
const onAdReady = {
  setListener: (listener: (adInfo: IronSourceAdInfo) => void) => {
    eventEmitter.removeAllListeners(LP_IS_ON_AD_READY)
    eventEmitter.addListener(LP_IS_ON_AD_READY, (adInfoObj: unknown) => {
      listener(decode(ironSourceAdInfoCodec, adInfoObj))
    })
  },
  removeListener: () => eventEmitter.removeAllListeners(LP_IS_ON_AD_READY),
}

/**
 * Android: onAdLoadFailed
 *     iOS: didFailToLoadWithError
 */
const onAdLoadFailed = {
  setListener: (listener: (error: IronSourceError) => void) => {
    eventEmitter.removeAllListeners(LP_IS_ON_AD_LOAD_FAILED)
    eventEmitter.addListener(LP_IS_ON_AD_LOAD_FAILED, (errorObj: unknown) =>
      listener(decode(ironSourceErrorCodec, errorObj))
    )
  },
  removeListener: () =>
    eventEmitter.removeAllListeners(LP_IS_ON_AD_LOAD_FAILED),
}

/**
 * Android: onAdOpened
 *     iOS: didOpenWithAdInfo
 */
const onAdOpened = {
  setListener: (listener: (adInfo: IronSourceAdInfo) => void) => {
    eventEmitter.removeAllListeners(LP_IS_ON_AD_OPENED)
    eventEmitter.addListener(LP_IS_ON_AD_OPENED, (adInfoObj: unknown) => {
      listener(decode(ironSourceAdInfoCodec, adInfoObj))
    })
  },
  removeListener: () => eventEmitter.removeAllListeners(LP_IS_ON_AD_OPENED),
}

/**
 * Android: onAdClosed
 *     iOS: didCloseWithAdInfo
 */
const onAdClosed = {
  setListener: (listener: (adInfo: IronSourceAdInfo) => void) => {
    eventEmitter.removeAllListeners(LP_IS_ON_AD_CLOSED)
    eventEmitter.addListener(LP_IS_ON_AD_CLOSED, (adInfoObj: unknown) => {
      listener(decode(ironSourceAdInfoCodec, adInfoObj))
    })
  },
  removeListener: () => eventEmitter.removeAllListeners(LP_IS_ON_AD_CLOSED),
}

/**
 * Android: onAdShowFailed
 *     iOS: didFailToShowWithError
 */
const onAdShowFailed = {
  setListener: (
    listener: (error: IronSourceError, adInfo: IronSourceAdInfo) => void
  ) => {
    eventEmitter.removeAllListeners(LP_IS_ON_AD_SHOW_FAILED)
    eventEmitter.addListener(LP_IS_ON_AD_SHOW_FAILED, (obj: unknown) => {
      const { error, adInfo } = decode(errorAdInfoCodec, obj)
      listener(error, adInfo)
    })
  },
  removeListener: () =>
    eventEmitter.removeAllListeners(LP_IS_ON_AD_SHOW_FAILED),
}

/**
 * Android: onAdClicked
 *     iOS: didFailToShowWithError
 */
const onAdClicked = {
  setListener: (listener: (adInfo: IronSourceAdInfo) => void) => {
    eventEmitter.removeAllListeners(LP_IS_ON_AD_CLICKED)
    eventEmitter.addListener(LP_IS_ON_AD_CLICKED, (adInfoObj: unknown) => {
      listener(decode(ironSourceAdInfoCodec, adInfoObj))
    })
  },
  removeListener: () => eventEmitter.removeAllListeners(LP_IS_ON_AD_CLICKED),
}

/**
 * Android: onAdShowSucceeded
 *     iOS: didShowWithAdInfo
 */
const onAdShowSucceeded = {
  setListener: (listener: (adInfo: IronSourceAdInfo) => void) => {
    eventEmitter.removeAllListeners(LP_IS_ON_AD_SHOW_SUCCEEDED)
    eventEmitter.addListener(
      LP_IS_ON_AD_SHOW_SUCCEEDED,
      (adInfoObj: unknown) => {
        listener(decode(ironSourceAdInfoCodec, adInfoObj))
      }
    )
  },
  removeListener: () => {
    eventEmitter.removeAllListeners(LP_IS_ON_AD_SHOW_SUCCEEDED)
  },
}

const removeAllListeners = () => {
  onAdReady.removeListener()
  onAdLoadFailed.removeListener()
  onAdOpened.removeListener()
  onAdClosed.removeListener()
  onAdShowFailed.removeListener()
  onAdClicked.removeListener()
  onAdShowSucceeded.removeListener()
}

export const LevelPlayInterstitialEvents = {
  onAdReady,
  onAdLoadFailed,
  onAdOpened,
  onAdClosed,
  onAdShowFailed,
  onAdClicked,
  onAdShowSucceeded,
  removeAllListeners,
}
