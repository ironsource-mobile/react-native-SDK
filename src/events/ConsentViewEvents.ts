import { NativeEventEmitter, NativeModules, Platform } from 'react-native'
import { ConsentViewError, consentViewErrorCodec } from '../models'
import { consentViewInfoCodec } from '../models/ConsentViewInfo'
import { decode } from '../models/utils'

// The Main Module
const { IronSourceMediation } = NativeModules
// Event Name Constants defined on iOS platform
// These would be undefined on Android.
const {
  CONSENT_VIEW_DID_LOAD_SUCCESS,
  CONSENT_VIEW_DID_FAIL_TO_LOAD,
  CONSENT_VIEW_DID_SHOW_SUCCESS,
  CONSENT_VIEW_DID_FAIL_TO_SHOW,
  CONSENT_VIEW_DID_ACCEPT,
} = IronSourceMediation.getConstants()

// Create an EventEmitter to subscribe to ConsentView delegate callbacks
const eventEmitter = new NativeEventEmitter(IronSourceMediation)

// Stub out for Android
const NotIOS = Platform.OS !== 'ios'
const NonIOSStub = {
  setListener: (_: any) => console.error('Only supported for iOS.'),
  removeListener: () => console.error('Only supported for iOS.'),
}

/**
 * iOS 14 ConsentView events API
 * Only fired on iOS
 */

/**
 * Android: n/a
 *     iOS: consentViewDidLoadSuccess
 */
const consentViewDidLoadSuccess = NotIOS
  ? NonIOSStub
  : {
      setListener: (listener: (consentViewType: string) => void) => {
        eventEmitter.removeAllListeners(CONSENT_VIEW_DID_LOAD_SUCCESS)
        eventEmitter.addListener(
          CONSENT_VIEW_DID_LOAD_SUCCESS,
          (consentViewInfoObj: unknown) => {
            const { consentViewType } = decode(
              consentViewInfoCodec,
              consentViewInfoObj
            )
            listener(consentViewType)
          }
        )
      },
      removeListener: () =>
        eventEmitter.removeAllListeners(CONSENT_VIEW_DID_LOAD_SUCCESS),
    }

/**
 * Android: n/a
 *     iOS: consentViewDidFailToLoadWithError
 */
const consentViewDidFailToLoad = NotIOS
  ? NonIOSStub
  : {
      setListener: (listener: (error: ConsentViewError) => void) => {
        eventEmitter.removeAllListeners(CONSENT_VIEW_DID_FAIL_TO_LOAD)
        eventEmitter.addListener(
          CONSENT_VIEW_DID_FAIL_TO_LOAD,
          (errorObj: unknown) =>
            listener(decode(consentViewErrorCodec, errorObj))
        )
      },
      removeListener: () =>
        eventEmitter.removeAllListeners(CONSENT_VIEW_DID_FAIL_TO_LOAD),
    }

/**
 * Android: n/a
 *     iOS: consentViewDidShowSuccess
 */
const consentViewDidShowSuccess = NotIOS
  ? NonIOSStub
  : {
      setListener: (listener: (consentViewType: string) => void) => {
        eventEmitter.removeAllListeners(CONSENT_VIEW_DID_SHOW_SUCCESS)
        eventEmitter.addListener(
          CONSENT_VIEW_DID_SHOW_SUCCESS,
          (consentViewInfoObj: unknown) => {
            const { consentViewType } = decode(
              consentViewInfoCodec,
              consentViewInfoObj
            )
            listener(consentViewType)
          }
        )
      },
      removeListener: () =>
        eventEmitter.removeAllListeners(CONSENT_VIEW_DID_SHOW_SUCCESS),
    }

/**
 * Android: n/a
 *     iOS: consentViewDidFailToShowWithError
 */
const consentViewDidFailToShow = NotIOS
  ? NonIOSStub
  : {
      setListener: (listener: (error: ConsentViewError) => void) => {
        eventEmitter.removeAllListeners(CONSENT_VIEW_DID_FAIL_TO_SHOW)
        eventEmitter.addListener(
          CONSENT_VIEW_DID_FAIL_TO_SHOW,
          (errorObj: unknown) =>
            listener(decode(consentViewErrorCodec, errorObj))
        )
      },
      removeListener: () =>
        eventEmitter.removeAllListeners(CONSENT_VIEW_DID_FAIL_TO_SHOW),
    }

/**
 * Android: n/a
 *     iOS: consentViewDidAccept
 */
const consentViewDidAccept = NotIOS
  ? NonIOSStub
  : {
      setListener: (listener: (consentViewType: string) => void) => {
        eventEmitter.removeAllListeners(CONSENT_VIEW_DID_ACCEPT)
        eventEmitter.addListener(
          CONSENT_VIEW_DID_ACCEPT,
          ({ consentViewType }: { consentViewType: string }) =>
            listener(consentViewType)
        )
      },
      removeListener: () =>
        eventEmitter.removeAllListeners(CONSENT_VIEW_DID_ACCEPT),
    }

const removeAllListeners = () => {
  consentViewDidLoadSuccess.removeListener()
  consentViewDidFailToLoad.removeListener()
  consentViewDidShowSuccess.removeListener()
  consentViewDidFailToShow.removeListener()
  consentViewDidAccept.removeListener()
}

export const ConsentViewEvents = {
  consentViewDidLoadSuccess,
  consentViewDidFailToLoad,
  consentViewDidShowSuccess,
  consentViewDidFailToShow,
  consentViewDidAccept,
  removeAllListeners,
}
