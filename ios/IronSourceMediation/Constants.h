#import <Foundation/Foundation.h>

/// Global Constants
@interface Constants : NSObject
#pragma mark - ErrorCodes
extern NSString *const E_ILLEGAL_ARGUMENT;
#pragma mark - Ad Units
extern NSString *const REWARDED_VIDEO;
extern NSString *const INTERSTITIAL;
extern NSString *const BANNER;
extern NSString *const NATIVE_AD;
#pragma mark - ARM ImpressionDataDelegate Constant
extern NSString *const ON_IMPRESSION_SUCCESS;
#pragma mark - ISConsentViewDelegate Constants
extern NSString *const CONSENT_VIEW_DID_LOAD_SUCCESS;
extern NSString *const CONSENT_VIEW_DID_FAIL_TO_LOAD;
extern NSString *const CONSENT_VIEW_DID_SHOW_SUCCESS;
extern NSString *const CONSENT_VIEW_DID_FAIL_TO_SHOW;
extern NSString *const CONSENT_VIEW_DID_ACCEPT;
#pragma mark - ISInitializationDelegate Constant
extern NSString *const ON_INITIALIZATION_COMPLETE;
#pragma mark - LevelPlayListener Constants
#pragma mark - LevelPlay RV
extern NSString *const LP_RV_ON_AD_AVAILABLE;
extern NSString *const LP_RV_ON_AD_UNAVAILABLE;
extern NSString *const LP_RV_ON_AD_OPENED;
extern NSString *const LP_RV_ON_AD_CLOSED;
extern NSString *const LP_RV_ON_AD_REWARDED;
extern NSString *const LP_RV_ON_AD_SHOW_FAILED;
extern NSString *const LP_RV_ON_AD_CLICKED;
#pragma mark - LevelPlay Manual RV
extern NSString *const LP_MANUAL_RV_ON_AD_READY;
extern NSString *const LP_MANUAL_RV_ON_AD_LOAD_FAILED;
#pragma mark - LevelPlay IS
extern NSString *const LP_IS_ON_AD_READY;
extern NSString *const LP_IS_ON_AD_LOAD_FAILED;
extern NSString *const LP_IS_ON_AD_OPENED;
extern NSString *const LP_IS_ON_AD_CLOSED;
extern NSString *const LP_IS_ON_AD_SHOW_FAILED;
extern NSString *const LP_IS_ON_AD_CLICKED;
extern NSString *const LP_IS_ON_AD_SHOW_SUCCEEDED;
#pragma mark - LevelPlay BN
extern NSString *const LP_BN_ON_AD_LOADED;
extern NSString *const LP_BN_ON_AD_LOAD_FAILED;
extern NSString *const LP_BN_ON_AD_CLICKED;
extern NSString *const LP_BN_ON_AD_SCREEN_PRESENTED;
extern NSString *const LP_BN_ON_AD_SCREEN_DISMISSED;
extern NSString *const LP_BN_ON_AD_LEFT_APPLICATION;
#pragma mark - LevelPlay Init
extern NSString *const ON_INIT_FAILED;
extern NSString *const ON_INIT_SUCCESS;
#pragma mark - LevelPlay Interstitial Ad
extern NSString *const ON_INTERSTITIAL_AD_LOADED;
extern NSString *const ON_INTERSTITIAL_AD_LOAD_FAILED;
extern NSString *const ON_INTERSTITIAL_AD_INFO_CHANGED;
extern NSString *const ON_INTERSTITIAL_AD_DISPLAYED;
extern NSString *const ON_INTERSTITIAL_AD_DISPLAY_FAILED;
extern NSString *const ON_INTERSTITIAL_AD_CLICKED;
extern NSString *const ON_INTERSTITIAL_AD_CLOSED;
@end
