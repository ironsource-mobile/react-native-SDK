#import <Foundation/Foundation.h>
#import <IronSource/IronSource.h>
#import <React/RCTEventEmitter.h>

@interface LevelPlayInterstitialAdDelegate : NSObject <LPMInterstitialAdDelegate>

- (instancetype)initWithAdId:(NSString *)adId eventEmitter:(RCTEventEmitter *)eventEmitter;
@end
