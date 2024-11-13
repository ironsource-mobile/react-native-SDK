#import <Foundation/Foundation.h>
#import <IronSource/IronSource.h>
#import <React/RCTEventEmitter.h>

@interface LevelPlayInterstitialAdDelegate : NSObject <LPMInterstitialAdDelegate>

- (instancetype)initWithAdObjectId:(int)adObjectId eventEmitter:(RCTEventEmitter *)eventEmitter;
@end
