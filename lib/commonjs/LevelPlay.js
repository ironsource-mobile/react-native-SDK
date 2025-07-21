"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelPlay = void 0;
var _reactNative = require("react-native");
var _utils = require("./utils/utils");
var _IronSourceConstants = require("./utils/IronSourceConstants");
var _IronSourceConfig = require("./utils/IronSourceConfig");
const {
  LevelPlayMediation
} = _reactNative.NativeModules;
const eventEmitter = new _reactNative.NativeEventEmitter(LevelPlayMediation);
const {
  ON_INIT_FAILED,
  ON_INIT_SUCCESS,
  ON_LEVEL_PLAY_IMPRESSION_SUCCESS
} = LevelPlayMediation.getConstants();

/**
 * Defines the methods for LevelPlay.
 */

// Utils

/**
 * @returns The version of the LevelPlay plugin.
 */
const getPluginVersion = () => {
  return _IronSourceConstants.PLUGIN_VERSION;
};

/**
 * @returns The native SDK version of LevelPlay.
 */
const getNativeSDKVersion = () => {
  return _reactNative.Platform.OS === 'android' ? _IronSourceConstants.ANDROID_SDK_VERSION : _reactNative.Platform.OS === 'ios' ? _IronSourceConstants.IOS_SDK_VERSION : 'unsupported';
};

/**
 * @returns The version of React Native being used in the project.
 */
const getReactNativeVersion = () => {
  let version = '';
  try {
    version = require('react-native/package.json').version;
  } catch (e) {
    console.error('Failed to get React Native version:', e);
  } finally {
    return version;
  }
};

// Set Listeners

/**
 * Sets the listener for LevelPlay initialization events.
 * @param listener - The listener to handle initialization events.
 */
const setLevelPlayInitListener = listener => {
  eventEmitter.removeAllListeners(ON_INIT_FAILED);
  eventEmitter.removeAllListeners(ON_INIT_SUCCESS);
  eventEmitter.addListener(ON_INIT_FAILED, data => {
    listener.onInitFailed((0, _utils.levelPlayInitErrorFromMap)(data));
  });
  eventEmitter.addListener(ON_INIT_SUCCESS, data => {
    listener.onInitSuccess((0, _utils.levelPlayConfigurationFromMap)(data));
  });
};

/**
 * Sets the addImpressionDataListener to handle impression data events.
 * @param listener The addImpressionDataListener object containing event handlers.
 */
const addImpressionDataListener = async listener => {
  // Remove any existing listeners
  eventEmitter.removeAllListeners(ON_LEVEL_PLAY_IMPRESSION_SUCCESS);
  await LevelPlayMediation.addImpressionDataListener();

  // Add the new listener if provided
  if (listener.onImpressionSuccess) {
    eventEmitter.addListener(ON_LEVEL_PLAY_IMPRESSION_SUCCESS, data => {
      listener.onImpressionSuccess((0, _utils.levelPlayImpressionDataFromMap)(data));
    });
  }
};

// Initialization

/**
 * Initializes the LevelPlay SDK with the given request and listener.
 * @param initRequest - The initialization request object.
 * @param initListener - The listener to handle initialization events.
 * @returns A Promise that resolves when initialization is complete.
 */
const init = async (initRequest, initListener) => {
  try {
    const reactNativeVersion = getReactNativeVersion();
    await (0, _IronSourceConfig.setPluginData)(_IronSourceConstants.PLUGIN_TYPE, _IronSourceConstants.PLUGIN_VERSION, reactNativeVersion);
  } catch (e) {
    console.error('Failed to set plugin data:', e);
  }
  setLevelPlayInitListener(initListener);
  await LevelPlayMediation.initLevelPlay(initRequest.toMap());
};
const LevelPlayNativeMethods = LevelPlayMediation;
const LevelPlay = exports.LevelPlay = Object.create(LevelPlayNativeMethods, {
  getPluginVersion: {
    value: getPluginVersion,
    enumerable: true
  },
  getNativeSDKVersion: {
    value: getNativeSDKVersion,
    enumerable: true
  },
  init: {
    value: init,
    enumerable: true
  },
  addImpressionDataListener: {
    value: addImpressionDataListener,
    enumerable: true
  }
});
//# sourceMappingURL=LevelPlay.js.map