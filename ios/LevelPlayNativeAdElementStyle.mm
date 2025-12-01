#import "LevelPlayNativeAdElementStyle.h"

@implementation LevelPlayNativeAdElementStyle

- (instancetype)initWithBackgroundColor:(NSString *)backgroundColor
                               textSize:(NSNumber *)textSize
                              textColor:(NSString *)textColor
                              fontStyle:(NSString *)fontStyle
                           cornerRadius:(NSNumber *)cornerRadius {
    self = [super init];
    if (self) {
        _backgroundColor = backgroundColor;
        _textSize = textSize;
        _textColor = textColor;
        _fontStyle = fontStyle;
        _cornerRadius = cornerRadius;
    }
    return self;
}

- (id)copyWithZone:(NSZone *)zone {
    LevelPlayNativeAdElementStyle *copy = [[LevelPlayNativeAdElementStyle allocWithZone:zone] init];
    if (copy) {
        copy.textColor = self.textColor;
        copy.fontStyle = self.fontStyle;
        copy.textSize = self.textSize;
        copy.backgroundColor = self.backgroundColor;
        copy.cornerRadius = self.cornerRadius;
    }
    return copy;
}

@end
