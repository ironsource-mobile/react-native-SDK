#import <Foundation/Foundation.h>
#import <IronSource/IronSource.h>
#import <React/RCTEventEmitter.h>

@interface LevelPlayRewardedAdDelegate : NSObject <LPMRewardedAdDelegate, LPMImpressionDataDelegate>

- (instancetype)initWithAdId:(NSString *)adId eventEmitter:(RCTEventEmitter *)eventEmitter;
@end
