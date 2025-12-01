"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelPlay = void 0;
var _reactNative = require("react-native");
var _utils = require("./utils/utils");
var _LevelPlayConstants = require("./utils/LevelPlayConstants");
var _LevelPlayConfig = require("./utils/LevelPlayConfig");
var _NativeLevelPlayMediation = _interopRequireDefault(require("./specs/NativeLevelPlayMediation"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const eventEmitter = new _reactNative.NativeEventEmitter(_NativeLevelPlayMediation.default);
const {
  ON_INIT_FAILED,
  ON_INIT_SUCCESS,
  ON_IMPRESSION_SUCCESS
} = _NativeLevelPlayMediation.default.getConstants();

/**
 * Defines the methods for LevelPlay.
 */

// Utils

/**
 * @returns The version of the LevelPlay plugin.
 */
const getPluginVersion = () => {
  return _LevelPlayConstants.PLUGIN_VERSION;
};

/**
 * @returns The native SDK version of LevelPlay.
 */
const getNativeSDKVersion = () => {
  return _reactNative.Platform.OS === 'android' ? _LevelPlayConstants.ANDROID_SDK_VERSION : _reactNative.Platform.OS === 'ios' ? _LevelPlayConstants.IOS_SDK_VERSION : 'unsupported';
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
  eventEmitter.removeAllListeners(ON_IMPRESSION_SUCCESS);
  await _NativeLevelPlayMediation.default.addImpressionDataListener();

  // Add the new listener if provided
  if (listener.onImpressionSuccess) {
    eventEmitter.addListener(ON_IMPRESSION_SUCCESS, data => {
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
    await (0, _LevelPlayConfig.setPluginData)(_LevelPlayConstants.PLUGIN_TYPE, _LevelPlayConstants.PLUGIN_VERSION, reactNativeVersion);
  } catch (e) {
    console.error('Failed to set plugin data:', e);
  }
  setLevelPlayInitListener(initListener);
  await _NativeLevelPlayMediation.default.init(initRequest.appKey, initRequest.userId || undefined);
};
const LevelPlayNativeMethods = _NativeLevelPlayMediation.default;
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