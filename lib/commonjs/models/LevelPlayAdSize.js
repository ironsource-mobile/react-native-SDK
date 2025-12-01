"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelPlayAdSize = void 0;
var _LevelPlayConstants = require("../utils/LevelPlayConstants");
var _NativeLevelPlayMediation = _interopRequireDefault(require("../specs/NativeLevelPlayMediation"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
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
  static BANNER = new LevelPlayAdSize(_LevelPlayConstants.BANNER_WIDTH, _LevelPlayConstants.BANNER_HEIGHT, _LevelPlayConstants.SIZE_BANNER_LABEL);
  static LARGE = new LevelPlayAdSize(_LevelPlayConstants.LARGE_WIDTH, _LevelPlayConstants.LARGE_HEIGHT, _LevelPlayConstants.SIZE_LARGE_LABEL);
  static MEDIUM_RECTANGLE = new LevelPlayAdSize(_LevelPlayConstants.MEDIUM_RECTANGLE_WIDTH, _LevelPlayConstants.MEDIUM_RECTANGLE_HEIGHT, _LevelPlayConstants.SIZE_MEDIUM_RECTANGLE_LABEL);

  /**
   * Creates a custom ad size.
   * @param width - The width of the custom ad.
   * @param height - The height of the custom ad.
   * @returns A new LevelPlayAdSize instance with the specified dimensions.
   */
  static createCustomSize(width, height) {
    return new LevelPlayAdSize(width, height, _LevelPlayConstants.SIZE_CUSTOM_LABEL);
  }

  /**
   * Creates an ad size based on the given ad size label.
   * @param adSize - The label of the desired ad size.
   * @returns The predefined LevelPlayAdSize instance matching the label.
   * @throws Error if the ad size label is not recognized.
   */
  static createAdSize(adSize) {
    switch (adSize) {
      case _LevelPlayConstants.SIZE_BANNER_LABEL:
        return LevelPlayAdSize.BANNER;
      case _LevelPlayConstants.SIZE_LARGE_LABEL:
        return LevelPlayAdSize.LARGE;
      case _LevelPlayConstants.SIZE_MEDIUM_RECTANGLE_LABEL:
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
    const sizeMap = width != null ? await _NativeLevelPlayMediation.default.createAdaptiveAdSizeWithWidth(width) : await _NativeLevelPlayMediation.default.createAdaptiveAdSize();
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