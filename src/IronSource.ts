/**
 * This is the main IronSource bridge module.
 */

import { NativeModules, Platform } from 'react-native'
import { setPluginData } from './config/IronSourceConfig'
import {
  ANDROID_SDK_VERSION,
  IOS_SDK_VERSION,
  PLUGIN_TYPE,
  PLUGIN_VERSION,
} from './IronSourceConstants'
import type {
  AdUnit,
  IronSourceBannerOptions,
  IronSourceRVPlacement,
  IronSourceSegment,
} from './models'

/** Types =======================================================================**/

/**
 * Native Module Type
 * Descriptions show the function names of native SDKs.
 */
type IronSourceNativeModuleType = {
  /** Base API =============================================================**/

  /**
   * Android: getAdvertiserId
   *     iOS: advertiserId
   */
  getAdvertiserId(): Promise<string | null>

  /**
   * Android: validateIntegration
   *     iOS: validateIntegration
   */
  validateIntegration(): Promise<void>

  /**
   * Android: shouldTrackNetworkState
   *     iOS: shouldTrackReachability
   */
  shouldTrackNetworkState(isEnabled: boolean): Promise<void>

  /**
   * Android: setDynamicUserId
   *     iOS: setDynamicUserId
   *
   * For RV server-to-server callback.
   * Must be set before showRV.
   */
  setDynamicUserId(userId: string): Promise<void>

  /**
   * Android: setAdaptersDebug
   *     iOS: setAdaptersDebug
   */
  setAdaptersDebug(isEnabled: boolean): Promise<void>

  /**
   * Android: setConsent
   *     iOS: setConsent
   */
  setConsent(isConsent: boolean): Promise<void>

  /**
   * Android: setMetaData
   *     iOS: setMetaDataWithKey
   */
  setMetaData(key: string, values: Array<string>): Promise<void>

  /**
   * Android: setSegment
   *     iOS: setSegment
   */
  setSegment(segment: IronSourceSegment): Promise<void>

  /**
   * Android: launchTestSuite
   *     iOS: launchTestSuite
   */
  launchTestSuite(): Promise<void>

  /**
   * Android: setWaterfallConfiguration
   *     iOS: setWaterfallConfiguration
   */
  setWaterfallConfiguration(
    ceiling: number,
    floor: number,
    adUnit: AdUnit
  ): Promise<void>

  /**
   * Android: clearWaterfallConfiguration
   *     iOS: clearWaterfallConfiguration
   */
  clearWaterfallConfiguration(adUnit: AdUnit): Promise<void>

  /** init API =============================================================**/

  /**
   * Android: setUserId
   *     iOS: setUserId
   *
   * When an empty string was passed as userId, SDK falls back to default.
   */
  setUserId(userId: string): Promise<void>

  /**
   * Android: init
   *     iOS: initWithAppKey
   *
   * Use init to init with all ad units.
   * Use initWithAdUnits to init with only specific ad units.
   */
  init(appKey: string): Promise<void>
  initWithAdUnits(appKey: string, adUnits: Array<AdUnit>): Promise<void>

  /** Rewarded Video API ===============================================================**/

  /**
   * Android: showRewardedVideo
   *     iOS: showRewardedVideoWithViewController
   */
  showRewardedVideo(): Promise<void>
  showRewardedVideoForPlacement(placementName: string): Promise<void>

  /**
   * Android: isRewardedVideoAvailable
   *     iOS: hasRewardedVideo
   */
  isRewardedVideoAvailable(): Promise<boolean>

  /**
   * Android: getRewardedVideoPlacementInfo
   *     iOS: rewardedVideoPlacementInfo
   *
   * Must be called after init success, otherwise returns null.
   * This defaults back to DefaultPlacement if none matched.
   */
  getRewardedVideoPlacementInfo(
    placementName: string
  ): Promise<IronSourceRVPlacement | undefined>

  /**
   * Android: isRewardedVideoPlacementCapped
   *     iOS: isRewardedVideoCappedForPlacement
   *
   * If none matches with the name, returns false.
   */
  isRewardedVideoPlacementCapped(placementName: string): Promise<boolean>

  /**
   * Android: setRewardedVideoServerParameters
   *     iOS: setRewardedVideoServerParameters
   *
   * Must be called before showRewardedVideo
   */
  setRewardedVideoServerParams(params: { [key: string]: string }): Promise<void>

  /**
   * Android: clearRewardedVideoServerParameters
   *     iOS: clearRewardedVideoServerParameters
   */
  clearRewardedVideoServerParams(): Promise<void>

  /**
   * Must be called before init.
   * Android: setManualLoadRewardedVideo
   *     iOS: setRewardedVideoManualDelegate
   */
  setManualLoadRewardedVideo(): Promise<void>

  /**
   * For Manual Load RV mode
   * Android: loadRewardedVideo
   *     iOS: loadRewardedVideo
   */
  loadRewardedVideo(): Promise<void>

  /** Interstitial API ===============================================================**/

  /**
   * Android: loadInterstitial
   *     iOS: loadInterstitial
   */
  loadInterstitial(): Promise<void>

  /**
   * Android: showInterstitial
   *     iOS: showInterstitialWithViewController
   */
  showInterstitial(): Promise<void>
  showInterstitialForPlacement(placementName: string): Promise<void>

  /**
   * Android: isInterstitialReady
   *     iOS: hasInterstitial
   */
  isInterstitialReady(): Promise<boolean>

  /**
   * Android: isInterstitialPlacementCapped
   *     iOS: isInterstitialCappedForPlacement
   */
  isInterstitialPlacementCapped(placementName: string): Promise<boolean>

  /** Banner API ===============================================================**/

  /**
   * Android: loadBanner
   *     iOS: loadBannerWithViewController
   *
   * It falls back to BANNER in the case of invalid sizeDescriptions.
   */
  loadBanner(options: IronSourceBannerOptions): Promise<void>

  /**
   * Android: destroyBanner
   *     iOS: destroyBanner
   */
  destroyBanner(): Promise<void>

  /**
   * Android: n/a
   *     iOS: n/a
   *
   * This simply changes the visibility of the hidden banner view.
   */
  displayBanner(): Promise<void>

  /**
   * Android: n/a
   *     iOS: n/a
   * This simply changes the visibility of the banner view.
   * Reloading does not take place while it's hidden.
   */
  hideBanner(): Promise<void>

  /**
   * Android: isBannerPlacementCapped
   *     iOS: isBannerCappedForPlacement
   */
  isBannerPlacementCapped(placementName: string): Promise<boolean>

  /**
   * Android: getMaximalAdaptiveHeight
   *     iOS: getMaximalAdaptiveHeight
   */
  getMaximalAdaptiveHeight(width: number): Promise<number>

  /** OW API ===============================================================**/

  /**
   * Android: showOfferwall
   *     iOS: showOfferwallWithViewController
   */
  showOfferwall(): Promise<void>
  showOfferwallForPlacement(placementName: string): Promise<void>

  /**
   * Android: getOfferwallCredits
   *     iOS: offerwallCredits
   *
   * Credit info will be notified through the OW Events listener.
   */
  getOfferwallCredits(): Promise<void>

  /**
   * Android: isOfferwallAvailable
   *     iOS: hasOfferwall
   */
  isOfferwallAvailable(): Promise<boolean>

  /**
   * Android: setClientSideCallbacks
   *     iOS: setUseClientSideCallbacks
   *
   * This must be called before init.
   * OW client side automatic result polling
   * https://developers.is.com/ironsource-mobile/android/offerwall-integration-android/#step-3
   */
  setClientSideCallbacks(isEnabled: boolean): Promise<void>

  /**
   * Android: setOfferwallCustomParams
   *     iOS: setOfferwallCustomParameters
   *
   * This must be called before showOfferwall.
   */
  setOfferwallCustomParams(params: { [key: string]: string }): Promise<void>

  /** iOS ConversionValue API ========================================================**/

  /**
   * Android: n/a
   *     iOS: getConversionValue
   *
   * Returns undefined for Android
   */
  getConversionValue(): Promise<number | undefined>

  /** iOS ConsentView API ============================================================**/
  /**
   * Android: n/a
   *     iOS: loadConsentViewWithType
   *
   * use "pre" for all your consentViewType
   * https://developers.is.com/ironsource-mobile/ios/permission-popup-ios/#step-1
   */
  loadConsentViewWithType(consentViewType: string): Promise<void>

  /**
   * Android: n/a
   *     iOS: showConsentViewWithType
   *
   * use "pre" for all your consentViewType
   * https://developers.is.com/ironsource-mobile/ios/permission-popup-ios/#step-1
   */
  showConsentViewWithType(consentViewType: string): Promise<void>
}

