//
//  LevelPlayBannerDelegate.h
//  IronSource
//
//  Created by Hadar Pur on 23/03/2022.
//  Copyright © 2022 IronSource. All rights reserved.
//

#ifndef LevelPlayBannerDelegate_h
#define LevelPlayBannerDelegate_h

#import "ISBannerView.h"
#import "ISAdInfo.h"

@protocol LevelPlayBannerDelegate <NSObject>

@required
/**
 Called after a banner ad has been successfully loaded
 @param adInfo The info of the ad.
 */
- (void)didLoad:(ISBannerView *)bannerView withAdInfo:(ISAdInfo *)adInfo;

/**
 Called after a banner has attempted to load an ad but failed.
 @param error The reason for the error
 */
- (void)didFailToLoadWithError:(NSError *)error;

/**
 Called after a banner has been clicked.
 @param adInfo The info of the ad.
 */
- (void)didClickWithAdInfo:(ISAdInfo *)adInfo;

/**
 Called when a user was taken out of the application context.
 @param adInfo The info of the ad.
 */
- (void)didLeaveApplicationWithAdInfo:(ISAdInfo *)adInfo;

/**
 Called when a banner presented a full screen content.
 @param adInfo The info of the ad.
 */
- (void)didPresentScreenWithAdInfo:(ISAdInfo *)adInfo;

/**
 Called after a full screen content has been dismissed.
 @param adInfo The info of the ad.
 */
- (void)didDismissScreenWithAdInfo:(ISAdInfo *)adInfo;

@end

#endif /* LevelPlayBannerDelegate_h */
