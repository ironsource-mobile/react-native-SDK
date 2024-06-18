"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.IronSource = void 0;
var _reactNative = require("react-native");
var _IronSourceConfig = require("./config/IronSourceConfig");
var _IronSourceConstants = require("./IronSourceConstants");
var _utils = require("./models/utils");
var _models = require("./models");
var _nestedCodecs = require("./models/nestedCodecs");
var _ConsentViewInfo = require("./models/ConsentViewInfo");
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

const init = async (appKey, adUnits) => {
  try {
    const reactNativeVersion = getReactNativeVersion();
    console.log('reactNativeVersion', reactNativeVersion); // TODO: delete
    // set plugin data
    await (0, _IronSourceConfig.setPluginData)(_IronSourceConstants.PLUGIN_TYPE, _IronSourceConstants.PLUGIN_VERSION, reactNativeVersion);
  } catch (e) {
    // log?
    console.warn('failed to set plugin data');
  }

  // init
  return adUnits === undefined || adUnits.length === 0 ? IronSourceNativeModule.init(appKey) : IronSourceNativeModule.initWithAdUnits(appKey, adUnits);
};
const showRewardedVideo = async placementName => {
  return placementName === undefined ? IronSourceNativeModule.showRewardedVideo() : IronSourceNativeModule.showRewardedVideoForPlacement(placementName);
};
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
    eventEmitter.addListener(ON_IMPRESSION_SUCCESS, dataObj => {
      const data = dataObj ? (0, _utils.decode)(_models.impressionDataCodec, dataObj) : undefined;
      listener.onImpressionSuccess(data);
    });
  }
};

