"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelPlayNativeAdComponent = void 0;
var _reactNative = require("react-native");
// Object to cache native components
const componentCache = {};

/**
 * Retrieves or creates a native component for a given viewType and returns it as a HostComponent.
 * 
 * @param viewType The type of the native component to be retrieved or created.
 * @returns A HostComponent representing the native component with specified props and events.
 */
const LevelPlayNativeAdComponent = viewType => {
  if (!componentCache[viewType]) {
    componentCache[viewType] = (0, _reactNative.requireNativeComponent)(viewType);
  }
  return componentCache[viewType];
};
exports.LevelPlayNativeAdComponent = LevelPlayNativeAdComponent;
//# sourceMappingURL=LevelPlayNativeAdComponent.js.map