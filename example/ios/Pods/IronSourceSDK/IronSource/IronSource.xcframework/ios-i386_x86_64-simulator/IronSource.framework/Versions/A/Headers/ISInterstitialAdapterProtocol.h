//
//  ISInterstitialAdapterProtocol.h
//  IronSource
//
//  Created by Roni Parshani on 10/12/14.
//  Copyright (c) 2014 IronSource. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <UIKit/UIKit.h>
#import "ISInterstitialAdapterDelegate.h"

@class ISAdapterConfig;
@protocol ISInterstitialAdapterProtocol <NSObject>

@optional

- (void)showInterstitialWithViewController:(UIViewController *)viewController
                             adapterConfig:(ISAdapterConfig *)adapterConfig
                                  delegate:(id<ISInterstitialAdapterDelegate>)delegate;

- (BOOL)hasInterstitialWithAdapterConfig:(ISAdapterConfig *)adapterConfig;



#pragma mark - for traditional, non bidders, demand only
- (void)initInterstitialWithUserId:(NSString *)userId
                     adapterConfig:(ISAdapterConfig *)adapterConfig
                          delegate:(id<ISInterstitialAdapterDelegate>)delegate;

- (void)loadInterstitialWithAdapterConfig:(ISAdapterConfig *)adapterConfig
                                 delegate:(id<ISInterstitialAdapterDelegate>)delegate;


#pragma mark - for bidders - mediation and demand only

- (NSDictionary *)getInterstitialBiddingDataWithAdapterConfig:(ISAdapterConfig *)adapterConfig;


- (void)initInterstitialForBiddingWithUserId:(NSString *)userId
                               adapterConfig:(ISAdapterConfig *)adapterConfig
                                    delegate:(id<ISInterstitialAdapterDelegate>)delegate;

- (void)loadInterstitialForBiddingWithServerData:(NSString *)serverData
                                   adapterConfig:(ISAdapterConfig *)adapterConfig
                                        delegate:(id<ISInterstitialAdapterDelegate>)delegate;



@end
