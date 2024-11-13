import type { XOR } from '../utils/utils';
import type { IronSourceContainerParams } from './IronSourceContainerParams';
/** Banner ===================================================================**/
/**
 * The Banner size defined in ironSource KC
 * https://developers.is.com/ironsource-mobile/android/banner-integration-android
 *
 * @deprecated This method will be removed in future versions. Please use LevelPlayBannerAdView instead.
 */
export type IronSourceBannerSize = 'BANNER' | 'LARGE' | 'RECTANGLE' | 'SMART';
/**
 * Specific width and height in Android:dp | iOS:point
 * @param width
 * @param height
 *
 * @deprecated This method will be removed in future versions. Please use LevelPlayBannerAdView instead.
 */
export type IronSourceBannerCustomSize = {
    width: number;
    height: number;
};
/**
 * Define by description or dimension
 *
 * @deprecated This method will be removed in future versions. Please use LevelPlayBannerAdView instead.
 */
export type IronSourceBannerSizeOption = XOR<{
    sizeDescription: IronSourceBannerSize;
}, IronSourceBannerCustomSize> & {
    isAdaptive?: boolean;
    isContainerParams?: IronSourceContainerParams;
};
/**
 * Vertical default position
 *
 * @deprecated This method will be removed in future versions. Please use LevelPlayBannerAdView instead.
 */
export type IronSourceBannerPositionOption = {
    position: 'TOP' | 'BOTTOM' | 'CENTER';
};
/**
 * @param verticalOffset - Upward < 0 < Downward. Android:dp, iOS:point
 * This is calculated from the default position set by IronSourceBannerPositionOption
 *
 * @deprecated This method will be removed in future versions. Please use LevelPlayBannerAdView instead.
 */
export type IronSourceBannerOffsetOption = {
    verticalOffset?: number;
};
/**
 * Load Banner options
 *
 * @deprecated This method will be removed in future versions. Please use LevelPlayBannerAdView instead.
 */
export type IronSourceBannerOptions = IronSourceBannerSizeOption & IronSourceBannerPositionOption & IronSourceBannerOffsetOption & {
    placementName?: string;
    isContainerParams?: IronSourceContainerParams;
};
//# sourceMappingURL=IronSourceBannerOptions.d.ts.map