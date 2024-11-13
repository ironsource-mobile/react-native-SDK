import { type ConsentViewError, type ImpressionData, type IronSourceAdInfo, type IronSourceError, type IronSourceRVPlacement, type LevelPlayAdError, type LevelPlayAdInfo, type LevelPlayConfiguration, type LevelPlayInitError } from "../models";
export declare const toNumberOrNull: (value: any) => number | null;
export type Without<T> = {
    [P in keyof T]?: undefined;
};
export type XOR<T, U> = (Without<T> & U) | (Without<U> & T);
export declare const ironSourceErrorFromMap: (data: any) => IronSourceError;
export declare const levelPlayInitErrorFromMap: (data: any) => LevelPlayInitError;
export declare const conentViewErrorFromMap: (data: any) => ConsentViewError;
export declare const impressionDataFromMap: (data: any) => ImpressionData;
export declare const ironSourceAdInfoFromMap: (data: any) => IronSourceAdInfo;
export declare const ironSourceRvPlacementFromMap: (data: any) => IronSourceRVPlacement;
export declare const levelPlayAdErrorFromMap: (data: any) => LevelPlayAdError;
export declare const levelPlayAdInfoFromMap: (data: any) => LevelPlayAdInfo;
export declare const levelPlayConfigurationFromMap: (data: any) => LevelPlayConfiguration;
//# sourceMappingURL=utils.d.ts.map