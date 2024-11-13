"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelPlayNativeAdBuilder = exports.LevelPlayNativeAd = void 0;
var _reactNative = require("react-native");
/**
 * Class representing a level play native ad
 */
class LevelPlayNativeAd {
  // Codec fields for native ad properties

  // Reference to the native ad view

  // Type of the native ad view

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

    // Initialize ref instance
    this.nativeAdViewRef = null;

    // Initialize builder
    this.listener = listener;
    this.placement = placement;
  }

  // Setter for ref instance
  setNativeAdViewRef(nativeAdViewRef) {
    this.nativeAdViewRef = nativeAdViewRef;
  }
  setViewType(viewType) {
    this.viewType = viewType;
  }

  // Load ad method
  loadAd() {
    if (this.nativeAdViewRef && this.nativeAdViewRef.current && this.viewType) {
      const viewId = (0, _reactNative.findNodeHandle)(this.nativeAdViewRef.current);
      const command = _reactNative.UIManager.getViewManagerConfig(this.viewType || 'levelPlayNativeAdViewType').Commands.loadAd;
      const finalCommand = _reactNative.Platform.OS === 'ios' ? command : command.toString();
      _reactNative.UIManager.dispatchViewManagerCommand(viewId, finalCommand, []);
    }
  }

  // Destroy ad method
  destroyAd() {
    if (this.nativeAdViewRef && this.nativeAdViewRef.current && this.viewType) {
      const viewId = (0, _reactNative.findNodeHandle)(this.nativeAdViewRef.current);
      const command = _reactNative.UIManager.getViewManagerConfig(this.viewType || 'levelPlayNativeAdViewType').Commands.destroyAd;
      const finalCommand = _reactNative.Platform.OS === 'ios' ? command : command.toString();
      _reactNative.UIManager.dispatchViewManagerCommand(viewId, finalCommand, []);
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