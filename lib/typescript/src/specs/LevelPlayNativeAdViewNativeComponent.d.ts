import type { ViewProps } from 'react-native';
import type { HostComponent } from 'react-native';
import type { DirectEventHandler, Double, Int32 } from 'react-native/Libraries/Types/CodegenTypes';
export interface CreationParams {
    placement: string;
    templateStyle?: {
        mainBackgroundColor?: string;
        titleTextColor?: string;
        bodyTextColor?: string;
        advertiserTextColor?: string;
        ctaBackgroundColor?: string;
        ctaTextColor?: string;
        ctaCornerRadius?: Double;
    };
    templateType?: string;
    viewType?: string;
}
export interface AdLoadedEvent {
    nativeAd: {
        title?: string;
        body?: string;
        advertiser?: string;
        callToAction?: string;
        icon?: {
            uri?: string | null;
            imageData?: string | null;
        };
        placement?: string;
    };
    adInfo: {
        auctionId: string | null;
        country: string | null;
        ab: string | null;
        segmentName: string | null;
        adNetwork: string | null;
        instanceName: string | null;
        instanceId: string | null;
        revenue: Double | null;
        precision: string | null;
        encryptedCPM: string | null;
        conversionValue: Double | null;
    };
}
export interface AdLoadFailedEvent {
    nativeAd: {
        title?: string;
        body?: string;
        advertiser?: string;
        callToAction?: string;
        icon?: {
            uri?: string | null;
            imageData?: string | null;
        };
        placement?: string;
    };
    error: {
        errorCode: Int32;
        message: string | null;
    };
}
export interface AdClickedEvent {
    nativeAd: {
        title?: string;
        body?: string;
        advertiser?: string;
        callToAction?: string;
        icon?: {
            uri?: string | null;
            imageData?: string | null;
        };
        placement?: string;
    };
    adInfo: {
        auctionId: string | null;
        country: string | null;
        ab: string | null;
        segmentName: string | null;
        adNetwork: string | null;
        instanceName: string | null;
        instanceId: string | null;
        revenue: Double | null;
        precision: string | null;
        encryptedCPM: string | null;
        conversionValue: Double | null;
    };
}
export interface AdImpressionEvent {
    nativeAd: {
        title?: string;
        body?: string;
        advertiser?: string;
        callToAction?: string;
        icon?: {
            uri?: string | null;
            imageData?: string | null;
        };
        placement?: string;
    };
    adInfo: {
        auctionId: string | null;
        country: string | null;
        ab: string | null;
        segmentName: string | null;
        adNetwork: string | null;
        instanceName: string | null;
        instanceId: string | null;
        revenue: Double | null;
        precision: string | null;
        encryptedCPM: string | null;
        conversionValue: Double | null;
    };
}
export interface NativeProps extends ViewProps {
    creationParams: CreationParams;
    onAdLoadedEvent?: DirectEventHandler<AdLoadedEvent>;
    onAdLoadFailedEvent?: DirectEventHandler<AdLoadFailedEvent>;
    onAdClickedEvent?: DirectEventHandler<AdClickedEvent>;
    onAdImpressionEvent?: DirectEventHandler<AdImpressionEvent>;
}
type LevelPlayNativeAdViewNativeComponentType = HostComponent<NativeProps>;
/**
 * Native commands callable from JS for managing LevelPlay Native Ad View.
 */
interface NativeCommands {
    /**
     * Manually loads a new native ad.
     *
     * @param viewRef - Reference to the native ad view.
     */
    loadAd(viewRef: React.ElementRef<LevelPlayNativeAdViewNativeComponentType>): void;
    /**
     * Destroys the currently loaded native ad.
     *
     * @param viewRef - Reference to the native ad view.
     */
    destroyAd(viewRef: React.ElementRef<LevelPlayNativeAdViewNativeComponentType>): void;
}
/**
 * JS interface to native ad view commands for LevelPlay Native Ad View.
 */
export declare const Commands: NativeCommands;
declare const _default: HostComponent<NativeProps>;
export default _default;
//# sourceMappingURL=LevelPlayNativeAdViewNativeComponent.d.ts.map