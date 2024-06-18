import { findNodeHandle, Platform, UIManager } from 'react-native';
import type { LevelPlayNativeAdViewType } from '../components/LevelPlayNativeAdView';
import type { LevelPlayNativeAdListener } from './listeners';

// Class representing a level play native ad
export class LevelPlayNativeAd {
  // Codec fields for native ad properties
  title: string | null | undefined;
  advertiser: string | null | undefined;
  body: string | null | undefined;
  callToAction: string | null | undefined;
  icon: LevelPlayNativeAdIcon | null | undefined

  // Reference to the native ad view
  nativeAdViewRef?: React.MutableRefObject<LevelPlayNativeAdViewType | null> | null;

  // Type of the native ad view
  viewType?: string

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

    // Initialize ref instance
    this.nativeAdViewRef = null;

    // Initialize builder
    this.listener = listener;
    this.placement = placement;
  }

  // Setter for ref instance
  setNativeAdViewRef(nativeAdViewRef: React.MutableRefObject<LevelPlayNativeAdViewType | null>): void {
    this.nativeAdViewRef = nativeAdViewRef;
  }

  setViewType(viewType: string): void {
    this.viewType = viewType;
  }

  // Load ad method
  loadAd(): void {
    if (this.nativeAdViewRef && this.nativeAdViewRef.current && this.viewType) {
      const viewId = findNodeHandle(this.nativeAdViewRef.current);
      const command = UIManager.getViewManagerConfig(this.viewType || 'levelPlayNativeAdViewType').Commands.loadAd;
      const finalCommand = Platform.OS === 'ios' ? command : command.toString();

      UIManager.dispatchViewManagerCommand(
        viewId,
        finalCommand,
        []
      );
    }
  }

  // Destroy ad method
  destroyAd(): void {
    if (this.nativeAdViewRef && this.nativeAdViewRef.current && this.viewType) {
      const viewId = findNodeHandle(this.nativeAdViewRef.current);
      const command = UIManager.getViewManagerConfig(this.viewType || 'levelPlayNativeAdViewType').Commands.destroyAd;
      const finalCommand = Platform.OS === 'ios' ? command : command.toString();

      UIManager.dispatchViewManagerCommand(
        viewId,
        finalCommand,
        []
      );
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
class LevelPlayNativeAdBuilder {
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
