"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.IronSource = void 0;
var _reactNative = require("react-native");
var _IronSourceConstants = require("./utils/IronSourceConstants");
var _utils = require("./utils/utils");
var _IronSourceConfig = require("./utils/IronSourceConfig");
/**
 * This is the main IronSource bridge module.
 */

/** Extract IronSourceMediation module **/
const {
  IronSourceMediation
} = _reactNative.NativeModules;

/** Types =======================================================================**/

/**
 * Native Module Type
 * Descriptions show the function names of native SDKs.
 */

/**
 * These are needed since ReactNative NativeModules does not support function overload or optional arguments.
 * @deprecated This method will be removed in 4.0.0 version.
 */

/**
 * Exposed Module Type
 */

/** Util  =========================================================================**/
const getReactNativeVersion = () => {
  let version = '';
  try {
    version = require('react-native/package.json').version;
  } catch (e) {
    console.warn('IronSource - failed to get the ReactNative version');
  } finally {
    return version;
  }
};
const getPluginVersion = () => {
  return _IronSourceConstants.PLUGIN_VERSION;
};
const getNativeSDKVersion = () => {
  return _reactNative.Platform.OS === 'android' ? _IronSourceConstants.ANDROID_SDK_VERSION : _reactNative.Platform.OS === 'ios' ? _IronSourceConstants.IOS_SDK_VERSION : 'unsupported';
};

/** Module  =======================================================================**/
const IronSourceNativeModule = IronSourceMediation;

/**
 * Proxy Functions
 */
/**
* @deprecated This method will be removed in 4.0.0 version.
*/
const init = async (appKey, adUnits) => {
  try {
    const reactNativeVersion = getReactNativeVersion();
    // set plugin data
    await (0, _IronSourceConfig.setPluginData)(_IronSourceConstants.PLUGIN_TYPE, _IronSourceConstants.PLUGIN_VERSION, reactNativeVersion);
  } catch (e) {
    // log?
    console.warn('failed to set plugin data');
  }

  // init
  return adUnits === undefined || adUnits.length === 0 ? IronSourceNativeModule.init(appKey) : IronSourceNativeModule.initWithAdUnits(appKey, adUnits);
};

/**
 * @deprecated Use the alternate API {@link LevelPlayRewardedAd#showAd()} instead.
 */
const showRewardedVideo = async placementName => {
  return placementName === undefined ? IronSourceNativeModule.showRewardedVideo() : IronSourceNativeModule.showRewardedVideoForPlacement(placementName);
};

/**
 * @deprecated Use the alternate API {@link LevelPlayInterstitialAd#showAd()} instead.
 */
const showInterstitial = async placementName => {
  return placementName === undefined ? IronSourceNativeModule.showInterstitial() : IronSourceNativeModule.showInterstitialForPlacement(placementName);
};

/**
 * iOS specific function stubs for Android.
 * No rejects for now in the case of these being called on Android.
 */
const IOSMethodStubs = {
  /** iOS ConversionValue API ========================================================**/
  getConversionValue: () => Promise.resolve(undefined),
  /** iOS ConsentView API ============================================================**/
  loadConsentViewWithType: _ => Promise.resolve(),
  showConsentViewWithType: _ => Promise.resolve()
};

/** LevelPlay Listeners Setters =================================================================**/
const eventEmitter = new _reactNative.NativeEventEmitter(IronSourceMediation);

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
  LP_MANUAL_RV_ON_AD_LOAD_FAILED
} = IronSourceMediation.getConstants();

/**
 * Sets the setInitializationListener to handle impression data events.
 * @param listener The setInitializationListener object containing event handlers.
 */
const setInitializationListener = listener => {
  // Remove any existing listeners
  eventEmitter.removeAllListeners(ON_INITIALIZATION_COMPLETE);

  // Add the new listener if provided
  if (listener.onInitializationComplete) {
    eventEmitter.addListener(ON_INITIALIZATION_COMPLETE, () => {
      listener.onInitializationComplete();
    });
  }
};

