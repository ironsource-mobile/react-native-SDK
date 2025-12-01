#import <Foundation/Foundation.h>

/// Global Constants
@interface LevelPlayConstants : NSObject
#pragma mark - ErrorCodes
extern NSString *const E_ILLEGAL_ARGUMENT;
#pragma mark - LevelPlay Init
extern NSString *const ON_INIT_FAILED;
extern NSString *const ON_INIT_SUCCESS;
#pragma mark - LevelPlay ImpressionData
extern NSString *const ON_IMPRESSION_SUCCESS;
#pragma mark - LevelPlay Interstitial Ad
extern NSString *const ON_INTERSTITIAL_AD_LOADED;
extern NSString *const ON_INTERSTITIAL_AD_LOAD_FAILED;
extern NSString *const ON_INTERSTITIAL_AD_INFO_CHANGED;
extern NSString *const ON_INTERSTITIAL_AD_DISPLAYED;
extern NSString *const ON_INTERSTITIAL_AD_DISPLAY_FAILED;
extern NSString *const ON_INTERSTITIAL_AD_CLICKED;
extern NSString *const ON_INTERSTITIAL_AD_CLOSED;
#pragma mark - LevelPlay Rewarded Ad
extern NSString *const ON_REWARDED_AD_LOADED;
extern NSString *const ON_REWARDED_AD_LOAD_FAILED;
extern NSString *const ON_REWARDED_AD_INFO_CHANGED;
extern NSString *const ON_REWARDED_AD_DISPLAYED;
extern NSString *const ON_REWARDED_AD_DISPLAY_FAILED;
extern NSString *const ON_REWARDED_AD_CLICKED;
extern NSString *const ON_REWARDED_AD_CLOSED;
extern NSString *const ON_REWARDED_AD_REWARDED;
@end
