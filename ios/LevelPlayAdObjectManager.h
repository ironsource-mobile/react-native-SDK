#import <Foundation/Foundation.h>
#import <IronSource/IronSource.h>
#import <React/RCTEventEmitter.h>

@interface LevelPlayAdObjectManager : NSObject

- (instancetype)init;
- (NSString *)createInterstitialAd:(NSString *)adUnitId bidFloor:(NSNumber *)bidFloor eventEmitter:(RCTEventEmitter *)eventEmitter;
- (void)loadInterstitialAd:(NSString *)adId;
- (void)showInterstitialAd:(NSString *)adId placementName:(NSString *)placementName rootViewController:(UIViewController *_Nonnull)rootViewController;
- (BOOL)isInterstitialAdReady:(NSString *)adId;
- (NSString *)createRewardedAd:(NSString *)adUnitId bidFloor:(NSNumber *)bidFloor eventEmitter:(RCTEventEmitter *)eventEmitter;
- (void)loadRewardedAd:(NSString *)adId;
- (void)showRewardedAd:(NSString *)adId placementName:(NSString *)placementName rootViewController:(UIViewController *_Nonnull)rootViewController;
- (BOOL)isRewardedAdReady:(NSString *)adId;
- (void)removeAd:(NSString *)adId;
- (void)removeAllAds;

@end
