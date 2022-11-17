"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ATTrackingManager = exports.ATTStatus = void 0;

var _reactNative = require("react-native");

/**
 * This is an ATT bridge module.
 * Make sure to add NSUserTrackingUsageDescription to info.plist
 *   if you intend to show ATT request prompt.
 * https://developer.apple.com/documentation/apptrackingtransparency?language=objc
 */
const {
  ATTrackingManagerBridge
} = _reactNative.NativeModules;
// For reference
const ATTStatus = {
  NotDetermined: 0,
  Restricted: 1,
  Denied: 2,
  Authorized: 3,
  Not14: -1
}; // No reject for non-iOS

exports.ATTStatus = ATTStatus;
const ATTrackingManagerStub = {
  getTrackingAuthorizationStatus: () => Promise.resolve(ATTStatus.Not14),
  requestTrackingAuthorization: () => Promise.resolve(ATTStatus.Not14)
};
const ATTrackingManager = _reactNative.Platform.OS === 'ios' ? ATTrackingManagerBridge : ATTrackingManagerStub;
exports.ATTrackingManager = ATTrackingManager;
//# sourceMappingURL=ATTrackingManager.js.map