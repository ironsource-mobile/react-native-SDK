import type { TurboModule } from 'react-native';
/**
 * Internal spec type for LevelPlaySegment (mirrors LevelPlaySegment model).
 * Defined here for TurboModule compatibility - cannot import external types in specs.
 * Not exported as public API uses LevelPlaySegment directly.
 */
interface LevelPlaySegmentSpec {
    segmentName?: string;
    isPaying?: boolean;
    level?: number;
    userCreationDate?: number;
    iapTotal?: number;
    customParameters?: {
        [key: string]: string;
    };
}
/**
 * Internal spec type for LevelPlayAdSize (mirrors LevelPlayAdSize.toMap() structure).
 * Defined here for TurboModule compatibility - cannot import external types in specs.
 * Not exported as public API uses LevelPlayAdSize class directly.
 */
interface LevelPlayAdSizeSpec {
    width: number;
    height: number;
    adLabel?: string;
    isAdaptive: boolean;
}
export interface Spec extends TurboModule {
    /**
     * Returns all supported event constants and error codes.
     */
    readonly getConstants: () => {
        ON_INIT_FAILED: string;
        ON_INIT_SUCCESS: string;
        ON_IMPRESSION_SUCCESS: string;
        ON_INTERSTITIAL_AD_LOADED: string;
        ON_INTERSTITIAL_AD_LOAD_FAILED: string;
        ON_INTERSTITIAL_AD_INFO_CHANGED: string;
        ON_INTERSTITIAL_AD_DISPLAYED: string;
        ON_INTERSTITIAL_AD_DISPLAY_FAILED: string;
        ON_INTERSTITIAL_AD_CLICKED: string;
        ON_INTERSTITIAL_AD_CLOSED: string;
        ON_REWARDED_AD_LOADED: string;
        ON_REWARDED_AD_LOAD_FAILED: string;
        ON_REWARDED_AD_INFO_CHANGED: string;
        ON_REWARDED_AD_DISPLAYED: string;
        ON_REWARDED_AD_DISPLAY_FAILED: string;
        ON_REWARDED_AD_CLICKED: string;
        ON_REWARDED_AD_CLOSED: string;
        ON_REWARDED_AD_REWARDED: string;
    };
    validateIntegration(): Promise<void>;
    setDynamicUserId(userId: string): Promise<void>;
    setAdaptersDebug(isEnabled: boolean): Promise<void>;
    /** @deprecated Use LevelPlayPrivacySettings.setGDPRConsents() instead */
    setConsent(isConsent: boolean): Promise<void>;
    setSegment(segmentDict: LevelPlaySegmentSpec): Promise<void>;
    setMetaData(key: string, values: string[]): Promise<void>;
    launchTestSuite(): Promise<void>;
    setGDPRConsents(networkConsents: {
        [key: string]: boolean;
    }): Promise<void>;
    setCCPA(value: boolean): Promise<void>;
    setCOPPA(value: boolean): Promise<void>;
    addImpressionDataListener(): Promise<void>;
    init(appKey: string, userId?: string): Promise<void>;
    createInterstitialAd(adUnitId: string, bidFloor?: number): Promise<string>;
    loadInterstitialAd(adId: string): Promise<void>;
    showInterstitialAd(adId: string, placementName?: string): Promise<void>;
    isInterstitialAdReady(adId: string): Promise<boolean>;
    isInterstitialAdPlacementCapped(placementName: string): Promise<boolean>;
    createRewardedAd(adUnitId: string, bidFloor?: number): Promise<string>;
    loadRewardedAd(adId: string): Promise<void>;
    showRewardedAd(adId: string, placementName?: string): Promise<void>;
    isRewardedAdReady(adId: string): Promise<boolean>;
    isRewardedAdPlacementCapped(placementName: string): Promise<boolean>;
    removeAd(adId: string): Promise<void>;
    removeAllAds(): Promise<void>;
    createAdaptiveAdSizeWithWidth(width: number): Promise<LevelPlayAdSizeSpec | null>;
    createAdaptiveAdSize(): Promise<LevelPlayAdSizeSpec | null>;
    addListener(eventName: string): void;
    removeListeners(count: number): void;
}
declare const _default: Spec;
export default _default;
//# sourceMappingURL=NativeLevelPlayMediation.d.ts.map