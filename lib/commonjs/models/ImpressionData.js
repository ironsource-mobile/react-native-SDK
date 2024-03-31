"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.impressionDataCodec = void 0;
var t = _interopRequireWildcard(require("io-ts"));
var _utils = require("./utils");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
/**
 * Used for Event Listeners
 */

/**
 * ARM ImpressionData
 * Parameter Details:
 * https://developers.is.com/ironsource-mobile/general/ad-revenue-measurement-postbacks/#step-2
 */
const impressionDataCodec = exports.impressionDataCodec = t.type({
  auctionId: (0, _utils.optional)(t.string),
  adUnit: (0, _utils.optional)(t.string),
  country: (0, _utils.optional)(t.string),
  ab: (0, _utils.optional)(t.string),
  segmentName: (0, _utils.optional)(t.string),
  placement: (0, _utils.optional)(t.string),
  adNetwork: (0, _utils.optional)(t.string),
  instanceName: (0, _utils.optional)(t.string),
  instanceId: (0, _utils.optional)(t.string),
  revenue: (0, _utils.optional)(t.number),
  // Double
  precision: (0, _utils.optional)(t.string),
  lifetimeRevenue: (0, _utils.optional)(t.number),
  // Double
  encryptedCPM: (0, _utils.optional)(t.string)
});
//# sourceMappingURL=ImpressionData.js.map