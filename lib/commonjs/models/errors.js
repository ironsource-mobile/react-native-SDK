"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.consentViewErrorCodec = exports.ironSourceErrorCodec = void 0;

var t = _interopRequireWildcard(require("io-ts"));

var _utils = require("./utils");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/**
 * Used for Event Listeners
 */
// props
const ironSourceErrorProps = {
  errorCode: t.number,
  message: (0, _utils.optional)(t.string)
}; // codec

const ironSourceErrorCodec = t.type(ironSourceErrorProps); // type

exports.ironSourceErrorCodec = ironSourceErrorCodec;

/**
 * iOS 14 ConsentView =========================================================
 */
// props
const consentViewProps = { ...ironSourceErrorProps,
  consentViewType: t.string
}; // codec

const consentViewErrorCodec = t.type(consentViewProps); // type

exports.consentViewErrorCodec = consentViewErrorCodec;
//# sourceMappingURL=errors.js.map