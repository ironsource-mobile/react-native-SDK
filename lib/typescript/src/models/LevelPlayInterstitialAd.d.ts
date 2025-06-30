import type { LevelPlayInterstitialAdListener } from './listeners/LevelPlayInterstitialAdListener';
/**
 * Represents a LevelPlay interstitial ad.
 */
export declare class LevelPlayInterstitialAd {
    adUnitId: string;
    adId: string;
    listener: LevelPlayInterstitialAdListener | null | undefined;
    constructor(adUnitId: string);
    setListener(listener: LevelPlayInterstitialAdListener): void;
    getListener(): LevelPlayInterstitialAdListener | null | undefined;
    /**
     * Checks if a specific ad placement is capped.
     * @param placementName - The name of the ad placement to check.
     * @returns A promise that resolves to a boolean indicating whether the placement is capped.
     */
    static isPlacementCapped(placementName: string): Promise<boolean>;
    /**
     * Loads the interstitial ad.
     * @returns A promise that resolves when the ad is loaded.
     */
    loadAd(): Promise<void>;
    /**
     * Shows the interstitial ad.
     * @param placementName - The name of the ad placement, or null for the default placement.
     * @returns A promise that resolves when the ad is shown.
     */
    showAd(placementName?: string | null): Promise<void>;
    /**
     * Checks if the interstitial ad is ready to be shown.
     * @returns A promise that resolves to a boolean indicating whether the ad is ready.
     */
    isAdReady(): Promise<boolean>;
    /**
     * Removes the interstitial ad.
     * @returns A promise that resolves when the ad is removed.
     */
    remove(): Promise<void>;
}
//# sourceMappingURL=LevelPlayInterstitialAd.d.ts.map