import type { IronSourceAdInfo } from "../IronSourceAdInfo";
import type { IronSourceError } from "../errors";
import type { LevelPlayNativeAd } from "../LevelPlayNativeAd";
export interface LevelPlayNativeAdListener {
    /**
     * Called after a native ad has been successfully loaded
     * [nativeAd] includes information about the native ad
     * [adInfo] includes information about the loaded ad
     *
     * Android: onAdLoaded
     *     iOS: didLoad
     */
    onAdLoaded?: (nativeAd: LevelPlayNativeAd, adInfo: IronSourceAdInfo) => void;
    /**
     * Callback when native ad fails to load
     * [nativeAd] includes information about the native ad
     * [error] includes information about the error
     *
     * Android: onAdLoadFailed
     *     iOS: didFailToLoad
     */
    onAdLoadFailed?: (nativeAd: LevelPlayNativeAd, error: IronSourceError) => void;
    /**
     * Callback when a user clicks on the native ad
     * [nativeAd] includes information about the native ad
     * [adInfo] includes information about the loaded ad
     *
     * Android: onAdClicked
     *     iOS: didClick
     */
    onAdClicked?: (nativeAd: LevelPlayNativeAd, adInfo: IronSourceAdInfo) => void;
    /**
     * Called after a native ad has been clicked.
     * [nativeAd] includes information about the native ad
     * [adInfo] includes information about the loaded ad
     *
     * Android: onAdImpression
     *     iOS: didRecordImpression
     */
    onAdImpression?: (nativeAd: LevelPlayNativeAd, adInfo: IronSourceAdInfo) => void;
}
//# sourceMappingURL=LevelPlayNativeAdListener.d.ts.map