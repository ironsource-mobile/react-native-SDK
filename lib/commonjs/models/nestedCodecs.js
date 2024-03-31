"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.placementAdInfoCodec = exports.nativeAdInfoCodec = exports.nativeAdErrorCodec = exports.errorAdInfoCodec = void 0;
var t = _interopRequireWildcard(require("io-ts"));
var _errors = require("./errors");
var _IronSourceAdInfo = require("./IronSourceAdInfo");
var _ironsourceMediation = require("ironsource-mediation");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
/**
 * Used for Event Listeners
 * AdInfo params:
 * https://developers.is.com/ironsource-mobile/android/levelplay-listener-adinfo-integration/#step-3
 */

const placementAdInfoCodec = exports.placementAdInfoCodec = t.type({
  placement: _ironsourceMediation.ironSourceRVPlacementCodec,
  adInfo: _IronSourceAdInfo.ironSourceAdInfoCodec
});
const errorAdInfoCodec = exports.errorAdInfoCodec = t.type({
  error: _errors.ironSourceErrorCodec,
  adInfo: _IronSourceAdInfo.ironSourceAdInfoCodec
});
//# sourceMappingURL=nestedCodecs.js.map