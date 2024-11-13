import { NativeEventEmitter, NativeModules } from "react-native";
import { type LevelPlayInterstitialAd } from "../models/LevelPlayInterstitialAd";
import { levelPlayAdInfoFromMap, levelPlayAdErrorFromMap } from "./utils";

const { IronSourceMediation } = NativeModules;
const eventEmitter = new NativeEventEmitter(IronSourceMediation)
const { 
    ON_INTERSTITIAL_AD_LOADED, 
    ON_INTERSTITIAL_AD_LOAD_FAILED,
    ON_INTERSTITIAL_AD_INFO_CHANGED,
    ON_INTERSTITIAL_AD_DISPLAYED,
    ON_INTERSTITIAL_AD_DISPLAY_FAILED,
    ON_INTERSTITIAL_AD_CLICKED,
    ON_INTERSTITIAL_AD_CLOSED
} = IronSourceMediation.getConstants();

/**
 * Manages instances of LevelPlay interstitial ads.
 */
export class LevelPlayAdObjectManager {
    private static instance: LevelPlayAdObjectManager;
    private interstitialAdsMap: Map<number, LevelPlayInterstitialAd>;
    private adObjectId: number;

    private constructor() {
        this.interstitialAdsMap = new Map<number, LevelPlayInterstitialAd>();
        this.adObjectId = 0;
        this.handleMethodCalls();
    }
    
    // Public static method to provide access to the singleton instance
    public static getInstance(): LevelPlayAdObjectManager {
        if (!LevelPlayAdObjectManager.instance) {
            LevelPlayAdObjectManager.instance = new LevelPlayAdObjectManager();
        }
        return LevelPlayAdObjectManager.instance;
    }

    private handleMethodCalls() {
        eventEmitter.removeAllListeners(ON_INTERSTITIAL_AD_LOADED)
        eventEmitter.removeAllListeners(ON_INTERSTITIAL_AD_LOAD_FAILED)
        eventEmitter.removeAllListeners(ON_INTERSTITIAL_AD_INFO_CHANGED)
        eventEmitter.removeAllListeners(ON_INTERSTITIAL_AD_DISPLAYED)
        eventEmitter.removeAllListeners(ON_INTERSTITIAL_AD_DISPLAY_FAILED)
        eventEmitter.removeAllListeners(ON_INTERSTITIAL_AD_CLICKED)
        eventEmitter.removeAllListeners(ON_INTERSTITIAL_AD_CLOSED)
        
        eventEmitter.addListener(ON_INTERSTITIAL_AD_LOADED, (data: any) => {
            const adObjectId = Number(data.adObjectId);
            const adInfo = levelPlayAdInfoFromMap(data.adInfo);
            const listener = this.interstitialAdsMap.get(adObjectId)?.getListener();
            listener?.onAdLoaded(adInfo);
        })

        eventEmitter.addListener(ON_INTERSTITIAL_AD_LOAD_FAILED, (data: any) => {
            const adObjectId = Number(data.adObjectId);
            const error = levelPlayAdErrorFromMap(data.error);
            const listener = this.interstitialAdsMap.get(adObjectId)?.getListener();
            listener?.onAdLoadFailed(error);

        })
                
        eventEmitter.addListener(ON_INTERSTITIAL_AD_INFO_CHANGED, (data: any) => {
            const adObjectId = Number(data.adObjectId);
            const adInfo = levelPlayAdInfoFromMap(data.adInfo);
            const listener = this.interstitialAdsMap.get(adObjectId)?.getListener();
            listener?.onAdInfoChanged?.(adInfo);
        })

        eventEmitter.addListener(ON_INTERSTITIAL_AD_DISPLAYED, (data: any) => {
            const adObjectId = Number(data.adObjectId);
            const adInfo = levelPlayAdInfoFromMap(data.adInfo);
            const listener = this.interstitialAdsMap.get(adObjectId)?.getListener();
            listener?.onAdDisplayed?.(adInfo);
        })

        eventEmitter.addListener(ON_INTERSTITIAL_AD_DISPLAY_FAILED, (data: any) => {
            const adObjectId = Number(data.adObjectId);
            const error = levelPlayAdErrorFromMap(data.error);
            const adInfo = levelPlayAdInfoFromMap(data.adInfo);
            const listener = this.interstitialAdsMap.get(adObjectId)?.getListener();
            listener?.onAdDisplayFailed?.(error, adInfo);
        })

        eventEmitter.addListener(ON_INTERSTITIAL_AD_CLICKED, (data: any) => {
            const adObjectId = Number(data.adObjectId);
            const adInfo = levelPlayAdInfoFromMap(data.adInfo);
            const listener = this.interstitialAdsMap.get(adObjectId)?.getListener();
            listener?.onAdClicked?.(adInfo);
        })

        eventEmitter.addListener(ON_INTERSTITIAL_AD_CLOSED, (data: any) => {
            const adObjectId = Number(data.adObjectId);
            const adInfo = levelPlayAdInfoFromMap(data.adInfo);
            const listener = this.interstitialAdsMap.get(adObjectId)?.getListener();
            listener?.onAdClosed?.(adInfo);
        })
    }

    async loadInterstitialAd(interstitialAd: LevelPlayInterstitialAd): Promise<void> {
        let adObjectId = interstitialAd.adObjectId;
        let adUnitId = interstitialAd.adUnitId;
        if (!this.interstitialAdsMap.has(adObjectId)) {
            this.interstitialAdsMap.set(adObjectId, interstitialAd);
        }
        await IronSourceMediation.loadInterstitialAd({ adObjectId: adObjectId, adUnitId: adUnitId })
    }

    async showInterstitialAd(adObjectId: number, placementName: string): Promise<void> {
        if (this.interstitialAdsMap.has(adObjectId)) {
            await IronSourceMediation.showInterstitialAd({ adObjectId: adObjectId, placementName: placementName })
        }
    }

    async isInterstitialAdReady(adObjectId: number): Promise<boolean> {
        return await IronSourceMediation.isInterstitialAdReady({ adObjectId: adObjectId })
    }

    async removeAd(adObjectId: number) {
        if (this.interstitialAdsMap.has(adObjectId)) {
            this.interstitialAdsMap.delete(adObjectId);
            await IronSourceMediation.removeInterstitialAd({ adObjectId: adObjectId })
        }
    }

    async removeAllAds() {
        this.interstitialAdsMap.clear();
        await IronSourceMediation.removAllInterstitialAds();
    }

    generateAdObjectId(): number {
        return this.adObjectId++;
    }
}