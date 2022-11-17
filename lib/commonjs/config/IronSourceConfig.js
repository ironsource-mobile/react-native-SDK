"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setPluginData = void 0;

var _reactNative = require("react-native");

/**
 * Internal Config module.
 */
const {
  IronSourceConfig
} = _reactNative.NativeModules;
const setPluginData = IronSourceConfig.setPluginData;
exports.setPluginData = setPluginData;
//# sourceMappingURL=IronSourceConfig.js.map