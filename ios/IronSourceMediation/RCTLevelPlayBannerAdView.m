//
//  RCTLevelPlayBannerAdView.m
//  IronSourceMediation
//
//  Created by Elad Sabag on 14/10/2024.
//  Copyright © 2024 Facebook. All rights reserved.
//
#import <React/RCTLog.h>
#import <React/RCTUIManager.h>
#import <IronSource/IronSource.h>
#import "RCTLevelPlayBannerAdView.h"
#import "LevelPlayUtils.h"

@interface RCTLevelPlayBannerAdView()<LPMBannerAdViewDelegate>

@end

/**
 Class for implementing instance of RCTLevelPlayNativeAdView.
 */
@implementation RCTLevelPlayBannerAdView

// MARK: Initialization

- (instancetype)initWithBridge:(RCTBridge *)bridge
{
  self = [super init];
  if ( self )
  {
    _bridge = bridge;
  }
  
  return self;
}

// MARK: Banner Ad View Methods

/**
 * Loads the native ad and informs the Flutter side upon completion.
 */
- (void)loadAd {
    // If the banner ad view is not initialized, create a new one
    if (self.bannerAdView == nil) {
      self.bannerAdView = [[LPMBannerAdView alloc] initWithAdUnitId: self.adUnitId];
      LPMAdSize *bannerSize = [self getLevelPlayAdSize:self.adSize];
      if (bannerSize == nil) return;

      [self.bannerAdView setAdSize:bannerSize];
      if (self.placementName != nil) {
        [self.bannerAdView setPlacementName: self.placementName];
      }
      [self.bannerAdView setDelegate:self];

      // Add the banner view to the view hierarchy with the proper constraints
      [self addBannerViewWithSize:bannerSize];
    }
  [self.bannerAdView loadAdWithViewController: [LevelPlayUtils getRootViewController]];
}

- (void)destroy {
  if (self.bannerAdView != nil) {
    [self.bannerAdView destroy];
    self.bannerAdView = nil;
  }
}

- (void)pauseAutoRefresh {
  if (self.bannerAdView != nil) {
    [self.bannerAdView pauseAutoRefresh];
  }
}

- (void)resumeAutoRefresh {
  if (self.bannerAdView != nil) {
    [self.bannerAdView resumeAutoRefresh];
  }
}

#pragma mark - Setters for React Props
- (void)setAdUnitId:(NSString *)adUnitId
{
  _adUnitId = [adUnitId copy];
}

- (void)setAdSize:(NSDictionary *)adSize
{
  _adSize = [adSize copy];
}

- (void)setPlacementName:(NSString *)placementName
{
  _placementName = [placementName copy];
}

- (LPMAdSize *)getLevelPlayAdSize:(NSDictionary *)adSizeDict {
    NSNumber *widthNumber = adSizeDict[@"width"];
    NSNumber *heightNumber = adSizeDict[@"height"];
    NSString *adLabel = adSizeDict[@"adLabel"];
    NSNumber *isAdaptiveNumber = adSizeDict[@"isAdaptive"];

    int width = [widthNumber intValue];
    int height = [heightNumber intValue];
    BOOL isAdaptive = [isAdaptiveNumber boolValue];
    CGFloat widthFloat = [widthNumber floatValue];

    // At this point, developer has provided ad size, which means checks for
    // width and height already performed by the sdk and no need to check again.
    if (isAdaptive) {
        // Valid width provided as adaptive already called if entered here
        return [LPMAdSize createAdaptiveAdSizeWithWidth: widthFloat];
    } else if ([adLabel isEqualToString:@"BANNER"]) {
        return [LPMAdSize bannerSize];
    } else if ([adLabel isEqualToString:@"LARGE"]) {
        return [LPMAdSize largeSize];
    } else if ([adLabel isEqualToString:@"MEDIUM_RECTANGLE"]) {
        return [LPMAdSize mediumRectangleSize];
    } else if ([adLabel isEqualToString:@"CUSTOM"]) {
        return [LPMAdSize customSizeWithWidth:width height:height];
    } else {
        return nil;
    }
}

