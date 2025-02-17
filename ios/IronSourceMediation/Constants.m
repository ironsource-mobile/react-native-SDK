#import "Constants.h"

@implementation Constants
NSString *const E_ILLEGAL_ARGUMENT = @"E_ILLEGAL_ARGUMENT";
#pragma mark - Ad Units
NSString *const REWARDED_VIDEO = @"REWARDED_VIDEO";
NSString *const INTERSTITIAL = @"INTERSTITIAL";
NSString *const BANNER = @"BANNER";
NSString *const NATIVE_AD = @"NATIVE_AD";
#pragma mark - ARM ImpressionDataDelegate Constant
NSString *const ON_IMPRESSION_SUCCESS = @"onImpressionSuccess";
#pragma mark - ISConsentViewDelegate Constants
NSString *const CONSENT_VIEW_DID_LOAD_SUCCESS = @"consentViewDidLoadSuccess";
NSString *const CONSENT_VIEW_DID_FAIL_TO_LOAD = @"consentViewDidFailToLoad";
NSString *const CONSENT_VIEW_DID_SHOW_SUCCESS = @"consentViewDidShowSuccess";
NSString *const CONSENT_VIEW_DID_FAIL_TO_SHOW = @"consentViewDidFailToShow";
NSString *const CONSENT_VIEW_DID_ACCEPT = @"consentViewDidAccept";
#pragma mark - ISInitializationDelegate Constant
NSString *const ON_INITIALIZATION_COMPLETE = @"initializationDidComplete";
#pragma mark - LevelPlayListener Constants
#pragma mark - LevelPlay RV
NSString *const LP_RV_ON_AD_AVAILABLE   = @"LevelPlay:RV:onAdAvailable";
NSString *const LP_RV_ON_AD_UNAVAILABLE = @"LevelPlay:RV:onAdUnavailable";
NSString *const LP_RV_ON_AD_OPENED      = @"LevelPlay:RV:onAdOpened";
NSString *const LP_RV_ON_AD_CLOSED      = @"LevelPlay:RV:onAdClosed";
NSString *const LP_RV_ON_AD_REWARDED    = @"LevelPlay:RV:onAdRewarded";
NSString *const LP_RV_ON_AD_SHOW_FAILED = @"LevelPlay:RV:onAdShowFailed";
NSString *const LP_RV_ON_AD_CLICKED     = @"LevelPlay:RV:onAdClicked";
#pragma mark - LevelPlay Manual RV
NSString *const LP_MANUAL_RV_ON_AD_READY       = @"LevelPlay:ManualRV:onAdReady";
NSString *const LP_MANUAL_RV_ON_AD_LOAD_FAILED = @"LevelPlay:ManualRV:onAdLoadFailed";
#pragma mark - LevelPlay IS
NSString *const LP_IS_ON_AD_READY          = @"LevelPlay:IS:onAdReady";
NSString *const LP_IS_ON_AD_LOAD_FAILED    = @"LevelPlay:IS:onAdLoadFailed";
NSString *const LP_IS_ON_AD_OPENED         = @"LevelPlay:IS:onAdOpened";
NSString *const LP_IS_ON_AD_CLOSED         = @"LevelPlay:IS:onAdClosed";
NSString *const LP_IS_ON_AD_SHOW_FAILED    = @"LevelPlay:IS:onAdShowFailed";
NSString *const LP_IS_ON_AD_CLICKED        = @"LevelPlay:IS:onAdClicked";
NSString *const LP_IS_ON_AD_SHOW_SUCCEEDED = @"LevelPlay:IS:onAdShowSucceeded";
#pragma mark - LevelPlay BN
NSString *const LP_BN_ON_AD_LOADED           = @"LevelPlay:BN:onAdLoaded";
NSString *const LP_BN_ON_AD_LOAD_FAILED      = @"LevelPlay:BN:onAdLoadFailed";
NSString *const LP_BN_ON_AD_CLICKED          = @"LevelPlay:BN:onAdClicked";
NSString *const LP_BN_ON_AD_SCREEN_PRESENTED = @"LevelPlay:BN:onAdScreenPresented";
NSString *const LP_BN_ON_AD_SCREEN_DISMISSED = @"LevelPlay:BN:onAdScreenDismissed";
NSString *const LP_BN_ON_AD_LEFT_APPLICATION = @"LevelPlay:BN:onAdLeftApplication";
#pragma mark - LevelPlay Init
NSString *const ON_INIT_FAILED               = @"onInitFailed";
NSString *const ON_INIT_SUCCESS              = @"onInitSuccess";
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
