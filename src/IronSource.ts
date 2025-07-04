/**
 * This is the main IronSource bridge module.
 */

import { NativeModules, Platform, NativeEventEmitter } from 'react-native'
import {
  ANDROID_SDK_VERSION,
  IOS_SDK_VERSION,
  PLUGIN_TYPE,
  PLUGIN_VERSION,
} from './utils/IronSourceConstants'
import {
  type AdUnit,
  type IronSourceBannerOptions,
  type IronSourceRVPlacement,
  type IronSourceSegment,
} from './models'
import {
  impressionDataFromMap,
  conentViewErrorFromMap,
  ironSourceAdInfoFromMap,
  ironSourceErrorFromMap,
  ironSourceRvPlacementFromMap,
} from './utils/utils';
import type {
  InitializationListener,
  ConsentViewListener,
  ImpressionDataListener,
  LevelPlayBannerListener,
  LevelPlayInterstitialListener,
  LevelPlayRewardedVideoListener,
  LevelPlayRewardedVideoManualListener,
} from './models/listeners'
import { setPluginData } from './utils/IronSourceConfig';

/** Extract IronSourceMediation module **/
const { IronSourceMediation } = NativeModules

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
   *     @deprecated This API will be removed in version 4.0.0.
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
   *@deprecated This API will be removed in version 4.0.0.
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

  /**
   * Android: setClientSideCallbacks
   *     iOS: setUseClientSideCallbacks
   *     @deprecated This API will be removed in version 4.0.0.
   *
   * This must be called before init.
   * OW client side automatic result polling
   * https://developers.is.com/ironsource-mobile/android/offerwall-integration-android/#step-3
   */
  setClientSideCallbacks(isEnabled: boolean): Promise<void>

  /** init API =============================================================**/

  /**
   * Android: setUserId
   *     iOS: setUserId
   *
   * When an empty string was passed as userId, SDK falls back to default.
   * @deprecated This API will be removed in version 4.0.0.
   */
  setUserId(userId: string): Promise<void>

  /**
   * Android: init
   *     iOS: initWithAppKey
   *
   * Use init to init with all ad units.
   * Use initWithAdUnits to init with only specific ad units.
   @deprecated This API will be removed in version 4.0.0.
   */
  init(appKey: string): Promise<void>
  /**
   * 
  @deprecated This API will be removed in version 4.0.0.  
   */
  initWithAdUnits(appKey: string, adUnits: Array<AdUnit>): Promise<void>

  /** Rewarded Video API ===============================================================**/

  /**
   * Android: showRewardedVideo
   *     iOS: showRewardedVideoWithViewController
   *
   * @deprecated Use the alternate API {@link LevelPlayRewardedAd#showAd()} instead.
   */
  showRewardedVideo(): Promise<void>

  /**
   * @deprecated Use the alternate API {@link LevelPlayRewardedAd#showAd(placementName)} instead.
   */
  showRewardedVideoForPlacement(placementName: string): Promise<void>

  /**
   * Android: isRewardedVideoAvailable
   *     iOS: hasRewardedVideo
   *
   * @deprecated Use the alternate API {@link LevelPlayRewardedAd#isAdReady()} instead.
   */
  isRewardedVideoAvailable(): Promise<boolean>

  /**
   * Android: getRewardedVideoPlacementInfo
   *     iOS: rewardedVideoPlacementInfo
   *
   * Must be called after init success, otherwise returns null.
   * This defaults back to DefaultPlacement if none matched.
   *
   * @deprecated This method will be removed in future versions.
   */
  getRewardedVideoPlacementInfo(
    placementName: string
  ): Promise<IronSourceRVPlacement | undefined>

  /**
   * Android: isRewardedVideoPlacementCapped
   *     iOS: isRewardedVideoCappedForPlacement
   *
   * If none matches with the name, returns false.
   *
   * @deprecated Use the alternate API {@link LevelPlayRewardedAd#isPlacementCapped(placementName)} instead.
   */
  isRewardedVideoPlacementCapped(placementName: string): Promise<boolean>

  /**
   * Android: setRewardedVideoServerParameters
   *     iOS: setRewardedVideoServerParameters
   *
   * Must be called before showRewardedVideo
   *
   * @deprecated This method will be removed in future versions.
   */
  setRewardedVideoServerParams(params: { [key: string]: string }): Promise<void>

  /**
   * Android: clearRewardedVideoServerParameters
   *     iOS: clearRewardedVideoServerParameters
   *
   * @deprecated This method will be removed in future versions.
   */
  clearRewardedVideoServerParams(): Promise<void>

  /**
   * For Manual Load RV mode
   * Android: loadRewardedVideo
   *     iOS: loadRewardedVideo
   *
   * @deprecated Use the alternate API {@link LevelPlayRewardedAd#loadAd()} instead.
   */
  loadRewardedVideo(): Promise<void>

  /**
   * Must be called before init.
   * Android: setLevelPlayRewardedVideoManual
   *     iOS: setLevelPlayRewardedVideoManual
   *
   * @deprecated Use the alternate API {@link LevelPlayRewardedAd#setListener(LevelPlayRewardedAdListener)} instead.
   */
  setLevelPlayRewardedVideoManual(): Promise<void>

  /** Interstitial API ===============================================================**/

  /**
   * Android: loadInterstitial
   *     iOS: loadInterstitial
   *
   * @deprecated Use the alternate API {@link LevelPlayInterstitialAd#loadAd()} instead.
   */
  loadInterstitial(): Promise<void>

  /**
   * Android: showInterstitial
   *     iOS: showInterstitialWithViewController
   *
   * @deprecated Use the alternate API {@link LevelPlayInterstitialAd#showAd()} instead.
   */
  showInterstitial(): Promise<void>
  /**
   * @deprecated Use the alternate API {@link LevelPlayInterstitialAd#showAd(placementName)} instead.
   */
  showInterstitialForPlacement(placementName: string): Promise<void>

  /**
   * Android: isInterstitialReady
   *     iOS: hasInterstitial
   *
   * @deprecated Use the alternate API {@link LevelPlayInterstitialAd#isAdReady()} instead.
   */
  isInterstitialReady(): Promise<boolean>

  /**
   * Android: isInterstitialPlacementCapped
   *     iOS: isInterstitialCappedForPlacement
   *
   * @deprecated Use the alternate API {@link LevelPlayInterstitialAd#isPlacementCapped(placementName)} instead.
   */
  isInterstitialPlacementCapped(placementName: string): Promise<boolean>

  /** Banner API ===============================================================**/

  /**
   * Android: loadBanner
   *     iOS: loadBannerWithViewController
   *
   * It falls back to BANNER in the case of invalid sizeDescriptions.
   *
   * @deprecated Use the alternate API {@link LevelPlayBannerAdView#loadAd()} instead.
   */
  loadBanner(options: IronSourceBannerOptions): Promise<void>

  /**
   * Android: destroyBanner
   *     iOS: destroyBanner
   *
   * @deprecated Use the alternate API {@link LevelPlayBannerAdView#destroy()} instead.
   */
  destroyBanner(): Promise<void>

  /**
   * Android: n/a
   *     iOS: n/a
   *
   * This simply changes the visibility of the hidden banner view.
   *
   * @deprecated This method will be removed in future versions.
   */
  displayBanner(): Promise<void>

  /**
   * Android: n/a
   *     iOS: n/a
   * This simply changes the visibility of the banner view.
   * Reloading does not take place while it's hidden.
   *
   * @deprecated This method will be removed in future versions.
   */
  hideBanner(): Promise<void>

  /**
   * Android: isBannerPlacementCapped
   *     iOS: isBannerCappedForPlacement
   *
   * @deprecated Capping is no longer supported for Banners.
   */
  isBannerPlacementCapped(placementName: string): Promise<boolean>

  /**
   * Android: getMaximalAdaptiveHeight
   *     iOS: getMaximalAdaptiveHeight
   *
   * @deprecated This method will be removed in future versions.
   */
  getMaximalAdaptiveHeight(width: number): Promise<number>

  /** iOS ConversionValue API ========================================================**/

  /**
   * Android: n/a
   *     iOS: getConversionValue
   *
   * Returns undefined for Android
   * @deprecated This method will be removed in 4.0.0 version.
   */
  getConversionValue(): Promise<number | undefined>

  /** iOS ConsentView API ============================================================**/
  /**
   * Android: n/a
   *     iOS: loadConsentViewWithType
   *
   * use "pre" for all your consentViewType
   * https://developers.is.com/ironsource-mobile/ios/permission-popup-ios/#step-1
   * @deprecated This method will be removed in 4.0.0 version.
   */
  loadConsentViewWithType(consentViewType: string): Promise<void>

  /**
   * Android: n/a
   *     iOS: showConsentViewWithType
   *
   * use "pre" for all your consentViewType
   * https://developers.is.com/ironsource-mobile/ios/permission-popup-ios/#step-1
   * @deprecated This method will be removed in 4.0.0 version.
   */
  showConsentViewWithType(consentViewType: string): Promise<void>
}