/**
 * Sets the setImpressionDataListener to handle impression data events.
 * @param listener The setImpressionDataListener object containing event handlers.
 */
const setImpressionDataListener = listener => {
  // Remove any existing listeners
  eventEmitter.removeAllListeners(ON_IMPRESSION_SUCCESS);

  // Add the new listener if provided
  if (listener.onImpressionSuccess) {
    eventEmitter.addListener(ON_IMPRESSION_SUCCESS, data => {
      const impressionData = data ? (0, _utils.impressionDataFromMap)(data) : undefined;
      listener.onImpressionSuccess(impressionData);
    });
  }
};

/**
 * Sets the consentViewListener to handle consent view events.
 * @param listener The consentViewListener object containing event handlers.
 * @deprecated This method will be removed in 4.0.0 version.
 */
const setConsentViewListener = listener => {
  if (_reactNative.Platform.OS !== 'ios') {
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
    eventEmitter.addListener(CONSENT_VIEW_DID_LOAD_SUCCESS, data => {
      const consentViewType = data.consentViewType;
      listener.onConsentViewDidLoadSuccess(consentViewType);
    });
  }
  if (listener.onConsentViewDidFailToLoad) {
    eventEmitter.addListener(CONSENT_VIEW_DID_FAIL_TO_LOAD, data => {
      const error = (0, _utils.conentViewErrorFromMap)(data);
      listener.onConsentViewDidFailToLoad(error);
    });
  }
  if (listener.onConsentViewDidShowSuccess) {
    eventEmitter.addListener(CONSENT_VIEW_DID_SHOW_SUCCESS, data => {
      const consentViewType = data.consentViewType;
      listener.onConsentViewDidShowSuccess(consentViewType);
    });
  }
  if (listener.onConsentViewDidFailToShow) {
    eventEmitter.addListener(CONSENT_VIEW_DID_FAIL_TO_SHOW, data => {
      const error = (0, _utils.conentViewErrorFromMap)(data);
      listener.onConsentViewDidFailToShow(error);
    });
  }
  if (listener.onConsentViewDidAccept) {
    eventEmitter.addListener(CONSENT_VIEW_DID_ACCEPT, data => {
      const consentViewType = data.consentViewType;
      listener.onConsentViewDidAccept(consentViewType);
    });
  }
};

/**
 * Sets the setLevelPlayBannerListener to handle banner ad events.
 * @param listener The setLevelPlayBannerListener object containing event handlers.
 *
 * @deprecated This method will be removed in future versions. Please use LevelPlayBannerAdView with LevelPlayBannerAdViewListenr instead.
 */
const setLevelPlayBannerListener = listener => {
  // Remove existing listeners
  eventEmitter.removeAllListeners(LP_BN_ON_AD_LOADED);
  eventEmitter.removeAllListeners(LP_BN_ON_AD_LOAD_FAILED);
  eventEmitter.removeAllListeners(LP_BN_ON_AD_CLICKED);
  eventEmitter.removeAllListeners(LP_BN_ON_AD_SCREEN_PRESENTED);
  eventEmitter.removeAllListeners(LP_BN_ON_AD_SCREEN_DISMISSED);
  eventEmitter.removeAllListeners(LP_BN_ON_AD_LEFT_APPLICATION);

  // Add new listeners
  if (listener.onAdLoaded) {
    eventEmitter.addListener(LP_BN_ON_AD_LOADED, data => {
      const ironSourceAdInfo = (0, _utils.ironSourceAdInfoFromMap)(data);
      listener.onAdLoaded(ironSourceAdInfo);
    });
  }
  if (listener.onAdLoadFailed) {
    eventEmitter.addListener(LP_BN_ON_AD_LOAD_FAILED, data => {
      const ironSourceError = (0, _utils.ironSourceErrorFromMap)(data);
      listener.onAdLoadFailed(ironSourceError);
    });
  }
  if (listener.onAdClicked) {
    eventEmitter.addListener(LP_BN_ON_AD_CLICKED, data => {
      const ironSourceAdInfo = (0, _utils.ironSourceAdInfoFromMap)(data);
      listener.onAdClicked(ironSourceAdInfo);
    });
  }
  if (listener.onAdScreenPresented) {
    eventEmitter.addListener(LP_BN_ON_AD_SCREEN_PRESENTED, data => {
      const ironSourceAdInfo = (0, _utils.ironSourceAdInfoFromMap)(data);
      listener.onAdScreenPresented(ironSourceAdInfo);
    });
  }
  if (listener.onAdScreenDismissed) {
    eventEmitter.addListener(LP_BN_ON_AD_SCREEN_DISMISSED, data => {
      const ironSourceAdInfo = (0, _utils.ironSourceAdInfoFromMap)(data);
      listener.onAdScreenDismissed(ironSourceAdInfo);
    });
  }
  if (listener.onAdLeftApplication) {
    eventEmitter.addListener(LP_BN_ON_AD_LEFT_APPLICATION, data => {
      const ironSourceAdInfo = (0, _utils.ironSourceAdInfoFromMap)(data);
      listener.onAdScreenDismissed(ironSourceAdInfo);
    });
  }
};

