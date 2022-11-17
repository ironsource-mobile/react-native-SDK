/**
 * This is the main IronSource bridge module.
 */
import { NativeModules, Platform } from 'react-native';
import { setPluginData } from './config/IronSourceConfig';
import { ANDROID_SDK_VERSION, IOS_SDK_VERSION, PLUGIN_TYPE, PLUGIN_VERSION } from './IronSourceConstants';

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
  return PLUGIN_VERSION;
};

const getNativeSDKVersion = () => {
  return Platform.OS === 'android' ? ANDROID_SDK_VERSION : Platform.OS === 'ios' ? IOS_SDK_VERSION : 'unsupported';
};
/** Module  =======================================================================**/


const {
  IronSourceMediation
} = NativeModules;
const IronSourceNativeModule = IronSourceMediation;
/**
 * Proxy Functions
 */

const init = async (appKey, adUnits) => {
  try {
    const reactNativeVersion = getReactNativeVersion();
    console.log('reactNativeVersion', reactNativeVersion); // TODO: delete
    // set plugin data

    await setPluginData(PLUGIN_TYPE, PLUGIN_VERSION, reactNativeVersion);
  } catch (e) {
    // log?
    console.warn('failed to set plugin data');
  } // init


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

const mergedModule = { ...IronSourceMediation,
  getPluginVersion,
  getNativeSDKVersion,
  init,
  showRewardedVideo,
  showInterstitial,
  showOfferwall
};
export const IronSource = Object.freeze(Platform.OS === 'ios' ? mergedModule : // overwrite stub iOS related methods
{ ...mergedModule,
  ...IOSMethodStubs
});
//# sourceMappingURL=IronSource.js.map