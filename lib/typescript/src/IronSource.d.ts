/**
 * This is the main IronSource bridge module.
 */
import { type AdUnit, type IronSourceBannerOptions, type IronSourceRVPlacement, type IronSourceSegment } from './models';
import type { InitializationListener, ConsentViewListener, ImpressionDataListener, LevelPlayBannerListener, LevelPlayInterstitialListener, LevelPlayRewardedVideoListener, LevelPlayRewardedVideoManualListener } from './models/listeners';
/** Types =======================================================================**/
/**
 * Native Module Type
 * Descriptions show the function names of native SDKs.
 */
type IronSourceNativeModuleType = {
    /** Base API =============================================================**/
    /**
     * Android: getAdvertiserId
     *     iOS: advertiserId
     */
    getAdvertiserId(): Promise<string | null>;
    /**
     * Android: validateIntegration
     *     iOS: validateIntegration
     */
    validateIntegration(): Promise<void>;
    /**
     * Android: shouldTrackNetworkState
     *     iOS: shouldTrackReachability
     */
    shouldTrackNetworkState(isEnabled: boolean): Promise<void>;
    /**
     * Android: setDynamicUserId
     *     iOS: setDynamicUserId
     *
     * For RV server-to-server callback.
     * Must be set before showRV.
     */
    setDynamicUserId(userId: string): Promise<void>;
    /**
     * Android: setAdaptersDebug
     *     iOS: setAdaptersDebug
     */
    setAdaptersDebug(isEnabled: boolean): Promise<void>;
    /**
     * Android: setConsent
     *     iOS: setConsent
     */
    setConsent(isConsent: boolean): Promise<void>;
    /**
     * Android: setMetaData
     *     iOS: setMetaDataWithKey
     */
    setMetaData(key: string, values: Array<string>): Promise<void>;
    /**
     * Android: setSegment
     *     iOS: setSegment
     */
    setSegment(segment: IronSourceSegment): Promise<void>;
    /**
     * Android: launchTestSuite
     *     iOS: launchTestSuite
     */
    launchTestSuite(): Promise<void>;
    /**
     * Android: setWaterfallConfiguration
     *     iOS: setWaterfallConfiguration
     */
    setWaterfallConfiguration(ceiling: number, floor: number, adUnit: AdUnit): Promise<void>;
    /**
     * Android: clearWaterfallConfiguration
     *     iOS: clearWaterfallConfiguration
     */
    clearWaterfallConfiguration(adUnit: AdUnit): Promise<void>;
    /**
     * Android: setClientSideCallbacks
     *     iOS: setUseClientSideCallbacks
     *
     * This must be called before init.
     * OW client side automatic result polling
     * https://developers.is.com/ironsource-mobile/android/offerwall-integration-android/#step-3
     */
    setClientSideCallbacks(isEnabled: boolean): Promise<void>;
    /** init API =============================================================**/
    /**
     * Android: setUserId
     *     iOS: setUserId
     *
     * When an empty string was passed as userId, SDK falls back to default.
     */
    setUserId(userId: string): Promise<void>;
    /**
     * Android: init
     *     iOS: initWithAppKey
     *
     * Use init to init with all ad units.
     * Use initWithAdUnits to init with only specific ad units.
     */
    init(appKey: string): Promise<void>;
    initWithAdUnits(appKey: string, adUnits: Array<AdUnit>): Promise<void>;
    /** Rewarded Video API ===============================================================**/
    /**
     * Android: showRewardedVideo
     *     iOS: showRewardedVideoWithViewController
     *
     * @deprecated Use the alternate API {@link LevelPlayRewardedAd#showAd()} instead.
     */
    showRewardedVideo(): Promise<void>;
    /**
     * @deprecated Use the alternate API {@link LevelPlayRewardedAd#showAd(placementName)} instead.
     */
    showRewardedVideoForPlacement(placementName: string): Promise<void>;
    /**
     * Android: isRewardedVideoAvailable
     *     iOS: hasRewardedVideo
     *
     * @deprecated Use the alternate API {@link LevelPlayRewardedAd#isAdReady()} instead.
     */
    isRewardedVideoAvailable(): Promise<boolean>;
    /**
     * Android: getRewardedVideoPlacementInfo
     *     iOS: rewardedVideoPlacementInfo
     *
     * Must be called after init success, otherwise returns null.
     * This defaults back to DefaultPlacement if none matched.
     *
     * @deprecated This method will be removed in future versions.
     */
    getRewardedVideoPlacementInfo(placementName: string): Promise<IronSourceRVPlacement | undefined>;
    /**
     * Android: isRewardedVideoPlacementCapped
     *     iOS: isRewardedVideoCappedForPlacement
     *
     * If none matches with the name, returns false.
     *
     * @deprecated Use the alternate API {@link LevelPlayRewardedAd#isPlacementCapped(placementName)} instead.
     */
    isRewardedVideoPlacementCapped(placementName: string): Promise<boolean>;
    /**
     * Android: setRewardedVideoServerParameters
     *     iOS: setRewardedVideoServerParameters
     *
     * Must be called before showRewardedVideo
     *
     * @deprecated This method will be removed in future versions.
     */
    setRewardedVideoServerParams(params: {
        [key: string]: string;
    }): Promise<void>;
    /**
     * Android: clearRewardedVideoServerParameters
     *     iOS: clearRewardedVideoServerParameters
     *
     * @deprecated This method will be removed in future versions.
     */
    clearRewardedVideoServerParams(): Promise<void>;
    /**
     * For Manual Load RV mode
     * Android: loadRewardedVideo
     *     iOS: loadRewardedVideo
     *
     * @deprecated Use the alternate API {@link LevelPlayRewardedAd#loadAd()} instead.
     */
    loadRewardedVideo(): Promise<void>;
    /**
     * Must be called before init.
     * Android: setLevelPlayRewardedVideoManual
     *     iOS: setLevelPlayRewardedVideoManual
     *
     * @deprecated Use the alternate API {@link LevelPlayRewardedAd#setListener(LevelPlayRewardedAdListener)} instead.
     */
    setLevelPlayRewardedVideoManual(): Promise<void>;
    /** Interstitial API ===============================================================**/
    /**
     * Android: loadInterstitial
     *     iOS: loadInterstitial
     *
     * @deprecated Use the alternate API {@link LevelPlayInterstitialAd#loadAd()} instead.
     */
    loadInterstitial(): Promise<void>;
    /**
     * Android: showInterstitial
     *     iOS: showInterstitialWithViewController
     *
     * @deprecated Use the alternate API {@link LevelPlayInterstitialAd#showAd()} instead.
     */
    showInterstitial(): Promise<void>;
    /**
     * @deprecated Use the alternate API {@link LevelPlayInterstitialAd#showAd(placementName)} instead.
     */
    showInterstitialForPlacement(placementName: string): Promise<void>;
    /**
     * Android: isInterstitialReady
     *     iOS: hasInterstitial
     *
     * @deprecated Use the alternate API {@link LevelPlayInterstitialAd#isAdReady()} instead.
     */
    isInterstitialReady(): Promise<boolean>;
    /**
     * Android: isInterstitialPlacementCapped
     *     iOS: isInterstitialCappedForPlacement
     *
     * @deprecated Use the alternate API {@link LevelPlayInterstitialAd#isPlacementCapped(placementName)} instead.
     */
    isInterstitialPlacementCapped(placementName: string): Promise<boolean>;
    /** Banner API ===============================================================**/
    /**
     * Android: loadBanner
     *     iOS: loadBannerWithViewController
     *
     * It falls back to BANNER in the case of invalid sizeDescriptions.
     *
     * @deprecated Use the alternate API {@link LevelPlayBannerAdView#loadAd()} instead.
     */
    loadBanner(options: IronSourceBannerOptions): Promise<void>;
    /**
     * Android: destroyBanner
     *     iOS: destroyBanner
     *
     * @deprecated Use the alternate API {@link LevelPlayBannerAdView#destroy()} instead.
     */
    destroyBanner(): Promise<void>;
    /**
     * Android: n/a
     *     iOS: n/a
     *
     * This simply changes the visibility of the hidden banner view.
     *
     * @deprecated This method will be removed in future versions.
     */
    displayBanner(): Promise<void>;
    /**
     * Android: n/a
     *     iOS: n/a
     * This simply changes the visibility of the banner view.
     * Reloading does not take place while it's hidden.
     *
     * @deprecated This method will be removed in future versions.
     */
    hideBanner(): Promise<void>;
    /**
     * Android: isBannerPlacementCapped
     *     iOS: isBannerCappedForPlacement
     *
     * @deprecated Capping is no longer supported for Banners.
     */
    isBannerPlacementCapped(placementName: string): Promise<boolean>;
    /**
     * Android: getMaximalAdaptiveHeight
     *     iOS: getMaximalAdaptiveHeight
     *
     * @deprecated This method will be removed in future versions.
     */
    getMaximalAdaptiveHeight(width: number): Promise<number>;
    /** iOS ConversionValue API ========================================================**/
    /**
     * Android: n/a
     *     iOS: getConversionValue
     *
     * Returns undefined for Android
     */
    getConversionValue(): Promise<number | undefined>;
    /** iOS ConsentView API ============================================================**/
    /**
     * Android: n/a
     *     iOS: loadConsentViewWithType
     *
     * use "pre" for all your consentViewType
     * https://developers.is.com/ironsource-mobile/ios/permission-popup-ios/#step-1
     */
    loadConsentViewWithType(consentViewType: string): Promise<void>;
    /**
     * Android: n/a
     *     iOS: showConsentViewWithType
     *
     * use "pre" for all your consentViewType
     * https://developers.is.com/ironsource-mobile/ios/permission-popup-ios/#step-1
     */
    showConsentViewWithType(consentViewType: string): Promise<void>;
};
/**
 * These are needed since ReactNative NativeModules does not support function overload or optional arguments.
 */
