"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.IronSource = void 0;
var _reactNative = require("react-native");
var _IronSourceConfig = require("./config/IronSourceConfig");
var _IronSourceConstants = require("./IronSourceConstants");
/**
 * This is the main IronSource bridge module.
 */

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
const {
  IronSourceMediation
} = _reactNative.NativeModules;
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
const showOfferwall = async placementName => {
  return placementName === undefined ? IronSourceNativeModule.showOfferwall() : IronSourceNativeModule.showOfferwallForPlacement(placementName);
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
  showOfferwall
};
const IronSource = exports.IronSource = Object.freeze(_reactNative.Platform.OS === 'ios' ? mergedModule :
// overwrite stub iOS related methods
{
  ...mergedModule,
  ...IOSMethodStubs
});
//# sourceMappingURL=IronSource.js.map