- (void)addBannerViewWithSize:(LPMAdSize *)bannerSize {
    self.bannerAdView.translatesAutoresizingMaskIntoConstraints = NO;
    
    // Add the banner view to the view hierarchy
    [self addSubview:self.bannerAdView];
    
    [NSLayoutConstraint activateConstraints:@[
        [self.bannerAdView.bottomAnchor constraintEqualToAnchor:self.safeAreaLayoutGuide.bottomAnchor],
        [self.bannerAdView.centerXAnchor constraintEqualToAnchor:self.centerXAnchor],
        [self.bannerAdView.widthAnchor constraintEqualToConstant:bannerSize.width],
        [self.bannerAdView.heightAnchor constraintEqualToConstant:bannerSize.height]
    ]];
}

#pragma mark - LevelPlayBannerAdViewDelegate
- (void)didLoadAdWithAdInfo:(LPMAdInfo *) adInfo {
  NSDictionary *args = @{
          @"adInfo": [LevelPlayUtils getDictForLevelPlayAdInfo:adInfo]
  };
  if (self.onAdLoadedEvent) {
      self.onAdLoadedEvent(args);
  }
}

- (void)didFailToLoadAdWithAdUnitId:(NSString *)adUnitId error:(NSError *)error {
  NSDictionary *args = @{
    @"error": [LevelPlayUtils getDictForLevelPlayAdError:error adUnitId:adUnitId]
  };
  if (self.onAdLoadFailedEvent) {
      self.onAdLoadFailedEvent(args);
  }
}

- (void)didClickAdWithAdInfo:(LPMAdInfo *)adInfo {
  NSDictionary *args = @{
          @"adInfo": [LevelPlayUtils getDictForLevelPlayAdInfo:adInfo]
  };
  if (self.onAdClickedEvent) {
      self.onAdClickedEvent(args);
  }
}

- (void)didDisplayAdWithAdInfo:(LPMAdInfo *)adInfo {
  NSDictionary *args = @{
          @"adInfo": [LevelPlayUtils getDictForLevelPlayAdInfo:adInfo]
  };
  if (self.onAdDisplayedEvent) {
      self.onAdDisplayedEvent(args);
  }
}

- (void)didFailToDisplayAdWithAdInfo:(LPMAdInfo *)adInfo error:(NSError *)error {
  NSDictionary *args = @{
          @"adInfo": [LevelPlayUtils getDictForLevelPlayAdInfo:adInfo],
          @"error": [LevelPlayUtils getDictForLevelPlayAdError:error adUnitId: self.adUnitId]
  };
  if (self.onAdDisplayFailedEvent) {
      self.onAdDisplayFailedEvent(args);
  }
}

- (void)didLeaveAppWithAdInfo:(LPMAdInfo *)adInfo {
  NSDictionary *args = @{
          @"adInfo": [LevelPlayUtils getDictForLevelPlayAdInfo:adInfo]
  };
  if (self.onAdLeftApplicationEvent) {
      self.onAdLeftApplicationEvent(args);
  }
}

- (void)didExpandAdWithAdInfo:(LPMAdInfo *)adInfo {
  NSDictionary *args = @{
          @"adInfo": [LevelPlayUtils getDictForLevelPlayAdInfo:adInfo]
  };
  if (self.onAdExpandedEvent) {
      self.onAdExpandedEvent(args);
  }
}

- (void)didCollapseAdWithAdInfo:(LPMAdInfo *)adInfo {
  NSDictionary *args = @{
          @"adInfo": [LevelPlayUtils getDictForLevelPlayAdInfo:adInfo]
  };
  if (self.onAdCollapsedEvent) {
      self.onAdCollapsedEvent(args);
  }
}

@end