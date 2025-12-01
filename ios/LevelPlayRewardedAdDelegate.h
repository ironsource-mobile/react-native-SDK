#import <Foundation/Foundation.h>
#import <IronSource/IronSource.h>
#import <React/RCTEventEmitter.h>

@interface LevelPlayRewardedAdDelegate : NSObject <LPMRewardedAdDelegate>

- (instancetype)initWithAdId:(NSString *)adId eventEmitter:(RCTEventEmitter *)eventEmitter;
@end
