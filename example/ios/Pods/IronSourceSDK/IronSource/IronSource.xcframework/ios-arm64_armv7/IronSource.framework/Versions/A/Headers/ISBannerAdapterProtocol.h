//
//  ISBannerAdapterProtocol.h
//  IronSource
//
//  Created by Pnina Rapoport on 02/04/2017.
//  Copyright © 2017 IronSource. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <UIKit/UIKit.h>
#import "ISBannerAdapterDelegate.h"
#import "ISBannerSize.h"

@class ISAdapterConfig;
@protocol ISBannerAdapterProtocol <NSObject>

@optional

- (void)initBannerWithUserId:(nonnull NSString *)userId
               adapterConfig:(nonnull ISAdapterConfig *)adapterConfig
                    delegate:(nonnull id<ISBannerAdapterDelegate>)delegate;

- (void)loadBannerWithViewController:(nonnull UIViewController *)viewController
                                size:(nonnull ISBannerSize *)size
                       adapterConfig:(nonnull ISAdapterConfig *)adapterConfig
                            delegate:(nonnull id <ISBannerAdapterDelegate>)delegate;

- (void)reloadBannerWithAdapterConfig:(nonnull ISAdapterConfig *)adapterConfig
                             delegate:(nonnull id <ISBannerAdapterDelegate>)delegate;

- (BOOL)shouldBindBannerViewOnReload;

- (void)destroyBannerWithAdapterConfig:(nonnull ISAdapterConfig *)adapterConfig;

- (void)releaseMemoryWithAdapterConfig:(nonnull ISAdapterConfig *)adapterConfig;


#pragma mark - for bidders - mediation and demand only

- (nonnull NSDictionary *)getBannerBiddingDataWithAdapterConfig:(nonnull ISAdapterConfig *)adapterConfig;


- (void)initBannerForBiddingWithUserId:(nonnull NSString *)userId
                               adapterConfig:(nonnull ISAdapterConfig *)adapterConfig
                                    delegate:(nonnull id<ISBannerAdapterDelegate>)delegate;

- (void)loadBannerForBiddingWithServerData:(nonnull NSString *)serverData
                            viewController:(nonnull UIViewController *)viewController
                                      size:(nonnull ISBannerSize *)size
                             adapterConfig:(nonnull ISAdapterConfig *)adapterConfig
                                  delegate:(nonnull id <ISBannerAdapterDelegate>)delegate;


@end
