#import <Foundation/Foundation.h>
#import <IronSource/IronSource.h>

NS_ASSUME_NONNULL_BEGIN

@interface Utilities : NSObject

+ (NSDictionary *)getDictWithAdInfo:(ISAdInfo *)adInfo;
+ (NSDictionary *)getDictWithError:(NSError *)error;

@end

NS_ASSUME_NONNULL_END
