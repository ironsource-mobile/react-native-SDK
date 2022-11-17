//
//  LevelPlayRewardedVideoManualDelegate.h
//  IronSource
//
//  Created by Hadar Pur on 23/03/2022.
//  Copyright © 2022 IronSource. All rights reserved.
//

#ifndef LevelPlayRewardedVideoManualDelegate_h
#define LevelPlayRewardedVideoManualDelegate_h

#import "ISAdInfo.h"

@protocol LevelPlayRewardedVideoManualDelegate <LevelPlayRewardedVideoBaseDelegate>

@required

/**
 Called after an rewarded video has been loaded in manual mode
 @param adInfo The info of the ad.
 */
- (void)didLoadWithAdInfo:(ISAdInfo *)adInfo;

/**
 Called after a rewarded video has attempted to load but failed in manual mode

 @param error The reason for the error
 */
- (void)didFailToLoadWithError:(NSError *)error;

@end

#endif /* LevelPlayRewardedVideoManualDelegate_h */
