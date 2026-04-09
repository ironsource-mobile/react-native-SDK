#import <React/RCTLog.h>
#import <React/RCTUIManager.h>
#import <IronSource/IronSource.h>
#import "LevelPlayNativeAdView.h"
#import "LevelPlayUtils.h"

#ifdef RCT_NEW_ARCH_ENABLED
#import <react/renderer/components/LevelPlayMediationSpec/ComponentDescriptors.h>
#import <react/renderer/components/LevelPlayMediationSpec/EventEmitters.h>
#import <react/renderer/components/LevelPlayMediationSpec/Props.h>
#import <react/renderer/components/LevelPlayMediationSpec/RCTComponentViewHelpers.h>
#import <React/RCTConversions.h>

using namespace facebook::react;

@interface LevelPlayNativeAdView() <RCTLevelPlayNativeAdViewViewProtocol, LevelPlayNativeAdDelegate>
@property (nonatomic, assign) facebook::react::LevelPlayNativeAdViewProps::Shared _props;
#else
@interface LevelPlayNativeAdView()<LevelPlayNativeAdDelegate>
#endif

@end

#pragma mark - Event Helpers

// Helper to safely convert NSString/NSNull to std::string
static std::string safeStringFromDict(NSDictionary *dict, NSString *key) {
    id value = dict[key];
    if (value == nil || [value isKindOfClass:[NSNull class]]) {
        return "";
    }
    if ([value isKindOfClass:[NSString class]]) {
        return std::string([(NSString *)value UTF8String]);
    }
    return "";
}

static double safeDoubleFromDict(NSDictionary *dict, NSString *key) {
    id value = dict[key];
    if (value == nil || [value isKindOfClass:[NSNull class]]) {
        return 0.0;
    }
    if ([value isKindOfClass:[NSNumber class]]) {
        return [(NSNumber *)value doubleValue];
    }
    return 0.0;
}

/**
 Class for implementing instance of LevelPlayNativeAdView.
 */
@implementation LevelPlayNativeAdView

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

#ifdef RCT_NEW_ARCH_ENABLED
+ (ComponentDescriptorProvider)componentDescriptorProvider
{
  return concreteComponentDescriptorProvider<LevelPlayNativeAdViewComponentDescriptor>();
}

- (instancetype)initWithFrame:(CGRect)frame
{
  if (self = [super initWithFrame:frame]) {
    static const auto defaultProps = std::make_shared<const facebook::react::LevelPlayNativeAdViewProps>();
    _props = defaultProps;
    [self configureEventBlocks];
  }
  return self;
}

