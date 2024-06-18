import type {IronSourceAdInfo} from "../IronSourceAdInfo";
import type {IronSourceError} from "../errors";

// Interface for handling LevelPlayBanner events
export interface LevelPlayBannerListener {
    /**
     * Invoked each time a banner was loaded. Either on refresh, or manual load.
     * [adInfo] includes information about the loaded ad
     * 
     * Android: onAdLoaded
     *     iOS: didLoad
     */
    onAdLoaded?: (adInfo: IronSourceAdInfo) => void;
    /**
     * Invoked when the banner loading process has failed.
     * This callback will be sent both for manual load and refreshed banner failures.
     * [error] includes information about the error 
     * 
     * Android: onAdLoadFailed
     *     iOS: didFailToLoadWithError
     */
    onAdLoadFailed?: (error: IronSourceError) => void;
    /**
     * Invoked when end user clicks on the banner ad.
     * [adInfo] includes information about the loaded ad
     * 
     * Android: onAdClicked
     *     iOS: didClickWithAdInfo
     */    
    onAdClicked?: (adInfo: IronSourceAdInfo) => void;
    /**
     * Notifies the presentation of a full screen content following user click.
     * [adInfo] includes information about the loaded ad
     * 
     * Android: onAdScreenPresented
     *     iOS: didPresentScreenWithAdInfo
     */    
    onAdScreenPresented?: (adInfo: IronSourceAdInfo) => void;
    /**
     * Notifies the presented screen has been dismissed.
     * [adInfo] includes information about the loaded ad
     * 
     * Android: onAdScreenDismissed
     *     iOS: didDismissScreenWithAdInfo
     */  
    onAdScreenDismissed?: (adInfo: IronSourceAdInfo) => void;  
    /**
     *Invoked when the user left the app.
     * [adInfo] includes information about the loaded ad
     * 
     * Android: onAdLeftApplication
     *     iOS: didLeaveApplicationWithAdInfo
     */  
    onAdLeftApplication?: (adInfo: IronSourceAdInfo) => void;      
}