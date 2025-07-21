import { NativeModules, NativeEventEmitter, Platform } from 'react-native';
import { levelPlayConfigurationFromMap, levelPlayImpressionDataFromMap, levelPlayInitErrorFromMap } from './utils/utils';
import { PLUGIN_VERSION, PLUGIN_TYPE, ANDROID_SDK_VERSION, IOS_SDK_VERSION } from './utils/IronSourceConstants';
import { setPluginData } from './utils/IronSourceConfig';
const {
  LevelPlayMediation
} = NativeModules;
const eventEmitter = new NativeEventEmitter(LevelPlayMediation);
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
  return PLUGIN_VERSION;
};

/**
 * @returns The native SDK version of LevelPlay.
 */
const getNativeSDKVersion = () => {
  return Platform.OS === 'android' ? ANDROID_SDK_VERSION : Platform.OS === 'ios' ? IOS_SDK_VERSION : 'unsupported';
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
    listener.onInitFailed(levelPlayInitErrorFromMap(data));
  });
  eventEmitter.addListener(ON_INIT_SUCCESS, data => {
    listener.onInitSuccess(levelPlayConfigurationFromMap(data));
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
      listener.onImpressionSuccess(levelPlayImpressionDataFromMap(data));
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
    await setPluginData(PLUGIN_TYPE, PLUGIN_VERSION, reactNativeVersion);
  } catch (e) {
    console.error('Failed to set plugin data:', e);
  }
  setLevelPlayInitListener(initListener);
  await LevelPlayMediation.initLevelPlay(initRequest.toMap());
};
const LevelPlayNativeMethods = LevelPlayMediation;
export const LevelPlay = Object.create(LevelPlayNativeMethods, {
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