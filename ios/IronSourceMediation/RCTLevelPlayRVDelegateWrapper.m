//
//  RCTLevelPlayRVDelegateWrapper.m
//  ironsource-mediation
//
//  Created by Kohei on 2022/07/24.
//

#import "RCTLevelPlayRVDelegateWrapper.h"

@implementation RCTLevelPlayRVDelegateWrapper

-(instancetype)initWithDelegate:(id<RCTLevelPlayRVDelegate>)delegate {
    self = [super init];
    
    if (self) {
        _delegate = delegate;
    }
    
    return self;
}

#pragma mark - LevelPlayRewardedVideoDelegate Functions

- (void)hasAvailableAdWithAdInfo:(ISAdInfo *)adInfo {
    [_delegate hasAvailableAdWithAdInfo:adInfo];
}

- (void)hasNoAvailableAd {
    [_delegate hasNoAvailableAd];
}

- (void)didReceiveRewardForPlacement:(ISPlacementInfo *)placementInfo withAdInfo:(ISAdInfo *)adInfo {
    [_delegate levelPlayRVDidReceiveRewardForPlacement:placementInfo withAdInfo:adInfo];
}

- (void)didFailToShowWithError:(NSError *)error andAdInfo:(ISAdInfo *)adInfo {
    [_delegate levelPlayRVDidFailToShowWithError:error andAdInfo:adInfo];
}

- (void)didOpenWithAdInfo:(ISAdInfo *)adInfo {
    [_delegate levelPlayRVDidOpenWithAdInfo:adInfo];
}

- (void)didCloseWithAdInfo:(ISAdInfo *)adInfo {
    [_delegate levelPlayRVDidCloseWithAdInfo:adInfo];
}


- (void)didClick:(ISPlacementInfo *)placementInfo withAdInfo:(ISAdInfo *)adInfo {
    [_delegate levelPlayRVDidClick:placementInfo withAdInfo:adInfo];
}

#pragma mark - LevelPlayRewardedVideoManualDelegate Functions

- (void)didLoadWithAdInfo:(ISAdInfo *)adInfo {
    [_delegate rewardedVideoLevelPlayDidLoadWithAdInfo:adInfo];
}

- (void)didFailToLoadWithError:(NSError *)error {
    [_delegate rewardedVideoLevelPlayDidFailToLoadWithError:error];
}

@end
