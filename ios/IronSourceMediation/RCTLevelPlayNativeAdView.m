#import <React/RCTLog.h>
#import <React/RCTUIManager.h>
#import <IronSource/IronSource.h>
#import "RCTLevelPlayNativeAdView.h"
#import "LevelPlayUtils.h"

/**
 Class for implementing instance of RCTLevelPlayNativeAdView.
 */
@implementation RCTLevelPlayNativeAdView

// MARK: Initialization

- (instancetype)initWithBridge:(RCTBridge *)bridge layoutName:(nullable NSString *)layoutName
{
    self = [super init];
    if ( self )
    {
        _bridge = bridge;
        _layoutName = layoutName;
    }

    return self;
}

// MARK: Native Ad View Methods

/**
 * Loads the native ad and informs the Flutter side upon completion.
 */
- (void)loadAd {
    // If the native ad is not initialized, create a new one
    if (_nativeAd == nil) {
        _nativeAd = [[[[LevelPlayNativeAdBuilder new]
                withViewController:(UIViewController *)self]
                withPlacementName:self.placement] // Replace with your placement or leave empty
                withDelegate:self]    // We implement the delegate in step 2
                .build;
    }
    [_nativeAd loadAd];
}

/**
 * Destroys the native ad and informs the Flutter side upon completion.
 */
- (void)destroyAd {
    [self removeViews];
    [self.nativeAd destroyAd];
    self.nativeAd = nil;
}

/**
 Removes all the subviews associated with the native ad view.
 This method removes the title view, body view, advertiser view, call to action view, icon view, and media view if they exist.
 */
-(void) removeViews
{
    [self.isNativeAdView removeFromSuperview];
}

#pragma mark - Setters for React Props

/**
 * This function extract the parameters received from
 * react-native side on view creation, apply the style
 * and save the values received. According to this parameters
 * the method display the correct xib attached to the
 * ad view type.
 *
 * @param creationParams The creation parameters received.
 */
- (void)setCreationParams:(NSDictionary *)creationParams
{
    // Extract variables from dict
    NSString *placement = [creationParams[@"placement"] isKindOfClass:[NSString class]] ? creationParams[@"placement"] : nil;
    NSString *templateType = [creationParams[@"templateType"] isKindOfClass:[NSString class]] ? creationParams[@"templateType"] : nil;
    NSString *viewType = [creationParams[@"viewType"] isKindOfClass:[NSString class]] ? creationParams[@"viewType"] : nil;
    NSDictionary *templateStyleDict = [creationParams[@"templateStyle"] isKindOfClass:[NSDictionary class]] ? creationParams[@"templateStyle"] : nil;
    // Parse LevelPlayNativeAdElementStyle objects
    LevelPlayNativeAdElementStyle *titleStyle = [self parseElementStyle:templateStyleDict[@"titleStyle"]];
    LevelPlayNativeAdElementStyle *bodyStyle = [self parseElementStyle:templateStyleDict[@"bodyStyle"]];
    LevelPlayNativeAdElementStyle *advertiserStyle = [self parseElementStyle:templateStyleDict[@"advertiserStyle"]];
    LevelPlayNativeAdElementStyle *callToActionStyle = [self parseElementStyle:templateStyleDict[@"callToActionStyle"]];
    // Create the template style from parsed element styles(if exist)
    LevelPlayNativeAdTemplateStyle *templateStyle = [[LevelPlayNativeAdTemplateStyle alloc] initWithTitle:titleStyle
                                                                                                bodyStyle:bodyStyle
                                                                                          advertiserStyle:advertiserStyle
                                                                                        callToActionStyle:callToActionStyle];

    // Create the native ad layout
    ISNativeAdView* isNativeAdView = nil;
    NSString *nibName = nil;
    NSBundle *bundle = nil;
    UINib *nib = nil;

    if (self.layoutName != nil) {
        nibName = self.layoutName;
        // Get the bundle
        bundle = [NSBundle mainBundle];
        // Load the NIB
        nib = [UINib nibWithNibName:nibName bundle:bundle];
    } else {
        if ([templateType isEqualToString:@"SMALL"]) {
            nibName = @"LevelPlayNativeAdViewSmall";
        } else if ([templateType isEqualToString:@"MEDIUM"]) {
            nibName = @"LevelPlayNativeAdViewMedium";
        } else {
            @throw [NSException exceptionWithName:NSInvalidArgumentException reason:@"Invalid templateType" userInfo:nil];
        }
        // Get the bundle path for the resource bundle
        bundle = [NSBundle bundleForClass:[self class]];
        NSURL *bundleURL = [bundle URLForResource:@"ironsource_mediation" withExtension:@"bundle"];
        bundle = [NSBundle bundleWithURL:bundleURL]; // Resource bundle
        // Load the NIB file from the resource bundle
        nib = [UINib nibWithNibName:nibName bundle:bundle];
    }

    NSArray *nibObjects = [nib instantiateWithOwner:nil options:nil];
    if (nibObjects.count > 0) {
        isNativeAdView = nibObjects[0];
    } else {
        isNativeAdView = [[ISNativeAdView alloc] init];
    }

    // Save variables
    self.placement = placement;
    self.templateType = templateType;
    self.viewType = viewType;
    self.templateStyle = templateStyle;
    self.isNativeAdView = isNativeAdView;

    // Set autoresizing mask to ensure the view resizes with its superview
    self.isNativeAdView.autoresizingMask = UIViewAutoresizingFlexibleWidth | UIViewAutoresizingFlexibleHeight;

    // Set the frame of the isNativeAdView to fill the entire superview
    self.isNativeAdView.frame = self.bounds;

    [self addSubview:isNativeAdView];

    // Apply styles before ad loaded
    [self applyStylesWithTitleView:self.isNativeAdView.adTitleView
                          bodyView:self.isNativeAdView.adBodyView
                    advertiserView:self.isNativeAdView.adAdvertiserView
                  callToActionView:self.isNativeAdView.adCallToActionView];
}