/**
 * Sets the LevelPlayInterstitialListener to handle interstitial ad events.
 * @param listener The LevelPlayInterstitialListener object containing event handlers.
 *
 * @deprecated Use the alternate API {@link LevelPlayInterstitialAd#setListener(LevelPlayInterstitialAdListener)} instead.
 */
const setLevelPlayInterstitialListener = listener => {
  eventEmitter.removeAllListeners(LP_IS_ON_AD_READY);
  eventEmitter.removeAllListeners(LP_IS_ON_AD_LOAD_FAILED);
  eventEmitter.removeAllListeners(LP_IS_ON_AD_OPENED);
  eventEmitter.removeAllListeners(LP_IS_ON_AD_CLOSED);
  eventEmitter.removeAllListeners(LP_IS_ON_AD_SHOW_FAILED);
  eventEmitter.removeAllListeners(LP_IS_ON_AD_CLICKED);
  eventEmitter.removeAllListeners(LP_IS_ON_AD_SHOW_SUCCEEDED);
  if (listener.onAdReady) {
    eventEmitter.addListener(LP_IS_ON_AD_READY, data => {
      const ironSourceAdInfo = (0, _utils.ironSourceAdInfoFromMap)(data);
      listener.onAdReady(ironSourceAdInfo);
    });
  }
  if (listener.onAdLoadFailed) {
    eventEmitter.addListener(LP_IS_ON_AD_LOAD_FAILED, data => {
      const ironSourceError = (0, _utils.ironSourceErrorFromMap)(data);
      listener.onAdLoadFailed(ironSourceError);
    });
  }
  if (listener.onAdOpened) {
    eventEmitter.addListener(LP_IS_ON_AD_OPENED, data => {
      const ironSourceAdInfo = (0, _utils.ironSourceAdInfoFromMap)(data);
      listener.onAdOpened(ironSourceAdInfo);
    });
  }
  if (listener.onAdClosed) {
    eventEmitter.addListener(LP_IS_ON_AD_CLOSED, data => {
      const ironSourceAdInfo = (0, _utils.ironSourceAdInfoFromMap)(data);
      listener.onAdClosed(ironSourceAdInfo);
    });
  }
  if (listener.onAdShowFailed) {
    eventEmitter.addListener(LP_IS_ON_AD_SHOW_FAILED, data => {
      const ironSourceError = (0, _utils.ironSourceErrorFromMap)(data.error);
      const ironSourceAdInfo = (0, _utils.ironSourceAdInfoFromMap)(data.adInfo);
      listener.onAdShowFailed(ironSourceError, ironSourceAdInfo);
    });
  }
  if (listener.onAdClicked) {
    eventEmitter.addListener(LP_IS_ON_AD_CLICKED, data => {
      const ironSourceAdInfo = (0, _utils.ironSourceAdInfoFromMap)(data);
      listener.onAdClicked(ironSourceAdInfo);
    });
  }
  if (listener.onAdShowSucceeded) {
    eventEmitter.addListener(LP_IS_ON_AD_SHOW_SUCCEEDED, data => {
      const ironSourceAdInfo = (0, _utils.ironSourceAdInfoFromMap)(data);
      listener.onAdShowSucceeded(ironSourceAdInfo);
    });
  }
};