/**
 * Sets the consentViewListener to handle consent view events.
 * @param listener The consentViewListener object containing event handlers.
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
    eventEmitter.addListener(CONSENT_VIEW_DID_LOAD_SUCCESS, consentViewInfoObj => {
      const {
        consentViewType
      } = (0, _utils.decode)(_ConsentViewInfo.consentViewInfoCodec, consentViewInfoObj);
      listener.onConsentViewDidLoadSuccess(consentViewType);
    });
  }
  if (listener.onConsentViewDidFailToLoad) {
    eventEmitter.addListener(CONSENT_VIEW_DID_FAIL_TO_LOAD, errorObj => {
      const error = (0, _utils.decode)(_models.consentViewErrorCodec, errorObj);
      listener.onConsentViewDidFailToLoad(error);
    });
  }
  if (listener.onConsentViewDidShowSuccess) {
    eventEmitter.addListener(CONSENT_VIEW_DID_SHOW_SUCCESS, consentViewInfoObj => {
      const {
        consentViewType
      } = (0, _utils.decode)(_ConsentViewInfo.consentViewInfoCodec, consentViewInfoObj);
      listener.onConsentViewDidShowSuccess(consentViewType);
    });
  }
  if (listener.onConsentViewDidFailToShow) {
    eventEmitter.addListener(CONSENT_VIEW_DID_FAIL_TO_SHOW, errorObj => {
      const error = (0, _utils.decode)(_models.consentViewErrorCodec, errorObj);
      listener.onConsentViewDidFailToShow(error);
    });
  }
  if (listener.onConsentViewDidAccept) {
    eventEmitter.addListener(CONSENT_VIEW_DID_ACCEPT, consentViewInfoObj => {
      const {
        consentViewType
      } = consentViewInfoObj;
      listener.onConsentViewDidAccept(consentViewType);
    });
  }
};

/**
 * Sets the setLevelPlayBannerListener to handle banner ad events.
 * @param listener The setLevelPlayBannerListener object containing event handlers.
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
    eventEmitter.addListener(LP_BN_ON_AD_LOADED, adInfoObj => {
      listener.onAdLoaded((0, _utils.decode)(_models.ironSourceAdInfoCodec, adInfoObj));
    });
  }
  if (listener.onAdLoadFailed) {
    eventEmitter.addListener(LP_BN_ON_AD_LOAD_FAILED, errorObj => {
      listener.onAdLoadFailed((0, _utils.decode)(_models.ironSourceErrorCodec, errorObj));
    });
  }
  if (listener.onAdClicked) {
    eventEmitter.addListener(LP_BN_ON_AD_CLICKED, adInfoObj => {
      listener.onAdClicked((0, _utils.decode)(_models.ironSourceAdInfoCodec, adInfoObj));
    });
  }
  if (listener.onAdScreenPresented) {
    eventEmitter.addListener(LP_BN_ON_AD_SCREEN_PRESENTED, adInfoObj => {
      listener.onAdScreenPresented((0, _utils.decode)(_models.ironSourceAdInfoCodec, adInfoObj));
    });
  }
  if (listener.onAdScreenDismissed) {
    eventEmitter.addListener(LP_BN_ON_AD_SCREEN_DISMISSED, adInfoObj => {
      listener.onAdScreenDismissed((0, _utils.decode)(_models.ironSourceAdInfoCodec, adInfoObj));
    });
  }
  if (listener.onAdLeftApplication) {
    eventEmitter.addListener(LP_BN_ON_AD_LEFT_APPLICATION, adInfoObj => {
      listener.onAdLeftApplication((0, _utils.decode)(_models.ironSourceAdInfoCodec, adInfoObj));
    });
  }
};

/**
 * Sets the LevelPlayInterstitialListener to handle interstitial ad events.
 * @param listener The LevelPlayInterstitialListener object containing event handlers.
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
    eventEmitter.addListener(LP_IS_ON_AD_READY, adInfoObj => {
      listener.onAdReady((0, _utils.decode)(_models.ironSourceAdInfoCodec, adInfoObj));
    });
  }
  if (listener.onAdLoadFailed) {
    eventEmitter.addListener(LP_IS_ON_AD_LOAD_FAILED, errorObj => {
      listener.onAdLoadFailed((0, _utils.decode)(_models.ironSourceErrorCodec, errorObj));
    });
  }
  if (listener.onAdOpened) {
    eventEmitter.addListener(LP_IS_ON_AD_OPENED, adInfoObj => {
      listener.onAdOpened((0, _utils.decode)(_models.ironSourceAdInfoCodec, adInfoObj));
    });
  }
  if (listener.onAdClosed) {
    eventEmitter.addListener(LP_IS_ON_AD_CLOSED, adInfoObj => {
      listener.onAdClosed((0, _utils.decode)(_models.ironSourceAdInfoCodec, adInfoObj));
    });
  }
  if (listener.onAdShowFailed) {
    eventEmitter.addListener(LP_IS_ON_AD_SHOW_FAILED, obj => {
      const {
        error,
        adInfo
      } = (0, _utils.decode)(_nestedCodecs.errorAdInfoCodec, obj);
      listener.onAdShowFailed(error, adInfo);
    });
  }
  if (listener.onAdClicked) {
    eventEmitter.addListener(LP_IS_ON_AD_CLICKED, adInfoObj => {
      listener.onAdClicked((0, _utils.decode)(_models.ironSourceAdInfoCodec, adInfoObj));
    });
  }
  if (listener.onAdShowSucceeded) {
    eventEmitter.addListener(LP_IS_ON_AD_SHOW_SUCCEEDED, adInfoObj => {
      listener.onAdShowSucceeded((0, _utils.decode)(_models.ironSourceAdInfoCodec, adInfoObj));
    });
  }
};

/**
 * Sets the LevelPlayRewardedVideoListener to handle rewarded video ad events.
 * @param listener The LevelPlayRewardedVideoListener object containing event handlers.
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
    eventEmitter.addListener(LP_RV_ON_AD_AVAILABLE, adInfoObj => {
      listener.onAdAvailable((0, _utils.decode)(_models.ironSourceAdInfoCodec, adInfoObj));
    });
  }
  if (listener.onAdUnavailable) {
    eventEmitter.addListener(LP_RV_ON_AD_UNAVAILABLE, () => listener.onAdUnavailable());
  }
  if (listener.onAdOpened) {
    eventEmitter.addListener(LP_RV_ON_AD_OPENED, adInfoObj => {
      listener.onAdOpened((0, _utils.decode)(_models.ironSourceAdInfoCodec, adInfoObj));
    });
  }
  if (listener.onAdClosed) {
    eventEmitter.addListener(LP_RV_ON_AD_CLOSED, adInfoObj => {
      listener.onAdClosed((0, _utils.decode)(_models.ironSourceAdInfoCodec, adInfoObj));
    });
  }
  if (listener.onAdRewarded) {
    eventEmitter.addListener(LP_RV_ON_AD_REWARDED, obj => {
      const {
        placement,
        adInfo
      } = (0, _utils.decode)(_nestedCodecs.placementAdInfoCodec, obj);
      listener.onAdRewarded(placement, adInfo);
    });
  }
  if (listener.onAdShowFailed) {
    eventEmitter.addListener(LP_RV_ON_AD_SHOW_FAILED, obj => {
      const {
        error,
        adInfo
      } = (0, _utils.decode)(_nestedCodecs.errorAdInfoCodec, obj);
      listener.onAdShowFailed(error, adInfo);
    });
  }
  if (listener.onAdClicked) {
    eventEmitter.addListener(LP_RV_ON_AD_CLICKED, obj => {
      const {
        placement,
        adInfo
      } = (0, _utils.decode)(_nestedCodecs.placementAdInfoCodec, obj);
      listener.onAdClicked(placement, adInfo);
    });
  }
};

/**
 * Sets the LevelPlayRewardedVideoManualListener to handle rewarded video ad events.
 * @param listener The LevelPlayRewardedVideoManualListener object containing event handlers.
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
    eventEmitter.addListener(LP_RV_ON_AD_OPENED, adInfoObj => {
      listener.onAdOpened((0, _utils.decode)(_models.ironSourceAdInfoCodec, adInfoObj));
    });
  }
  if (listener.onAdClosed) {
    eventEmitter.addListener(LP_RV_ON_AD_CLOSED, adInfoObj => {
      listener.onAdClosed((0, _utils.decode)(_models.ironSourceAdInfoCodec, adInfoObj));
    });
  }
  if (listener.onAdRewarded) {
    eventEmitter.addListener(LP_RV_ON_AD_REWARDED, obj => {
      const {
        placement,
        adInfo
      } = (0, _utils.decode)(_nestedCodecs.placementAdInfoCodec, obj);
      listener.onAdRewarded(placement, adInfo);
    });
  }
  if (listener.onAdShowFailed) {
    eventEmitter.addListener(LP_RV_ON_AD_SHOW_FAILED, obj => {
      const {
        error,
        adInfo
      } = (0, _utils.decode)(_nestedCodecs.errorAdInfoCodec, obj);
      listener.onAdShowFailed(error, adInfo);
    });
  }
  if (listener.onAdClicked) {
    eventEmitter.addListener(LP_RV_ON_AD_CLICKED, obj => {
      const {
        placement,
        adInfo
      } = (0, _utils.decode)(_nestedCodecs.placementAdInfoCodec, obj);
      listener.onAdClicked(placement, adInfo);
    });
  }
  if (listener.onAdReady) {
    eventEmitter.addListener(LP_MANUAL_RV_ON_AD_READY, adInfoObj => {
      listener.onAdReady((0, _utils.decode)(_models.ironSourceAdInfoCodec, adInfoObj));
    });
  }
  if (listener.onAdLoadFailed) {
    eventEmitter.addListener(LP_MANUAL_RV_ON_AD_LOAD_FAILED, errorObj => {
      listener.onAdLoadFailed((0, _utils.decode)(_models.ironSourceErrorCodec, errorObj));
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