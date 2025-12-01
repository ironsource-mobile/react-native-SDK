#import "LevelPlayNativeAdViewManagerTemplate.h"

/**
 * Manager class for creating instances of LevelPlayNativeAdView with build-in templates.
 * This manager is responsible for creating instances of LevelPlayNativeAdView and bind their views
 * to the native ad created. The class extend LevelPlayNativeAdViewManager which handles the native ad logic
 * and expose only the method bindNativeAdToView for controlling the view.
 */
@implementation LevelPlayNativeAdViewManagerTemplate

// Template manager - simple NSObject that implements delegate protocol
// Does not extend base manager - just a helper for binding native ad to view

- (void)bindNativeAdToView:(LevelPlayNativeAd *)nativeAd isNativeAdView:(ISNativeAdView *)isNativeAdView {
    // Extract views
    UILabel *titleView = isNativeAdView.adTitleView;
    UILabel *bodyView = isNativeAdView.adBodyView;
    UILabel *advertiserView = isNativeAdView.adAdvertiserView;
    UIButton *callToActionView = isNativeAdView.adCallToActionView;
    UIImageView *iconView = isNativeAdView.adAppIcon;
    LevelPlayMediaView *mediaView = isNativeAdView.adMediaView;

    // Bind native ad to view
    if (nativeAd != nil) {
        if (nativeAd.title != nil) {
            titleView.text = nativeAd.title;
            [isNativeAdView setAdTitleView:titleView];
        }

        if (nativeAd.body != nil) {
            bodyView.text = nativeAd.body;
            [isNativeAdView setAdBodyView:bodyView];
        }

        if (nativeAd.advertiser != nil) {
            advertiserView.text = nativeAd.advertiser;
            [isNativeAdView setAdAdvertiserView:advertiserView];
        }

        if (nativeAd.callToAction != nil) {
            [callToActionView setTitle:nativeAd.callToAction forState:UIControlStateNormal];
            [isNativeAdView setAdCallToActionView:callToActionView];
        }

        if (nativeAd.icon != nil) {
            iconView.image = nativeAd.icon.image;
            [isNativeAdView setAdAppIcon:iconView];
        }

        if (mediaView != nil) {
            [isNativeAdView setAdMediaView:mediaView];
        }

        // Register native ad views with the provided native ad
        [isNativeAdView registerNativeAdViews:nativeAd];
    }

}

@end