/**
 * These are needed since ReactNative NativeModules does not support function overload or optional arguments.
 */
type InitFunction = (appKey: string, adUnits?: Array<AdUnit>) => Promise<void>
type ShowFunction = (placementName?: string) => Promise<void>
type IronSourceProxyType = {
  /**
   * Android: init
   *     iOS: initWithAppKey
   */
  init: InitFunction
  /**
   * Android: showRewardedVideo
   *     iOS: showRewardedVideoWithViewController
   */
  showRewardedVideo: ShowFunction
  /**
   * Android: showInterstitial
   *     iOS: showInterstitialWithViewController
   */
  showInterstitial: ShowFunction
  /**
   * Android: showOfferwall
   *     iOS: showOfferwallWithViewController
   */
  showOfferwall: ShowFunction
}

type UtilFunctions = {
  getPluginVersion: () => string
  getNativeSDKVersion: () => string
}

/**
 * Exposed Module Type
 */
type IronSourceType = UtilFunctions &
  IronSourceProxyType &
  Omit<
    IronSourceNativeModuleType,
    | 'init'
    | 'initWithAdUnits'
    | 'showRewardedVideo'
    | 'showRewardedVideoForPlacement'
    | 'showInterstitial'
    | 'showInterstitialForPlacement'
    | 'showOfferwall'
    | 'showOfferwallForPlacement'
  >

