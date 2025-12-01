/**
 * Represents an initialization request for LevelPlay.
 */
export class LevelPlayInitRequest {
  constructor(appKey, userId) {
    this.appKey = appKey;
    this.userId = userId ?? '';
  }
  toMap() {
    return {
      appKey: this.appKey,
      userId: this.userId
    };
  }
  toString() {
    return `LevelPlayInitRequest {
          appKey: ${this.appKey},
          userId: ${this.userId}
        }`;
  }
  static builder(appKey) {
    return new LevelPlayInitRequestBuilder(appKey);
  }
}
export class LevelPlayInitRequestBuilder {
  constructor(appKey) {
    this.instance = new LevelPlayInitRequest(appKey, '');
  }
  withUserId(userId) {
    this.instance.userId = userId;
    return this;
  }
  build() {
    return this.instance;
  }
}
//# sourceMappingURL=LevelPlayInitRequest.js.map