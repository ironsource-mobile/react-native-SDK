import type { XOR } from './utils'

/** Banner ===================================================================**/
// The Banner size should be defined by the name or a specific dimension

/**
 * The Banner size defined in ironSource KC
 * https://developers.is.com/ironsource-mobile/android/banner-integration-android
 */
export type IronSourceBannerSize = 'BANNER' | 'LARGE' | 'RECTANGLE' | 'SMART'

/**
 * Specific width and height in Android:dp | iOS:point
 * @param width
 * @param height
 */
export type IronSourceBannerCustomSize = { width: number; height: number }

/**
 * Define by description or dimension
 */
export type IronSourceBannerSizeOption = XOR<
  {
    sizeDescription: IronSourceBannerSize
  },
  IronSourceBannerCustomSize
> & {
  isAdaptive?: boolean // for Adaptive Banners
}

/**
 * Vertical default position
 */
export type IronSourceBannerPositionOption = {
  position: 'TOP' | 'BOTTOM' | 'CENTER'
}

/**
 * @param verticalOffset - Upward < 0 < Downward. Android:dp, iOS:point
 * This is calculated from the default position set by IronSourceBannerPositionOption
 */
export type IronSourceBannerOffsetOption = {
  verticalOffset?: number
}

/**
 * Load Banner options
 */
export type IronSourceBannerOptions = IronSourceBannerSizeOption &
  IronSourceBannerPositionOption &
  IronSourceBannerOffsetOption & {
    placementName?: string
  }