/** Util  =========================================================================**/
const getReactNativeVersion = (): string => {
  let version = ''
  try {
    version = require('react-native/package.json').version as string
  } catch (e) {
    console.warn('IronSource - failed to get the ReactNative version')
  } finally {
    return version
  }
}

const getPluginVersion: () => string = () => {
  return PLUGIN_VERSION
}

const getNativeSDKVersion: () => string = () => {
  return Platform.OS === 'android'
    ? ANDROID_SDK_VERSION
    : Platform.OS === 'ios'
    ? IOS_SDK_VERSION
    : 'unsupported'
}

/** Module  =======================================================================**/
const { IronSourceMediation } = NativeModules
const IronSourceNativeModule: IronSourceNativeModuleType = IronSourceMediation

/**
 * Proxy Functions
 */

const init: InitFunction = async (
  appKey: string,
  adUnits?: Array<AdUnit>
): Promise<void> => {
  try {
    const reactNativeVersion = getReactNativeVersion()
    console.log('reactNativeVersion', reactNativeVersion) // TODO: delete
    // set plugin data
    await setPluginData(PLUGIN_TYPE, PLUGIN_VERSION, reactNativeVersion)
  } catch (e) {
    // log?
    console.warn('failed to set plugin data')
  }

  // init
  return adUnits === undefined || adUnits.length === 0
    ? IronSourceNativeModule.init(appKey)
    : IronSourceNativeModule.initWithAdUnits(appKey, adUnits)
}

const showRewardedVideo: ShowFunction = async (
  placementName?: string
): Promise<void> => {
  return placementName === undefined
    ? IronSourceNativeModule.showRewardedVideo()
    : IronSourceNativeModule.showRewardedVideoForPlacement(placementName)
}

const showInterstitial: ShowFunction = async (
  placementName?: string
): Promise<void> => {
  return placementName === undefined
    ? IronSourceNativeModule.showInterstitial()
    : IronSourceNativeModule.showInterstitialForPlacement(placementName)
}

const showOfferwall: ShowFunction = async (
  placementName?: string
): Promise<void> => {
  return placementName === undefined
    ? IronSourceNativeModule.showOfferwall()
    : IronSourceNativeModule.showOfferwallForPlacement(placementName)
}

/**
 * iOS specific function stubs for Android.
 * No rejects for now in the case of these being called on Android.
 */
const IOSMethodStubs = {
  /** iOS ConversionValue API ========================================================**/
  getConversionValue: () => Promise.resolve(undefined),
  /** iOS ConsentView API ============================================================**/
  loadConsentViewWithType: (_: string) => Promise.resolve(),
  showConsentViewWithType: (_: string) => Promise.resolve(),
}

/**
 * Exposed Module
 */
const mergedModule: IronSourceType = {
  ...IronSourceMediation,
  getPluginVersion,
  getNativeSDKVersion,
  init,
  showRewardedVideo,
  showInterstitial,
  showOfferwall,
}

export const IronSource: Readonly<IronSourceType> = Object.freeze(
  Platform.OS === 'ios'
    ? mergedModule
    : // overwrite stub iOS related methods
      { ...mergedModule, ...IOSMethodStubs }
)
