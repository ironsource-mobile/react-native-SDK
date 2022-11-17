//
//  ISRewardedVideoManualDelegate.h
//  IronSource
//
//  Created by Guy Lis on 03/10/2021.
//  Copyright © 2021 IronSource. All rights reserved.
//

#ifndef ISRewardedVideoManualDelegate_h
#define ISRewardedVideoManualDelegate_h

@protocol ISRewardedVideoManualDelegate <ISRewardedVideoDelegate>

@required

/**
 Called after an rewarded video has been loaded in manual mode
 */
- (void)rewardedVideoDidLoad;

/**
 Called after a rewarded video has attempted to load but failed in manual mode

 @param error The reason for the error
 */
- (void)rewardedVideoDidFailToLoadWithError:(NSError *)error;

@end

#endif /* ISRewardedVideoManualDelegate_h */
