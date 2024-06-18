/**
 * This is the main IronSource bridge module.
 */

import { NativeModules, Platform, NativeEventEmitter } from 'react-native'
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
import { decode } from './models/utils';
import { consentViewErrorCodec, impressionDataCodec, ironSourceAdInfoCodec, ironSourceErrorCodec } from './models';
import type { ConsentViewListener, ImpressionDataListener, LevelPlayBannerListener, LevelPlayInterstitialListener, LevelPlayRewardedVideoListener, LevelPlayRewardedVideoManualListener } from './models/listeners';
import { errorAdInfoCodec, placementAdInfoCodec } from './models/nestedCodecs';
import { consentViewInfoCodec } from './models/ConsentViewInfo';
import type { InitializationListener } from './models/listeners/InitializationListener';

/** Extract IronSourceMediation module **/
const { IronSourceMediation } = NativeModules;

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

  /**
   * Android: setClientSideCallbacks
   *     iOS: setUseClientSideCallbacks
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
   * For Manual Load RV mode
   * Android: loadRewardedVideo
   *     iOS: loadRewardedVideo
   */
  loadRewardedVideo(): Promise<void>

  /**
   * Must be called before init.
   * Android: setLevelPlayRewardedVideoManual
   *     iOS: setLevelPlayRewardedVideoManual
   */
  setLevelPlayRewardedVideoManual(): Promise<void>

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
}

type UtilFunctions = {
  getPluginVersion: () => string
  getNativeSDKVersion: () => string
}

type LevelPlayListeners = {
  setInitializationListener: (listener: InitializationListener) => void
  setImpressionDataListener: (listener: ImpressionDataListener) => void
  setConsentViewListener: (listener: ConsentViewListener) => void
  setLevelPlayBannerListener: (listener: LevelPlayBannerListener) => void
  setLevelPlayInterstitialListener: (listener: LevelPlayInterstitialListener) => void
  setLevelPlayRewardedVideoListener: (listener: LevelPlayRewardedVideoListener) => void
  setLevelPlayRewardedVideoManualListener: (listener: LevelPlayRewardedVideoManualListener) => void
}

/**
 * Exposed Module Type
 */
type IronSourceType = UtilFunctions & LevelPlayListeners &
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
const eventEmitter = new NativeEventEmitter(IronSourceMediation);

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
} = IronSourceMediation.getConstants();

/**
 * Sets the setInitializationListener to handle impression data events.
 * @param listener The setInitializationListener object containing event handlers.
 */
const setInitializationListener = (listener: InitializationListener) => {
  // Remove any existing listeners
  eventEmitter.removeAllListeners(ON_INITIALIZATION_COMPLETE);
 
  // Add the new listener if provided
  if (listener.onInitializationComplete) {
    eventEmitter.addListener(ON_INITIALIZATION_COMPLETE, () => {
      listener.onInitializationComplete!();
    });
  }
 }

/**
 * Sets the setImpressionDataListener to handle impression data events.
 * @param listener The setImpressionDataListener object containing event handlers.
 */
const setImpressionDataListener = (listener: ImpressionDataListener) => {
 // Remove any existing listeners
 eventEmitter.removeAllListeners(ON_IMPRESSION_SUCCESS);

 // Add the new listener if provided
 if (listener.onImpressionSuccess) {
   eventEmitter.addListener(ON_IMPRESSION_SUCCESS, (dataObj?: unknown) => {
     const data = dataObj ? decode(impressionDataCodec, dataObj) : undefined;
     listener.onImpressionSuccess!(data);
   });
 }
}

/**
 * Sets the consentViewListener to handle consent view events.
 * @param listener The consentViewListener object containing event handlers.
 */
