"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InitializationEvents = void 0;
var _reactNative = require("react-native");
// The Main Module
const {
  IronSourceMediation
} = _reactNative.NativeModules;
// Event Name Constants defined on each platform
const {
  ON_INITIALIZATION_COMPLETE
} = IronSourceMediation.getConstants();

// Create an EventEmitter to subscribe to InitializationListener callbacks
const eventEmitter = new _reactNative.NativeEventEmitter(IronSourceMediation);

/**
 * InitializationListener Callback Events Handler APIs
 */

/**
 * The listener will be called on the first SDK init completion.
 * Android: onInitializationComplete
 *     iOS: initializationDidComplete
 */
const onInitializationComplete = {
  setListener: listener => {
    eventEmitter.removeAllListeners(ON_INITIALIZATION_COMPLETE);
    eventEmitter.addListener(ON_INITIALIZATION_COMPLETE, () => listener());
  },
  removeListener: () => eventEmitter.removeAllListeners(ON_INITIALIZATION_COMPLETE)
};
const removeAllListeners = () => {
  onInitializationComplete.removeListener();
};

/**
 * @deprecated This module [InitializationEvents] is deprecated and will be removed in future releases.
 * Use IronSource.setInitializationListener instead.
 * 
 * Migration example:
 * 
 * Before:
 * 
 * import { InitializationEvents } from 'ironsource-mediation';
 * 
 * InitializationEvents.onInitializationComplete.setListener(yourListener);
 * 
 * After:
 * 
 * import { IronSource } from 'ironsource-mediation';
 * 
 * const listener: InitializationListener = {
 *  onInitializationComplete: () => {},
 * };
 * IronSource.setInitializationListener(listener);
 */
const InitializationEvents = exports.InitializationEvents = {
  onInitializationComplete,
  removeAllListeners
};
//# sourceMappingURL=InitializationEvents.js.map