import type { XOR } from './utils';
/** Banner ===================================================================**/
/**
 * The Banner size defined in ironSource KC
 * https://developers.is.com/ironsource-mobile/android/banner-integration-android
 */
export declare type IronSourceBannerSize = 'BANNER' | 'LARGE' | 'RECTANGLE' | 'SMART';
/**
 * Specific width and height in Android:dp | iOS:point
 * @param width
 * @param height
 */
export declare type IronSourceBannerCustomSize = {
    width: number;
    height: number;
};
/**
 * Define by description or dimension
 */
export declare type IronSourceBannerSizeOption = XOR<{
    sizeDescription: IronSourceBannerSize;
}, IronSourceBannerCustomSize> & {
    isAdaptive?: boolean;
};
/**
 * Vertical default position
 */
export declare type IronSourceBannerPositionOption = {
    position: 'TOP' | 'BOTTOM' | 'CENTER';
};
/**
 * @param verticalOffset - Upward < 0 < Downward. Android:dp, iOS:point
 * This is calculated from the default position set by IronSourceBannerPositionOption
 */
export declare type IronSourceBannerOffsetOption = {
    verticalOffset?: number;
};
/**
 * Load Banner options
 */
export declare type IronSourceBannerOptions = IronSourceBannerSizeOption & IronSourceBannerPositionOption & IronSourceBannerOffsetOption & {
    placementName?: string;
};