const setConsentViewListener = (listener: ConsentViewListener) => {
  if (Platform.OS !== 'ios') {
    console.error('Only supported for iOS.');
    return;
  }

  // Remove all existing listeners for these events
  eventEmitter.removeAllListeners(CONSENT_VIEW_DID_LOAD_SUCCESS);
  eventEmitter.removeAllListeners(CONSENT_VIEW_DID_FAIL_TO_LOAD);
  eventEmitter.removeAllListeners(CONSENT_VIEW_DID_SHOW_SUCCESS);
  eventEmitter.removeAllListeners(CONSENT_VIEW_DID_FAIL_TO_SHOW);
  eventEmitter.removeAllListeners(CONSENT_VIEW_DID_ACCEPT);

  // Add the new listeners if provided
  if (listener.onConsentViewDidLoadSuccess) {
    eventEmitter.addListener(CONSENT_VIEW_DID_LOAD_SUCCESS, (consentViewInfoObj: unknown) => {
      const { consentViewType } = decode(consentViewInfoCodec, consentViewInfoObj);
      listener.onConsentViewDidLoadSuccess!(consentViewType);
    });
  }

  if (listener.onConsentViewDidFailToLoad) {
    eventEmitter.addListener(CONSENT_VIEW_DID_FAIL_TO_LOAD, (errorObj: unknown) => {
      const error = decode(consentViewErrorCodec, errorObj);
      listener.onConsentViewDidFailToLoad!(error);
    });
  }

  if (listener.onConsentViewDidShowSuccess) {
    eventEmitter.addListener(CONSENT_VIEW_DID_SHOW_SUCCESS, (consentViewInfoObj: unknown) => {
      const { consentViewType } = decode(consentViewInfoCodec, consentViewInfoObj);
      listener.onConsentViewDidShowSuccess!(consentViewType);
    });
  }

  if (listener.onConsentViewDidFailToShow) {
    eventEmitter.addListener(CONSENT_VIEW_DID_FAIL_TO_SHOW, (errorObj: unknown) => {
      const error = decode(consentViewErrorCodec, errorObj);
      listener.onConsentViewDidFailToShow!(error);
    });
  }

  if (listener.onConsentViewDidAccept) {
    eventEmitter.addListener(CONSENT_VIEW_DID_ACCEPT, (consentViewInfoObj: unknown) => {
      const { consentViewType } = consentViewInfoObj as { consentViewType: string };
      listener.onConsentViewDidAccept!(consentViewType);
    });
  }
};

/**
 * Sets the setLevelPlayBannerListener to handle banner ad events.
 * @param listener The setLevelPlayBannerListener object containing event handlers.
 */
const setLevelPlayBannerListener = (listener: LevelPlayBannerListener) => {
  // Remove existing listeners
  eventEmitter.removeAllListeners(LP_BN_ON_AD_LOADED);
  eventEmitter.removeAllListeners(LP_BN_ON_AD_LOAD_FAILED);
  eventEmitter.removeAllListeners(LP_BN_ON_AD_CLICKED);
  eventEmitter.removeAllListeners(LP_BN_ON_AD_SCREEN_PRESENTED);
  eventEmitter.removeAllListeners(LP_BN_ON_AD_SCREEN_DISMISSED);
  eventEmitter.removeAllListeners(LP_BN_ON_AD_LEFT_APPLICATION);

  // Add new listeners
  if (listener.onAdLoaded) {
    eventEmitter.addListener(LP_BN_ON_AD_LOADED, (adInfoObj: unknown) => {
      listener.onAdLoaded!(decode(ironSourceAdInfoCodec, adInfoObj));
    });
  }
  if (listener.onAdLoadFailed) {
    eventEmitter.addListener(LP_BN_ON_AD_LOAD_FAILED, (errorObj: unknown) => {
      listener.onAdLoadFailed!(decode(ironSourceErrorCodec, errorObj));
    });
  }
  if (listener.onAdClicked) {
    eventEmitter.addListener(LP_BN_ON_AD_CLICKED, (adInfoObj: unknown) => {
      listener.onAdClicked!(decode(ironSourceAdInfoCodec, adInfoObj));
    });
  }
  if (listener.onAdScreenPresented) {
    eventEmitter.addListener(LP_BN_ON_AD_SCREEN_PRESENTED, (adInfoObj: unknown) => {
      listener.onAdScreenPresented!(decode(ironSourceAdInfoCodec, adInfoObj));
    });
  }
  if (listener.onAdScreenDismissed) {
    eventEmitter.addListener(LP_BN_ON_AD_SCREEN_DISMISSED, (adInfoObj: unknown) => {
      listener.onAdScreenDismissed!(decode(ironSourceAdInfoCodec, adInfoObj));
    });
  }
  if (listener.onAdLeftApplication) {
    eventEmitter.addListener(LP_BN_ON_AD_LEFT_APPLICATION, (adInfoObj: unknown) => {
      listener.onAdLeftApplication!(decode(ironSourceAdInfoCodec, adInfoObj));
    });
  }
};