/**
 * Sets the LevelPlayRewardedVideoListener to handle rewarded video ad events.
 * @param listener The LevelPlayRewardedVideoListener object containing event handlers.
 *
 * @deprecated Use the alternate API {@link LevelPlayRewardedAd#setListener(LevelPlayRewardedAdListener)} instead.
 */
const setLevelPlayRewardedVideoListener = listener => {
  eventEmitter.removeAllListeners(LP_RV_ON_AD_AVAILABLE);
  eventEmitter.removeAllListeners(LP_RV_ON_AD_UNAVAILABLE);
  eventEmitter.removeAllListeners(LP_RV_ON_AD_OPENED);
  eventEmitter.removeAllListeners(LP_RV_ON_AD_CLOSED);
  eventEmitter.removeAllListeners(LP_RV_ON_AD_REWARDED);
  eventEmitter.removeAllListeners(LP_RV_ON_AD_SHOW_FAILED);
  eventEmitter.removeAllListeners(LP_RV_ON_AD_CLICKED);
  if (listener.onAdAvailable) {
    eventEmitter.addListener(LP_RV_ON_AD_AVAILABLE, data => {
      const ironSourceAdInfo = (0, _utils.ironSourceAdInfoFromMap)(data);
      listener.onAdAvailable(ironSourceAdInfo);
    });
  }
  if (listener.onAdUnavailable) {
    eventEmitter.addListener(LP_RV_ON_AD_UNAVAILABLE, () => listener.onAdUnavailable());
  }
  if (listener.onAdOpened) {
    eventEmitter.addListener(LP_RV_ON_AD_OPENED, data => {
      const ironSourceAdInfo = (0, _utils.ironSourceAdInfoFromMap)(data);
      listener.onAdOpened(ironSourceAdInfo);
    });
  }
  if (listener.onAdClosed) {
    eventEmitter.addListener(LP_RV_ON_AD_CLOSED, data => {
      const ironSourceAdInfo = (0, _utils.ironSourceAdInfoFromMap)(data);
      listener.onAdClosed(ironSourceAdInfo);
    });
  }
  if (listener.onAdRewarded) {
    eventEmitter.addListener(LP_RV_ON_AD_REWARDED, data => {
      const ironSourcePlacement = (0, _utils.ironSourceRvPlacementFromMap)(data.placement);
      const ironSourceAdInfo = (0, _utils.ironSourceAdInfoFromMap)(data.adInfo);
      listener.onAdRewarded(ironSourcePlacement, ironSourceAdInfo);
    });
  }
  if (listener.onAdShowFailed) {
    eventEmitter.addListener(LP_RV_ON_AD_SHOW_FAILED, data => {
      const ironSourceError = (0, _utils.ironSourceErrorFromMap)(data.error);
      const ironSourceAdInfo = (0, _utils.ironSourceAdInfoFromMap)(data.adInfo);
      listener.onAdShowFailed(ironSourceError, ironSourceAdInfo);
    });
  }
  if (listener.onAdClicked) {
    eventEmitter.addListener(LP_RV_ON_AD_CLICKED, data => {
      const ironSourcePlacement = (0, _utils.ironSourceRvPlacementFromMap)(data.placement);
      const ironSourceAdInfo = (0, _utils.ironSourceAdInfoFromMap)(data.adInfo);
      listener.onAdClicked(ironSourcePlacement, ironSourceAdInfo);
    });
  }
};

