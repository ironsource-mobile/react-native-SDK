"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.optional = exports.decode = void 0;
var t = _interopRequireWildcard(require("io-ts"));
var _function = require("fp-ts/function");
var _Either = require("fp-ts/Either");
var _ioTsReporters = _interopRequireDefault(require("io-ts-reporters"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
// failure handler
const onLeft = errors => {
  throw new Error(`DecodeError:\n${_ioTsReporters.default.report((0, _Either.left)(errors)).join('\n')}`);
};

/**
 * Throws when decode fails
 */
const decode = (codec, value) => {
  return (0, _function.pipe)(codec.decode(value), (0, _Either.fold)(onLeft, decoded => decoded));
};

/**
 * for an optional field
 * T | undefined
 */
exports.decode = decode;
const optional = codec => t.union([codec, t.undefined]);

/** Util Types ==================================================================**/
exports.optional = optional;
//# sourceMappingURL=utils.js.map