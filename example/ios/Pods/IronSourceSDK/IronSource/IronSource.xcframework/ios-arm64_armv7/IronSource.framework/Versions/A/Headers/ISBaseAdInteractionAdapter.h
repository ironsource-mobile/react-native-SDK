//
//  ISBaseAdInteractionAdapter.h
//  IronSource
//
//  Created by Yonti Makmel on 11/10/2021.
//  Copyright © 2021 IronSource. All rights reserved.
//


#import "ISBaseAdAdapter.h"
#import "ISAdapterAdInteractionDelegate.h"

NS_ASSUME_NONNULL_BEGIN

@protocol ISBaseAdInteractionAdapterProtocol <NSObject>

/// show the ad
/// @param viewController  current viewController for showing the ad
/// @param adData data containing the configuration passed from the server and other related parameters passed from the publisher like userId
/// @param delegate the callback listener
- (void)showAdWithViewController:(UIViewController *)viewController
                          adData:(ISAdData*)adData
                        delegate:(id<ISAdapterAdInteractionDelegate>)delegate;

/// returning whether the ad is available or not
/// @param adData data containing the configuration passed from the server and other related parameters passed from the publisher like userId
- (BOOL)isAdAvailableWithAdData:(ISAdData*)adData;

@end

@interface ISBaseAdInteractionAdapter : ISBaseAdAdapter<ISBaseAdInteractionAdapterProtocol>

@end

NS_ASSUME_NONNULL_END
