"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.errorAdInfoCodec = exports.placementAdInfoCodec = void 0;

var t = _interopRequireWildcard(require("io-ts"));

var _errors = require("./errors");

var _IronSourceAdInfo = require("./IronSourceAdInfo");

var _IronSourceRVPlacement = require("./IronSourceRVPlacement");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/**
 * Used for Event Listeners
 * AdInfo params:
 * https://developers.is.com/ironsource-mobile/android/levelplay-listener-adinfo-integration/#step-3
 */
const placementAdInfoCodec = t.type({
  placement: _IronSourceRVPlacement.ironSourceRVPlacementCodec,
  adInfo: _IronSourceAdInfo.ironSourceAdInfoCodec
});
exports.placementAdInfoCodec = placementAdInfoCodec;
const errorAdInfoCodec = t.type({
  error: _errors.ironSourceErrorCodec,
  adInfo: _IronSourceAdInfo.ironSourceAdInfoCodec
});
exports.errorAdInfoCodec = errorAdInfoCodec;
//# sourceMappingURL=nestedCodecs.js.map