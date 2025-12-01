"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelPlayNativeAdBuilder = exports.LevelPlayNativeAd = void 0;
/**
 * Class representing a level play native ad
 */
class LevelPlayNativeAd {
  // Codec fields for native ad properties

  // Private callback functions assigned by LevelPlayNativeAdView

  // Event listener for native ad events

  // Placement of the native ad

  constructor(title, advertiser, body, callToAction, icon, listener, placement) {
    // Assign codec fields
    this.title = title || null;
    this.advertiser = advertiser || null;
    this.body = body || null;
    this.callToAction = callToAction || null;
    this.icon = icon || null;

    // Bind methods
    this.loadAd = this.loadAd.bind(this);
    this.destroyAd = this.destroyAd.bind(this);

    // Initialize builder
    this.listener = listener;
    this.placement = placement;
  }

  // Internal setter methods for LevelPlayNativeAdView (not exposed to users)
  setLoadAdCallback(callback) {
    this.loadAdCallback = callback;
  }
  setDestroyAdCallback(callback) {
    this.destroyAdCallback = callback;
  }

  // Load ad method - calls the callback assigned by LevelPlayNativeAdView
  loadAd = () => {
    if (this.loadAdCallback) {
      this.loadAdCallback();
    }
  };

  // Destroy ad method - calls the callback assigned by LevelPlayNativeAdView
  destroyAd() {
    if (this.destroyAdCallback) {
      this.destroyAdCallback();
    }
  }

  // toString method for logging
  toString() {
    return `LevelPlayNativeAd {
      title: ${this.title},
      advertiser: ${this.advertiser},
      body: ${this.body},
      callToAction: ${this.callToAction},
      iconUri: ${this.icon ? this.icon.uri : null},
      placement: ${this.placement}
    }`;
  }
  static builder() {
    return new LevelPlayNativeAdBuilder();
  }
}

// Builder class
exports.LevelPlayNativeAd = LevelPlayNativeAd;
class LevelPlayNativeAdBuilder {
  constructor() {
    this.instance = new LevelPlayNativeAd(null, null, null, null, null, null, null);
  }
  withListener(listener) {
    this.instance.listener = listener;
    return this;
  }
  withPlacement(placement) {
    this.instance.placement = placement;
    return this;
  }
  build() {
    return this.instance;
  }
}
exports.LevelPlayNativeAdBuilder = LevelPlayNativeAdBuilder;
//# sourceMappingURL=LevelPlayNativeAd.js.map