//
//  RCTLevelPlayRVDelegateWrapper.h
//  ironsource-mediation
//
//  Created by Kohei on 2022/07/24.
//

#import <Foundation/Foundation.h>
#import <IronSource/IronSource.h>

NS_ASSUME_NONNULL_BEGIN

@protocol RCTLevelPlayRVDelegate <NSObject>

// RV
- (void)hasAvailableAdWithAdInfo:(ISAdInfo *)adInfo;
- (void)hasNoAvailableAd;
- (void)levelPlayRVDidReceiveRewardForPlacement:(ISPlacementInfo *)placementInfo withAdInfo:(ISAdInfo *)adInfo;
- (void)levelPlayRVDidFailToShowWithError:(NSError *)error andAdInfo:(ISAdInfo *)adInfo;
- (void)levelPlayRVDidOpenWithAdInfo:(ISAdInfo *)adInfo;
- (void)levelPlayRVDidCloseWithAdInfo:(ISAdInfo *)adInfo;
- (void)levelPlayRVDidClick:(ISPlacementInfo *)placementInfo withAdInfo:(ISAdInfo *)adInfo;
// Manual RV
- (void)rewardedVideoLevelPlayDidLoadWithAdInfo:(ISAdInfo *)adInfo;
- (void)rewardedVideoLevelPlayDidFailToLoadWithError:(NSError *)error;

@end

@interface RCTLevelPlayRVDelegateWrapper : NSObject <LevelPlayRewardedVideoDelegate, LevelPlayRewardedVideoManualDelegate>

@property (nonatomic, weak) id<RCTLevelPlayRVDelegate>delegate;

- (instancetype) initWithDelegate:(id<RCTLevelPlayRVDelegate>)delegate;

@end

NS_ASSUME_NONNULL_END
