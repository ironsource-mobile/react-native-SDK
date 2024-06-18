#import "NativeAdViewManagerExample.h"

@implementation NativeAdViewManagerExample

RCT_EXPORT_MODULE(ExampleViewType) // View type definition

- (instancetype)init
{
  self = [super initWithDelegate:self layoutName:@"MyCustomNativeAdViewTemplate"];
  return self;
}

- (void)bindNativeAdToView:(LevelPlayNativeAd *)nativeAd isNativeAdView:(ISNativeAdView *)isNativeAdView {
    // Extract views
    UILabel *titleView = isNativeAdView.adTitleView;
    UILabel *bodyView = isNativeAdView.adBodyView;
    UILabel *advertiserView = isNativeAdView.adBodyView;
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
