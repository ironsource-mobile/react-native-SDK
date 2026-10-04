import type { LevelPlayRewardedAdListener } from './listeners/LevelPlayRewardedAdListener';
import type { LevelPlayImpressionDataListener } from './listeners/LevelPlayImpressionDataListener';
/**
 * Represents a LevelPlay rewarded ad.
 */
export declare class LevelPlayRewardedAd {
    adUnitId: string;
    adId: string;
    listener: LevelPlayRewardedAdListener | null | undefined;
    impressionDataListener: LevelPlayImpressionDataListener | undefined;
    bidFloor: number | null | undefined;
    constructor(adUnitId: string);
    setListener(listener: LevelPlayRewardedAdListener): void;
    getListener(): LevelPlayRewardedAdListener | null | undefined;
    /**
     * Sets a listener for impression-level revenue data of this ad instance.
     *
     * Android: setImpressionDataListener
     *     iOS: setImpressionDataDelegate
     */
    setImpressionDataListener(listener: LevelPlayImpressionDataListener): void;
    getImpressionDataListener(): LevelPlayImpressionDataListener | undefined;
    setBidFloor(bidFloor: number): void;
    getBidFloor(): number | null | undefined;
    /**
     * Checks if a specific ad placement is capped.
     * @param placementName - The name of the ad placement to check.
     * @returns A promise that resolves to a boolean indicating whether the placement is capped.
     */
    static isPlacementCapped(placementName: string): Promise<boolean>;
    /**
     * Loads the rewarded ad.
     * @returns A promise that resolves when the ad is loaded.
     */
    loadAd(): Promise<void>;
    /**
     * Shows the rewarded ad.
     * @param placementName - The name of the ad placement, or null for the default placement.
     * @returns A promise that resolves when the ad is shown.
     */
    showAd(placementName?: string | null): Promise<void>;
    /**
     * Checks if the rewarded ad is ready to be shown.
     * @returns A promise that resolves to a boolean indicating whether the ad is ready.
     */
    isAdReady(): Promise<boolean>;
    /**
     * Removes the rewarded ad.
     * @returns A promise that resolves when the ad is removed.
     */
    remove(): Promise<void>;
}
//# sourceMappingURL=LevelPlayRewardedAd.d.ts.map