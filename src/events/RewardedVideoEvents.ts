import { NativeEventEmitter, NativeModules } from 'react-native'
import {
  ironSourceErrorCodec,
  ironSourceRVPlacementCodec,
  IronSourceError,
  IronSourceRVPlacement,
} from '../models'
import { availabilityCodec } from '../models/Availability'
import { decode } from '../models/utils'

// The Main Module
const { IronSourceMediation } = NativeModules
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
  ON_RV_AD_LOAD_FAILED,
} = IronSourceMediation.getConstants()

// Create an EventEmitter to subscribe to RewardedVideoListener callbacks
const eventEmitter = new NativeEventEmitter(IronSourceMediation)

/**
 * RV Listener Callback Events Handler APIs
 */

/**
 * Android: onRewardedVideoAdOpened
 *     iOS: rewardedVideoDidOpen
 */
const onRewardedVideoAdOpened = {
  setListener: (listener: () => void) => {
    eventEmitter.removeAllListeners(ON_RV_AD_OPENED)
    eventEmitter.addListener(ON_RV_AD_OPENED, () => listener())
  },
  removeListener: () => eventEmitter.removeAllListeners(ON_RV_AD_OPENED),
}

/**
 * Android: onRewardedVideoAdClosed
 *     iOS: rewardedVideoDidClose
 */
const onRewardedVideoAdClosed = {
  setListener: (listener: () => void) => {
    eventEmitter.removeAllListeners(ON_RV_AD_CLOSED)
    eventEmitter.addListener(ON_RV_AD_CLOSED, () => listener())
  },
  removeListener: () => eventEmitter.removeAllListeners(ON_RV_AD_CLOSED),
}

/**
 * Android: onRewardedVideoAvailabilityChanged
 *     iOS: rewardedVideoHasChangedAvailability
 */
const onRewardedVideoAvailabilityChanged = {
  setListener: (listener: (isAvailable: boolean) => void) => {
    eventEmitter.removeAllListeners(ON_RV_AVAILABILITY_CHANGED)
    eventEmitter.addListener(
      ON_RV_AVAILABILITY_CHANGED,
      (availabilityObj: unknown) => {
        const { isAvailable } = decode(availabilityCodec, availabilityObj)
        listener(isAvailable)
      }
    )
  },
  removeListener: () =>
    eventEmitter.removeAllListeners(ON_RV_AVAILABILITY_CHANGED),
}

/**
 * Android: onRewardedVideoAdStarted
 *     iOS: rewardedVideoDidStart
 */
const onRewardedVideoAdStarted = {
  setListener: (listener: () => void) => {
    eventEmitter.removeAllListeners(ON_RV_AD_STARTED)
    eventEmitter.addListener(ON_RV_AD_STARTED, () => listener())
  },
  removeListener: () => eventEmitter.removeAllListeners(ON_RV_AD_STARTED),
}

/**
 * Android: onRewardedVideoAdEnded
 *     iOS: rewardedVideoDidEnd
 */
const onRewardedVideoAdEnded = {
  setListener: (listener: () => void) => {
    eventEmitter.removeAllListeners(ON_RV_AD_ENDED)
    eventEmitter.addListener(ON_RV_AD_ENDED, () => listener())
  },
  removeListener: () => eventEmitter.removeAllListeners(ON_RV_AD_ENDED),
}

/**
 * Android: onRewardedVideoAdRewarded
 *     iOS: didReceiveRewardForPlacement
 */
const onRewardedVideoAdRewarded = {
  setListener: (listener: (placement: IronSourceRVPlacement) => void) => {
    eventEmitter.removeAllListeners(ON_RV_AD_REWARDED)
    eventEmitter.addListener(ON_RV_AD_REWARDED, (placementObj: unknown) =>
      listener(decode(ironSourceRVPlacementCodec, placementObj))
    )
  },
  removeListener: () => eventEmitter.removeAllListeners(ON_RV_AD_REWARDED),
}

/**
 * Android: onRewardedVideoAdShowFailed
 *     iOS: rewardedVideoDidFailToShowWithError
 */
const onRewardedVideoAdShowFailed = {
  setListener: (listener: (error: IronSourceError) => void) => {
    eventEmitter.removeAllListeners(ON_RV_AD_SHOW_FAILED)
    eventEmitter.addListener(ON_RV_AD_SHOW_FAILED, (errorObj: unknown) =>
      listener(decode(ironSourceErrorCodec, errorObj))
    )
  },
  removeListener: () => eventEmitter.removeAllListeners(ON_RV_AD_SHOW_FAILED),
}

/**
 * Android: onRewardedVideoAdClicked
 *     iOS: didClickRewardedVideo
 */
const onRewardedVideoAdClicked = {
  setListener: (listener: (placement: IronSourceRVPlacement) => void) => {
    eventEmitter.removeAllListeners(ON_RV_AD_CLICKED)
    eventEmitter.addListener(ON_RV_AD_CLICKED, (placementObj: unknown) =>
      listener(decode(ironSourceRVPlacementCodec, placementObj))
    )
  },
  removeListener: () => {
    eventEmitter.removeAllListeners(ON_RV_AD_CLICKED)
  },
}

/**
 * Manual Load RV
 * Android: onRewardedVideoAdReady
 *     iOS: rewardedVideoDidLoad
 */
const onRewardedVideoAdReady = {
  setListener: (listener: () => void) => {
    eventEmitter.removeAllListeners(ON_RV_AD_READY)
    eventEmitter.addListener(ON_RV_AD_READY, () => listener())
  },
  removeListener: () => {
    eventEmitter.removeAllListeners(ON_RV_AD_CLICKED)
  },
}

/**
 * Manual Load RV
 * Android: onRewardedVideoAdLoadFailed
 *     iOS: rewardedVideoDidFailToLoadWithError
 */
const onRewardedVideoAdLoadFailed = {
  setListener: (listener: (error: IronSourceError) => void) => {
    eventEmitter.removeAllListeners(ON_RV_AD_LOAD_FAILED)
    eventEmitter.addListener(ON_RV_AD_LOAD_FAILED, (errorObj: unknown) =>
      listener(decode(ironSourceErrorCodec, errorObj))
    )
  },
  removeListener: () => eventEmitter.removeAllListeners(ON_RV_AD_LOAD_FAILED),
}

const removeAllListeners = () => {
  onRewardedVideoAdOpened.removeListener()
  onRewardedVideoAdClosed.removeListener()
  onRewardedVideoAvailabilityChanged.removeListener()
  onRewardedVideoAdStarted.removeListener()
  onRewardedVideoAdEnded.removeListener()
  onRewardedVideoAdRewarded.removeListener()
  onRewardedVideoAdShowFailed.removeListener()
  onRewardedVideoAdClicked.removeListener()
  onRewardedVideoAdReady.removeListener()
  onRewardedVideoAdLoadFailed.removeListener()
}

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
  removeAllListeners,
}
