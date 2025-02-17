#import "LevelPlayRewardedAdDelegate.h"
#import "LevelPlayUtils.h"

@interface LevelPlayRewardedAdDelegate ()

@property (nonatomic, assign) int adObjectId;
@property (nonatomic, weak) RCTEventEmitter *eventEmitter;

@end

@implementation LevelPlayRewardedAdDelegate

- (instancetype)initWithAdObjectId:(int)adObjectId eventEmitter:(RCTEventEmitter *)eventEmitter {
    self = [super init];
    if (self) {
      _adObjectId = adObjectId;
      _eventEmitter = eventEmitter;
    }
    return self;
}

- (void)didLoadAdWithAdInfo:(LPMAdInfo *)adInfo {
    NSDictionary *args = @{
            @"adObjectId": @(self.adObjectId),
            @"adInfo": [LevelPlayUtils getDictForLevelPlayAdInfo:adInfo]
    };
  [LevelPlayUtils sendEventWithName:@"onRewardedAdLoaded" args:args eventEmitter:self.eventEmitter];
  }

- (void)didFailToLoadAdWithAdUnitId:(NSString *)adUnitId error:(NSError *)error {
    NSDictionary *args = @{
            @"adObjectId": @(self.adObjectId),
            @"error": [LevelPlayUtils getDictForLevelPlayAdError:error adUnitId:adUnitId]
    };
  [LevelPlayUtils sendEventWithName:@"onRewardedAdLoadFailed" args:args eventEmitter:self.eventEmitter];
}

- (void)didChangeAdInfo:(LPMAdInfo *)adInfo {
    NSDictionary *args = @{
            @"adObjectId": @(self.adObjectId),
            @"adInfo": [LevelPlayUtils getDictForLevelPlayAdInfo:adInfo]
    };
  [LevelPlayUtils sendEventWithName:@"onRewardedAdInfoChanged" args:args eventEmitter:self.eventEmitter];
}

- (void)didDisplayAdWithAdInfo:(LPMAdInfo *)adInfo {
    NSDictionary *args = @{
            @"adObjectId": @(self.adObjectId),
            @"adInfo": [LevelPlayUtils getDictForLevelPlayAdInfo:adInfo]
    };
  [LevelPlayUtils sendEventWithName:@"onRewardedAdDisplayed" args:args eventEmitter:self.eventEmitter];
}

- (void)didFailToDisplayAdWithAdInfo:(LPMAdInfo *)adInfo error:(NSError *)error {
    NSDictionary *args = @{
            @"adObjectId": @(self.adObjectId),
            @"adInfo": [LevelPlayUtils getDictForLevelPlayAdInfo:adInfo],
            @"error": [LevelPlayUtils getDictForLevelPlayAdError:error adUnitId:adInfo.adUnitId]
    };
  [LevelPlayUtils sendEventWithName:@"onInterstitialAdDisplayFailed" args:args eventEmitter:self.eventEmitter];
}

- (void)didClickAdWithAdInfo:(LPMAdInfo *)adInfo {
    NSDictionary *args = @{
            @"adObjectId": @(self.adObjectId),
            @"adInfo": [LevelPlayUtils getDictForLevelPlayAdInfo:adInfo]
    };
  [LevelPlayUtils sendEventWithName:@"onRewardedAdClicked" args:args eventEmitter:self.eventEmitter];
}

- (void)didCloseAdWithAdInfo:(LPMAdInfo *)adInfo {
    NSDictionary *args = @{
            @"adObjectId": @(self.adObjectId),
            @"adInfo": [LevelPlayUtils getDictForLevelPlayAdInfo:adInfo]
    };
  [LevelPlayUtils sendEventWithName:@"onRewardedAdClosed" args:args eventEmitter:self.eventEmitter];
}

- (void)didRewardAdWithAdInfo:(LPMAdInfo *)adInfo reward:(LPMReward *)reward {
    NSDictionary *args = @{
            @"adObjectId": @(self.adObjectId),
            @"adInfo": [LevelPlayUtils getDictForLevelPlayAdInfo:adInfo],
            @"reward": [LevelPlayUtils getDictForLevelPlayReward:reward]
    };
  [LevelPlayUtils sendEventWithName:@"onRewardedAdRewarded" args:args eventEmitter:self.eventEmitter];
}

@end
