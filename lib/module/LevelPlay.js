import { NativeModules, NativeEventEmitter } from 'react-native';
import { levelPlayConfigurationFromMap, levelPlayInitErrorFromMap } from './utils/utils';
const {
  IronSourceMediation
} = NativeModules;
const eventEmitter = new NativeEventEmitter(IronSourceMediation);
const {
  ON_INIT_FAILED,
  ON_INIT_SUCCESS
} = IronSourceMediation.getConstants();

/**
 * Defines the methods for LevelPlay.
 */

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
 * Initializes the LevelPlay SDK with the given request and listener.
 * @param initRequest - The initialization request object.
 * @param initListener - The listener to handle initialization events.
 * @returns A Promise that resolves when initialization is complete.
 */
const init = async (initRequest, initListener) => {
  setLevelPlayInitListener(initListener);
  await IronSourceMediation.initLevelPlay(initRequest.toMap());
};
export const LevelPlay = {
  init
};
//# sourceMappingURL=LevelPlay.js.map