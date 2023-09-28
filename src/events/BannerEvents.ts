import { NativeEventEmitter, NativeModules } from 'react-native'
import { IronSourceError, ironSourceErrorCodec } from '../models'
import { decode } from '../models/utils'

// The Main Module
const { IronSourceMediation } = NativeModules
// Event Name Constants defined on each platform
const {
  ON_BN_AD_LOADED,
  ON_BN_AD_LOAD_FAILED,
  ON_BN_AD_CLICKED,
  ON_BN_AD_SCREEN_PRESENTED,
  ON_BN_AD_SCREEN_DISMISSED,
  ON_BN_AD_LEFT_APPLICATION,
} = IronSourceMediation.getConstants()

// Create an EventEmitter to subscribe to BannerListener callbacks
const eventEmitter = new NativeEventEmitter(IronSourceMediation)

/**
 * BN Listener Callback Events Handler APIs
 * These APIs have been deprecated as of SDK 7.3.0. Please use the alternate APIs in LevelPlayBannerEvents instead.
 */

/**
 * Android: onBannerAdLoaded
 *     iOS: bannerDidLoad
 *
 * @deprecated This API has been deprecated as of SDK 7.3.0. Please use the alternate API in LevelPlayBannerEvents instead.
 */
const onBannerAdLoaded = {
  setListener: (listener: () => void) => {
    eventEmitter.removeAllListeners(ON_BN_AD_LOADED)
    eventEmitter.addListener(ON_BN_AD_LOADED, () => listener())
  },
  removeListener: () => eventEmitter.removeAllListeners(ON_BN_AD_LOADED),
}

/**
 * Android: onBannerAdLoadFailed
 *     iOS: bannerDidFailToLoadWithError
 *
 * @deprecated This API has been deprecated as of SDK 7.3.0. Please use the alternate API in LevelPlayBannerEvents instead.
 */
const onBannerAdLoadFailed = {
  setListener: (listener: (error: IronSourceError) => void) => {
    eventEmitter.removeAllListeners(ON_BN_AD_LOAD_FAILED)
    eventEmitter.addListener(ON_BN_AD_LOAD_FAILED, (errorObj: unknown) =>
      listener(decode(ironSourceErrorCodec, errorObj))
    )
  },
  removeListener: () => eventEmitter.removeAllListeners(ON_BN_AD_LOAD_FAILED),
}

/**
 * Android: onBannerAdClicked
 *     iOS: didClickBanner
 *
 * @deprecated This API has been deprecated as of SDK 7.3.0. Please use the alternate API in LevelPlayBannerEvents instead.
 */
const onBannerAdClicked = {
  setListener: (listener: () => void) => {
    eventEmitter.removeAllListeners(ON_BN_AD_CLICKED)
    eventEmitter.addListener(ON_BN_AD_CLICKED, () => listener())
  },
  removeListener: () => eventEmitter.removeAllListeners(ON_BN_AD_CLICKED),
}

/**
 * Android: onBannerAdScreenPresented
 *     iOS: bannerWillPresentScreen
 *
 * @deprecated This API has been deprecated as of SDK 7.3.0. Please use the alternate API in LevelPlayBannerEvents instead.
 */
const onBannerAdScreenPresented = {
  setListener: (listener: () => void) => {
    eventEmitter.removeAllListeners(ON_BN_AD_SCREEN_PRESENTED)
    eventEmitter.addListener(ON_BN_AD_SCREEN_PRESENTED, () => listener())
  },
  removeListener: () =>
    eventEmitter.removeAllListeners(ON_BN_AD_SCREEN_PRESENTED),
}

/**
 * Android: onBannerAdScreenDismissed
 *     iOS: bannerDidDismissScreen
 *
 * @deprecated This API has been deprecated as of SDK 7.3.0. Please use the alternate API in LevelPlayBannerEvents instead.
 */
const onBannerAdScreenDismissed = {
  setListener: (listener: () => void) => {
    eventEmitter.removeAllListeners(ON_BN_AD_SCREEN_DISMISSED)
    eventEmitter.addListener(ON_BN_AD_SCREEN_DISMISSED, () => listener())
  },
  removeListener: () =>
    eventEmitter.removeAllListeners(ON_BN_AD_SCREEN_DISMISSED),
}

/**
 * Android: onBannerAdLeftApplication
 *     iOS: bannerWillLeaveApplication
 *
 * @deprecated This API has been deprecated as of SDK 7.3.0. Please use the alternate API in LevelPlayBannerEvents instead.
 * Called when a user would be taken out of the application context.
 */
const onBannerAdLeftApplication = {
  setListener: (listener: () => void) => {
    eventEmitter.removeAllListeners(ON_BN_AD_LEFT_APPLICATION)
    eventEmitter.addListener(ON_BN_AD_LEFT_APPLICATION, () => listener())
  },
  removeListener: () =>
    eventEmitter.removeAllListeners(ON_BN_AD_LEFT_APPLICATION),
}

/**
 * @deprecated This API has been deprecated as of SDK 7.3.0. Please use the alternate API in LevelPlayBannerEvents instead.
 */
const removeAllListeners = () => {
  onBannerAdLoaded.removeListener()
  onBannerAdLoadFailed.removeListener()
  onBannerAdClicked.removeListener()
  onBannerAdScreenPresented.removeListener()
  onBannerAdScreenDismissed.removeListener()
  onBannerAdLeftApplication.removeListener()
}

/**
 * @deprecated This class has been deprecated as of SDK 7.3.0. Please use LevelPlayBannerEvents instead.
 */
export const BannerEvents = {
  onBannerAdLoaded,
  onBannerAdLoadFailed,
  onBannerAdClicked,
  onBannerAdScreenPresented,
  onBannerAdScreenDismissed,
  onBannerAdLeftApplication,
  removeAllListeners,
}
