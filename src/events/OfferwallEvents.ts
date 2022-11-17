import { NativeEventEmitter, NativeModules } from 'react-native'
import {
  IronSourceError,
  ironSourceErrorCodec,
  IronSourceOWCreditInfo,
} from '../models'
import { availabilityCodec } from '../models/Availability'
import { decode } from '../models/utils'

// The Main Module
const { IronSourceMediation } = NativeModules
// Event Name Constants defined on each platform
const {
  ON_OW_AVAILABILITY_CHANGED,
  ON_OW_OPENED,
  ON_OW_SHOW_FAILED,
  ON_OW_AD_CREDITED,
  ON_OW_CREDITS_FAILED,
  ON_OW_CLOSED,
} = IronSourceMediation.getConstants()

// Create an EventEmitter to subscribe to OfferwallListener callbacks
const eventEmitter = new NativeEventEmitter(IronSourceMediation)

/**
 * OW Listener Callback Events Handler APIs
 */

/**
 * Android: onOfferwallAvailabilityChanged
 *     iOS: offerwallHasChangedAvailability
 */
const onOfferwallAvailabilityChanged = {
  setListener: (listener: (isAvailable: boolean) => void) => {
    eventEmitter.removeAllListeners(ON_OW_AVAILABILITY_CHANGED)
    eventEmitter.addListener(
      ON_OW_AVAILABILITY_CHANGED,
      (availabilityObj: unknown) => {
        const { isAvailable } = decode(availabilityCodec, availabilityObj)
        listener(isAvailable)
      }
    )
  },
  removeListener: () =>
    eventEmitter.removeAllListeners(ON_OW_AVAILABILITY_CHANGED),
}

/**
 * Android: onOfferwallOpened
 *     iOS: offerwallDidShow
 */
const onOfferwallOpened = {
  setListener: (listener: () => void) => {
    eventEmitter.removeAllListeners(ON_OW_OPENED)
    eventEmitter.addListener(ON_OW_OPENED, () => listener())
  },
  removeListener: () => eventEmitter.removeAllListeners(ON_OW_OPENED),
}

/**
 * Android: onOfferwallShowFailed
 *     iOS: offerwallDidFailToShowWithError
 */
const onOfferwallShowFailed = {
  setListener: (listener: (error: IronSourceError) => void) => {
    eventEmitter.removeAllListeners(ON_OW_SHOW_FAILED)
    eventEmitter.addListener(ON_OW_SHOW_FAILED, (error: IronSourceError) =>
      listener(error)
    )
  },
  removeListener: () => eventEmitter.removeAllListeners(ON_OW_SHOW_FAILED),
}

/**
 * Android: onOfferwallAdCredited
 *     iOS: didReceiveOfferwallCredits
 */
const onOfferwallAdCredited = {
  setListener: (listener: (creditInfo: IronSourceOWCreditInfo) => void) => {
    eventEmitter.removeAllListeners(ON_OW_AD_CREDITED)
    eventEmitter.addListener(
      ON_OW_AD_CREDITED,
      (creditInfo: IronSourceOWCreditInfo) => listener(creditInfo)
    )
  },
  removeListener: () => eventEmitter.removeAllListeners(ON_OW_AD_CREDITED),
}

/**
 * Android: onGetOfferwallCreditsFailed
 *     iOS: didFailToReceiveOfferwallCreditsWithError
 */
const onGetOfferwallCreditsFailed = {
  setListener: (listener: (error: IronSourceError) => void) => {
    eventEmitter.removeAllListeners(ON_OW_CREDITS_FAILED)
    eventEmitter.addListener(ON_OW_CREDITS_FAILED, (errorObj: unknown) =>
      listener(decode(ironSourceErrorCodec, errorObj))
    )
  },
  removeListener: () => eventEmitter.removeAllListeners(ON_OW_CREDITS_FAILED),
}

/**
 * Android: onOfferwallClosed
 *     iOS: offerwallDidClose
 */
const onOfferwallClosed = {
  setListener: (listener: () => void) => {
    eventEmitter.removeAllListeners(ON_OW_CLOSED)
    eventEmitter.addListener(ON_OW_CLOSED, () => listener())
  },
  removeListener: () => eventEmitter.removeAllListeners(ON_OW_CLOSED),
}

const removeAllListeners = () => {
  onOfferwallAvailabilityChanged.removeListener()
  onOfferwallOpened.removeListener()
  onOfferwallShowFailed.removeListener()
  onOfferwallAdCredited.removeListener()
  onGetOfferwallCreditsFailed.removeListener()
  onOfferwallClosed.removeListener()
}

export const OfferwallEvents = {
  onOfferwallAvailabilityChanged,
  onOfferwallOpened,
  onOfferwallShowFailed,
  onOfferwallAdCredited,
  onGetOfferwallCreditsFailed,
  onOfferwallClosed,
  removeAllListeners,
}
