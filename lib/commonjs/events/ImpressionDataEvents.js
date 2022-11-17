"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ImpressionDataEvents = void 0;

var _reactNative = require("react-native");

var _models = require("../models");

var _utils = require("../models/utils");

// The Main Module
const {
  IronSourceMediation
} = _reactNative.NativeModules; // Event Name Constants defined on each platform

const {
  ON_IMPRESSION_SUCCESS
} = IronSourceMediation.getConstants(); // Create an EventEmitter to subscribe to ImpressionDataListener callbacks

const eventEmitter = new _reactNative.NativeEventEmitter(IronSourceMediation);
/**
 * ARM ImpressionDataListener event API
 * The ARM SDK Postbacks flag must be enabled to receive data
 * https://developers.is.com/ironsource-mobile/general/ad-revenue-measurement-postbacks/#step-1
 */

/**
 * Android: onImpressionSuccess
 *     iOS: impressionDataDidSucceed
 */

const onImpressionSuccess = {
  setListener: listener => {
    eventEmitter.removeAllListeners(ON_IMPRESSION_SUCCESS);
    eventEmitter.addListener(ON_IMPRESSION_SUCCESS, dataObj => listener(dataObj ? (0, _utils.decode)(_models.impressionDataCodec, dataObj) : undefined));
  },
  removeListener: () => eventEmitter.removeAllListeners(ON_IMPRESSION_SUCCESS)
};

const removeAllListeners = () => {
  onImpressionSuccess.removeListener();
};

const ImpressionDataEvents = {
  onImpressionSuccess,
  removeAllListeners
};
exports.ImpressionDataEvents = ImpressionDataEvents;
//# sourceMappingURL=ImpressionDataEvents.js.map