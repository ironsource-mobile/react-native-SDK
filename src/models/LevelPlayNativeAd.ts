import type { LevelPlayNativeAdListener } from './listeners/LevelPlayNativeAdListener';

/**
 * Class representing a level play native ad
 */
export class LevelPlayNativeAd {
  // Codec fields for native ad properties
  title: string | null | undefined;
  advertiser: string | null | undefined;
  body: string | null | undefined;
  callToAction: string | null | undefined;
  icon: LevelPlayNativeAdIcon | null | undefined

  // Private callback functions assigned by LevelPlayNativeAdView
  private loadAdCallback?: (() => void) | null;
  private destroyAdCallback?: (() => void) | null;

  // Event listener for native ad events
  listener?: LevelPlayNativeAdListener | null;

  // Placement of the native ad
  placement?: string | null;

  constructor(
    title: string | null | undefined,
    advertiser: string | null | undefined,
    body: string | null | undefined,
    callToAction: string | null | undefined,
    icon: LevelPlayNativeAdIcon | null | undefined,
    listener: LevelPlayNativeAdListener | null | undefined,
    placement: string | null | undefined,
  ) {
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
  setLoadAdCallback(callback: (() => void) | null): void {
    this.loadAdCallback = callback;
  }

  setDestroyAdCallback(callback: (() => void) | null): void {
    this.destroyAdCallback = callback;
  }

  // Load ad method - calls the callback assigned by LevelPlayNativeAdView
  loadAd = () => {
    if (this.loadAdCallback) {
      this.loadAdCallback();
    }
  }

  // Destroy ad method - calls the callback assigned by LevelPlayNativeAdView
  destroyAd(): void {
    if (this.destroyAdCallback) {
      this.destroyAdCallback();
    }
  }
  
  // toString method for logging
  toString(): string {
    return `LevelPlayNativeAd {
      title: ${this.title},
      advertiser: ${this.advertiser},
      body: ${this.body},
      callToAction: ${this.callToAction},
      iconUri: ${this.icon ? this.icon.uri : null},
      placement: ${this.placement}
    }`;
  }  

  static builder(): LevelPlayNativeAdBuilder {
    return new LevelPlayNativeAdBuilder();
  }
}

// Builder class
export class LevelPlayNativeAdBuilder {
  private instance: LevelPlayNativeAd;

  constructor() {
    this.instance = new LevelPlayNativeAd(null, null, null, null, null, null, null);
  }

  withListener(listener: LevelPlayNativeAdListener | null | undefined): LevelPlayNativeAdBuilder {
    this.instance.listener = listener;
    return this;
  }

  withPlacement(placement: string | null | undefined): LevelPlayNativeAdBuilder {
    this.instance.placement = placement;
    return this;
  }

  build(): LevelPlayNativeAd {
    return this.instance;
  }
}

export type LevelPlayNativeAdIcon = {
  uri: string | null | undefined;
  imageData: string | null | undefined;
}
