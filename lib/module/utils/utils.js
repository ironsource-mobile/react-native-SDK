import { LevelPlayAdSize } from "../models";
export const toNumberOrNull = value => {
  // Convert value to number if it is not null or undefined and is a finite number
  return value !== null && value !== undefined && !isNaN(Number(value)) ? Number(value) : null;
};
// toMap methods
export const ironSourceErrorFromMap = data => {
  return {
    errorCode: data.errorCode,
    message: data.message
  };
};
export const levelPlayInitErrorFromMap = data => {
  return {
    errorCode: data.errorCode,
    errorMessage: data.errorMessage
  };
};
export const conentViewErrorFromMap = data => {
  return {
    consentViewType: data.consentViewType,
    errorCode: data.errorCode,
    message: data.message
  };
};
export const impressionDataFromMap = data => {
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
export const ironSourceAdInfoFromMap = data => {
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
export const ironSourceRvPlacementFromMap = data => {
  return {
    placementName: data.placementName,
    rewardName: data.rewardName,
    rewardAmount: Number(data.rewardAmount)
  };
};
export const levelPlayAdErrorFromMap = data => {
  return {
    errorMessage: data.errorMessage,
    errorCode: Number(data.errorCode),
    adUnitId: data.adUnitId
  };
};
export const levelPlayAdInfoFromMap = data => {
  return {
    adUnitId: data.adUnitId,
    adFormat: data.adFormat,
    impressionData: data.impressionData !== null ? impressionDataFromMap(data.impressionData) : null,
    adSize: data.adSize !== null ? LevelPlayAdSize.fromMap(data.adSize) : null
  };
};
export const levelPlayConfigurationFromMap = data => {
  return {
    isAdQualityEnabled: data.isAdQualityEnabled
  };
};
//# sourceMappingURL=utils.js.map