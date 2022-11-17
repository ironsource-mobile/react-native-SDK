import { NativeEventEmitter, NativeModules } from 'react-native'
import { impressionDataCodec, ImpressionData } from '../models'
import { decode } from '../models/utils'

// The Main Module
const { IronSourceMediation } = NativeModules
// Event Name Constants defined on each platform
const { ON_IMPRESSION_SUCCESS } = IronSourceMediation.getConstants()

// Create an EventEmitter to subscribe to ImpressionDataListener callbacks
const eventEmitter = new NativeEventEmitter(IronSourceMediation)

/**
 * ARM ImpressionDataListener event API
 * The ARM SDK Postbacks flag must be enabled to receive data
 * https://developers.is.com/ironsource-mobile/general/ad-revenue-measurement-postbacks/#step-1
 */

/**
 * Android: onImpressionSuccess
 *     iOS: impressionDataDidSucceed
 */
const onImpressionSuccess = {
  setListener: (listener: (data?: ImpressionData) => void) => {
    eventEmitter.removeAllListeners(ON_IMPRESSION_SUCCESS)
    eventEmitter.addListener(ON_IMPRESSION_SUCCESS, (dataObj?: unknown) =>
      listener(dataObj ? decode(impressionDataCodec, dataObj) : undefined)
    )
  },
  removeListener: () => eventEmitter.removeAllListeners(ON_IMPRESSION_SUCCESS),
}

const removeAllListeners = () => {
  onImpressionSuccess.removeListener()
}

export const ImpressionDataEvents = {
  onImpressionSuccess,
  removeAllListeners,
}
