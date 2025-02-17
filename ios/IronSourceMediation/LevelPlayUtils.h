#import <Foundation/Foundation.h>
#import <IronSource/IronSource.h>
#import <React/RCTBridgeModule.h>
#import <React/RCTEventEmitter.h>

NS_ASSUME_NONNULL_BEGIN

@interface LevelPlayUtils : NSObject

+ (void)sendEventWithName:(NSString *)eventName args:(NSDictionary * _Nullable)args eventEmitter:(RCTEventEmitter *)eventEmitter;
+ (NSDictionary *)getDictWithNativeAd:(LevelPlayNativeAd *)nativeAd;
+ (NSDictionary *)getDictWithAdInfo:(ISAdInfo *)adInfo;
+ (NSDictionary *)getDictWithError:(NSError *)error;
+ (NSDictionary *)getDictWithPlacementInfo:(ISPlacementInfo *)placementInfo;
+ (NSMutableDictionary *)getDictWithConsentViewType:(NSString *)consentViewType;
+ (NSMutableDictionary *)getDictWithIronSourceConsentViewError:(NSString *)consentViewType error:(NSError *)error;
+ (NSDictionary *)getDictWithInitError:(NSError *)error;
+ (NSDictionary *)getDictWithInitSuccess:(LPMConfiguration *)config;
+ (NSDictionary *)getDictForLevelPlayAdInfo:(LPMAdInfo *)adInfo;
+ (NSDictionary *)getDictForLevelPlayAdError:(NSError *)error adUnitId:(NSString *) adUnitId;
+ (NSDictionary *)getDictForAdSize:(LPMAdSize *)adSize;
+ (NSDictionary *)getDictForImpressionData:(ISImpressionData *)impressionData;
+ (UIViewController *)getRootViewController;
+ (NSDictionary *)getDictForLevelPlayReward:(LPMReward *)reward;

@end

NS_ASSUME_NONNULL_END
