//
//  LevelPlayRewardedVideoDelegate.h
//  IronSource
//
//  Created by Hadar Pur on 31/05/2022.
//  Copyright © 2022 IronSource. All rights reserved.
//

#ifndef LevelPlayRewardedVideoDelegate_h
#define LevelPlayRewardedVideoDelegate_h

#import "ISAdInfo.h"

@protocol LevelPlayRewardedVideoDelegate <LevelPlayRewardedVideoBaseDelegate>

@required

/**
 Called after a rewarded video has changed its availability to true.
 @param adInfo The info of the ad.
 */
- (void)hasAvailableAdWithAdInfo:(ISAdInfo *)adInfo;

/**
 Called after a rewarded video has changed its availability to false.
 */
- (void)hasNoAvailableAd;

@end

#endif /* LevelPlayRewardedVideoDelegate_h */

