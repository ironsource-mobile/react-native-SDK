/**
 * This is the main IronSource bridge module.
 */
import type { AdUnit, IronSourceBannerOptions, IronSourceRVPlacement, IronSourceSegment } from './models';
/** Types =======================================================================**/
/**
 * Native Module Type
 * Descriptions show the function names of native SDKs.
 */
declare type IronSourceNativeModuleType = {
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
    /** RV API ===============================================================**/
    /**
     * Android: showRewardedVideo
     *     iOS: showRewardedVideoWithViewController
     */
    showRewardedVideo(): Promise<void>;
    showRewardedVideoForPlacement(placementName: string): Promise<void>;
    /**
     * Android: isRewardedVideoAvailable
     *     iOS: hasRewardedVideo
     */
    isRewardedVideoAvailable(): Promise<boolean>;
    /**
     * Android: getRewardedVideoPlacementInfo
     *     iOS: rewardedVideoPlacementInfo
     *
     * Must be called after init success, otherwise returns null.
     * This defaults back to DefaultPlacement if none matched.
     */
    getRewardedVideoPlacementInfo(placementName: string): Promise<IronSourceRVPlacement | undefined>;
    /**
     * Android: isRewardedVideoPlacementCapped
     *     iOS: isRewardedVideoCappedForPlacement
     *
     * If none matches with the name, returns false.
     */
    isRewardedVideoPlacementCapped(placementName: string): Promise<boolean>;
    /**
     * Android: setRewardedVideoServerParameters
     *     iOS: setRewardedVideoServerParameters
     *
     * Must be called before showRewardedVideo
     */
    setRewardedVideoServerParams(params: {
        [key: string]: string;
    }): Promise<void>;
    /**
     * Android: clearRewardedVideoServerParameters
     *     iOS: clearRewardedVideoServerParameters
     */
    clearRewardedVideoServerParams(): Promise<void>;
    /**
     * Must be called before init.
     * Android: setManualLoadRewardedVideo
     *     iOS: setRewardedVideoManualDelegate
     */
    setManualLoadRewardedVideo(): Promise<void>;
    /**
     * For Manual Load RV mode
     * Android: loadRewardedVideo
     *     iOS: loadRewardedVideo
     */
    loadRewardedVideo(): Promise<void>;
    /** IS API ===============================================================**/
    /**
     * Android: loadInterstitial
     *     iOS: loadInterstitial
     */
    loadInterstitial(): Promise<void>;
    /**
     * Android: showInterstitial
     *     iOS: showInterstitialWithViewController
     */
    showInterstitial(): Promise<void>;
    showInterstitialForPlacement(placementName: string): Promise<void>;
    /**
     * Android: isInterstitialReady
     *     iOS: hasInterstitial
     */
    isInterstitialReady(): Promise<boolean>;
    /**
     * Android: isInterstitialPlacementCapped
     *     iOS: isInterstitialCappedForPlacement
     */
    isInterstitialPlacementCapped(placementName: string): Promise<boolean>;
    /** BN API ===============================================================**/
    /**
     * Android: loadBanner
     *     iOS: loadBannerWithViewController
     *
     * It falls back to BANNER in the case of invalid sizeDescriptions.
     */
    loadBanner(options: IronSourceBannerOptions): Promise<void>;
    /**
     * Android: destroyBanner
     *     iOS: destroyBanner
     */
    destroyBanner(): Promise<void>;
    /**
     * Android: n/a
     *     iOS: n/a
     *
     * This simply changes the visibility of the hidden banner view.
     */
    displayBanner(): Promise<void>;
    /**
     * Android: n/a
     *     iOS: n/a
     * This simply changes the visibility of the banner view.
     * Reloading does not take place while it's hidden.
     */
    hideBanner(): Promise<void>;
    /**
     * Android: isBannerPlacementCapped
     *     iOS: isBannerCappedForPlacement
     */
    isBannerPlacementCapped(placementName: string): Promise<boolean>;
    /** OW API ===============================================================**/
    /**
     * Android: showOfferwall
     *     iOS: showOfferwallWithViewController
     */
    showOfferwall(): Promise<void>;
    showOfferwallForPlacement(placementName: string): Promise<void>;
    /**
     * Android: getOfferwallCredits
     *     iOS: offerwallCredits
     *
     * Credit info will be notified through the OW Events listener.
     */
    getOfferwallCredits(): Promise<void>;
    /**
     * Android: isOfferwallAvailable
     *     iOS: hasOfferwall
     */
    isOfferwallAvailable(): Promise<boolean>;
    /**
     * Android: setClientSideCallbacks
     *     iOS: setUseClientSideCallbacks
     *
     * This must be called before init.
     * OW client side automatic result polling
     * https://developers.is.com/ironsource-mobile/android/offerwall-integration-android/#step-3
     */
    setClientSideCallbacks(isEnabled: boolean): Promise<void>;
    /**
     * Android: setOfferwallCustomParams
     *     iOS: setOfferwallCustomParameters
     *
     * This must be called before showOfferwall.
     */
    setOfferwallCustomParams(params: {
        [key: string]: string;
    }): Promise<void>;
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
declare type InitFunction = (appKey: string, adUnits?: Array<AdUnit>) => Promise<void>;
declare type ShowFunction = (placementName?: string) => Promise<void>;
declare type IronSourceProxyType = {
    /**
     * Android: init
     *     iOS: initWithAppKey
     */
    init: InitFunction;
    /**
     * Android: showRewardedVideo
     *     iOS: showRewardedVideoWithViewController
     */
    showRewardedVideo: ShowFunction;
    /**
     * Android: showInterstitial
     *     iOS: showInterstitialWithViewController
     */
    showInterstitial: ShowFunction;
    /**
     * Android: showOfferwall
     *     iOS: showOfferwallWithViewController
     */
    showOfferwall: ShowFunction;
};
declare type UtilFunctions = {
    getPluginVersion: () => string;
    getNativeSDKVersion: () => string;
};
/**
 * Exposed Module Type
 */
declare type IronSourceType = UtilFunctions & IronSourceProxyType & Omit<IronSourceNativeModuleType, 'init' | 'initWithAdUnits' | 'showRewardedVideo' | 'showRewardedVideoForPlacement' | 'showInterstitial' | 'showInterstitialForPlacement' | 'showOfferwall' | 'showOfferwallForPlacement'>;
export declare const IronSource: Readonly<IronSourceType>;
export {};