/**
 * Sets the LevelPlayInterstitialListener to handle interstitial ad events.
 * @param listener The LevelPlayInterstitialListener object containing event handlers.
 */
const setLevelPlayInterstitialListener = (listener: LevelPlayInterstitialListener) => {
  eventEmitter.removeAllListeners(LP_IS_ON_AD_READY);
  eventEmitter.removeAllListeners(LP_IS_ON_AD_LOAD_FAILED);
  eventEmitter.removeAllListeners(LP_IS_ON_AD_OPENED);
  eventEmitter.removeAllListeners(LP_IS_ON_AD_CLOSED);
  eventEmitter.removeAllListeners(LP_IS_ON_AD_SHOW_FAILED);
  eventEmitter.removeAllListeners(LP_IS_ON_AD_CLICKED);
  eventEmitter.removeAllListeners(LP_IS_ON_AD_SHOW_SUCCEEDED);

  if (listener.onAdReady) {
      eventEmitter.addListener(LP_IS_ON_AD_READY, (adInfoObj: unknown) => {
          listener.onAdReady!(decode(ironSourceAdInfoCodec, adInfoObj));
      });
  }
  if (listener.onAdLoadFailed) {
      eventEmitter.addListener(LP_IS_ON_AD_LOAD_FAILED, (errorObj: unknown) => {
          listener.onAdLoadFailed!(decode(ironSourceErrorCodec, errorObj));
      });
  }
  if (listener.onAdOpened) {
      eventEmitter.addListener(LP_IS_ON_AD_OPENED, (adInfoObj: unknown) => {
          listener.onAdOpened!(decode(ironSourceAdInfoCodec, adInfoObj));
      });
  }
  if (listener.onAdClosed) {
      eventEmitter.addListener(LP_IS_ON_AD_CLOSED, (adInfoObj: unknown) => {
          listener.onAdClosed!(decode(ironSourceAdInfoCodec, adInfoObj));
      });
  }
  if (listener.onAdShowFailed) {
      eventEmitter.addListener(LP_IS_ON_AD_SHOW_FAILED, (obj: unknown) => {
          const { error, adInfo } = decode(errorAdInfoCodec, obj);
          listener.onAdShowFailed!(error, adInfo);
      });
  }
  if (listener.onAdClicked) {
      eventEmitter.addListener(LP_IS_ON_AD_CLICKED, (adInfoObj: unknown) => {
          listener.onAdClicked!(decode(ironSourceAdInfoCodec, adInfoObj));
      });
  }
  if (listener.onAdShowSucceeded) {
      eventEmitter.addListener(LP_IS_ON_AD_SHOW_SUCCEEDED, (adInfoObj: unknown) => {
          listener.onAdShowSucceeded!(decode(ironSourceAdInfoCodec, adInfoObj));
      });
  }
};

/**
 * Sets the LevelPlayRewardedVideoListener to handle rewarded video ad events.
 * @param listener The LevelPlayRewardedVideoListener object containing event handlers.
 */
const setLevelPlayRewardedVideoListener = (listener: LevelPlayRewardedVideoListener) => {
  eventEmitter.removeAllListeners(LP_RV_ON_AD_AVAILABLE);
  eventEmitter.removeAllListeners(LP_RV_ON_AD_UNAVAILABLE);
  eventEmitter.removeAllListeners(LP_RV_ON_AD_OPENED);
  eventEmitter.removeAllListeners(LP_RV_ON_AD_CLOSED);
  eventEmitter.removeAllListeners(LP_RV_ON_AD_REWARDED);
  eventEmitter.removeAllListeners(LP_RV_ON_AD_SHOW_FAILED);
  eventEmitter.removeAllListeners(LP_RV_ON_AD_CLICKED);

  if (listener.onAdAvailable) {
      eventEmitter.addListener(LP_RV_ON_AD_AVAILABLE, (adInfoObj: unknown) => {
          listener.onAdAvailable!(decode(ironSourceAdInfoCodec, adInfoObj));
      });
  }
  if (listener.onAdUnavailable) {
      eventEmitter.addListener(LP_RV_ON_AD_UNAVAILABLE, () => listener.onAdUnavailable!());
  }
  if (listener.onAdOpened) {
      eventEmitter.addListener(LP_RV_ON_AD_OPENED, (adInfoObj: unknown) => {
          listener.onAdOpened!(decode(ironSourceAdInfoCodec, adInfoObj));
      });
  }
  if (listener.onAdClosed) {
      eventEmitter.addListener(LP_RV_ON_AD_CLOSED, (adInfoObj: unknown) => {
          listener.onAdClosed!(decode(ironSourceAdInfoCodec, adInfoObj));
      });
  }
  if (listener.onAdRewarded) {
      eventEmitter.addListener(LP_RV_ON_AD_REWARDED, (obj: unknown) => {
          const { placement, adInfo } = decode(placementAdInfoCodec, obj);
          listener.onAdRewarded!(placement, adInfo);
      });
  }
  if (listener.onAdShowFailed) {
      eventEmitter.addListener(LP_RV_ON_AD_SHOW_FAILED, (obj: unknown) => {
          const { error, adInfo } = decode(errorAdInfoCodec, obj);
          listener.onAdShowFailed!(error, adInfo);
      });
  }
  if (listener.onAdClicked) {
      eventEmitter.addListener(LP_RV_ON_AD_CLICKED, (obj: unknown) => {
          const { placement, adInfo } = decode(placementAdInfoCodec, obj);
          listener.onAdClicked!(placement, adInfo);
      });
  }
};

