/**
 * Represents an initialization request for LevelPlay.
 */
export class LevelPlayInitRequest {
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
export class LevelPlayInitRequestBuilder {
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
//# sourceMappingURL=LevelPlayInitRequest.js.map