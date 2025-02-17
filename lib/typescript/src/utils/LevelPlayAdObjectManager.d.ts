import { type LevelPlayInterstitialAd } from "../models/LevelPlayInterstitialAd";
import { type LevelPlayRewardedAd } from "../models/LevelPlayRewardedAd";
/**
 * Manages instances of LevelPlay interstitial ads.
 */
export declare class LevelPlayAdObjectManager {
    private static instance;
    private interstitialAdsMap;
    private rewardedAdsMap;
    private adObjectId;
    private constructor();
    static getInstance(): LevelPlayAdObjectManager;
    private handleInterstitialMethodCalls;
    loadInterstitialAd(interstitialAd: LevelPlayInterstitialAd): Promise<void>;
    showInterstitialAd(adObjectId: number, placementName: string): Promise<void>;
    isInterstitialAdReady(adObjectId: number): Promise<boolean>;
    private handleRewardedMethodCalls;
    loadRewardedAd(rewardedAd: LevelPlayRewardedAd): Promise<void>;
    showRewardedAd(adObjectId: number, placementName: string): Promise<void>;
    isRewardedAdReady(adObjectId: number): Promise<boolean>;
    removeAd(adObjectId: number): Promise<void>;
    removeAllAds(): Promise<void>;
    generateAdObjectId(): number;
}
//# sourceMappingURL=LevelPlayAdObjectManager.d.ts.map