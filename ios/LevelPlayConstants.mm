#import "LevelPlayConstants.h"

@implementation LevelPlayConstants
NSString *const E_ILLEGAL_ARGUMENT = @"E_ILLEGAL_ARGUMENT";
#pragma mark - LevelPlay Init
NSString *const ON_INIT_FAILED               = @"onInitFailed";
NSString *const ON_INIT_SUCCESS              = @"onInitSuccess";
#pragma mark - LevelPlay ImpressionData
NSString *const ON_IMPRESSION_SUCCESS        = @"onImpressionSuccess";
#pragma mark - LevelPlay Interstitial Ad
NSString *const ON_INTERSTITIAL_AD_LOADED                   = @"onInterstitialAdLoaded";
NSString *const ON_INTERSTITIAL_AD_LOAD_FAILED              = @"onInterstitialAdLoadFailed";
NSString *const ON_INTERSTITIAL_AD_INFO_CHANGED             = @"onInterstitialAdInfoChanged";
NSString *const ON_INTERSTITIAL_AD_DISPLAYED                = @"onInterstitialAdDisplayed";
NSString *const ON_INTERSTITIAL_AD_DISPLAY_FAILED           = @"onInterstitialAdDisplayFailed";
NSString *const ON_INTERSTITIAL_AD_CLICKED                  = @"onInterstitialAdClicked";
NSString *const ON_INTERSTITIAL_AD_CLOSED                   = @"onInterstitialAdClosed";
#pragma mark - LevelPlay Rewarded Ad
NSString *const ON_REWARDED_AD_LOADED                   = @"onRewardedAdLoaded";
NSString *const ON_REWARDED_AD_LOAD_FAILED              = @"onRewardedAdLoadFailed";
NSString *const ON_REWARDED_AD_INFO_CHANGED             = @"onRewardedAdInfoChanged";
NSString *const ON_REWARDED_AD_DISPLAYED                = @"onRewardedAdDisplayed";
NSString *const ON_REWARDED_AD_DISPLAY_FAILED           = @"onRewardedAdDisplayFailed";
NSString *const ON_REWARDED_AD_CLICKED                  = @"onRewardedAdClicked";
NSString *const ON_REWARDED_AD_CLOSED                   = @"onRewardedAdClosed";
NSString *const ON_REWARDED_AD_REWARDED                 = @"onRewardedAdRewarded";
@end
