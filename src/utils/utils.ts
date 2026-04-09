import {
  LevelPlayAdSize,
  type AdInfo,
  type IronSourceError,
  type LevelPlayAdError,
  type LevelPlayAdInfo,
  type LevelPlayConfiguration,
  type LevelPlayInitError,
  type LevelPlayReward,
  type LevelPlayImpressionData,
  LevelPlayNativeAd,
} from '../models'

export const toNumberOrNull = (value: any): number | null => {
  // Convert value to number if it is not null or undefined and is a finite number
  return value !== null && value !== undefined && !isNaN(Number(value))
    ? Number(value)
    : null
}

// toMap methods
export const ironSourceErrorFromMap = (data: any): IronSourceError => {
  return {
    errorCode: data.errorCode,
    message: data.message,
  }
}

export const levelPlayInitErrorFromMap = (data: any): LevelPlayInitError => {
  return {
    errorCode: data.errorCode,
    errorMessage: data.errorMessage,
  }
}

export const adInfoFromMap = (data: any): AdInfo => {
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
    conversionValue: toNumberOrNull(data.conversionValue),
  }
}

export const levelPlayAdErrorFromMap = (data: any): LevelPlayAdError => {
  return {
    errorMessage: data.errorMessage,
    errorCode: Number(data.errorCode),
    adUnitId: data.adUnitId,
  }
}

export const levelPlayAdInfoFromMap = (data: any): LevelPlayAdInfo => {
  return {
    adId: data.adId,
    adUnitId: data.adUnitId,
    adUnitName: data.adUnitName,
    adFormat: data.adFormat,
    adSize: data.adSize !== null ? LevelPlayAdSize.fromMap(data.adSize) : null,
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
    creativeId: data.creativeId,
  }
}

export const levelPlayConfigurationFromMap = (
  data: any
): LevelPlayConfiguration => {
  return {
    isAdQualityEnabled: data.isAdQualityEnabled,
    ab: data.ab,
  }
}

export const levelPlayRewardFromMap = (data: any): LevelPlayReward => {
  return {
    name: data.name,
    amount: Number(data.amount),
  }
}

export const levelPlayImpressionDataFromMap = (
  data: any
): LevelPlayImpressionData => {
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
    conversionValue: toNumberOrNull(data.conversionValue),
  }
}

export const levelPlayNativeAdFromMap = (
  data: any,
  originalAd: LevelPlayNativeAd
): LevelPlayNativeAd => {
  // Update the original nativeAd with loaded content (preserves loadAd/destroyAd methods and listener)
  originalAd.title = data.title
  originalAd.body = data.body
  originalAd.advertiser = data.advertiser
  originalAd.callToAction = data.callToAction
  originalAd.icon = data.icon
  return originalAd
}