/**
 * These are needed since ReactNative NativeModules does not support function overload or optional arguments.
 * @deprecated This method will be removed in 4.0.0 version.
 */
type InitFunction = (appKey: string, adUnits?: Array<AdUnit>) => Promise<void>
type ShowFunction = (placementName?: string) => Promise<void>
type IronSourceProxyType = {
  /**
   * Android: init
   *     iOS: initWithAppKey
   * @deprecated This method will be removed in 4.0.0 version.
   */
  init: InitFunction
  /**
   * Android: showRewardedVideo
   *     iOS: showRewardedVideoWithViewController
   *
   * @deprecated Use the alternate API {@link LevelPlayRewardedAd#showAd()} instead.
   */
  showRewardedVideo: ShowFunction
  /**
   * Android: showInterstitial
   *     iOS: showInterstitialWithViewController
   *
   * @deprecated Use the alternate API {@link LevelPlayInterstitiald#showAd()} instead.
   */
  showInterstitial: ShowFunction
}

type UtilFunctions = {
  getPluginVersion: () => string
  getNativeSDKVersion: () => string
}

type LevelPlayListeners = {
      /**
   * Sets the setInitializationListener to handle initialization events.
   * @deprecated This Listener will be removed in 4.0.0 version.
   */
  setInitializationListener: (listener: InitializationListener) => void
  setImpressionDataListener: (listener: ImpressionDataListener) => void
    /**
   * Sets the setConsentViewListener to handle consent view events.
   * @deprecated This Listener will be removed in 4.0.0 version.
   */
  setConsentViewListener: (listener: ConsentViewListener) => void
  /**
   * Sets the setLevelPlayBannerListener to handle banner ad events.
   * @param listener The setLevelPlayBannerListener object containing event handlers.
   *
   * @deprecated Use the alternate API LevelPlayBannerAdView with LevelPlayBannerAdViewListener instead.
   */
  setLevelPlayBannerListener: (listener: LevelPlayBannerListener) => void
  /**
   * Sets the setLevelPlayInterstitialListener to handle interstitial ad events.
   * @param listener The setLevelPlayInterstitialListener object containing event handlers.
   *
   * @deprecated Use the alternate API {@link LevelPlayInterstitialAd#setListener(LevelPlayInterstitialAdListener)} instead.
   */
  setLevelPlayInterstitialListener: (listener: LevelPlayInterstitialListener) => void
  /**
   * Sets the setLevelPlayRewardedVideoListener to handle rewarded video ad events.
   * @param listener The setLevelPlayRewardedVideoListener object containing event handlers.
   *
   * @deprecated Use the alternate API {@link LevelPlayRewardedAd#setListener(LevelPlayRewardedAdListener)} instead.
   */
  setLevelPlayRewardedVideoListener: (listener: LevelPlayRewardedVideoListener) => void
    /**
   * Sets the setLevelPlayRewardedVideoManualListener to handle rewarded video ad events.
   * @param listener The setLevelPlayRewardedVideoManualListener object containing event handlers.
   *
   * @deprecated Use the alternate API {@link LevelPlayRewardedAd#setListener(LevelPlayRewardedAdListener)} instead.
   */
  setLevelPlayRewardedVideoManualListener: (listener: LevelPlayRewardedVideoManualListener) => void
}

