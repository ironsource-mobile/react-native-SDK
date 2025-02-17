import type { IronSourceAdInfo } from "../IronSourceAdInfo";
import type { IronSourceError } from "../errors";
/**
 * Interface for handling LevelPlayInterstitial events
 * @deprecated Use {@link LevelPlayInterstitialAdListener} instead.
 */
export interface LevelPlayInterstitialListener {
    /**
     * Indicates that the interstitial ad was loaded successfully.
     * [adInfo] includes information about the loaded ad
     *
     * Android: onAdReady
     *     iOS: didLoadWithAdInfo
     */
    onAdReady?: (adInfo: IronSourceAdInfo) => void;
    /**
     * Indicates that the ad failed to be loaded
     * [error] includes information about the error
     *
     * Android: onAdLoadFailed
     *     iOS: didFailToLoadWithError
     */
    onAdLoadFailed?: (error: IronSourceError) => void;
    /**
     * Invoked when the Interstitial Ad Unit has opened, and user left the application screen.
     * This is the impression indication.
     * [adInfo] includes information about the loaded ad
     *
     * Android: onAdOpened
     *     iOS: didOpenWithAdInfo
     */
    onAdOpened?: (adInfo: IronSourceAdInfo) => void;
    /**
     * Invoked when the interstitial ad closed and the user went back to the application screen.
     * [adInfo] includes information about the loaded ad
     *
     * Android: onAdClosed
     *     iOS: didCloseWithAdInfo
     */
    onAdClosed?: (adInfo: IronSourceAdInfo) => void;
    /**
     * The interstitial ad failed to show.
     * [error] includes information about the error
     * [adInfo] includes information about the loaded ad
     *
     * Android: onAdShowFailed
     *     iOS: didFailToShowWithError
     */
    onAdShowFailed?: (error: IronSourceError, adInfo: IronSourceAdInfo) => void;
    /**
     * Invoked when end user clicked on the interstitial ad
     * [adInfo] includes information about the loaded ad
     *
     * Android: onAdClicked
     *     iOS: didClickWithAdInfo
     */
    onAdClicked?: (adInfo: IronSourceAdInfo) => void;
    /**
     * Invoked before the interstitial ad was opened, and before the InterstitialOnAdOpenedEvent is reported.
     * This callback is not supported by all networks, and we recommend using it only if
     * it's supported by all networks you included in your build.
     * [adInfo] includes information about the loaded ad
     *
     * Android: onAdShowSucceeded
     *     iOS: didShowWithAdInfo
     */
    onAdShowSucceeded?: (adInfo: IronSourceAdInfo) => void;
}
//# sourceMappingURL=LevelPlayInterstitialListener.d.ts.map