- (void)applyStylesWithTitleView:(UILabel *)titleView
                        bodyView:(UILabel *)bodyView
                  advertiserView:(UILabel *)advertiserView
                callToActionView:(UIButton *)callToActionView {
    if (self.templateStyle) {
        [self applyStyleToTextView:titleView style:self.templateStyle.titleStyle];
        [self applyStyleToTextView:bodyView style:self.templateStyle.bodyStyle];
        [self applyStyleToTextView:advertiserView style:self.templateStyle.advertiserStyle];
        [self applyStyleToButton:callToActionView style:self.templateStyle.callToActionStyle];
    }
}

- (void)applyStyleToTextView:(UILabel *)textView style:(LevelPlayNativeAdElementStyle *)style {
    if (textView && style) {
        [self applyCommonStyles:textView style:style];

        if (style.textColor && ![style.textColor isKindOfClass:[NSNull class]]) {
            UIColor *textColor = [self parseColor:style.textColor];
            [textView setTextColor:textColor];
        }
        if (style.fontStyle && ![style.fontStyle isKindOfClass:[NSNull class]]) {
            [textView setFont:[self parseFontStyle:style.fontStyle]];
        }
        if (style.textSize && ![style.textSize isKindOfClass:[NSNull class]]) {
            [textView setFont:[textView.font fontWithSize:[style.textSize floatValue]]];
        }
    }
}

- (void)applyStyleToButton:(UIButton *)button style:(LevelPlayNativeAdElementStyle *)style {
    if (button && style) {
        [self applyCommonStyles:button style:style];

        if (style.textColor && ![style.textColor isKindOfClass:[NSNull class]]) {
            UIColor *textColor = [self parseColor:style.textColor];
            [button setTitleColor:textColor forState:UIControlStateNormal];
        }
        if (style.fontStyle && ![style.fontStyle isKindOfClass:[NSNull class]]) {
            [button.titleLabel setFont:[self parseFontStyle:style.fontStyle]];
        }
        if (style.textSize && ![style.textSize isKindOfClass:[NSNull class]]) {
            [button.titleLabel setFont:[button.titleLabel.font fontWithSize:[style.textSize floatValue]]];
        }
    }
}

- (void)applyCommonStyles:(UIView *)view style:(LevelPlayNativeAdElementStyle *)style {
    if (view && style) {
        if (style.backgroundColor && ![style.backgroundColor isKindOfClass:[NSNull class]]) {
            UIColor *backgroundColor = [self parseColor:style.backgroundColor];
            view.backgroundColor = backgroundColor;
        }
        if (style.cornerRadius && ![style.cornerRadius isKindOfClass:[NSNull class]]) {
            CGFloat cornerRadius = [style.cornerRadius floatValue];
            view.layer.cornerRadius = cornerRadius;
            view.layer.masksToBounds = YES;
        }
    }
}


