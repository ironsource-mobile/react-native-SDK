//
//  LevelPlayRewardedVideoBaseDelegate.h
//  IronSource
//
//  Created by Hadar Pur on 23/03/2022.
//  Copyright © 2022 IronSource. All rights reserved.
//

#ifndef LevelPlayRewardedVideoBaseDelegate_h
#define LevelPlayRewardedVideoBaseDelegate_h

#import "ISAdInfo.h"

@class ISPlacementInfo;

@protocol LevelPlayRewardedVideoBaseDelegate <NSObject>

@required

/**
 Called after a rewarded video has been viewed completely and the user is eligible for a reward.
 @param placementInfo An object that contains the placement's reward name and amount.
 @param adInfo The info of the ad.
 */
- (void)didReceiveRewardForPlacement:(ISPlacementInfo *)placementInfo withAdInfo:(ISAdInfo *)adInfo;

/**
 Called after a rewarded video has attempted to show but failed.
 @param error The reason for the error
 @param adInfo The info of the ad.
 */
- (void)didFailToShowWithError:(NSError *)error andAdInfo:(ISAdInfo *)adInfo;

/**
 Called after a rewarded video has been opened.
 @param adInfo The info of the ad.
 */
- (void)didOpenWithAdInfo:(ISAdInfo *)adInfo;

/**
 Called after a rewarded video has been clicked.
 @param placementInfo An object that contains the placement's reward name and amount.
 @param adInfo The info of the ad.
 */
- (void)didClick:(ISPlacementInfo *)placementInfo withAdInfo:(ISAdInfo *)adInfo;

/**
 Called after a rewarded video has been dismissed.
 @param adInfo The info of the ad.
 */
- (void)didCloseWithAdInfo:(ISAdInfo *)adInfo;

@end


#endif /* LevelPlayRewardedVideoBaseDelegate_h */
