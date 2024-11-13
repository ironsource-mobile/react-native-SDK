"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.toNumberOrNull = exports.levelPlayInitErrorFromMap = exports.levelPlayConfigurationFromMap = exports.levelPlayAdInfoFromMap = exports.levelPlayAdErrorFromMap = exports.ironSourceRvPlacementFromMap = exports.ironSourceErrorFromMap = exports.ironSourceAdInfoFromMap = exports.impressionDataFromMap = exports.conentViewErrorFromMap = void 0;
var _models = require("../models");
const toNumberOrNull = value => {
  // Convert value to number if it is not null or undefined and is a finite number
  return value !== null && value !== undefined && !isNaN(Number(value)) ? Number(value) : null;
};
exports.toNumberOrNull = toNumberOrNull;
// toMap methods
const ironSourceErrorFromMap = data => {
  return {
    errorCode: data.errorCode,
    message: data.message
  };
};
exports.ironSourceErrorFromMap = ironSourceErrorFromMap;
const levelPlayInitErrorFromMap = data => {
  return {
    errorCode: data.errorCode,
    errorMessage: data.errorMessage
  };
};
exports.levelPlayInitErrorFromMap = levelPlayInitErrorFromMap;
const conentViewErrorFromMap = data => {
  return {
    consentViewType: data.consentViewType,
    errorCode: data.errorCode,
    message: data.message
  };
};
exports.conentViewErrorFromMap = conentViewErrorFromMap;
const impressionDataFromMap = data => {
  return {
    auctionId: data.auctionId,
    adUnit: data.adUnit,
    adUnitName: data.adUnitName,
    adUnitId: data.adUnitId,
    adFormat: data.adFormat,
    country: data.country,
    ab: data.ab,
    segmentName: data.segmentName,
    placement: data.placement,
    adNetwork: data.adNetwork,
    instanceName: data.instanceName,
    instanceId: data.instanceId,
    revenue: toNumberOrNull(data.revenue),
    precision: data.precision,
    lifetimeRevenue: toNumberOrNull(data.lifetimeRevenue),
    encryptedCPM: data.encryptedCPM,
    conversionValue: toNumberOrNull(data.conversionValue)
  };
};
exports.impressionDataFromMap = impressionDataFromMap;
const ironSourceAdInfoFromMap = data => {
  return {
    auctionId: data.auctionId,
    adUnit: data.adUnit,
    country: data.country,
    ab: data.ab,
    segmentName: data.segmentName,
    adNetwork: data.adNetwork,
    instanceName: data.instanceName,
    instanceId: data.instanceId,
    revenue: toNumberOrNull(data.revenue),
    precision: data.precision,
    lifetimeRevenue: toNumberOrNull(data.lifetimeRevenue),
    encryptedCPM: data.encryptedCPM,
    conversionValue: toNumberOrNull(data.conversionValue)
  };
};
exports.ironSourceAdInfoFromMap = ironSourceAdInfoFromMap;
const ironSourceRvPlacementFromMap = data => {
  return {
    placementName: data.placementName,
    rewardName: data.rewardName,
    rewardAmount: Number(data.rewardAmount)
  };
};
exports.ironSourceRvPlacementFromMap = ironSourceRvPlacementFromMap;
const levelPlayAdErrorFromMap = data => {
  return {
    errorMessage: data.errorMessage,
    errorCode: Number(data.errorCode),
    adUnitId: data.adUnitId
  };
};
exports.levelPlayAdErrorFromMap = levelPlayAdErrorFromMap;
const levelPlayAdInfoFromMap = data => {
  return {
    adUnitId: data.adUnitId,
    adFormat: data.adFormat,
    impressionData: data.impressionData !== null ? impressionDataFromMap(data.impressionData) : null,
    adSize: data.adSize !== null ? _models.LevelPlayAdSize.fromMap(data.adSize) : null
  };
};
exports.levelPlayAdInfoFromMap = levelPlayAdInfoFromMap;
const levelPlayConfigurationFromMap = data => {
  return {
    isAdQualityEnabled: data.isAdQualityEnabled
  };
};
exports.levelPlayConfigurationFromMap = levelPlayConfigurationFromMap;
//# sourceMappingURL=utils.js.map