- (UIFont *)parseFontStyle:(NSString *)fontStyle {
    if (fontStyle) {
        NSString *lowercaseFontStyle = [fontStyle lowercaseString];
        if ([lowercaseFontStyle containsString:@"bold"]) {
            return [UIFont boldSystemFontOfSize:[UIFont systemFontSize]];
        } else if ([lowercaseFontStyle containsString:@"italic"]) {
            return [UIFont italicSystemFontOfSize:[UIFont systemFontSize]];
        } else if ([lowercaseFontStyle containsString:@"monospace"]) {
            // Implement monospace font handling if needed
            // Example: return [UIFont fontWithName:@"Courier" size:[UIFont systemFontSize]];
            // Use system default font size for monospace font
            return [UIFont systemFontOfSize:[UIFont systemFontSize]];
        }
    }
    return [UIFont systemFontOfSize:[UIFont systemFontSize]]; // Default font size
}

- (UIColor *)parseColor:(NSString *)colorString {
    if (!colorString || [colorString isEqualToString:@""]) {
        return nil;
    }

    unsigned int rgbValue = 0;
    NSScanner *scanner = [NSScanner scannerWithString:colorString];
    [scanner setScanLocation:1];
    [scanner scanHexInt:&rgbValue];

    return [UIColor colorWithRed:((rgbValue & 0xFF0000) >> 16)/255.0
                           green:((rgbValue & 0xFF00) >> 8)/255.0
                            blue:(rgbValue & 0xFF)/255.0
                           alpha:1.0];
}

- (LevelPlayNativeAdElementStyle *)parseElementStyle:(NSDictionary *)styleDict {
    if (!styleDict || ![styleDict isKindOfClass:[NSDictionary class]]) {
        return nil;
    }

    NSString *backgroundColor = styleDict[@"backgroundColor"];
    NSNumber *textSize = styleDict[@"textSize"];
    NSString *textColor = styleDict[@"textColor"];
    NSString *fontStyle = styleDict[@"fontStyle"];
    NSNumber *cornerRadius = styleDict[@"cornerRadius"];

    return [[LevelPlayNativeAdElementStyle alloc] initWithBackgroundColor:backgroundColor
                                                                 textSize:textSize
                                                                textColor:textColor
                                                                fontStyle:fontStyle
                                                             cornerRadius:cornerRadius];
}

#pragma mark - LevelPlayNativeAdDelegate

/**
 Called after a native ad has been successfully loaded
 @param nativeAd Level Play native ad.
 @param adInfo The info of the ad.
 */
- (void)didLoad:(LevelPlayNativeAd *)nativeAd withAdInfo:(ISAdInfo *)adInfo
{
    // Save native ad instance
    _nativeAd = nativeAd;

    [self.delegate bindNativeAdToView:nativeAd isNativeAdView:self.isNativeAdView];

    NSDictionary *adDict = [LevelPlayUtils getDictWithNativeAd:nativeAd];
    NSDictionary *adInfoDict = [LevelPlayUtils getDictWithAdInfo:adInfo];
    if (self.onAdLoadedEvent) {
        self.onAdLoadedEvent(@{@"nativeAd": adDict, @"adInfo": adInfoDict});
    }
}

/**
 Called after a native has attempted to load an ad but failed.
 @param nativeAd Level Play native ad.
 @param error The reason for the error
 */
- (void)didFailToLoad:(LevelPlayNativeAd *)nativeAd withError:(NSError *)error
{
    NSDictionary *adDict = [LevelPlayUtils getDictWithNativeAd:nativeAd];
    NSDictionary *errorDict = [LevelPlayUtils getDictWithError:error];
    if (self.onAdLoadFailedEvent) {
        self.onAdLoadFailedEvent(@{@"nativeAd": adDict, @"error": errorDict});
    }
}

/**
 Called after a native ad has been clicked.
 @param nativeAd Level Play native ad.
 @param adInfo The info of the ad.
 */

- (void)didClick:(LevelPlayNativeAd *)nativeAd withAdInfo:(ISAdInfo *)adInfo
{
    NSDictionary *adDict = [LevelPlayUtils getDictWithNativeAd:nativeAd];
    NSDictionary *adInfoDict = [LevelPlayUtils getDictWithAdInfo:adInfo];
    if (self.onAdClickedEvent) {
        self.onAdClickedEvent(@{@"nativeAd": adDict, @"adInfo": adInfoDict});
    }
}

/**
 Called after a native ad impression has been recorded.
 @param nativeAd Level Play native ad.
 @param adInfo The info of the ad.
 */
- (void)didRecordImpression:(LevelPlayNativeAd *)nativeAd withAdInfo:(ISAdInfo *)adInfo
{
    NSDictionary *adDict = [LevelPlayUtils getDictWithNativeAd:nativeAd];
    NSDictionary *adInfoDict = [LevelPlayUtils getDictWithAdInfo:adInfo];
    if (self.onAdImpressionEvent) {
        self.onAdImpressionEvent(@{@"nativeAd": adDict, @"adInfo": adInfoDict});
    }
}

@end