/**
 * Sets the LevelPlayRewardedVideoManualListener to handle rewarded video ad events.
 * @param listener The LevelPlayRewardedVideoManualListener object containing event handlers.
 *
 * @deprecated Use the alternate API {@link LevelPlayRewardedAd#setListener(LevelPlayRewardedAdListener)} instead.
 */
const setLevelPlayRewardedVideoManualListener = async listener => {
  eventEmitter.removeAllListeners(LP_RV_ON_AD_OPENED);
  eventEmitter.removeAllListeners(LP_RV_ON_AD_CLOSED);
  eventEmitter.removeAllListeners(LP_RV_ON_AD_REWARDED);
  eventEmitter.removeAllListeners(LP_RV_ON_AD_SHOW_FAILED);
  eventEmitter.removeAllListeners(LP_RV_ON_AD_CLICKED);
  eventEmitter.removeAllListeners(LP_MANUAL_RV_ON_AD_READY);
  eventEmitter.removeAllListeners(LP_MANUAL_RV_ON_AD_LOAD_FAILED);
  await IronSource.setLevelPlayRewardedVideoManual();
  if (listener.onAdOpened) {
    eventEmitter.addListener(LP_RV_ON_AD_OPENED, data => {
      const ironSourceAdInfo = (0, _utils.ironSourceAdInfoFromMap)(data);
      listener.onAdOpened(ironSourceAdInfo);
    });
  }
  if (listener.onAdClosed) {
    eventEmitter.addListener(LP_RV_ON_AD_CLOSED, data => {
      const ironSourceAdInfo = (0, _utils.ironSourceAdInfoFromMap)(data);
      listener.onAdClosed(ironSourceAdInfo);
    });
  }
  if (listener.onAdRewarded) {
    eventEmitter.addListener(LP_RV_ON_AD_REWARDED, data => {
      const ironSourcePlacement = (0, _utils.ironSourceRvPlacementFromMap)(data.placement);
      const ironSourceAdInfo = (0, _utils.ironSourceAdInfoFromMap)(data.adInfo);
      listener.onAdRewarded(ironSourcePlacement, ironSourceAdInfo);
    });
  }
  if (listener.onAdShowFailed) {
    eventEmitter.addListener(LP_RV_ON_AD_SHOW_FAILED, data => {
      const ironSourceError = (0, _utils.ironSourceErrorFromMap)(data.error);
      const ironSourceAdInfo = (0, _utils.ironSourceAdInfoFromMap)(data.adInfo);
      listener.onAdShowFailed(ironSourceError, ironSourceAdInfo);
    });
  }
  if (listener.onAdClicked) {
    eventEmitter.addListener(LP_RV_ON_AD_CLICKED, data => {
      const ironSourcePlacement = (0, _utils.ironSourceRvPlacementFromMap)(data.placement);
      const ironSourceAdInfo = (0, _utils.ironSourceAdInfoFromMap)(data.adInfo);
      listener.onAdRewarded(ironSourcePlacement, ironSourceAdInfo);
    });
  }
  if (listener.onAdReady) {
    eventEmitter.addListener(LP_MANUAL_RV_ON_AD_READY, data => {
      const ironSourceAdInfo = (0, _utils.ironSourceAdInfoFromMap)(data);
      listener.onAdReady(ironSourceAdInfo);
    });
  }
  if (listener.onAdLoadFailed) {
    eventEmitter.addListener(LP_MANUAL_RV_ON_AD_LOAD_FAILED, data => {
      const ironSourceError = (0, _utils.ironSourceErrorFromMap)(data);
      listener.onAdLoadFailed(ironSourceError);
    });
  }
};

/**=======================================================================================**/

/**
 * Exposed Module
 */
const mergedModule = {
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
};
const IronSource = exports.IronSource = Object.freeze(_reactNative.Platform.OS === 'ios' ? mergedModule :
// overwrite stub iOS related methods
{
  ...mergedModule,
  ...IOSMethodStubs
});
//# sourceMappingURL=IronSource.js.map