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
    private interstitialAdsMap: Map<string, LevelPlayInterstitialAd>;
    private rewardedAdsMap: Map<string, LevelPlayRewardedAd>;

    private constructor() {
        this.interstitialAdsMap = new Map<string, LevelPlayInterstitialAd>();
        this.rewardedAdsMap = new Map<string, LevelPlayRewardedAd>();
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
            const adId = String(data.adId);
            const adInfo = levelPlayAdInfoFromMap(data.adInfo);
            const listener = this.interstitialAdsMap.get(adId)?.getListener();
            listener?.onAdLoaded(adInfo);
        })

        eventEmitter.addListener(ON_INTERSTITIAL_AD_LOAD_FAILED, (data: any) => {
            const adId = String(data.adId);
            const error = levelPlayAdErrorFromMap(data.error);
            const listener = this.interstitialAdsMap.get(adId)?.getListener();
            listener?.onAdLoadFailed(error);

        })

        eventEmitter.addListener(ON_INTERSTITIAL_AD_INFO_CHANGED, (data: any) => {
            const adId = String(data.adId);
            const adInfo = levelPlayAdInfoFromMap(data.adInfo);
            const listener = this.interstitialAdsMap.get(adId)?.getListener();
            listener?.onAdInfoChanged?.(adInfo);
        })

        eventEmitter.addListener(ON_INTERSTITIAL_AD_DISPLAYED, (data: any) => {
            const adId = String(data.adId);
            const adInfo = levelPlayAdInfoFromMap(data.adInfo);
            const listener = this.interstitialAdsMap.get(adId)?.getListener();
            listener?.onAdDisplayed?.(adInfo);
        })

        eventEmitter.addListener(ON_INTERSTITIAL_AD_DISPLAY_FAILED, (data: any) => {
            const adId = String(data.adId);
            const error = levelPlayAdErrorFromMap(data.error);
            const adInfo = levelPlayAdInfoFromMap(data.adInfo);
            const listener = this.interstitialAdsMap.get(adId)?.getListener();
            listener?.onAdDisplayFailed?.(error, adInfo);
        })

        eventEmitter.addListener(ON_INTERSTITIAL_AD_CLICKED, (data: any) => {
            const adId = String(data.adId);
            const adInfo = levelPlayAdInfoFromMap(data.adInfo);
            const listener = this.interstitialAdsMap.get(adId)?.getListener();
            listener?.onAdClicked?.(adInfo);
        })

        eventEmitter.addListener(ON_INTERSTITIAL_AD_CLOSED, (data: any) => {
            const adId = String(data.adId);
            const adInfo = levelPlayAdInfoFromMap(data.adInfo);
            const listener = this.interstitialAdsMap.get(adId)?.getListener();
            listener?.onAdClosed?.(adInfo);
        })
    }

    async createInterstitialAd(interstitialAd: LevelPlayInterstitialAd): Promise<string> {
        // Call native module to create the ad and get back an adId string
        const adId = await IronSourceMediation.createInterstitialAd({
            adUnitId: interstitialAd.adUnitId
        });
        // Store the ad instance in the map if it's not already present
        if (!this.interstitialAdsMap.has(adId)) {
            // Assign the returned ID to the ad object
            interstitialAd.adId = adId;
            // Add the ad to the map using its ID as key for future reference
            this.interstitialAdsMap.set(adId, interstitialAd);
        }

        return interstitialAd.adId;
}

    async loadInterstitialAd(interstitialAd: LevelPlayInterstitialAd): Promise<void> {
            // If adId is empty or undefined, create the ad first to get an adId
            const adId = !interstitialAd.adId ?
                await this.createInterstitialAd(interstitialAd) : interstitialAd.adId;

            // Call native module to load the ad using its adId
            await IronSourceMediation.loadInterstitialAd({ adId: adId });
    }

    async showInterstitialAd(adId: string, placementName: string): Promise<void> {
        if (this.interstitialAdsMap.has(adId)) {
            await IronSourceMediation.showInterstitialAd({ adId: adId, placementName: placementName })
        }
    }

    async isInterstitialAdReady(adId: string): Promise<boolean> {
        return await IronSourceMediation.isInterstitialAdReady({ adId: adId })
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
            const adId = String(data.adId);
            const adInfo = levelPlayAdInfoFromMap(data.adInfo);
            const listener = this.rewardedAdsMap.get(adId)?.getListener();
            listener?.onAdLoaded(adInfo);
        })

        eventEmitter.addListener(ON_REWARDED_AD_LOAD_FAILED, (data: any) => {
            const adId = String(data.adId);
            const error = levelPlayAdErrorFromMap(data.error);
            const listener = this.rewardedAdsMap.get(adId)?.getListener();
            listener?.onAdLoadFailed(error);

        })

        eventEmitter.addListener(ON_REWARDED_AD_INFO_CHANGED, (data: any) => {
            const adId = String(data.adId);
            const adInfo = levelPlayAdInfoFromMap(data.adInfo);
            const listener = this.rewardedAdsMap.get(adId)?.getListener();
            listener?.onAdInfoChanged?.(adInfo);
        })

        eventEmitter.addListener(ON_REWARDED_AD_DISPLAYED, (data: any) => {
            const adId = String(data.adId);
            const adInfo = levelPlayAdInfoFromMap(data.adInfo);
            const listener = this.rewardedAdsMap.get(adId)?.getListener();
            listener?.onAdDisplayed?.(adInfo);
        })

        eventEmitter.addListener(ON_REWARDED_AD_DISPLAY_FAILED, (data: any) => {
            const adId = String(data.adId);
            const error = levelPlayAdErrorFromMap(data.error);
            const adInfo = levelPlayAdInfoFromMap(data.adInfo);
            const listener = this.rewardedAdsMap.get(adId)?.getListener();
            listener?.onAdDisplayFailed?.(error, adInfo);
        })

        eventEmitter.addListener(ON_REWARDED_AD_CLICKED, (data: any) => {
            const adId = String(data.adId);
            const adInfo = levelPlayAdInfoFromMap(data.adInfo);
            const listener = this.rewardedAdsMap.get(adId)?.getListener();
            listener?.onAdClicked?.(adInfo);
        })

        eventEmitter.addListener(ON_REWARDED_AD_CLOSED, (data: any) => {
            const adId = String(data.adId);
            const adInfo = levelPlayAdInfoFromMap(data.adInfo);
            const listener = this.rewardedAdsMap.get(adId)?.getListener();
            listener?.onAdClosed?.(adInfo);
        })

        eventEmitter.addListener(ON_REWARDED_AD_REWARDED, (data: any) => {
            const adId = String(data.adId);
            const reward = levelPlayRewardFromMap(data.reward);
            const adInfo = levelPlayAdInfoFromMap(data.adInfo);
            const listener = this.rewardedAdsMap.get(adId)?.getListener();
            listener?.onAdRewarded?.(reward, adInfo);
        })
    }

        async createRewardedAd(rewardedAd: LevelPlayRewardedAd): Promise<string> {
        // Call native module to create the ad and get back an adId string
        const adId = await IronSourceMediation.createRewardedAd({
            adUnitId: rewardedAd.adUnitId
        });
        // Store the ad instance in the map if it's not already present
        if (!this.rewardedAdsMap.has(adId)) {
            // Assign the returned ID to the ad object
            rewardedAd.adId = adId;
            // Add the ad to the map using its ID as key for future reference
            this.rewardedAdsMap.set(adId, rewardedAd);
        }
        return rewardedAd.adId;
}

    async loadRewardedAd(rewardedAd: LevelPlayRewardedAd): Promise<void> {
            // If adId is empty or undefined, create the ad first to get an adId
            const adId = !rewardedAd.adId ?
                await this.createRewardedAd(rewardedAd) : rewardedAd.adId;

            // Call native module to load the ad using its adId
            await IronSourceMediation.loadRewardedAd({ adId: adId });
    }

    async showRewardedAd(adId: string, placementName: string): Promise<void> {
        if (this.rewardedAdsMap.has(adId)) {
            await IronSourceMediation.showRewardedAd({ adId: adId, placementName: placementName })
        }
    }

    async isRewardedAdReady(adId: string): Promise<boolean> {
        return await IronSourceMediation.isRewardedAdReady({ adId: adId })
    }

    // // Shared Methods

    async removeAd(adId: string) {
        let wasRemoved = false;

        if (this.interstitialAdsMap && this.interstitialAdsMap.has(adId)) {
            this.interstitialAdsMap.delete(adId);
            wasRemoved = true;
        }

        if (this.rewardedAdsMap && this.rewardedAdsMap.has(adId)) {
            this.rewardedAdsMap.delete(adId);
            wasRemoved = true;
        }

        if (wasRemoved) {
            await IronSourceMediation.removeAd({ adId: adId })
        }
    }

    async removeAllAds() {
        this.interstitialAdsMap.clear();
        this.rewardedAdsMap.clear();
        await IronSourceMediation.removAllAds();
    }
}
