#import <Foundation/Foundation.h>
#import "LevelPlayNativeAdElementStyle.h"

NS_ASSUME_NONNULL_BEGIN

@interface LevelPlayNativeAdTemplateStyle : NSObject <NSCopying>

@property (nonatomic, strong, nullable) LevelPlayNativeAdElementStyle *titleStyle;
@property (nonatomic, strong, nullable) LevelPlayNativeAdElementStyle *bodyStyle;
@property (nonatomic, strong, nullable) LevelPlayNativeAdElementStyle *advertiserStyle;
@property (nonatomic, strong, nullable) LevelPlayNativeAdElementStyle *callToActionStyle;

- (instancetype)initWithTitle:(LevelPlayNativeAdElementStyle *)titleStyle
                    bodyStyle:(LevelPlayNativeAdElementStyle *)bodyStyle
              advertiserStyle:(LevelPlayNativeAdElementStyle *)advertiserStyle
            callToActionStyle:(LevelPlayNativeAdElementStyle *)callToActionStyle;

@end

NS_ASSUME_NONNULL_END
