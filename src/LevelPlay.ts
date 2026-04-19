import { NativeEventEmitter, Platform } from 'react-native'
import type {
  LevelPlayImpressionDataListener,
  LevelPlayInitListener,
  LevelPlayInitRequest,
} from './models'
import {
  levelPlayConfigurationFromMap,
  levelPlayImpressionDataFromMap,
  levelPlayInitErrorFromMap,
} from './utils/utils'
import {
  PLUGIN_VERSION,
  PLUGIN_TYPE,
  ANDROID_SDK_VERSION,
  IOS_SDK_VERSION,
} from './utils/LevelPlayConstants'
import type { LevelPlaySegment } from './models/LevelPlaySegment'
import { setPluginData } from './utils/LevelPlayConfig'
import NativeLevelPlayMediation from './specs/NativeLevelPlayMediation'

const eventEmitter = new NativeEventEmitter(NativeLevelPlayMediation)
const { ON_INIT_FAILED, ON_INIT_SUCCESS, ON_IMPRESSION_SUCCESS } =
  NativeLevelPlayMediation.getConstants()

/**
 * Defines the methods for LevelPlay.
 */
type LevelPlayType = {
  /**
   * Validates the integration of the LevelPlay SDK.
   *
   * Android: validateIntegration
   *     iOS: validateIntegration
   */
  validateIntegration(): Promise<void>

  /**
   * Sets a dynamic user ID for tracking purposes.
   *
   * Android: setDynamicUserId
   *     iOS: setDynamicUserId
   */
  setDynamicUserId(userId: string): Promise<void>

  /**
   * Enables or disables debug mode for LevelPlay adapters.
   *
   * Android: setAdaptersDebug
   *     iOS: setAdaptersDebug
   */
  setAdaptersDebug(isEnabled: boolean): Promise<void>

  /**
   * Sets the user's consent status for data collection.
   *
   * @deprecated Use `LevelPlayPrivacySettings.setGDPRConsents()` instead for more granular control per network.
   *
   * Android: setConsent
   *     iOS: setConsent
   */
  setConsent(isConsent: boolean): Promise<void>

  /**
   * Sets metadata with key-value pairs for custom configurations.
   *
   * Android: setMetaData
   *     iOS: setMetaDataWithKey
   */
  setMetaData(key: string, values: Array<string>): Promise<void>

  /**
   * Configures a user segment with specific attributes for targeting purposes.
   *
   * Android: setSegment
   *     iOS: setSegment
   */
  setSegment(segment: LevelPlaySegment): Promise<void>

  /**
   * Launches the LevelPlay Test Suite for debugging and validation.
   *
   * Android: launchTestSuite
   *     iOS: launchTestSuite
   */
  launchTestSuite(): Promise<void>

  /**
   * Initializes the LevelPlay SDK with the given request and listener.
   * @param initRequest - The initialization request object.
   * @param initListener - The listener to handle initialization events.
   * @returns A Promise that resolves when initialization is complete.
   */
  init(
    initRequest: LevelPlayInitRequest,
    initListener: LevelPlayInitListener
  ): Promise<void>

  /**
   * Adds a listener for receiving impression data events.
   * @param listener - The listener to handle impression data events.
   */
  addImpressionDataListener: (
    listener: LevelPlayImpressionDataListener
  ) => Promise<void>

  /**
   * @returns The version of the LevelPlay plugin.
   */
  getPluginVersion: () => string

  /**
   * @returns The native SDK version of LevelPlay.
   */
  getNativeSDKVersion: () => string
}

// Utils

/**
 * @returns The version of the LevelPlay plugin.
 */
const getPluginVersion: () => string = () => {
  return PLUGIN_VERSION
}

/**
 * @returns The native SDK version of LevelPlay.
 */
const getNativeSDKVersion: () => string = () => {
  return Platform.OS === 'android'
    ? ANDROID_SDK_VERSION
    : Platform.OS === 'ios'
      ? IOS_SDK_VERSION
      : 'unsupported'
}

/**
 * @returns The version of React Native being used in the project.
 */
const getReactNativeVersion = (): string => {
  let version = ''
  try {
    version = require('react-native/package.json').version as string
  } catch (e) {
    console.error('Failed to get React Native version:', e)
  } finally {
    return version
  }
}

// Set Listeners

/**
 * Sets the listener for LevelPlay initialization events.
 * @param listener - The listener to handle initialization events.
 */
const setLevelPlayInitListener = (listener: LevelPlayInitListener) => {
  eventEmitter.removeAllListeners(ON_INIT_FAILED)
  eventEmitter.removeAllListeners(ON_INIT_SUCCESS)

  eventEmitter.addListener(ON_INIT_FAILED, (data: any) => {
    listener.onInitFailed!(levelPlayInitErrorFromMap(data))
  })
  eventEmitter.addListener(ON_INIT_SUCCESS, (data: any) => {
    listener.onInitSuccess!(levelPlayConfigurationFromMap(data))
  })
}

/**
 * Sets the addImpressionDataListener to handle impression data events.
 * @param listener The addImpressionDataListener object containing event handlers.
 */
const addImpressionDataListener = async (
  listener: LevelPlayImpressionDataListener
) => {
  // Remove any existing listeners
  eventEmitter.removeAllListeners(ON_IMPRESSION_SUCCESS)

  await NativeLevelPlayMediation.addImpressionDataListener()

  // Add the new listener if provided
  if (listener.onImpressionSuccess) {
    eventEmitter.addListener(ON_IMPRESSION_SUCCESS, (data: any) => {
      listener.onImpressionSuccess!(levelPlayImpressionDataFromMap(data))
    })
  }
}

// Initialization

/**
 * Initializes the LevelPlay SDK with the given request and listener.
 * @param initRequest - The initialization request object.
 * @param initListener - The listener to handle initialization events.
 * @returns A Promise that resolves when initialization is complete.
 */
const init = async (
  initRequest: LevelPlayInitRequest,
  initListener: LevelPlayInitListener
): Promise<void> => {
  try {
    const reactNativeVersion = getReactNativeVersion()
    await setPluginData(PLUGIN_TYPE, PLUGIN_VERSION, reactNativeVersion)
  } catch (e) {
    console.error('Failed to set plugin data:', e)
  }

  setLevelPlayInitListener(initListener)
  await NativeLevelPlayMediation.init(
    initRequest.appKey,
    initRequest.userId || undefined
  )
}

type LevelPlayNativeMethodsType = Omit<
  LevelPlayType,
  | 'init'
  | 'getPluginVersion'
  | 'getNativeSDKVersion'
  | 'addImpressionDataListener'
>

const LevelPlayNativeMethods: LevelPlayNativeMethodsType =
  NativeLevelPlayMediation

export const LevelPlay: LevelPlayType = Object.create(LevelPlayNativeMethods, {
  getPluginVersion: {
    value: getPluginVersion,
    enumerable: true,
  },
  getNativeSDKVersion: {
    value: getNativeSDKVersion,
    enumerable: true,
  },
  init: {
    value: init,
    enumerable: true,
  },
  addImpressionDataListener: {
    value: addImpressionDataListener,
    enumerable: true,
  },
})