/**
 * Sets the LevelPlayRewardedVideoManualListener to handle rewarded video ad events.
 * @param listener The LevelPlayRewardedVideoManualListener object containing event handlers.
 */
const setLevelPlayRewardedVideoManualListener = async (listener: LevelPlayRewardedVideoManualListener) => {
  eventEmitter.removeAllListeners(LP_RV_ON_AD_OPENED);
  eventEmitter.removeAllListeners(LP_RV_ON_AD_CLOSED);
  eventEmitter.removeAllListeners(LP_RV_ON_AD_REWARDED);
  eventEmitter.removeAllListeners(LP_RV_ON_AD_SHOW_FAILED);
  eventEmitter.removeAllListeners(LP_RV_ON_AD_CLICKED);
  eventEmitter.removeAllListeners(LP_MANUAL_RV_ON_AD_READY);
  eventEmitter.removeAllListeners(LP_MANUAL_RV_ON_AD_LOAD_FAILED);

  await IronSource.setLevelPlayRewardedVideoManual();

  if (listener.onAdOpened) {
      eventEmitter.addListener(LP_RV_ON_AD_OPENED, (adInfoObj: unknown) => {
          listener.onAdOpened!(decode(ironSourceAdInfoCodec, adInfoObj));
      });
  }
  if (listener.onAdClosed) {
      eventEmitter.addListener(LP_RV_ON_AD_CLOSED, (adInfoObj: unknown) => {
          listener.onAdClosed!(decode(ironSourceAdInfoCodec, adInfoObj));
      });
  }
  if (listener.onAdRewarded) {
      eventEmitter.addListener(LP_RV_ON_AD_REWARDED, (obj: unknown) => {
          const { placement, adInfo } = decode(placementAdInfoCodec, obj);
          listener.onAdRewarded!(placement, adInfo);
      });
  }
  if (listener.onAdShowFailed) {
      eventEmitter.addListener(LP_RV_ON_AD_SHOW_FAILED, (obj: unknown) => {
          const { error, adInfo } = decode(errorAdInfoCodec, obj);
          listener.onAdShowFailed!(error, adInfo);
      });
  }
  if (listener.onAdClicked) {
      eventEmitter.addListener(LP_RV_ON_AD_CLICKED, (obj: unknown) => {
          const { placement, adInfo } = decode(placementAdInfoCodec, obj);
          listener.onAdClicked!(placement, adInfo);
      });
  }
  if (listener.onAdReady) {
      eventEmitter.addListener(LP_MANUAL_RV_ON_AD_READY, (adInfoObj: unknown) => {
          listener.onAdReady!(decode(ironSourceAdInfoCodec, adInfoObj));
      });
  }
  if (listener.onAdLoadFailed) {
      eventEmitter.addListener(LP_MANUAL_RV_ON_AD_LOAD_FAILED, (errorObj: unknown) => {
          listener.onAdLoadFailed!(decode(ironSourceErrorCodec, errorObj));
      });
  }
};

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
  setLevelPlayRewardedVideoManualListener
}

export const IronSource: Readonly<IronSourceType> = Object.freeze(
  Platform.OS === 'ios'
    ? mergedModule
    : // overwrite stub iOS related methods
      { ...mergedModule, ...IOSMethodStubs },
)