- (void)updateProps:(Props::Shared const &)props oldProps:(Props::Shared const &)oldProps
{
  const auto &oldViewProps = *std::static_pointer_cast<LevelPlayNativeAdViewProps const>(_props);
  const auto &newViewProps = *std::static_pointer_cast<LevelPlayNativeAdViewProps const>(props);

  _props = std::static_pointer_cast<LevelPlayNativeAdViewProps const>(props);

  [super updateProps:props oldProps:oldProps];

  // Handle creationParams from Fabric
  auto creationParamsValue = newViewProps.creationParams;
  NSMutableDictionary *creationParams = [NSMutableDictionary new];

  // Extract placement
  if (!creationParamsValue.placement.empty()) {
    NSString *placement = RCTNSStringFromString(creationParamsValue.placement);
    creationParams[@"placement"] = placement;
    self.placement = placement;
  }

  // Extract templateType
  if (!creationParamsValue.templateType.empty()) {
    NSString *templateType = RCTNSStringFromString(creationParamsValue.templateType);
    creationParams[@"templateType"] = templateType;
    self.templateType = templateType;
  }

  // Extract viewType
  if (!creationParamsValue.viewType.empty()) {
    NSString *viewType = RCTNSStringFromString(creationParamsValue.viewType);
    creationParams[@"viewType"] = viewType;
    self.viewType = viewType;
  }

  // Extract templateStyle
  auto templateStyleValue = creationParamsValue.templateStyle;
  NSMutableDictionary *templateStyleDict = [NSMutableDictionary new];

  if (!templateStyleValue.mainBackgroundColor.empty()) {
    templateStyleDict[@"mainBackgroundColor"] = RCTNSStringFromString(templateStyleValue.mainBackgroundColor);
  }
  if (!templateStyleValue.titleTextColor.empty()) {
    templateStyleDict[@"titleTextColor"] = RCTNSStringFromString(templateStyleValue.titleTextColor);
  }
  if (!templateStyleValue.bodyTextColor.empty()) {
    templateStyleDict[@"bodyTextColor"] = RCTNSStringFromString(templateStyleValue.bodyTextColor);
  }
  if (!templateStyleValue.advertiserTextColor.empty()) {
    templateStyleDict[@"advertiserTextColor"] = RCTNSStringFromString(templateStyleValue.advertiserTextColor);
  }
  if (!templateStyleValue.ctaBackgroundColor.empty()) {
    templateStyleDict[@"ctaBackgroundColor"] = RCTNSStringFromString(templateStyleValue.ctaBackgroundColor);
  }
  if (!templateStyleValue.ctaTextColor.empty()) {
    templateStyleDict[@"ctaTextColor"] = RCTNSStringFromString(templateStyleValue.ctaTextColor);
  }
  if (templateStyleValue.ctaCornerRadius > 0) {
    templateStyleDict[@"ctaCornerRadius"] = @(templateStyleValue.ctaCornerRadius);
  }

  if (templateStyleDict.count > 0) {
    creationParams[@"templateStyle"] = templateStyleDict;
  }

  // Initialize native ad with extracted params (only if not already initialized)
  if (creationParams.count > 0 && !self.isInitialized) {
    [self setCreationParams:creationParams];
    self.isInitialized = YES;
  }
}

- (void)prepareForRecycle
{
  [super prepareForRecycle];

  // Clean up native ad when recycled
  if (self.nativeAd != nil) {
    [self.nativeAd destroyAd];
    self.nativeAd = nil;
  }

  // Remove and clean up the native ad view
  if (self.isNativeAdView != nil) {
    self.isNativeAdView.hidden = YES;
    [self.isNativeAdView removeFromSuperview];
    self.isNativeAdView = nil;
  }

  // Reset properties
  self.placement = nil;
  self.templateType = nil;
  self.viewType = nil;
  self.templateStyle = nil;
  self.isInitialized = NO;
}
#endif

// MARK: Native Ad View Methods

/**
 * Loads the native ad and informs the Flutter side upon completion.
 */
- (void)loadAd {
    // If the native ad is not initialized, create a new one
    if (_nativeAd == nil) {
        _nativeAd = [[[[LevelPlayNativeAdBuilder new]
                withViewController:[LevelPlayUtils getRootViewController]]
                withPlacementName:self.placement]
                withDelegate:self]
                .build;
    }
    [_nativeAd loadAd];
}

/**
 * Destroys the native ad.
 */
