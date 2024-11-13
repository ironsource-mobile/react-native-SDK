"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelPlayInitRequestBuilder = exports.LevelPlayInitRequest = void 0;
/**
 * Represents an initialization request for LevelPlay.
 */
class LevelPlayInitRequest {
  constructor(appKey, userId, legacyAdFormats) {
    this.appKey = appKey;
    this.userId = userId ?? '';
    this.legacyAdFormats = legacyAdFormats;
  }
  toMap() {
    return {
      appKey: this.appKey,
      userId: this.userId,
      adFormats: this.legacyAdFormats.map(adFormat => adFormat.toString())
    };
  }
  toString() {
    return `LevelPlayNativeAd {
          appKey: ${this.appKey},
          userId: ${this.userId},
          legacyAdFormats: ${this.legacyAdFormats},
        }`;
  }
  static builder(appKey) {
    return new LevelPlayInitRequestBuilder(appKey);
  }
}
exports.LevelPlayInitRequest = LevelPlayInitRequest;
class LevelPlayInitRequestBuilder {
  constructor(appKey) {
    this.instance = new LevelPlayInitRequest(appKey, '', []);
  }
  withUserId(userId) {
    this.instance.userId = userId;
    return this;
  }
  withLegacyAdFormats(legacyAdFormats) {
    this.instance.legacyAdFormats = legacyAdFormats;
    return this;
  }
  build() {
    return this.instance;
  }
}
exports.LevelPlayInitRequestBuilder = LevelPlayInitRequestBuilder;
//# sourceMappingURL=LevelPlayInitRequest.js.map