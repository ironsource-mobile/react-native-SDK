#import "LevelPlayNativeAdTemplateStyle.h"

@implementation LevelPlayNativeAdTemplateStyle

- (instancetype)initWithTitle:(LevelPlayNativeAdElementStyle *)titleStyle
                         bodyStyle:(LevelPlayNativeAdElementStyle *)bodyStyle
                   advertiserStyle:(LevelPlayNativeAdElementStyle *)advertiserStyle
                 callToActionStyle:(LevelPlayNativeAdElementStyle *)callToActionStyle {
    self = [super init];
    if (self) {
        _titleStyle = titleStyle;
        _bodyStyle = bodyStyle;
        _advertiserStyle = advertiserStyle;
        _callToActionStyle = callToActionStyle;
    }
    return self;
}

- (id)copyWithZone:(NSZone *)zone {
    LevelPlayNativeAdTemplateStyle *copy = [[[self class] allocWithZone:zone] init];
    if (copy) {
        copy.titleStyle = [self.titleStyle copyWithZone:zone];
        copy.bodyStyle = [self.bodyStyle copyWithZone:zone];
        copy.advertiserStyle = [self.advertiserStyle copyWithZone:zone];
        copy.callToActionStyle = [self.callToActionStyle copyWithZone:zone];
    }
    return copy;
}

@end
