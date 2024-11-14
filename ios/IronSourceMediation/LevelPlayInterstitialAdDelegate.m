#import "LevelPlayInterstitialAdDelegate.h"
#import "LevelPlayUtils.h"

@interface LevelPlayInterstitialAdDelegate ()

@property (nonatomic, assign) int adObjectId;
@property (nonatomic, weak) RCTEventEmitter *eventEmitter;

@end

@implementation LevelPlayInterstitialAdDelegate

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
  [LevelPlayUtils sendEventWithName:@"onInterstitialAdLoaded" args:args eventEmitter:self.eventEmitter];
  }

- (void)didFailToLoadAdWithAdUnitId:(NSString *)adUnitId error:(NSError *)error {
    NSDictionary *args = @{
            @"adObjectId": @(self.adObjectId),
            @"error": [LevelPlayUtils getDictForLevelPlayAdError:error adUnitId:adUnitId]
    };
  [LevelPlayUtils sendEventWithName:@"onInterstitialAdLoadFailed" args:args eventEmitter:self.eventEmitter];
}

- (void)didChangeAdInfo:(LPMAdInfo *)adInfo {
    NSDictionary *args = @{
            @"adObjectId": @(self.adObjectId),
            @"adInfo": [LevelPlayUtils getDictForLevelPlayAdInfo:adInfo]
    };
  [LevelPlayUtils sendEventWithName:@"onInterstitialAdInfoChanged" args:args eventEmitter:self.eventEmitter];
}

- (void)didDisplayAdWithAdInfo:(LPMAdInfo *)adInfo {
    NSDictionary *args = @{
            @"adObjectId": @(self.adObjectId),
            @"adInfo": [LevelPlayUtils getDictForLevelPlayAdInfo:adInfo]
    };
  [LevelPlayUtils sendEventWithName:@"onInterstitialAdDisplayed" args:args eventEmitter:self.eventEmitter];
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
  [LevelPlayUtils sendEventWithName:@"onInterstitialAdClicked" args:args eventEmitter:self.eventEmitter];
}

- (void)didCloseAdWithAdInfo:(LPMAdInfo *)adInfo {
    NSDictionary *args = @{
            @"adObjectId": @(self.adObjectId),
            @"adInfo": [LevelPlayUtils getDictForLevelPlayAdInfo:adInfo]
    };
  [LevelPlayUtils sendEventWithName:@"onInterstitialAdClosed" args:args eventEmitter:self.eventEmitter];
}

@end