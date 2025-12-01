"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.toNumberOrNull = exports.levelPlayRewardFromMap = exports.levelPlayNativeAdFromMap = exports.levelPlayInitErrorFromMap = exports.levelPlayImpressionDataFromMap = exports.levelPlayConfigurationFromMap = exports.levelPlayAdInfoFromMap = exports.levelPlayAdErrorFromMap = exports.ironSourceErrorFromMap = exports.adInfoFromMap = void 0;
var _models = require("../models");
const toNumberOrNull = value => {
  // Convert value to number if it is not null or undefined and is a finite number
  return value !== null && value !== undefined && !isNaN(Number(value)) ? Number(value) : null;
};

// toMap methods
exports.toNumberOrNull = toNumberOrNull;
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
const adInfoFromMap = data => {
  return {
    auctionId: data.auctionId,
    country: data.country,
    ab: data.ab,
    segmentName: data.segmentName,
    adNetwork: data.adNetwork,
    instanceName: data.instanceName,
    instanceId: data.instanceId,
    revenue: toNumberOrNull(data.revenue),
    precision: data.precision,
    encryptedCPM: data.encryptedCPM,
    conversionValue: toNumberOrNull(data.conversionValue)
  };
};
exports.adInfoFromMap = adInfoFromMap;
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
    adId: data.adId,
    adUnitId: data.adUnitId,
    adUnitName: data.adUnitName,
    adFormat: data.adFormat,
    adSize: data.adSize !== null ? _models.LevelPlayAdSize.fromMap(data.adSize) : null,
    placementName: data.placementName,
    auctionId: data.auctionId,
    country: data.country,
    ab: data.ab,
    segmentName: data.segmentName,
    adNetwork: data.adNetwork,
    instanceName: data.instanceName,
    instanceId: data.instanceId,
    revenue: data.revenue,
    precision: data.precision,
    encryptedCPM: data.encryptedCPM,
    conversionValue: toNumberOrNull(data.conversionValue),
    creativeId: data.creativeId
  };
};
exports.levelPlayAdInfoFromMap = levelPlayAdInfoFromMap;
const levelPlayConfigurationFromMap = data => {
  return {
    isAdQualityEnabled: data.isAdQualityEnabled,
    ab: data.ab
  };
};
exports.levelPlayConfigurationFromMap = levelPlayConfigurationFromMap;
const levelPlayRewardFromMap = data => {
  return {
    name: data.name,
    amount: Number(data.amount)
  };
};
exports.levelPlayRewardFromMap = levelPlayRewardFromMap;
const levelPlayImpressionDataFromMap = data => {
  return {
    auctionId: data.auctionId,
    mediationAdUnitName: data.mediationAdUnitName,
    mediationAdUnitId: data.mediationAdUnitId,
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
    encryptedCPM: data.encryptedCPM,
    creativeId: data.creativeId,
    conversionValue: toNumberOrNull(data.conversionValue)
  };
};
exports.levelPlayImpressionDataFromMap = levelPlayImpressionDataFromMap;
const levelPlayNativeAdFromMap = (data, originalAd) => {
  // Update the original nativeAd with loaded content (preserves loadAd/destroyAd methods and listener)
  originalAd.title = data.title;
  originalAd.body = data.body;
  originalAd.advertiser = data.advertiser;
  originalAd.callToAction = data.callToAction;
  originalAd.icon = data.icon;
  return originalAd;
};
exports.levelPlayNativeAdFromMap = levelPlayNativeAdFromMap;
//# sourceMappingURL=utils.js.map