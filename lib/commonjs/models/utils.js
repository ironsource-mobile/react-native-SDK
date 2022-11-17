"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.optional = exports.decode = void 0;

var t = _interopRequireWildcard(require("io-ts"));

var _function = require("fp-ts/function");

var _Either = require("fp-ts/Either");

var _ioTsReporters = _interopRequireDefault(require("io-ts-reporters"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

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