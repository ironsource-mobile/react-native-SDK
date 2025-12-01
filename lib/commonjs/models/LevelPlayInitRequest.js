"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelPlayInitRequestBuilder = exports.LevelPlayInitRequest = void 0;
/**
 * Represents an initialization request for LevelPlay.
 */
class LevelPlayInitRequest {
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
exports.LevelPlayInitRequest = LevelPlayInitRequest;
class LevelPlayInitRequestBuilder {
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
exports.LevelPlayInitRequestBuilder = LevelPlayInitRequestBuilder;
//# sourceMappingURL=LevelPlayInitRequest.js.map