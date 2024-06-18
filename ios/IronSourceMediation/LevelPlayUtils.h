#import <Foundation/Foundation.h>
#import <IronSource/IronSource.h>

NS_ASSUME_NONNULL_BEGIN

@interface LevelPlayUtils : NSObject

+ (NSDictionary *)getDictWithNativeAd:(LevelPlayNativeAd *)nativeAd;
+ (NSDictionary *)getDictWithAdInfo:(ISAdInfo *)adInfo;
+ (NSDictionary *)getDictWithError:(NSError *)error;

@end

NS_ASSUME_NONNULL_END