/**
 * Exposed Module Type
 */
type IronSourceType = UtilFunctions &
  LevelPlayListeners &
  IronSourceProxyType &
  Omit<
    IronSourceNativeModuleType,
    | 'init'
    | 'initWithAdUnits'
    | 'showRewardedVideo'
    | 'showRewardedVideoForPlacement'
    | 'showInterstitial'
    | 'showInterstitialForPlacement'
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
const IronSourceNativeModule: IronSourceNativeModuleType = IronSourceMediation

/**
 * Proxy Functions
 */
/**
* @deprecated This method will be removed in 4.0.0 version.
*/
const init: InitFunction = async (
  appKey: string,
  adUnits?: Array<AdUnit>
): Promise<void> => {
  try {
    const reactNativeVersion = getReactNativeVersion()
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

/**
 * @deprecated Use the alternate API {@link LevelPlayRewardedAd#showAd()} instead.
 */
const showRewardedVideo: ShowFunction = async (
  placementName?: string
): Promise<void> => {
  return placementName === undefined
    ? IronSourceNativeModule.showRewardedVideo()
    : IronSourceNativeModule.showRewardedVideoForPlacement(placementName)
}

/**
 * @deprecated Use the alternate API {@link LevelPlayInterstitialAd#showAd()} instead.
 */
const showInterstitial: ShowFunction = async (
  placementName?: string
): Promise<void> => {
  return placementName === undefined
    ? IronSourceNativeModule.showInterstitial()
    : IronSourceNativeModule.showInterstitialForPlacement(placementName)
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

/** LevelPlay Listeners Setters =================================================================**/
const eventEmitter = new NativeEventEmitter(IronSourceMediation)

// Event Name Constants defined on each platform
const {
  // Initialization
  ON_INITIALIZATION_COMPLETE,
  // ImpressionData
  ON_IMPRESSION_SUCCESS,
  // ConsentView
  CONSENT_VIEW_DID_LOAD_SUCCESS,
  CONSENT_VIEW_DID_FAIL_TO_LOAD,
  CONSENT_VIEW_DID_SHOW_SUCCESS,
  CONSENT_VIEW_DID_FAIL_TO_SHOW,
  CONSENT_VIEW_DID_ACCEPT,
  // LevelPlayBanner
  LP_BN_ON_AD_LOADED,
  LP_BN_ON_AD_LOAD_FAILED,
  LP_BN_ON_AD_CLICKED,
  LP_BN_ON_AD_SCREEN_PRESENTED,
  LP_BN_ON_AD_SCREEN_DISMISSED,
  LP_BN_ON_AD_LEFT_APPLICATION,
  // LevelPlayInterstitial
  LP_IS_ON_AD_READY,
  LP_IS_ON_AD_LOAD_FAILED,
  LP_IS_ON_AD_OPENED,
  LP_IS_ON_AD_CLOSED,
  LP_IS_ON_AD_SHOW_FAILED,
  LP_IS_ON_AD_CLICKED,
  LP_IS_ON_AD_SHOW_SUCCEEDED,
  // LevelPlayRewardedVideo
  LP_RV_ON_AD_AVAILABLE,
  LP_RV_ON_AD_UNAVAILABLE,
  LP_RV_ON_AD_OPENED,
  LP_RV_ON_AD_CLOSED,
  LP_RV_ON_AD_REWARDED,
  LP_RV_ON_AD_SHOW_FAILED,
  LP_RV_ON_AD_CLICKED,
  // Manual Load RV Events
  LP_MANUAL_RV_ON_AD_READY,
  LP_MANUAL_RV_ON_AD_LOAD_FAILED,
} = IronSourceMediation.getConstants()

/**
 * Sets the setInitializationListener to handle impression data events.
 * @param listener The setInitializationListener object containing event handlers.
 */
const setInitializationListener = (listener: InitializationListener) => {
  // Remove any existing listeners
  eventEmitter.removeAllListeners(ON_INITIALIZATION_COMPLETE)

  // Add the new listener if provided
  if (listener.onInitializationComplete) {
    eventEmitter.addListener(ON_INITIALIZATION_COMPLETE, () => {
      listener.onInitializationComplete!()
    })
  }
}

/**
 * Sets the setImpressionDataListener to handle impression data events.
 * @param listener The setImpressionDataListener object containing event handlers.
 */
const setImpressionDataListener = (listener: ImpressionDataListener) => {
  // Remove any existing listeners
  eventEmitter.removeAllListeners(ON_IMPRESSION_SUCCESS)

  // Add the new listener if provided
  if (listener.onImpressionSuccess) {
    eventEmitter.addListener(ON_IMPRESSION_SUCCESS, (data?: any) => {
      const impressionData = data ? impressionDataFromMap(data) : undefined
      listener.onImpressionSuccess!(impressionData)
    })
  }
}

/**
 * Sets the consentViewListener to handle consent view events.
 * @param listener The consentViewListener object containing event handlers.
 * @deprecated This method will be removed in 4.0.0 version.
 */
const setConsentViewListener = (listener: ConsentViewListener) => {
  if (Platform.OS !== 'ios') {
    console.error('Only supported for iOS.')
    return
  }

  // Remove all existing listeners for these events
  eventEmitter.removeAllListeners(CONSENT_VIEW_DID_LOAD_SUCCESS)
  eventEmitter.removeAllListeners(CONSENT_VIEW_DID_FAIL_TO_LOAD)
  eventEmitter.removeAllListeners(CONSENT_VIEW_DID_SHOW_SUCCESS)
  eventEmitter.removeAllListeners(CONSENT_VIEW_DID_FAIL_TO_SHOW)
  eventEmitter.removeAllListeners(CONSENT_VIEW_DID_ACCEPT)

  // Add the new listeners if provided
  if (listener.onConsentViewDidLoadSuccess) {
    eventEmitter.addListener(
      CONSENT_VIEW_DID_LOAD_SUCCESS,
      (data: any) => {
        const consentViewType = data.consentViewType as string;
        listener.onConsentViewDidLoadSuccess!(consentViewType);
      }
    )
  }

  if (listener.onConsentViewDidFailToLoad) {
    eventEmitter.addListener(
      CONSENT_VIEW_DID_FAIL_TO_LOAD,
      (data: any) => {
        const error = conentViewErrorFromMap(data);
        listener.onConsentViewDidFailToLoad!(error)
      }
    )
  }

  if (listener.onConsentViewDidShowSuccess) {
    eventEmitter.addListener(
      CONSENT_VIEW_DID_SHOW_SUCCESS,
      (data: any) => {
        const consentViewType = data.consentViewType as string;
        listener.onConsentViewDidShowSuccess!(consentViewType)
      }
    )
  }

  if (listener.onConsentViewDidFailToShow) {
    eventEmitter.addListener(
      CONSENT_VIEW_DID_FAIL_TO_SHOW,
      (data: any) => {
        const error = conentViewErrorFromMap(data);
        listener.onConsentViewDidFailToShow!(error)
      }
    )
  }

  if (listener.onConsentViewDidAccept) {
    eventEmitter.addListener(
      CONSENT_VIEW_DID_ACCEPT,
      (data: any) => {
        const consentViewType = data.consentViewType as string;
        listener.onConsentViewDidAccept!(consentViewType)
      }
    )
  }
}

/**
 * Sets the setLevelPlayBannerListener to handle banner ad events.
 * @param listener The setLevelPlayBannerListener object containing event handlers.
 *
 * @deprecated This method will be removed in future versions. Please use LevelPlayBannerAdView with LevelPlayBannerAdViewListenr instead.
 */
const setLevelPlayBannerListener = (listener: LevelPlayBannerListener) => {
  // Remove existing listeners
  eventEmitter.removeAllListeners(LP_BN_ON_AD_LOADED)
  eventEmitter.removeAllListeners(LP_BN_ON_AD_LOAD_FAILED)
  eventEmitter.removeAllListeners(LP_BN_ON_AD_CLICKED)
  eventEmitter.removeAllListeners(LP_BN_ON_AD_SCREEN_PRESENTED)
  eventEmitter.removeAllListeners(LP_BN_ON_AD_SCREEN_DISMISSED)
  eventEmitter.removeAllListeners(LP_BN_ON_AD_LEFT_APPLICATION)

  // Add new listeners
  if (listener.onAdLoaded) {
    eventEmitter.addListener(LP_BN_ON_AD_LOADED, (data: any) => {
      const ironSourceAdInfo = ironSourceAdInfoFromMap(data);
      listener.onAdLoaded!(ironSourceAdInfo)
    })
  }
  if (listener.onAdLoadFailed) {
    eventEmitter.addListener(LP_BN_ON_AD_LOAD_FAILED, (data: any) => {
      const ironSourceError = ironSourceErrorFromMap(data);
      listener.onAdLoadFailed!(ironSourceError);
    })
  }
  if (listener.onAdClicked) {
    eventEmitter.addListener(LP_BN_ON_AD_CLICKED, (data: any) => {
      const ironSourceAdInfo = ironSourceAdInfoFromMap(data);
      listener.onAdClicked!(ironSourceAdInfo)
    })
  }
  if (listener.onAdScreenPresented) {
      eventEmitter.addListener(LP_BN_ON_AD_SCREEN_PRESENTED, (data: any) => {
        const ironSourceAdInfo = ironSourceAdInfoFromMap(data);
        listener.onAdScreenPresented!(ironSourceAdInfo)
      }
    )
  }
  if (listener.onAdScreenDismissed) {
      eventEmitter.addListener(LP_BN_ON_AD_SCREEN_DISMISSED, (data: any) => {
          const ironSourceAdInfo = ironSourceAdInfoFromMap(data);
          listener.onAdScreenDismissed!(ironSourceAdInfo)
      }
    )
  }
  if (listener.onAdLeftApplication) {
      eventEmitter.addListener(LP_BN_ON_AD_LEFT_APPLICATION, (data: any) => {
        const ironSourceAdInfo = ironSourceAdInfoFromMap(data);
        listener.onAdScreenDismissed!(ironSourceAdInfo)
      }
    )
  }
}

/**
 * Sets the LevelPlayInterstitialListener to handle interstitial ad events.
 * @param listener The LevelPlayInterstitialListener object containing event handlers.
 *
 * @deprecated Use the alternate API {@link LevelPlayInterstitialAd#setListener(LevelPlayInterstitialAdListener)} instead.
 */
const setLevelPlayInterstitialListener = (
  listener: LevelPlayInterstitialListener
) => {
  eventEmitter.removeAllListeners(LP_IS_ON_AD_READY)
  eventEmitter.removeAllListeners(LP_IS_ON_AD_LOAD_FAILED)
  eventEmitter.removeAllListeners(LP_IS_ON_AD_OPENED)
  eventEmitter.removeAllListeners(LP_IS_ON_AD_CLOSED)
  eventEmitter.removeAllListeners(LP_IS_ON_AD_SHOW_FAILED)
  eventEmitter.removeAllListeners(LP_IS_ON_AD_CLICKED)
  eventEmitter.removeAllListeners(LP_IS_ON_AD_SHOW_SUCCEEDED)

  if (listener.onAdReady) {
    eventEmitter.addListener(LP_IS_ON_AD_READY, (data: any) => {
      const ironSourceAdInfo = ironSourceAdInfoFromMap(data);
      listener.onAdReady!(ironSourceAdInfo)
    })
  }
  if (listener.onAdLoadFailed) {
    eventEmitter.addListener(LP_IS_ON_AD_LOAD_FAILED, (data: any) => {
      const ironSourceError = ironSourceErrorFromMap(data);
      listener.onAdLoadFailed!(ironSourceError);
    })
  }
  if (listener.onAdOpened) {
    eventEmitter.addListener(LP_IS_ON_AD_OPENED, (data: any) => {
      const ironSourceAdInfo = ironSourceAdInfoFromMap(data);
      listener.onAdOpened!(ironSourceAdInfo)
    })
  }
  if (listener.onAdClosed) {
    eventEmitter.addListener(LP_IS_ON_AD_CLOSED, (data: any) => {
      const ironSourceAdInfo = ironSourceAdInfoFromMap(data);
      listener.onAdClosed!(ironSourceAdInfo)
    })
  }
  if (listener.onAdShowFailed) {
    eventEmitter.addListener(LP_IS_ON_AD_SHOW_FAILED, (data: any) => {
      const ironSourceError = ironSourceErrorFromMap(data.error);
      const ironSourceAdInfo = ironSourceAdInfoFromMap(data.adInfo);
      listener.onAdShowFailed!(ironSourceError, ironSourceAdInfo)
    })
  }
  if (listener.onAdClicked) {
    eventEmitter.addListener(LP_IS_ON_AD_CLICKED, (data: any) => {
      const ironSourceAdInfo = ironSourceAdInfoFromMap(data);
      listener.onAdClicked!(ironSourceAdInfo)
    })
  }
  if (listener.onAdShowSucceeded) {
    eventEmitter.addListener(LP_IS_ON_AD_SHOW_SUCCEEDED, (data: any) => {
      const ironSourceAdInfo = ironSourceAdInfoFromMap(data);
      listener.onAdShowSucceeded!(ironSourceAdInfo)
      }
    )
  }
}

/**
 * Sets the LevelPlayRewardedVideoListener to handle rewarded video ad events.
 * @param listener The LevelPlayRewardedVideoListener object containing event handlers.
 *
 * @deprecated Use the alternate API {@link LevelPlayRewardedAd#setListener(LevelPlayRewardedAdListener)} instead.
 */
const setLevelPlayRewardedVideoListener = (
  listener: LevelPlayRewardedVideoListener
) => {
  eventEmitter.removeAllListeners(LP_RV_ON_AD_AVAILABLE)
  eventEmitter.removeAllListeners(LP_RV_ON_AD_UNAVAILABLE)
  eventEmitter.removeAllListeners(LP_RV_ON_AD_OPENED)
  eventEmitter.removeAllListeners(LP_RV_ON_AD_CLOSED)
  eventEmitter.removeAllListeners(LP_RV_ON_AD_REWARDED)
  eventEmitter.removeAllListeners(LP_RV_ON_AD_SHOW_FAILED)
  eventEmitter.removeAllListeners(LP_RV_ON_AD_CLICKED)

  if (listener.onAdAvailable) {
    eventEmitter.addListener(LP_RV_ON_AD_AVAILABLE, (data: any) => {
      const ironSourceAdInfo = ironSourceAdInfoFromMap(data);
      listener.onAdAvailable!(ironSourceAdInfo)
    })
  }
  if (listener.onAdUnavailable) {
    eventEmitter.addListener(LP_RV_ON_AD_UNAVAILABLE, () =>
      listener.onAdUnavailable!()
    )
  }
  if (listener.onAdOpened) {
    eventEmitter.addListener(LP_RV_ON_AD_OPENED, (data: any) => {
      const ironSourceAdInfo = ironSourceAdInfoFromMap(data);
      listener.onAdOpened!(ironSourceAdInfo)
    })
  }
  if (listener.onAdClosed) {
    eventEmitter.addListener(LP_RV_ON_AD_CLOSED, (data: any) => {
      const ironSourceAdInfo = ironSourceAdInfoFromMap(data);
      listener.onAdClosed!(ironSourceAdInfo)
    })
  }
  if (listener.onAdRewarded) {
    eventEmitter.addListener(LP_RV_ON_AD_REWARDED, (data: any) => {
      const ironSourcePlacement = ironSourceRvPlacementFromMap(data.placement);
      const ironSourceAdInfo = ironSourceAdInfoFromMap(data.adInfo);
      listener.onAdRewarded!(ironSourcePlacement, ironSourceAdInfo)
    })
  }
  if (listener.onAdShowFailed) {
    eventEmitter.addListener(LP_RV_ON_AD_SHOW_FAILED, (data: any) => {
      const ironSourceError = ironSourceErrorFromMap(data.error);
      const ironSourceAdInfo = ironSourceAdInfoFromMap(data.adInfo);
      listener.onAdShowFailed!(ironSourceError, ironSourceAdInfo);
    })
  }
  if (listener.onAdClicked) {
    eventEmitter.addListener(LP_RV_ON_AD_CLICKED, (data: any) => {
      const ironSourcePlacement = ironSourceRvPlacementFromMap(data.placement);
      const ironSourceAdInfo = ironSourceAdInfoFromMap(data.adInfo);
      listener.onAdClicked!(ironSourcePlacement, ironSourceAdInfo)
    })
  }
}

/**
 * Sets the LevelPlayRewardedVideoManualListener to handle rewarded video ad events.
 * @param listener The LevelPlayRewardedVideoManualListener object containing event handlers.
 *
 * @deprecated Use the alternate API {@link LevelPlayRewardedAd#setListener(LevelPlayRewardedAdListener)} instead.
 */
const setLevelPlayRewardedVideoManualListener = async (
  listener: LevelPlayRewardedVideoManualListener
) => {
  eventEmitter.removeAllListeners(LP_RV_ON_AD_OPENED)
  eventEmitter.removeAllListeners(LP_RV_ON_AD_CLOSED)
  eventEmitter.removeAllListeners(LP_RV_ON_AD_REWARDED)
  eventEmitter.removeAllListeners(LP_RV_ON_AD_SHOW_FAILED)
  eventEmitter.removeAllListeners(LP_RV_ON_AD_CLICKED)
  eventEmitter.removeAllListeners(LP_MANUAL_RV_ON_AD_READY)
  eventEmitter.removeAllListeners(LP_MANUAL_RV_ON_AD_LOAD_FAILED)

  await IronSource.setLevelPlayRewardedVideoManual()

  if (listener.onAdOpened) {
    eventEmitter.addListener(LP_RV_ON_AD_OPENED, (data: any) => {
      const ironSourceAdInfo = ironSourceAdInfoFromMap(data);
      listener.onAdOpened!(ironSourceAdInfo)
    })
  }
  if (listener.onAdClosed) {
    eventEmitter.addListener(LP_RV_ON_AD_CLOSED, (data: any) => {
      const ironSourceAdInfo = ironSourceAdInfoFromMap(data);
      listener.onAdClosed!(ironSourceAdInfo)
    })
  }
  if (listener.onAdRewarded) {
    eventEmitter.addListener(LP_RV_ON_AD_REWARDED, (data: any) => {
      const ironSourcePlacement = ironSourceRvPlacementFromMap(data.placement);
      const ironSourceAdInfo = ironSourceAdInfoFromMap(data.adInfo);
      listener.onAdRewarded!(ironSourcePlacement, ironSourceAdInfo)
    })
  }
  if (listener.onAdShowFailed) {
    eventEmitter.addListener(LP_RV_ON_AD_SHOW_FAILED, (data: any) => {
      const ironSourceError = ironSourceErrorFromMap(data.error);
      const ironSourceAdInfo = ironSourceAdInfoFromMap(data.adInfo);
      listener.onAdShowFailed!(ironSourceError, ironSourceAdInfo);
    })
  }
  if (listener.onAdClicked) {
    eventEmitter.addListener(LP_RV_ON_AD_CLICKED, (data: any) => {
      const ironSourcePlacement = ironSourceRvPlacementFromMap(data.placement);
      const ironSourceAdInfo = ironSourceAdInfoFromMap(data.adInfo);
      listener.onAdRewarded!(ironSourcePlacement, ironSourceAdInfo)
    })
  }
  if (listener.onAdReady) {
    eventEmitter.addListener(LP_MANUAL_RV_ON_AD_READY, (data: any) => {
      const ironSourceAdInfo = ironSourceAdInfoFromMap(data);
      listener.onAdReady!(ironSourceAdInfo)
    })
  }
  if (listener.onAdLoadFailed) {
    eventEmitter.addListener(LP_MANUAL_RV_ON_AD_LOAD_FAILED, (data: any) => {
      const ironSourceError = ironSourceErrorFromMap(data);
      listener.onAdLoadFailed!(ironSourceError)
      }
    )
  }
}

/**=======================================================================================**/

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
  setInitializationListener,
  setImpressionDataListener,
  setConsentViewListener,
  setLevelPlayBannerListener,
  setLevelPlayInterstitialListener,
  setLevelPlayRewardedVideoListener,
  setLevelPlayRewardedVideoManualListener,
}

export const IronSource: Readonly<IronSourceType> = Object.freeze(
  Platform.OS === 'ios'
    ? mergedModule
    : // overwrite stub iOS related methods
      { ...mergedModule, ...IOSMethodStubs }
)
