//
//  ISRewardedVideoAdapterDelegate.h
//  IronSource
//
//  Created by Roni Parshani on 10/12/14.
//  Copyright (c) 2014 IronSource. All rights reserved.
//

#import <Foundation/Foundation.h>

@protocol ISRewardedVideoAdapterDelegate <NSObject>


- (void)adapterRewardedVideoHasChangedAvailability:(BOOL)available;

- (void)adapterRewardedVideoDidFailToLoadWithError:(NSError *)error;

- (void)adapterRewardedVideoDidReceiveReward;

- (void)adapterRewardedVideoDidFailToShowWithError:(NSError *)error;

- (void)adapterRewardedVideoDidOpen;

- (void)adapterRewardedVideoDidClose;


#pragma mark - demand only

- (void)adapterRewardedVideoDidLoad;

#pragma mark - optional - when supported by network

- (void)adapterRewardedVideoDidClick;

- (void)adapterRewardedVideoDidStart;

- (void)adapterRewardedVideoDidEnd;

#pragma mark -  relevant only for bidding

- (void)adapterRewardedVideoInitSuccess;

- (void)adapterRewardedVideoInitFailed:(NSError *)error;

#pragma mark -  relevant only for ironsource adapter

- (void)adapterRewardedVideoDidBecomeVisible;

@end
