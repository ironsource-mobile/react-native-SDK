//
//  LevelPlayAdObjectManager.h
//  Pods
//
//  Created by Elad Sabag on 10/10/2024.
//
#import <Foundation/Foundation.h>
#import <IronSource/IronSource.h>
#import <React/RCTEventEmitter.h>

@interface LevelPlayAdObjectManager : NSObject

- (instancetype)init;
- (NSString *)createInterstitialAd:(NSString *)adUnitId eventEmitter:(RCTEventEmitter *)eventEmitter;
- (void)loadInterstitialAd:(NSString *)adId adUnitId:(NSString *)adUnitId eventEmitter:(RCTEventEmitter *)eventEmitter;
- (void)showInterstitialAd:(NSString *)adId placementName:(NSString *)placementName rootViewController:(UIViewController *_Nonnull)rootViewController;
- (BOOL)isInterstitialAdReady:(NSString *)adId;
- (NSString *)createRewardedAd:(NSString *)adUnitId eventEmitter:(RCTEventEmitter *)eventEmitter;
- (void)loadRewardedAd:(NSString *)adId adUnitId:(NSString *)adUnitId eventEmitter:(RCTEventEmitter *)eventEmitter;
- (void)showRewardedAd:(NSString *)adId placementName:(NSString *)placementName rootViewController:(UIViewController *_Nonnull)rootViewController;
- (BOOL)isRewardedAdReady:(NSString *)adId;
- (void)removeAd:(NSString *)adId;
- (void)removeAllAds;

@end
