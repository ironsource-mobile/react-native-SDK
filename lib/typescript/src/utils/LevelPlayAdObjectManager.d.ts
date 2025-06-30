import { type LevelPlayInterstitialAd } from "../models/LevelPlayInterstitialAd";
import { type LevelPlayRewardedAd } from "../models/LevelPlayRewardedAd";
/**
 * Manages instances of LevelPlay interstitial ads.
 */
export declare class LevelPlayAdObjectManager {
    private static instance;
    private interstitialAdsMap;
    private rewardedAdsMap;
    private constructor();
    static getInstance(): LevelPlayAdObjectManager;
    private handleInterstitialMethodCalls;
    createInterstitialAd(interstitialAd: LevelPlayInterstitialAd): Promise<string>;
    loadInterstitialAd(interstitialAd: LevelPlayInterstitialAd): Promise<void>;
    showInterstitialAd(adId: string, placementName: string): Promise<void>;
    isInterstitialAdReady(adId: string): Promise<boolean>;
    private handleRewardedMethodCalls;
    createRewardedAd(rewardedAd: LevelPlayRewardedAd): Promise<string>;
    loadRewardedAd(rewardedAd: LevelPlayRewardedAd): Promise<void>;
    showRewardedAd(adId: string, placementName: string): Promise<void>;
    isRewardedAdReady(adId: string): Promise<boolean>;
    removeAd(adId: string): Promise<void>;
    removeAllAds(): Promise<void>;
}
//# sourceMappingURL=LevelPlayAdObjectManager.d.ts.map