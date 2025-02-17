#import <Foundation/Foundation.h>
#import <IronSource/IronSource.h>
#import <React/RCTEventEmitter.h>

@interface LevelPlayRewardedAdDelegate : NSObject <LPMRewardedAdDelegate>

- (instancetype)initWithAdObjectId:(int)adObjectId eventEmitter:(RCTEventEmitter *)eventEmitter;
@end
