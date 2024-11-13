"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelPlayAdSize = void 0;
var _reactNative = require("react-native");
var _IronSourceConstants = require("../utils/IronSourceConstants");
const {
  IronSourceMediation
} = _reactNative.NativeModules;

/**
 * Represents the size of an ad in LevelPlay.
 */
class LevelPlayAdSize {
  constructor(width, height, adLabel, isAdaptive = false) {
    this.width = width;
    this.height = height;
    this.adLabel = adLabel;
    this.isAdaptive = isAdaptive;
  }

  // Predefined ad sizes
  static BANNER = new LevelPlayAdSize(_IronSourceConstants.BANNER_WIDTH, _IronSourceConstants.BANNER_HEIGHT, _IronSourceConstants.SIZE_BANNER_LABEL);
  static LARGE = new LevelPlayAdSize(_IronSourceConstants.LARGE_WIDTH, _IronSourceConstants.LARGE_HEIGHT, _IronSourceConstants.SIZE_LARGE_LABEL);
  static MEDIUM_RECTANGLE = new LevelPlayAdSize(_IronSourceConstants.MEDIUM_RECTANGLE_WIDTH, _IronSourceConstants.MEDIUM_RECTANGLE_HEIGHT, _IronSourceConstants.SIZE_MEDIUM_RECTANGLE_LABEL);

  /**
   * Creates a custom ad size.
   * @param width - The width of the custom ad.
   * @param height - The height of the custom ad.
   * @returns A new LevelPlayAdSize instance with the specified dimensions.
   */
  static createCustomSize(width, height) {
    return new LevelPlayAdSize(width, height, _IronSourceConstants.SIZE_CUSTOM_LABEL);
  }

  /**
   * Creates an ad size based on the given ad size label.
   * @param adSize - The label of the desired ad size.
   * @returns The predefined LevelPlayAdSize instance matching the label.
   * @throws Error if the ad size label is not recognized.
   */
  static createAdSize(adSize) {
    switch (adSize) {
      case _IronSourceConstants.SIZE_BANNER_LABEL:
        return LevelPlayAdSize.BANNER;
      case _IronSourceConstants.SIZE_LARGE_LABEL:
        return LevelPlayAdSize.LARGE;
      case _IronSourceConstants.SIZE_MEDIUM_RECTANGLE_LABEL:
        return LevelPlayAdSize.MEDIUM_RECTANGLE;
      default:
        throw new Error('Wrong Ad Size');
    }
  }

  /**
   * Creates an adaptive ad size with an optional fixed width.
   * @param width - The optional fixed width for the adaptive ad.
   * @returns A promise that resolves to a LevelPlayAdSize instance or null if the creation fails.
   */
  static async createAdaptiveAdSize(width = null) {
    let sizeMap = await IronSourceMediation.createAdaptiveAdSize(width);
    return sizeMap != null ? LevelPlayAdSize.fromMap(sizeMap) : null;
  }
  toMap() {
    return {
      width: this.width,
      height: this.height,
      adLabel: this.adLabel,
      isAdaptive: this.isAdaptive
    };
  }
  static fromMap(map) {
    const {
      width,
      height,
      adLabel,
      isAdaptive
    } = map;
    return new LevelPlayAdSize(Number(width), Number(height), adLabel, isAdaptive);
  }
}
exports.LevelPlayAdSize = LevelPlayAdSize;
//# sourceMappingURL=LevelPlayAdSize.js.map