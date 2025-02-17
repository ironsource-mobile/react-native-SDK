import { NativeModules } from 'react-native'
import {
  BANNER_WIDTH,
  BANNER_HEIGHT,
  SIZE_BANNER_LABEL,
  LARGE_WIDTH,
  LARGE_HEIGHT,
  SIZE_LARGE_LABEL,
  MEDIUM_RECTANGLE_WIDTH,
  MEDIUM_RECTANGLE_HEIGHT,
  SIZE_MEDIUM_RECTANGLE_LABEL,
  SIZE_CUSTOM_LABEL,
} from '../utils/IronSourceConstants'

const { IronSourceMediation } = NativeModules

/**
 * Represents the size of an ad in LevelPlay.
 */
export class LevelPlayAdSize {
  width: number
  height: number
  adLabel: string | null
  isAdaptive: boolean

  private constructor(
    width: number,
    height: number,
    adLabel: string | null,
    isAdaptive: boolean = false
  ) {
    this.width = width
    this.height = height
    this.adLabel = adLabel
    this.isAdaptive = isAdaptive
  }

  // Predefined ad sizes
  static BANNER = new LevelPlayAdSize(BANNER_WIDTH, BANNER_HEIGHT, SIZE_BANNER_LABEL)
  static LARGE = new LevelPlayAdSize(LARGE_WIDTH, LARGE_HEIGHT, SIZE_LARGE_LABEL)
  static MEDIUM_RECTANGLE = new LevelPlayAdSize(
    MEDIUM_RECTANGLE_WIDTH,
    MEDIUM_RECTANGLE_HEIGHT,
    SIZE_MEDIUM_RECTANGLE_LABEL
  )

  /**
   * Creates a custom ad size.
   * @param width - The width of the custom ad.
   * @param height - The height of the custom ad.
   * @returns A new LevelPlayAdSize instance with the specified dimensions.
   */
  static createCustomSize(width: number, height: number) {
    return new LevelPlayAdSize(width, height, SIZE_CUSTOM_LABEL)
  }

  /**
   * Creates an ad size based on the given ad size label.
   * @param adSize - The label of the desired ad size.
   * @returns The predefined LevelPlayAdSize instance matching the label.
   * @throws Error if the ad size label is not recognized.
   */
  static createAdSize(adSize: string) {
    switch (adSize) {
      case SIZE_BANNER_LABEL:
        return LevelPlayAdSize.BANNER
      case SIZE_LARGE_LABEL:
        return LevelPlayAdSize.LARGE
      case SIZE_MEDIUM_RECTANGLE_LABEL:
        return LevelPlayAdSize.MEDIUM_RECTANGLE
      default:
        throw new Error('Wrong Ad Size')
    }
  }

  /**
   * Creates an adaptive ad size with an optional fixed width.
   * @param width - The optional fixed width for the adaptive ad.
   * @returns A promise that resolves to a LevelPlayAdSize instance or null if the creation fails.
   */
  static async createAdaptiveAdSize(
    width: number | null = null
  ): Promise<LevelPlayAdSize | null> {
    const sizeMap = width != null
            ? await IronSourceMediation.createAdaptiveAdSizeWithWidth(width)
            : await IronSourceMediation.createAdaptiveAdSize();    
    return sizeMap != null ? LevelPlayAdSize.fromMap(sizeMap) : null
  }

  toMap(): { [key: string]: any } {
    return {
      width: this.width,
      height: this.height,
      adLabel: this.adLabel,
      isAdaptive: this.isAdaptive,
    }
  }

  static fromMap(map: { [key: string]: any }): LevelPlayAdSize {
    const { width, height, adLabel, isAdaptive } = map
    return new LevelPlayAdSize(
      Number(width),
      Number(height),
      adLabel,
      isAdaptive
    )
  }
}
