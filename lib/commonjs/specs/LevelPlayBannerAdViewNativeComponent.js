"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.Commands = void 0;
var _codegenNativeComponent = _interopRequireDefault(require("react-native/Libraries/Utilities/codegenNativeComponent"));
var _codegenNativeCommands = _interopRequireDefault(require("react-native/Libraries/Utilities/codegenNativeCommands"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
// CodeGen-compatible interfaces (no imports from models to avoid class type issues)

/**
 * Native commands callable from JS for managing LevelPlay Banner Ad View.
 */

/**
 * JS interface to banner ad view commands for LevelPlay Banner Ad View.
 */
const Commands = exports.Commands = (0, _codegenNativeCommands.default)({
  supportedCommands: ['loadAd', 'destroy', 'pauseAutoRefresh', 'resumeAutoRefresh']
});
var _default = exports.default = (0, _codegenNativeComponent.default)('LevelPlayBannerAdView');
//# sourceMappingURL=LevelPlayBannerAdViewNativeComponent.js.map