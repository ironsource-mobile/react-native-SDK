import { type AdInfo, type IronSourceError, type LevelPlayAdError, type LevelPlayAdInfo, type LevelPlayConfiguration, type LevelPlayInitError, type LevelPlayReward, type LevelPlayImpressionData, LevelPlayNativeAd } from "../models";
export declare const toNumberOrNull: (value: any) => number | null;
export declare const ironSourceErrorFromMap: (data: any) => IronSourceError;
export declare const levelPlayInitErrorFromMap: (data: any) => LevelPlayInitError;
export declare const adInfoFromMap: (data: any) => AdInfo;
export declare const levelPlayAdErrorFromMap: (data: any) => LevelPlayAdError;
export declare const levelPlayAdInfoFromMap: (data: any) => LevelPlayAdInfo;
export declare const levelPlayConfigurationFromMap: (data: any) => LevelPlayConfiguration;
export declare const levelPlayRewardFromMap: (data: any) => LevelPlayReward;
export declare const levelPlayImpressionDataFromMap: (data: any) => LevelPlayImpressionData;
export declare const levelPlayNativeAdFromMap: (data: any, originalAd: LevelPlayNativeAd) => LevelPlayNativeAd;
//# sourceMappingURL=utils.d.ts.map