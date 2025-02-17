//
//  LevelPlayAdObjectManager.m
//  Pods
//
//  Created by Elad Sabag on 10/10/2024.
//

#import "LevelPlayAdObjectManager.h"
#import "LevelPlayInterstitialAdDelegate.h"
#import "LevelPlayRewardedAdDelegate.h"
#import "LevelPlayUtils.h"

@interface LevelPlayAdObjectManager ()

@property (nonatomic, strong) NSMutableDictionary<NSNumber *, LPMInterstitialAd *> *interstitialAdsDict;
@property (nonatomic, strong) NSMutableDictionary<NSNumber *, LevelPlayInterstitialAdDelegate *> *interstitialDelegatesDict;
@property (nonatomic, strong) NSMutableDictionary<NSNumber *, LPMRewardedAd *> *rewardedAdsDict;
@property (nonatomic, strong) NSMutableDictionary<NSNumber *, LevelPlayRewardedAdDelegate *> *rewardedDelegatesDict;

@end

@implementation LevelPlayAdObjectManager

- (instancetype)init {
    self = [super init];
    if (self) {
        _interstitialAdsDict = [NSMutableDictionary dictionary];
        _interstitialDelegatesDict = [NSMutableDictionary dictionary];
        _rewardedAdsDict = [NSMutableDictionary dictionary];
        _rewardedDelegatesDict = [NSMutableDictionary dictionary];
    }
    return self;
}

// Interstitial Ad Methods
- (void)loadInterstitialAd:(NSNumber *)adObjectId adUnitId:(NSString *)adUnitId eventEmitter:(RCTEventEmitter *)eventEmitter {
    // Check if the interstitial ad already exists
    LPMInterstitialAd *existingAd = [self.interstitialAdsDict objectForKey:adObjectId];

    if (existingAd != nil) {
        // Ad exists, load the existing ad
        [existingAd loadAd];
        return;
    }

    // If the ad doesn't exist, create a new interstitial ad instance
    LPMInterstitialAd *interstitialAd = [[LPMInterstitialAd alloc] initWithAdUnitId:adUnitId];
    LevelPlayInterstitialAdDelegate *interstitialAdDelegate = [[LevelPlayInterstitialAdDelegate alloc] initWithAdObjectId:adObjectId.intValue eventEmitter: eventEmitter];
    
    [interstitialAd setDelegate: interstitialAdDelegate];

    // Retain the delegate to ensure it remains in memory
    [self.interstitialDelegatesDict setObject:interstitialAdDelegate forKey:adObjectId];
    // Store the interstitial ad instance
    [self.interstitialAdsDict setObject:interstitialAd forKey:adObjectId];
    // Load the interstitial ad
    [interstitialAd loadAd];
}

- (void)showInterstitialAd:(NSNumber *)adObjectId placementName:(NSString *)placementName rootViewController:(UIViewController *_Nonnull)rootViewController {
    LPMInterstitialAd *interstitialAd = [self.interstitialAdsDict objectForKey:adObjectId];
    // Check if the interstitialAd exists before attempting to show it
    if (interstitialAd != nil) {
        [interstitialAd showAdWithViewController:rootViewController placementName:placementName];
    }
}


- (BOOL)isInterstitialAdReady:(NSNumber *)adObjectId {
    LPMInterstitialAd *interstitialAd = [self.interstitialAdsDict objectForKey:adObjectId];
    // Check if the ad exists and then return its ready state, otherwise return NO
    if (interstitialAd != nil) {
        return [interstitialAd isAdReady];
    }
    return NO;
}

// Rewarded Ad Methods
- (void)loadRewardedAd:(NSNumber *)adObjectId adUnitId:(NSString *)adUnitId eventEmitter:(RCTEventEmitter *)eventEmitter {
    // Check if the rewarded ad already exists
    LPMRewardedAd *existingAd = [self.rewardedAdsDict objectForKey:adObjectId];

    if (existingAd != nil) {
        // Ad exists, load the existing ad
        [existingAd loadAd];
        return;
    }

    // If the ad doesn't exist, create a new rewarded ad instance
    LPMRewardedAd *rewardedAd = [[LPMRewardedAd alloc] initWithAdUnitId:adUnitId];
    LevelPlayRewardedAdDelegate *rewardedAdDelegate = [[LevelPlayRewardedAdDelegate alloc] initWithAdObjectId:adObjectId.intValue eventEmitter: eventEmitter];
    
    [rewardedAd setDelegate: rewardedAdDelegate];

    // Retain the delegate to ensure it remains in memory
    [self.rewardedDelegatesDict setObject:rewardedAdDelegate forKey:adObjectId];
    // Store the interstitial ad instance
    [self.rewardedAdsDict setObject:rewardedAd forKey:adObjectId];
    // Load the interstitial ad
    [rewardedAd loadAd];
}

- (void)showRewardedAd:(NSNumber *)adObjectId placementName:(NSString *)placementName rootViewController:(UIViewController *_Nonnull)rootViewController {
    LPMRewardedAd *rewardedAd = [self.rewardedAdsDict objectForKey:adObjectId];
    // Check if the rewardedAd exists before attempting to show it
    if (rewardedAd != nil) {
        [rewardedAd showAdWithViewController:rootViewController placementName:placementName];
    }
}


- (BOOL)isRewardedAdReady:(NSNumber *)adObjectId {
    LPMRewardedAd *rewardedAd = [self.rewardedAdsDict objectForKey:adObjectId];
    // Check if the ad exists and then return its ready state, otherwise return NO
    if (rewardedAd != nil) {
        return [rewardedAd isAdReady];
    }
    return NO;
}

// Shared Methods

- (void)removeAd:(NSNumber *)adObjectId {
    if ([self.interstitialAdsDict objectForKey:adObjectId] != nil) {
        [self.interstitialAdsDict removeObjectForKey:adObjectId];
        [self.interstitialDelegatesDict removeObjectForKey:adObjectId];
    }
    if ([self.rewardedAdsDict objectForKey:adObjectId] != nil) {
        [self.rewardedAdsDict removeObjectForKey:adObjectId];
        [self.rewardedDelegatesDict removeObjectForKey:adObjectId];
    }
}

- (void)removeAllAds {
    [self.interstitialAdsDict removeAllObjects];
    [self.interstitialDelegatesDict removeAllObjects];
    [self.rewardedAdsDict removeAllObjects];
    [self.rewardedDelegatesDict removeAllObjects];
}

@end
