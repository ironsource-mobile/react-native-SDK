//
//  ISInterstitialAdapterDelegate.h
//  IronSource
//
//  Created by Roni Parshani on 10/12/14.
//  Copyright (c) 2014 IronSource. All rights reserved.
//

#import <Foundation/Foundation.h>

@protocol ISInterstitialAdapterDelegate <NSObject>

- (void)adapterInterstitialInitSuccess;

- (void)adapterInterstitialInitFailedWithError:(NSError *)error;

- (void)adapterInterstitialDidLoad;

- (void)adapterInterstitialDidFailToLoadWithError:(NSError *)error;

- (void)adapterInterstitialDidOpen;

- (void)adapterInterstitialDidClose;

- (void)adapterInterstitialDidShow;

- (void)adapterInterstitialDidFailToShowWithError:(NSError *)error;

#pragma mark - optional - when supported by network

- (void)adapterInterstitialDidClick;

#pragma mark - rellevant only for ironsource adapter

- (void)adapterInterstitialDidBecomeVisible;

@end

