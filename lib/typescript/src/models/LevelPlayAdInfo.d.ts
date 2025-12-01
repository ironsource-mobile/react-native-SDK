import type { LevelPlayAdSize } from './LevelPlayAdSize';
/**
 * Represents detailed information about a LevelPlay ad.
 */
export type LevelPlayAdInfo = {
    /**
     * The unique identifier of the ad object.
     */
    adId: string;
    /**
     * The unique identifier of the ad unit.
     */
    adUnitId: string;
    /**
     * The name of the ad unit.
     */
    adUnitName: string;
    /**
     * The size of the ad.
     * This can be null if the ad size is not applicable or not provided.
     */
    adSize: LevelPlayAdSize | null;
    /**
     * The format of the ad (e.g., BANNER, INTERSTITIAL, REWARDED, NATIVE_AD).
     */
    adFormat: string;
    /**
     * The name of the placement where the ad was shown.
     */
    placementName: string;
    /**
     * The unique identifier for the auction in which the ad was won.
     */
    auctionId: string;
    /**
     * The country where the ad was displayed.
     */
    country: string;
    /**
     * A/B testing group identifier.
     */
    ab: string;
    /**
     * The name of the segment in which the user falls.
     */
    segmentName: string;
    /**
     * The name of the ad network that served the ad.
     */
    adNetwork: string;
    /**
     * The name of the ad instance.
     */
    instanceName: string;
    /**
     * The identifier of the ad instance.
     */
    instanceId: string;
    /**
     * The revenue earned from the ad impression.
     */
    revenue: number;
    /**
     * The precision of the revenue amount.
     */
    precision: string;
    /**
     * The encrypted cost per thousand impressions (CPM).
     */
    encryptedCPM: string;
    /**
     * The conversion value attributed to this impression, used for SKAdNetwork.
     */
    conversionValue: number | null;
    /**
     * The unique identifier of the creative that was displayed.
     */
    creativeId: string;
};
//# sourceMappingURL=LevelPlayAdInfo.d.ts.map