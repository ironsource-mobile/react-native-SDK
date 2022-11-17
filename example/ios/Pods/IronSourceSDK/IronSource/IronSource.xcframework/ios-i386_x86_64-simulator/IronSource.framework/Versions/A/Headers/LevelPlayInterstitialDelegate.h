//
//  LevelPlayInterstitialDelegate.h
//  IronSource
//
//  Created by Hadar Pur on 23/03/2022.
//  Copyright © 2022 IronSource. All rights reserved.
//

#ifndef LevelPlayInterstitialDelegate_h
#define LevelPlayInterstitialDelegate_h

#import "ISAdInfo.h"

@protocol LevelPlayInterstitialDelegate <NSObject>

@required
/**
 Called after an interstitial has been loaded
 @param adInfo The info of the ad.
 */
- (void)didLoadWithAdInfo:(ISAdInfo *)adInfo;

/**
 Called after an interstitial has attempted to load but failed.
 @param error The reason for the error
 */
- (void)didFailToLoadWithError:(NSError *)error;

/**
 Called after an interstitial has been opened.
 @param adInfo The info of the ad.
 */
- (void)didOpenWithAdInfo:(ISAdInfo *)adInfo;

/**
 Called after an interstitial has been displayed on the screen.
 @param adInfo The info of the ad.
 */
- (void)didShowWithAdInfo:(ISAdInfo *)adInfo;

/**
 Called after an interstitial has attempted to show but failed.
 @param error The reason for the error
 @param adInfo The info of the ad.
 */
- (void)didFailToShowWithError:(NSError *)error andAdInfo:(ISAdInfo *)adInfo;

/**
 Called after an interstitial has been clicked.
 @param adInfo The info of the ad.
 */
- (void)didClickWithAdInfo:(ISAdInfo *)adInfo;

/**
 Called after an interstitial has been dismissed.
 @param adInfo The info of the ad.
 */
- (void)didCloseWithAdInfo:(ISAdInfo *)adInfo;

@end

#endif /* LevelPlayInterstitialDelegate_h */