- (void)destroyAd {
    [self.nativeAd destroyAd];
    self.nativeAd = nil;
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
    // Skip if already initialized (Fabric mode already handled this)
    if (self.isInitialized) {
        return;
    }

    // Extract variables from dict
    NSString *placement = [creationParams[@"placement"] isKindOfClass:[NSString class]] ? creationParams[@"placement"] : nil;
    NSString *templateType = [creationParams[@"templateType"] isKindOfClass:[NSString class]] ? creationParams[@"templateType"] : nil;
    NSString *viewType = [creationParams[@"viewType"] isKindOfClass:[NSString class]] ? creationParams[@"viewType"] : nil;
    NSDictionary *templateStyleDict = [creationParams[@"templateStyle"] isKindOfClass:[NSDictionary class]] ? creationParams[@"templateStyle"] : nil;
    // Parse LevelPlayNativeAdElementStyle objects
    NSNumber *mainBackgroundColor = templateStyleDict[@"mainBackgroundColor"];
    LevelPlayNativeAdElementStyle *titleStyle = [self parseElementStyle:templateStyleDict[@"titleStyle"]];
    LevelPlayNativeAdElementStyle *bodyStyle = [self parseElementStyle:templateStyleDict[@"bodyStyle"]];
    LevelPlayNativeAdElementStyle *advertiserStyle = [self parseElementStyle:templateStyleDict[@"advertiserStyle"]];
    LevelPlayNativeAdElementStyle *callToActionStyle = [self parseElementStyle:templateStyleDict[@"callToActionStyle"]];
    // Create the template style from parsed element styles(if exist)
    LevelPlayNativeAdTemplateStyle *templateStyle = [[LevelPlayNativeAdTemplateStyle alloc] initWithMainBackgroundColor:mainBackgroundColor
                                                                                                titleStyle:titleStyle
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
        NSURL *bundleURL = [bundle URLForResource:@"unity_levelplay_mediation" withExtension:@"bundle"];
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

    // Hide the ad elements when its not loaded
    self.isNativeAdView.hidden = YES;

    [self addSubview:isNativeAdView];

    // Mark as initialized
    self.isInitialized = YES;
}

- (void)applyStylesWithTitleView:(UILabel *)titleView
                        bodyView:(UILabel *)bodyView
                  advertiserView:(UILabel *)advertiserView
                callToActionView:(UIButton *)callToActionView {
    if (self.templateStyle) {
        if(self.templateStyle.mainBackgroundColor) {
            UIColor *mainBackgroundColor = [UIColor colorWithRed:((CGFloat)(([self.templateStyle.mainBackgroundColor integerValue] >> 16) & 0xFF)) / 255.0
                                                       green:((CGFloat)(([self.templateStyle.mainBackgroundColor integerValue] >> 8) & 0xFF)) / 255.0
                                                        blue:((CGFloat)([self.templateStyle.mainBackgroundColor integerValue] & 0xFF)) / 255.0
                                                       alpha:1.0];
            self.isNativeAdView.backgroundColor = mainBackgroundColor;
        }
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

- (void)configureEventBlocks {
#ifdef RCT_NEW_ARCH_ENABLED
    // onAdLoadedEvent
    self.onAdLoadedEvent = [self](NSDictionary *event) {
        if (_eventEmitter) {
            auto fabricEventEmitter = std::static_pointer_cast<const facebook::react::LevelPlayNativeAdViewEventEmitter>(_eventEmitter);

            NSDictionary *nativeAdDict = event[@"nativeAd"];
            NSDictionary *adInfoDict = event[@"adInfo"];
            facebook::react::LevelPlayNativeAdViewEventEmitter::OnAdLoadedEvent fabricEvent;

            fabricEvent.nativeAd.title = safeStringFromDict(nativeAdDict, @"title");
            fabricEvent.nativeAd.body = safeStringFromDict(nativeAdDict, @"body");
            fabricEvent.nativeAd.advertiser = safeStringFromDict(nativeAdDict, @"advertiser");
            fabricEvent.nativeAd.callToAction = safeStringFromDict(nativeAdDict, @"callToAction");

            NSDictionary *iconDict = nativeAdDict[@"icon"];
            if (iconDict && ![iconDict isKindOfClass:[NSNull class]]) {
                fabricEvent.nativeAd.icon.uri = safeStringFromDict(iconDict, @"uri");
                fabricEvent.nativeAd.icon.imageData = safeStringFromDict(iconDict, @"imageData");
            }

            fabricEvent.nativeAd.placement = safeStringFromDict(nativeAdDict, @"placement");

            fabricEvent.adInfo.auctionId = safeStringFromDict(adInfoDict, @"auctionId");
            fabricEvent.adInfo.country = safeStringFromDict(adInfoDict, @"country");
            fabricEvent.adInfo.ab = safeStringFromDict(adInfoDict, @"ab");
            fabricEvent.adInfo.segmentName = safeStringFromDict(adInfoDict, @"segmentName");
            fabricEvent.adInfo.adNetwork = safeStringFromDict(adInfoDict, @"adNetwork");
            fabricEvent.adInfo.instanceName = safeStringFromDict(adInfoDict, @"instanceName");
            fabricEvent.adInfo.instanceId = safeStringFromDict(adInfoDict, @"instanceId");
            fabricEvent.adInfo.revenue = safeDoubleFromDict(adInfoDict, @"revenue");
            fabricEvent.adInfo.precision = safeStringFromDict(adInfoDict, @"precision");
            fabricEvent.adInfo.encryptedCPM = safeStringFromDict(adInfoDict, @"encryptedCPM");
            fabricEvent.adInfo.conversionValue = safeDoubleFromDict(adInfoDict, @"conversionValue");

            fabricEventEmitter->onAdLoadedEvent(fabricEvent);
        }
    };

    // onAdLoadFailedEvent
    self.onAdLoadFailedEvent = [self](NSDictionary *event) {
        if (_eventEmitter) {
            auto fabricEventEmitter = std::static_pointer_cast<const facebook::react::LevelPlayNativeAdViewEventEmitter>(_eventEmitter);

            NSDictionary *nativeAdDict = event[@"nativeAd"];
            NSDictionary *errorDict = event[@"error"];
            facebook::react::LevelPlayNativeAdViewEventEmitter::OnAdLoadFailedEvent fabricEvent;

            fabricEvent.nativeAd.title = safeStringFromDict(nativeAdDict, @"title");
            fabricEvent.nativeAd.body = safeStringFromDict(nativeAdDict, @"body");
            fabricEvent.nativeAd.advertiser = safeStringFromDict(nativeAdDict, @"advertiser");
            fabricEvent.nativeAd.callToAction = safeStringFromDict(nativeAdDict, @"callToAction");

            NSDictionary *iconDict = nativeAdDict[@"icon"];
            if (iconDict && ![iconDict isKindOfClass:[NSNull class]]) {
                fabricEvent.nativeAd.icon.uri = safeStringFromDict(iconDict, @"uri");
                fabricEvent.nativeAd.icon.imageData = safeStringFromDict(iconDict, @"imageData");
            }

            fabricEvent.nativeAd.placement = safeStringFromDict(nativeAdDict, @"placement");
            fabricEvent.error.errorCode = (int)safeDoubleFromDict(errorDict, @"errorCode");
            fabricEvent.error.message = safeStringFromDict(errorDict, @"message");

            fabricEventEmitter->onAdLoadFailedEvent(fabricEvent);
        }
    };

    // onAdClickedEvent
    self.onAdClickedEvent = [self](NSDictionary *event) {
        if (_eventEmitter) {
            auto fabricEventEmitter = std::static_pointer_cast<const facebook::react::LevelPlayNativeAdViewEventEmitter>(_eventEmitter);

            NSDictionary *nativeAdDict = event[@"nativeAd"];
            NSDictionary *adInfoDict = event[@"adInfo"];
            facebook::react::LevelPlayNativeAdViewEventEmitter::OnAdClickedEvent fabricEvent;

            fabricEvent.nativeAd.title = safeStringFromDict(nativeAdDict, @"title");
            fabricEvent.nativeAd.body = safeStringFromDict(nativeAdDict, @"body");
            fabricEvent.nativeAd.advertiser = safeStringFromDict(nativeAdDict, @"advertiser");
            fabricEvent.nativeAd.callToAction = safeStringFromDict(nativeAdDict, @"callToAction");

            NSDictionary *iconDict = nativeAdDict[@"icon"];
            if (iconDict && ![iconDict isKindOfClass:[NSNull class]]) {
                fabricEvent.nativeAd.icon.uri = safeStringFromDict(iconDict, @"uri");
                fabricEvent.nativeAd.icon.imageData = safeStringFromDict(iconDict, @"imageData");
            }

            fabricEvent.nativeAd.placement = safeStringFromDict(nativeAdDict, @"placement");

            fabricEvent.adInfo.auctionId = safeStringFromDict(adInfoDict, @"auctionId");
            fabricEvent.adInfo.country = safeStringFromDict(adInfoDict, @"country");
            fabricEvent.adInfo.ab = safeStringFromDict(adInfoDict, @"ab");
            fabricEvent.adInfo.segmentName = safeStringFromDict(adInfoDict, @"segmentName");
            fabricEvent.adInfo.adNetwork = safeStringFromDict(adInfoDict, @"adNetwork");
            fabricEvent.adInfo.instanceName = safeStringFromDict(adInfoDict, @"instanceName");
            fabricEvent.adInfo.instanceId = safeStringFromDict(adInfoDict, @"instanceId");
            fabricEvent.adInfo.revenue = safeDoubleFromDict(adInfoDict, @"revenue");
            fabricEvent.adInfo.precision = safeStringFromDict(adInfoDict, @"precision");
            fabricEvent.adInfo.encryptedCPM = safeStringFromDict(adInfoDict, @"encryptedCPM");
            fabricEvent.adInfo.conversionValue = safeDoubleFromDict(adInfoDict, @"conversionValue");

            fabricEventEmitter->onAdClickedEvent(fabricEvent);
        }
    };

    // onAdImpressionEvent
    self.onAdImpressionEvent = [self](NSDictionary *event) {
        if (_eventEmitter) {
            auto fabricEventEmitter = std::static_pointer_cast<const facebook::react::LevelPlayNativeAdViewEventEmitter>(_eventEmitter);

            NSDictionary *nativeAdDict = event[@"nativeAd"];
            NSDictionary *adInfoDict = event[@"adInfo"];
            facebook::react::LevelPlayNativeAdViewEventEmitter::OnAdImpressionEvent fabricEvent;

            fabricEvent.nativeAd.title = safeStringFromDict(nativeAdDict, @"title");
            fabricEvent.nativeAd.body = safeStringFromDict(nativeAdDict, @"body");
            fabricEvent.nativeAd.advertiser = safeStringFromDict(nativeAdDict, @"advertiser");
            fabricEvent.nativeAd.callToAction = safeStringFromDict(nativeAdDict, @"callToAction");

            NSDictionary *iconDict = nativeAdDict[@"icon"];
            if (iconDict && ![iconDict isKindOfClass:[NSNull class]]) {
                fabricEvent.nativeAd.icon.uri = safeStringFromDict(iconDict, @"uri");
                fabricEvent.nativeAd.icon.imageData = safeStringFromDict(iconDict, @"imageData");
            }

            fabricEvent.nativeAd.placement = safeStringFromDict(nativeAdDict, @"placement");

            fabricEvent.adInfo.auctionId = safeStringFromDict(adInfoDict, @"auctionId");
            fabricEvent.adInfo.country = safeStringFromDict(adInfoDict, @"country");
            fabricEvent.adInfo.ab = safeStringFromDict(adInfoDict, @"ab");
            fabricEvent.adInfo.segmentName = safeStringFromDict(adInfoDict, @"segmentName");
            fabricEvent.adInfo.adNetwork = safeStringFromDict(adInfoDict, @"adNetwork");
            fabricEvent.adInfo.instanceName = safeStringFromDict(adInfoDict, @"instanceName");
            fabricEvent.adInfo.instanceId = safeStringFromDict(adInfoDict, @"instanceId");
            fabricEvent.adInfo.revenue = safeDoubleFromDict(adInfoDict, @"revenue");
            fabricEvent.adInfo.precision = safeStringFromDict(adInfoDict, @"precision");
            fabricEvent.adInfo.encryptedCPM = safeStringFromDict(adInfoDict, @"encryptedCPM");
            fabricEvent.adInfo.conversionValue = safeDoubleFromDict(adInfoDict, @"conversionValue");

            fabricEventEmitter->onAdImpressionEvent(fabricEvent);
        }
    };
#endif
}

// Helper method to bind native ad to view (used in Fabric mode when delegate is nil)
- (void)bindNativeAdToView:(LevelPlayNativeAd *)nativeAd {
    if (nativeAd == nil || self.isNativeAdView == nil) {
        return;
    }

    // Extract views from XIB
    UILabel *titleView = self.isNativeAdView.adTitleView;
    UILabel *bodyView = self.isNativeAdView.adBodyView;
    UILabel *advertiserView = self.isNativeAdView.adAdvertiserView;
    UIButton *callToActionView = self.isNativeAdView.adCallToActionView;
    UIImageView *iconView = self.isNativeAdView.adAppIcon;
    LevelPlayMediaView *mediaView = self.isNativeAdView.adMediaView;

    // Bind native ad data to views
    if (nativeAd.title != nil) {
        titleView.text = nativeAd.title;
        [self.isNativeAdView setAdTitleView:titleView];
    }

    if (nativeAd.body != nil) {
        bodyView.text = nativeAd.body;
        [self.isNativeAdView setAdBodyView:bodyView];
    }

    if (nativeAd.advertiser != nil) {
        advertiserView.text = nativeAd.advertiser;
        [self.isNativeAdView setAdAdvertiserView:advertiserView];
    }

    if (nativeAd.callToAction != nil) {
        [callToActionView setTitle:nativeAd.callToAction forState:UIControlStateNormal];
        [self.isNativeAdView setAdCallToActionView:callToActionView];
    }

    if (nativeAd.icon != nil) {
        iconView.image = nativeAd.icon.image;
        [self.isNativeAdView setAdAppIcon:iconView];
    }

    if (mediaView != nil) {
        [self.isNativeAdView setAdMediaView:mediaView];
    }

    // Register native ad views with the provided native ad
    [self.isNativeAdView registerNativeAdViews:nativeAd];
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

    // Bind native ad to view
    // Old arch (Interop enabled): delegate is always set, use it for both templates and custom views
    // Fabric (Interop disabled): delegate is nil, use direct binding for templates only
    if (self.delegate) {
        [self.delegate bindNativeAdToView:nativeAd isNativeAdView:self.isNativeAdView];
    } else {
        // Fabric mode without delegate - direct binding for templates
        [self bindNativeAdToView:nativeAd];
    }

    if (self.onAdLoadedEvent) {
        self.onAdLoadedEvent(@{
            @"nativeAd": [LevelPlayUtils getDictWithNativeAd:nativeAd],
            @"adInfo": [LevelPlayUtils getDictWithAdInfo:adInfo]
        });
    }

    // Apply styles
    [self applyStylesWithTitleView:self.isNativeAdView.adTitleView
                          bodyView:self.isNativeAdView.adBodyView
                    advertiserView:self.isNativeAdView.adAdvertiserView
                  callToActionView:self.isNativeAdView.adCallToActionView];

    // Visible the ad
    self.isNativeAdView.hidden = NO;
}

/**
 Called after a native has attempted to load an ad but failed.
 @param nativeAd Level Play native ad.
 @param error The reason for the error
 */
- (void)didFailToLoad:(LevelPlayNativeAd *)nativeAd withError:(NSError *)error
{
    if (self.onAdLoadFailedEvent) {
        self.onAdLoadFailedEvent(@{
            @"nativeAd": [LevelPlayUtils getDictWithNativeAd:nativeAd],
            @"error": [LevelPlayUtils getDictWithError:error]
        });
    }
}

/**
 Called after a native ad has been clicked.
 @param nativeAd Level Play native ad.
 @param adInfo The info of the ad.
 */

- (void)didClick:(LevelPlayNativeAd *)nativeAd withAdInfo:(ISAdInfo *)adInfo
{
    if (self.onAdClickedEvent) {
        self.onAdClickedEvent(@{
            @"nativeAd": [LevelPlayUtils getDictWithNativeAd:nativeAd],
            @"adInfo": [LevelPlayUtils getDictWithAdInfo:adInfo]
        });
    }
}

/**
 Called after a native ad impression has been recorded.
 @param nativeAd Level Play native ad.
 @param adInfo The info of the ad.
 */
- (void)didRecordImpression:(LevelPlayNativeAd *)nativeAd withAdInfo:(ISAdInfo *)adInfo
{
    if (self.onAdImpressionEvent) {
        self.onAdImpressionEvent(@{
            @"nativeAd": [LevelPlayUtils getDictWithNativeAd:nativeAd],
            @"adInfo": [LevelPlayUtils getDictWithAdInfo:adInfo]
        });
    }
}

#ifdef RCT_NEW_ARCH_ENABLED
- (void)handleCommand:(NSString *)commandName args:(NSArray *)args
{
  RCTLevelPlayNativeAdViewHandleCommand(self, commandName, args);
}
#endif

@end

#ifdef RCT_NEW_ARCH_ENABLED
Class<RCTComponentViewProtocol> LevelPlayNativeAdViewCls(void)
{
    return [LevelPlayNativeAdView class];
}
#endif

