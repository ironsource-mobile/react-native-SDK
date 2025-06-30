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

@property (nonatomic, strong) NSMutableDictionary<NSString *, LPMInterstitialAd *> *interstitialAdsDict;
@property (nonatomic, strong) NSMutableDictionary<NSString *, LevelPlayInterstitialAdDelegate *> *interstitialDelegatesDict;
@property (nonatomic, strong) NSMutableDictionary<NSString *, LPMRewardedAd *> *rewardedAdsDict;
@property (nonatomic, strong) NSMutableDictionary<NSString *, LevelPlayRewardedAdDelegate *> *rewardedDelegatesDict;

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
-(NSString *) createInterstitialAd: (NSString *)adUnitId eventEmitter:(RCTEventEmitter *)eventEmitter{
  // Create the interstitial ad
  LPMInterstitialAd *interstitialAd = [[LPMInterstitialAd alloc] initWithAdUnitId:adUnitId];
  if (!interstitialAd) {
    NSLog(@"Failed to create interstitial ad with adUnitId: %@", adUnitId);
    return nil;
  }

  if (!interstitialAd.adId) {
    NSLog(@"Generated adId is nil for adUnitId: %@", adUnitId);
    return nil;
  }

  // Set the listener
  LevelPlayInterstitialAdDelegate *interstitialAdDelegate = [[LevelPlayInterstitialAdDelegate alloc]
                                                          initWithAdId:interstitialAd.adId
                                                          eventEmitter:eventEmitter];
  [interstitialAd setDelegate:interstitialAdDelegate];

  // Store references
  self.interstitialDelegatesDict[interstitialAd.adId] = interstitialAdDelegate;
  self.interstitialAdsDict[interstitialAd.adId] = interstitialAd;
  // Return the adId
  return interstitialAd.adId;
}



- (void)loadInterstitialAd:(NSString *)adId adUnitId:(NSString *)adUnitId eventEmitter:(RCTEventEmitter *)eventEmitter {
  //Retrieve the interstitial ad object from dictionary using the adId
  LPMInterstitialAd *interstitialAd = [self.interstitialAdsDict objectForKey:adId];
  // Only attempt to load the ad if an ad object was retrived successfully
  if (interstitialAd) {
      [interstitialAd loadAd];
  }
}

- (void)showInterstitialAd:(NSString *)adId placementName:(NSString *)placementName rootViewController:(UIViewController *_Nonnull)rootViewController {
    LPMInterstitialAd *interstitialAd = [self.interstitialAdsDict objectForKey:adId];
    // Check if the interstitialAd exists before attempting to show it
    if (interstitialAd != nil) {
        [interstitialAd showAdWithViewController:rootViewController placementName:placementName];
    }
}


- (BOOL)isInterstitialAdReady:(NSString *)adId {
    LPMInterstitialAd *interstitialAd = [self.interstitialAdsDict objectForKey:adId];
    // Check if the ad exists and then return its ready state, otherwise return NO
    if (interstitialAd != nil) {
        return [interstitialAd isAdReady];
    }
    return NO;
}

// Rewarded Ad Methods
-(NSString *) createRewardedAd: (NSString *)adUnitId eventEmitter:(RCTEventEmitter *)eventEmitter{
  // Create the rewarded ad
  LPMRewardedAd *rewardedAd = [[LPMRewardedAd alloc] initWithAdUnitId:adUnitId];
  if (!rewardedAd) {
    NSLog(@"Failed to create rewarded ad with adUnitId: %@", adUnitId);
    return nil;
  }

  if (!rewardedAd.adId) {
    NSLog(@"Generated adId is nil for adUnitId: %@", adUnitId);
    return nil;
  }

  // Set the listener
  LevelPlayRewardedAdDelegate *rewardedAdDelegate = [[LevelPlayRewardedAdDelegate alloc]
                                                          initWithAdId:rewardedAd.adId
                                                          eventEmitter:eventEmitter];
  [rewardedAd setDelegate:rewardedAdDelegate];

  // Store references
  self.rewardedDelegatesDict[rewardedAd.adId] = rewardedAdDelegate;
  self.rewardedAdsDict[rewardedAd.adId] = rewardedAd;
  // Return the adId
  return rewardedAd.adId;
}
- (void)loadRewardedAd:(NSString *)adId adUnitId:(NSString *)adUnitId eventEmitter:(RCTEventEmitter *)eventEmitter {
  //Retrieve the rewarded ad object from dictionary using the adId
  LPMRewardedAd *rewardedAd = [self.rewardedAdsDict objectForKey:adId];
  // Only attempt to load the ad if an ad object was retrieved successfully
  if (rewardedAd) {
      [rewardedAd loadAd];
  }
}

- (void)showRewardedAd:(NSString *)adId placementName:(NSString *)placementName rootViewController:(UIViewController *_Nonnull)rootViewController {
    LPMRewardedAd *rewardedAd = [self.rewardedAdsDict objectForKey:adId];
  // Check if the rewardedAd exists before attempting to show it
  if (rewardedAd != nil) {
      [rewardedAd showAdWithViewController:rootViewController placementName:placementName];
  }
}

- (BOOL)isRewardedAdReady:(NSString *)adId {
  LPMRewardedAd *rewardedAd = [self.rewardedAdsDict objectForKey:adId];
  // Check if the ad exists and then return its ready state, otherwise return NO
  if (rewardedAd != nil) {
    return [rewardedAd isAdReady];
  }
  return NO;
}
// Shared Methods

- (void)removeAd:(NSString *)adId {
    if ([self.interstitialAdsDict objectForKey:adId] != nil) {
        [self.interstitialAdsDict removeObjectForKey:adId];
        [self.interstitialDelegatesDict removeObjectForKey:adId];
    }
    if ([self.rewardedAdsDict objectForKey:adId] != nil) {
        [self.rewardedAdsDict removeObjectForKey:adId];
        [self.rewardedDelegatesDict removeObjectForKey:adId];
    }
}

- (void)removeAllAds {
    [self.interstitialAdsDict removeAllObjects];
    [self.interstitialDelegatesDict removeAllObjects];
    [self.rewardedAdsDict removeAllObjects];
    [self.rewardedDelegatesDict removeAllObjects];
}

@end
