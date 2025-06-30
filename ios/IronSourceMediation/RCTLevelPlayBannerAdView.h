//
//  RCTLevelPlayBannerAdView.h
//  IronSourceMediation
//
//  Created by Elad Sabag on 14/10/2024.
//  Copyright © 2024 Facebook. All rights reserved.
//
#import <UIKit/UIKit.h>
#import <React/RCTComponent.h>
#import <React/RCTUIManagerUtils.h>
#import <React/RCTBridgeModule.h>
#import <IronSource/IronSource.h>
#import "RCTLevelPlayBannerAdViewManager.h"

@interface RCTLevelPlayBannerAdView : UIView

@property (nonatomic, weak) RCTBridge *bridge;
@property (nonatomic, copy, nullable) NSString *adId;
@property (nonatomic, copy, nullable) NSString *adUnitId;
@property (nonatomic, copy, nullable) NSDictionary *adSize;
@property (nonatomic, copy, nullable) NSDictionary *creationParams;
@property (nonatomic, copy, nullable) NSString *placementName;
@property (nonatomic, strong, nullable) LPMBannerAdView *bannerAdView;
@property (nonatomic, copy, nullable) RCTDirectEventBlock onAdLoadedEvent;
@property (nonatomic, copy, nullable) RCTDirectEventBlock onAdLoadFailedEvent;
@property (nonatomic, copy, nullable) RCTDirectEventBlock onAdDisplayedEvent;
@property (nonatomic, copy, nullable) RCTDirectEventBlock onAdDisplayFailedEvent;
@property (nonatomic, copy, nullable) RCTDirectEventBlock onAdClickedEvent;
@property (nonatomic, copy, nullable) RCTDirectEventBlock onAdCollapsedEvent;
@property (nonatomic, copy, nullable) RCTDirectEventBlock onAdExpandedEvent;
@property (nonatomic, copy, nullable) RCTDirectEventBlock onAdLeftApplicationEvent;
@property (nonatomic, copy,nullable) RCTDirectEventBlock onAdIdGeneratedEvent;

- (instancetype)initWithBridge:(RCTBridge *)bridge;
- (void)initializeBanner;
- (void)loadAd;
- (void)destroy;
- (void)pauseAutoRefresh;
- (void)resumeAutoRefresh;
- (LPMAdSize *)getLevelPlayAdSize:(NSDictionary *)adSizeDict;
- (void)addBannerViewWithSize:(LPMAdSize *)bannerSize;

@end

