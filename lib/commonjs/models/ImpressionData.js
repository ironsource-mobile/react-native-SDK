"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.impressionDataCodec = void 0;

var t = _interopRequireWildcard(require("io-ts"));

var _utils = require("./utils");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/**
 * Used for Event Listeners
 */

/**
 * ARM ImpressionData
 * Parameter Details:
 * https://developers.is.com/ironsource-mobile/general/ad-revenue-measurement-postbacks/#step-2
 */
const impressionDataCodec = t.type({
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
exports.impressionDataCodec = impressionDataCodec;
//# sourceMappingURL=ImpressionData.js.map