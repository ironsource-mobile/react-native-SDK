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
- (void)loadInterstitialAd:(NSNumber *)adObjectId adUnitId:(NSString *)adUnitId eventEmitter:(RCTEventEmitter *)eventEmitter;
- (void)showInterstitialAd:(NSNumber *)adObjectId placementName:(NSString *)placementName rootViewController:(UIViewController *_Nonnull)rootViewController;
- (BOOL)isInterstitialAdReady:(NSNumber *)adObjectId;
- (void)removeAd:(NSNumber *)adObjectId;
- (void)removeAllAds;

@end
