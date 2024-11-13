import { LevelPlayAdSize, type ConsentViewError, type ImpressionData, type IronSourceAdInfo, type IronSourceError, type IronSourceRVPlacement, type LevelPlayAdError, type LevelPlayAdInfo, type LevelPlayConfiguration, type LevelPlayInitError } from "../models";

export const toNumberOrNull = (value: any): number | null => {
    // Convert value to number if it is not null or undefined and is a finite number
    return value !== null && value !== undefined && !isNaN(Number(value)) ? Number(value) : null;
  };
export type Without<T> = { [P in keyof T]?: undefined }
export type XOR<T, U> = (Without<T> & U) | (Without<U> & T)


// toMap methods
export const ironSourceErrorFromMap = (data: any): IronSourceError => {
  return {
    errorCode: data.errorCode,
    message: data.message,
  };
}

export const levelPlayInitErrorFromMap = (data: any): LevelPlayInitError => {
  return {
    errorCode: data.errorCode,
    errorMessage: data.errorMessage,
  };
}

export const conentViewErrorFromMap = (data: any): ConsentViewError => {
  return {
    consentViewType: data.consentViewType,
    errorCode: data.errorCode,
    message: data.message,
  };
}

export const impressionDataFromMap = (data: any): ImpressionData => {
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
    conversionValue: toNumberOrNull(data.conversionValue),
  };
}

export const ironSourceAdInfoFromMap = (data: any): IronSourceAdInfo => {
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
    conversionValue: toNumberOrNull(data.conversionValue),
  };
};

export const ironSourceRvPlacementFromMap = (data: any): IronSourceRVPlacement => {
  return {
    placementName: data.placementName,
    rewardName: data.rewardName,
    rewardAmount: Number(data.rewardAmount),
  };
}

export const levelPlayAdErrorFromMap = (data: any): LevelPlayAdError => {
  return {
    errorMessage: data.errorMessage,
    errorCode: Number(data.errorCode),
    adUnitId: data.adUnitId,
  };
};

export const levelPlayAdInfoFromMap = (data: any): LevelPlayAdInfo => {
  return {
    adUnitId: data.adUnitId,
    adFormat: data.adFormat,
    impressionData: data.impressionData !== null ? impressionDataFromMap(data.impressionData) : null,
    adSize: data.adSize !== null ? LevelPlayAdSize.fromMap(data.adSize) : null,
  };
};

export const levelPlayConfigurationFromMap = (data: any): LevelPlayConfiguration => {
  return {
      isAdQualityEnabled: data.isAdQualityEnabled,
  };
}