//
//  ISOfferwallAdapterProtocol.h
//  IronSource
//
//  Created by Roni Parshani on 10/12/14.
//  Copyright (c) 2014 IronSource. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <UIKit/UIKit.h>
#import "ISOfferwallAdapterDelegate.h"

@class ISAdapterConfig;
@protocol ISOfferwallAdapterProtocol <NSObject>

@optional

- (void)initOfferWallWithUserId:(NSString *)userId
                  adapterConfig:(ISAdapterConfig *)adapterConfig
                       delegate:(id<ISOfferwallAdapterDelegate>)delegate;

- (void)showOfferwallWithViewController:(UIViewController *)viewController
                              placement:(NSString *)placementName;

- (void)getOfferWallCreditsWithUserId:(NSString *)userId;

- (BOOL)hasOfferwall;

@end
