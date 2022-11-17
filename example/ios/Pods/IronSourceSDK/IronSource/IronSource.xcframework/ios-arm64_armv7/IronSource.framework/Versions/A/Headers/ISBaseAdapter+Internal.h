
//
//  ISBaseAdapter+Internal.h
//  IronSource
//
//  Created by Yotam Ohayon on 01/03/2016.
//  Copyright © 2016 IronSource. All rights reserved.
//

#ifndef ISBaseAdapter_Internal_h
#define ISBaseAdapter_Internal_h

#import "ISBaseAdapter.h"
#import "ISAdapterLoggerProtocol.h"
#import "ISAdapterDispatcherProtocol.h"

#import "ISRewardedVideoAdapterDelegate.h"
#import "ISInterstitialAdapterDelegate.h"
#import "ISBannerAdapterDelegate.h"
#import "ISOfferwallAdapterDelegate.h"

#import "ISConfigurations.h"
#import "ISMetaDataUtils.h"
#import "ISMetaDataConstants.h"

#import "ISError.h"
#import "Environment/ConcurrentMutableSet.h"
#import "Environment/ConcurrentMutableDictionary.h"
#import "ISNetworkInitCallbackProtocol.h"
#import "ISLog.h"

@protocol ISNetworkInitCallbackProtocol;

@interface ISBaseAdapter () 

@property (nonatomic, strong) id<ISAdapterLoggerProtocol> logger;
@property (nonatomic, strong) id<ISAdapterDispatcherProtocol> dispatcher;

@property (weak,   nonatomic, readonly) id<ISBannerAdapterDelegate> bannerActiveDelegate;
@property (strong, nonatomic, readonly) NSHashTable *bannerDelegates;
@property (strong, nonatomic, readonly) NSOperationQueue *bnDelegateQueue;
@property (strong, nonatomic, readonly) NSMapTable *bannerDelegateMapHolders;

@property (strong, nonatomic, readonly) NSHashTable *interstitialDelegates;
@property (strong, nonatomic, readonly) NSMapTable *interstitialDelegateMapHolders;

@property (strong, nonatomic, readonly) NSHashTable *rewardedVideoDelegates;
@property (strong, nonatomic, readonly) NSMapTable *rewardedVideoDelegateMapHolders;

#pragma mark - Banner
- (BOOL)shouldBindBannerViewOnReload;

//TODO why are we using this for applovin?
- (void)notifyBannerDidFailToLoadWithError:(NSError *)error forDelegate:(id<ISBannerAdapterDelegate>)delegate ;


#pragma mark - Validation
- (BOOL)isConfigValueValid:(NSString *)value;
- (NSError *)errorForMissingCredentialFieldWithName:(NSString *)fieldName;
    
#pragma mark - Private
- (UIViewController *) topMostController;
- (void)setMediationState:(NSInteger)state forAdUnit:(NSString *)adUnit;
- (void)setConsent:(BOOL)consent;

- (void)setMetaDataWithKey:(NSString *)key value:(NSString *)value __attribute__((deprecated("This method has been deprecated and won’t be included in future versions. Please use setMetaDataWithKey:andValues: instead.")));

- (void)setMetaDataWithKey:(NSString *)key andValues:(NSMutableArray *) values;

@end

#endif /* ISBaseAdapter_Internal_h */

