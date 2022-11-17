//
//  ISBannerAdapterDelegate.h
//  IronSource
//
//  Created by Pnina Rapoport on 02/04/2017.
//  Copyright © 2017 Supersonic. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <UIKit/UIKit.h>

@protocol ISBannerAdapterDelegate <NSObject>

@required

- (void)adapterBannerInitSuccess;

- (void)adapterBannerInitFailedWithError:(NSError *)error;

- (void)adapterBannerDidLoad:(UIView *)bannerView;

- (void)adapterBannerDidFailToLoadWithError:(NSError *)error;

- (void)adapterBannerDidClick;

#pragma mark - optional - when supported by network

- (void)adapterBannerWillPresentScreen;

- (void)adapterBannerDidDismissScreen;

- (void)adapterBannerWillLeaveApplication;

- (void)adapterBannerDidShow;


@end
