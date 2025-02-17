import { NativeEventEmitter, NativeModules } from "react-native";
import { type LevelPlayInterstitialAd } from "../models/LevelPlayInterstitialAd";
import { type LevelPlayRewardedAd } from "../models/LevelPlayRewardedAd";
import { levelPlayAdInfoFromMap, levelPlayAdErrorFromMap, levelPlayRewardFromMap } from "./utils";

const { IronSourceMediation } = NativeModules;
const eventEmitter = new NativeEventEmitter(IronSourceMediation)
const { 
    ON_INTERSTITIAL_AD_LOADED, 
    ON_INTERSTITIAL_AD_LOAD_FAILED,
    ON_INTERSTITIAL_AD_INFO_CHANGED,
    ON_INTERSTITIAL_AD_DISPLAYED,
    ON_INTERSTITIAL_AD_DISPLAY_FAILED,
    ON_INTERSTITIAL_AD_CLICKED,
    ON_INTERSTITIAL_AD_CLOSED,
    ON_REWARDED_AD_LOADED, 
    ON_REWARDED_AD_LOAD_FAILED,
    ON_REWARDED_AD_INFO_CHANGED,
    ON_REWARDED_AD_DISPLAYED,
    ON_REWARDED_AD_DISPLAY_FAILED,
    ON_REWARDED_AD_CLICKED,
    ON_REWARDED_AD_CLOSED,
    ON_REWARDED_AD_REWARDED
} = IronSourceMediation.getConstants();

/**
 * Manages instances of LevelPlay interstitial ads.
 */
export class LevelPlayAdObjectManager {
    private static instance: LevelPlayAdObjectManager;
    private interstitialAdsMap: Map<number, LevelPlayInterstitialAd>;
    private rewardedAdsMap: Map<number, LevelPlayRewardedAd>;
    private adObjectId: number;

    private constructor() {
        this.interstitialAdsMap = new Map<number, LevelPlayInterstitialAd>();
        this.rewardedAdsMap = new Map<number, LevelPlayRewardedAd>();
        this.adObjectId = 0;
        this.handleInterstitialMethodCalls();
        this.handleRewardedMethodCalls();
    }
    
    // Public static method to provide access to the singleton instance
    public static getInstance(): LevelPlayAdObjectManager {
        if (!LevelPlayAdObjectManager.instance) {
            LevelPlayAdObjectManager.instance = new LevelPlayAdObjectManager();
        }
        return LevelPlayAdObjectManager.instance;
    }

    // Interstitial Ad

