import { type LevelPlayInterstitialAd } from "../models/LevelPlayInterstitialAd";
/**
 * Manages instances of LevelPlay interstitial ads.
 */
export declare class LevelPlayAdObjectManager {
    private static instance;
    private interstitialAdsMap;
    private adObjectId;
    private constructor();
    static getInstance(): LevelPlayAdObjectManager;
    private handleMethodCalls;
    loadInterstitialAd(interstitialAd: LevelPlayInterstitialAd): Promise<void>;
    showInterstitialAd(adObjectId: number, placementName: string): Promise<void>;
    isInterstitialAdReady(adObjectId: number): Promise<boolean>;
    removeAd(adObjectId: number): Promise<void>;
    removeAllAds(): Promise<void>;
    generateAdObjectId(): number;
}
//# sourceMappingURL=LevelPlayAdObjectManager.d.ts.map