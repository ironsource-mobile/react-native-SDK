import type { ImpressionData } from './ImpressionData';
import type { LevelPlayAdSize } from './LevelPlayAdSize';
/**
 * Represents detailed information about a LevelPlay ad.
 */
export type LevelPlayAdInfo = {
    /**
     * The unique identifier of the ad unit.
     */
    adUnitId: string;
    /**
     * The format of the ad (e.g., BANNER, INTERSTITIAL, REWARDED, NATIVE_AD).
     */
    adFormat: string;
    /**
     * Detailed impression data associated with the ad.
     * This can be null if no impression data is available.
     */
    impressionData: ImpressionData | null;
    /**
     * The size of the ad.
     * This can be null if the ad size is not applicable or not provided.
     */
    adSize: LevelPlayAdSize | null;
};
//# sourceMappingURL=LevelPlayAdInfo.d.ts.map