    private handleInterstitialMethodCalls() {
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

    // Rewarded Ad

    private handleRewardedMethodCalls() {
        eventEmitter.removeAllListeners(ON_REWARDED_AD_LOADED)
        eventEmitter.removeAllListeners(ON_REWARDED_AD_LOAD_FAILED)
        eventEmitter.removeAllListeners(ON_REWARDED_AD_INFO_CHANGED)
        eventEmitter.removeAllListeners(ON_REWARDED_AD_DISPLAYED)
        eventEmitter.removeAllListeners(ON_REWARDED_AD_DISPLAY_FAILED)
        eventEmitter.removeAllListeners(ON_REWARDED_AD_CLICKED)
        eventEmitter.removeAllListeners(ON_REWARDED_AD_CLOSED)
        eventEmitter.removeAllListeners(ON_REWARDED_AD_REWARDED)

        eventEmitter.addListener(ON_REWARDED_AD_LOADED, (data: any) => {
            const adObjectId = Number(data.adObjectId);
            const adInfo = levelPlayAdInfoFromMap(data.adInfo);
            const listener = this.rewardedAdsMap.get(adObjectId)?.getListener();
            listener?.onAdLoaded(adInfo);
        })

        eventEmitter.addListener(ON_REWARDED_AD_LOAD_FAILED, (data: any) => {
            const adObjectId = Number(data.adObjectId);
            const error = levelPlayAdErrorFromMap(data.error);
            const listener = this.rewardedAdsMap.get(adObjectId)?.getListener();
            listener?.onAdLoadFailed(error);

        })
                
        eventEmitter.addListener(ON_REWARDED_AD_INFO_CHANGED, (data: any) => {
            const adObjectId = Number(data.adObjectId);
            const adInfo = levelPlayAdInfoFromMap(data.adInfo);
            const listener = this.rewardedAdsMap.get(adObjectId)?.getListener();
            listener?.onAdInfoChanged?.(adInfo);
        })

        eventEmitter.addListener(ON_REWARDED_AD_DISPLAYED, (data: any) => {
            const adObjectId = Number(data.adObjectId);
            const adInfo = levelPlayAdInfoFromMap(data.adInfo);
            const listener = this.rewardedAdsMap.get(adObjectId)?.getListener();
            listener?.onAdDisplayed?.(adInfo);
        })

        eventEmitter.addListener(ON_REWARDED_AD_DISPLAY_FAILED, (data: any) => {
            const adObjectId = Number(data.adObjectId);
            const error = levelPlayAdErrorFromMap(data.error);
            const adInfo = levelPlayAdInfoFromMap(data.adInfo);
            const listener = this.rewardedAdsMap.get(adObjectId)?.getListener();
            listener?.onAdDisplayFailed?.(error, adInfo);
        })

        eventEmitter.addListener(ON_REWARDED_AD_CLICKED, (data: any) => {
            const adObjectId = Number(data.adObjectId);
            const adInfo = levelPlayAdInfoFromMap(data.adInfo);
            const listener = this.rewardedAdsMap.get(adObjectId)?.getListener();
            listener?.onAdClicked?.(adInfo);
        })

        eventEmitter.addListener(ON_REWARDED_AD_CLOSED, (data: any) => {
            const adObjectId = Number(data.adObjectId);
            const adInfo = levelPlayAdInfoFromMap(data.adInfo);
            const listener = this.rewardedAdsMap.get(adObjectId)?.getListener();
            listener?.onAdClosed?.(adInfo);
        })

        eventEmitter.addListener(ON_REWARDED_AD_REWARDED, (data: any) => {
            const adObjectId = Number(data.adObjectId);
            const reward = levelPlayRewardFromMap(data.reward);
            const adInfo = levelPlayAdInfoFromMap(data.adInfo);
            const listener = this.rewardedAdsMap.get(adObjectId)?.getListener();
            listener?.onAdRewarded?.(reward, adInfo);
        })
    }

    async loadRewardedAd(rewardedAd: LevelPlayRewardedAd): Promise<void> {
        let adObjectId = rewardedAd.adObjectId;
        let adUnitId = rewardedAd.adUnitId;
        if (!this.rewardedAdsMap.has(adObjectId)) {
            this.rewardedAdsMap.set(adObjectId, rewardedAd);
        }
        await IronSourceMediation.loadRewardedAd({ adObjectId: adObjectId, adUnitId: adUnitId })
    }

    async showRewardedAd(adObjectId: number, placementName: string): Promise<void> {
        if (this.rewardedAdsMap.has(adObjectId)) {
            await IronSourceMediation.showRewardedAd({ adObjectId: adObjectId, placementName: placementName })
        }
    }

    async isRewardedAdReady(adObjectId: number): Promise<boolean> {
        return await IronSourceMediation.isRewardedAdReady({ adObjectId: adObjectId })
    }

    // Shared Methods

    async removeAd(adObjectId: number) {
        let wasRemoved = false;

        if (this.interstitialAdsMap && this.interstitialAdsMap.has(adObjectId)) {
            this.interstitialAdsMap.delete(adObjectId);
            wasRemoved = true;
        }

        if (this.rewardedAdsMap && this.rewardedAdsMap.has(adObjectId)) {
            this.rewardedAdsMap.delete(adObjectId);
            wasRemoved = true;
        }

        if (wasRemoved) {
            await IronSourceMediation.removeAd({ adObjectId: adObjectId })
        }
    }

    async removeAllAds() {
        this.interstitialAdsMap.clear();
        this.rewardedAdsMap.clear();
        await IronSourceMediation.removAllAds();
    }

    generateAdObjectId(): number {
        return this.adObjectId++;
    }
}