type InitFunction = (appKey: string, adUnits?: Array<AdUnit>) => Promise<void>;
type ShowFunction = (placementName?: string) => Promise<void>;
type IronSourceProxyType = {
    /**
     * Android: init
     *     iOS: initWithAppKey
     */
    init: InitFunction;
    /**
     * Android: showRewardedVideo
     *     iOS: showRewardedVideoWithViewController
     *
     * @deprecated Use the alternate API {@link LevelPlayRewardedAd#showAd()} instead.
     */
    showRewardedVideo: ShowFunction;
    /**
     * Android: showInterstitial
     *     iOS: showInterstitialWithViewController
     *
     * @deprecated Use the alternate API {@link LevelPlayInterstitiald#showAd()} instead.
     */
    showInterstitial: ShowFunction;
};
type UtilFunctions = {
    getPluginVersion: () => string;
    getNativeSDKVersion: () => string;
};
type LevelPlayListeners = {
    setInitializationListener: (listener: InitializationListener) => void;
    setImpressionDataListener: (listener: ImpressionDataListener) => void;
    setConsentViewListener: (listener: ConsentViewListener) => void;
    /**
     * Sets the setLevelPlayBannerListener to handle banner ad events.
     * @param listener The setLevelPlayBannerListener object containing event handlers.
     *
     * @deprecated Use the alternate API LevelPlayBannerAdView with LevelPlayBannerAdViewListener instead.
     */
    setLevelPlayBannerListener: (listener: LevelPlayBannerListener) => void;
    /**
     * Sets the setLevelPlayInterstitialListener to handle interstitial ad events.
     * @param listener The setLevelPlayInterstitialListener object containing event handlers.
     *
     * @deprecated Use the alternate API {@link LevelPlayInterstitialAd#setListener(LevelPlayInterstitialAdListener)} instead.
     */
    setLevelPlayInterstitialListener: (listener: LevelPlayInterstitialListener) => void;
    /**
     * Sets the setLevelPlayRewardedVideoListener to handle rewarded video ad events.
     * @param listener The setLevelPlayRewardedVideoListener object containing event handlers.
     *
     * @deprecated Use the alternate API {@link LevelPlayRewardedAd#setListener(LevelPlayRewardedAdListener)} instead.
     */
    setLevelPlayRewardedVideoListener: (listener: LevelPlayRewardedVideoListener) => void;
    /**
   * Sets the setLevelPlayRewardedVideoManualListener to handle rewarded video ad events.
   * @param listener The setLevelPlayRewardedVideoManualListener object containing event handlers.
   *
   * @deprecated Use the alternate API {@link LevelPlayRewardedAd#setListener(LevelPlayRewardedAdListener)} instead.
   */
    setLevelPlayRewardedVideoManualListener: (listener: LevelPlayRewardedVideoManualListener) => void;
};
/**
 * Exposed Module Type
 */
type IronSourceType = UtilFunctions & LevelPlayListeners & IronSourceProxyType & Omit<IronSourceNativeModuleType, 'init' | 'initWithAdUnits' | 'showRewardedVideo' | 'showRewardedVideoForPlacement' | 'showInterstitial' | 'showInterstitialForPlacement'>;
export declare const IronSource: Readonly<IronSourceType>;
export {};
//# sourceMappingURL=IronSource.d.ts.map