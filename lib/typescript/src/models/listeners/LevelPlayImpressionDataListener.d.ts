import type { LevelPlayImpressionData } from '../LevelPlayImpressionData';
/**
 * Interface for handling LevelPlayImpressionData events
 */
export interface LevelPlayImpressionDataListener {
    /**
     * Invoked when an impression is successfully recorded(ad is shown).
     * [impressionData] includes information about the impression data
     *
     * Android: onImpressionSuccess
     *     iOS: impressionDataDidSucceed
     */
    onImpressionSuccess: (impressionData: LevelPlayImpressionData) => void;
}
//# sourceMappingURL=LevelPlayImpressionDataListener.d.ts.map