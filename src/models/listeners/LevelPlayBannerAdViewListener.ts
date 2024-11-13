import type { LevelPlayAdError } from "../LevelPlayAdError";
import type { LevelPlayAdInfo } from "../LevelPlayAdInfo";

/**
 * Interface for handling LevelPlayBannerAdView events
 */
export interface LevelPlayBannerAdViewListener {
    /**
     * Invoked each time a banner was loaded. Either on refresh, or manual load.
     * [adInfo] includes information about the loaded ad
     * 
     * Android: onAdLoaded
     *     iOS: didLoad
     */
    onAdLoaded: (adInfo: LevelPlayAdInfo) => void;
    /**
     * Invoked when the banner loading process has failed.
     * This callback will be sent both for manual load and refreshed banner failures.
     * [error] includes information about the error 
     * 
     * Android: onAdLoadFailed
     *     iOS: didFailToLoadWithError
     */
    onAdLoadFailed: (error: LevelPlayAdError) => void;
    /**
     * Notifies the screen is displayed.
     * 
     * Android: onAdDisplayed
     *     iOS: didDisplayAdWithAdInfo
     */
    onAdDisplayed?: (adInfo: LevelPlayAdInfo) => void;
    /**
     * Notifies the screen failed to display.
     * 
     * Android: onAdDisplayFailed
     *     iOS: didFailToDisplayAdWithAdInfo
     */
    onAdDisplayFailed?: (adInfo: LevelPlayAdInfo, error: LevelPlayAdError) => void;
    /**
     * Invoked when end user clicks on the banner ad.
     * [adInfo] includes information about the loaded ad
     * 
     * Android: onAdClicked
     *     iOS: didClickWithAdInfo
     */    
    onAdClicked?: (adInfo: LevelPlayAdInfo) => void;
    /**
     * Ad is opened on full screen
     * 
     * Android: onAdExpanded
     *     iOS: didExpandAdWithAdInfo
     */    
    onAdExpanded?: (adInfo: LevelPlayAdInfo) => void;
    /**
     * Ad is restored to its original size
     * 
     * Android: onAdCollapsed
     *     iOS: didCollapseAdWithAdInfo
     */    
    onAdCollapsed?: (adInfo: LevelPlayAdInfo) => void;
    /**
     *Invoked when the user left the app.
     * [adInfo] includes information about the loaded ad
     * 
     * Android: onAdLeftApplication
     *     iOS: didLeaveApplicationWithAdInfo
     */  
    onAdLeftApplication?: (adInfo: LevelPlayAdInfo) => void;      
}