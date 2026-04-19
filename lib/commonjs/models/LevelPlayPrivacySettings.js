"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelPlayPrivacySettings = void 0;
var _NativeLevelPlayMediation = _interopRequireDefault(require("../specs/NativeLevelPlayMediation"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
/**
 * LevelPlayPrivacySettings provides privacy APIs for the LevelPlay SDK.
 * Use these methods to set privacy flags for GDPR, CCPA, and COPPA compliance.
 */

/**
 * LevelPlayPrivacySettings singleton instance.
 * Provides privacy compliance methods for GDPR, CCPA, and COPPA.
 */
const LevelPlayPrivacySettings = exports.LevelPlayPrivacySettings = {
  setGDPRConsents: async networkConsents => {
    return await _NativeLevelPlayMediation.default.setGDPRConsents(networkConsents);
  },
  setCCPA: async value => {
    return await _NativeLevelPlayMediation.default.setCCPA(value);
  },
  setCOPPA: async value => {
    return await _NativeLevelPlayMediation.default.setCOPPA(value);
  }
};
//# sourceMappingURL=LevelPlayPrivacySettings.js.map