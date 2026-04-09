#import <React/RCTLog.h>
#import <React/RCTUIManager.h>
#import <IronSource/IronSource.h>
#import "LevelPlayBannerAdView.h"
#import "LevelPlayUtils.h"

#ifdef RCT_NEW_ARCH_ENABLED
#import <react/renderer/components/LevelPlayMediationSpec/ComponentDescriptors.h>
#import <react/renderer/components/LevelPlayMediationSpec/EventEmitters.h>
#import <react/renderer/components/LevelPlayMediationSpec/Props.h>
#import <react/renderer/components/LevelPlayMediationSpec/RCTComponentViewHelpers.h>
#import <React/RCTConversions.h>

using namespace facebook::react;

@interface LevelPlayBannerAdView() <RCTLevelPlayBannerAdViewViewProtocol, LPMBannerAdViewDelegate>
@property (nonatomic, assign) facebook::react::LevelPlayBannerAdViewProps::Shared _props;
#else
@interface LevelPlayBannerAdView()<LPMBannerAdViewDelegate>
#endif

@end

#pragma mark - Event Helpers

// Helper to safely convert NSString/NSNull to std::string
static std::string safeBannerStringFromDict(NSDictionary *dict, NSString *key) {
    id value = dict[key];
    if (value == nil || [value isKindOfClass:[NSNull class]]) {
        return "";
    }
    if ([value isKindOfClass:[NSString class]]) {
        return std::string([(NSString *)value UTF8String]);
    }
    return "";
}

static double safeBannerDoubleFromDict(NSDictionary *dict, NSString *key) {
    id value = dict[key];
    if (value == nil || [value isKindOfClass:[NSNull class]]) {
        return 0.0;
    }
    if ([value isKindOfClass:[NSNumber class]]) {
        return [(NSNumber *)value doubleValue];
    }
    return 0.0;
}

static bool safeBannerBoolFromDict(NSDictionary *dict, NSString *key) {
    id value = dict[key];
    if (value == nil || [value isKindOfClass:[NSNull class]]) {
        return false;
    }
    if ([value isKindOfClass:[NSNumber class]]) {
        return [(NSNumber *)value boolValue];
    }
    return false;
}

/**
 Class for implementing instance of LevelPlayBannerAdView.
 */
@implementation LevelPlayBannerAdView

// MARK: Initialization

- (instancetype)initWithBridge:(RCTBridge *)bridge
{
  self = [super init];
  if ( self )
  {
    _bridge = bridge;
  }

  return self;
}

#ifdef RCT_NEW_ARCH_ENABLED
+ (ComponentDescriptorProvider)componentDescriptorProvider
{
  return concreteComponentDescriptorProvider<LevelPlayBannerAdViewComponentDescriptor>();
}

- (instancetype)initWithFrame:(CGRect)frame
{
  if (self = [super initWithFrame:frame]) {
    static const auto defaultProps = std::make_shared<const facebook::react::LevelPlayBannerAdViewProps>();
    _props = defaultProps;
    [self configureEventBlocks];
  }
  return self;
}

- (void)updateProps:(Props::Shared const &)props oldProps:(Props::Shared const &)oldProps
{
  const auto &oldViewProps = *std::static_pointer_cast<LevelPlayBannerAdViewProps const>(_props);
  const auto &newViewProps = *std::static_pointer_cast<LevelPlayBannerAdViewProps const>(props);

  _props = std::static_pointer_cast<LevelPlayBannerAdViewProps const>(props);

  [super updateProps:props oldProps:oldProps];

  // Handle creationParams from Fabric
  auto creationParamsValue = newViewProps.creationParams;

  // Extract adUnitId
  if (!creationParamsValue.adUnitId.empty()) {
    self.adUnitId = RCTNSStringFromString(creationParamsValue.adUnitId);
  }

  // Extract placementName
  if (!creationParamsValue.placementName.empty()) {
    self.placementName = RCTNSStringFromString(creationParamsValue.placementName);
  }

  // Extract adSize
  auto adSizeValue = creationParamsValue.adSize;

  // Only create adSize if we have valid dimensions or a label
  if (adSizeValue.width > 0 || adSizeValue.height > 0 || !adSizeValue.adLabel.empty()) {
    NSMutableDictionary *adSizeDict = [NSMutableDictionary new];

    if (adSizeValue.width > 0) {
      adSizeDict[@"width"] = @(adSizeValue.width);
    }
    if (adSizeValue.height > 0) {
      adSizeDict[@"height"] = @(adSizeValue.height);
    }
    if (!adSizeValue.adLabel.empty()) {
      adSizeDict[@"adLabel"] = RCTNSStringFromString(adSizeValue.adLabel);
    }
    adSizeDict[@"isAdaptive"] = @(adSizeValue.isAdaptive);

    self.adSize = adSizeDict;
  }

  // Extract bidFloor
  if (creationParamsValue.bidFloor > 0) {
    self.bidFloor = @(creationParamsValue.bidFloor);
  }

  // Initialize banner with extracted params (only if not already initialized)
  if (!self.isInitialized && self.adUnitId && self.adUnitId.length > 0 && self.adSize) {
    [self initializeBanner];
    self.isInitialized = YES;
  }
}

- (void)prepareForRecycle
{
  [super prepareForRecycle];

  // Clean up banner ad view when recycled
  if (self.bannerAdView != nil) {
    [self.bannerAdView destroy];
    self.bannerAdView = nil;
  }

  // Reset properties
  self.adUnitId = nil;
  self.placementName = nil;
  self.adSize = nil;
  self.bidFloor = nil;
  self.adId = nil;
  self.isInitialized = NO;
}
#endif

// MARK: Banner Ad View Methods
- (void)initializeBanner {
    LPMBannerAdViewConfigBuilder *adConfigBuilder = [LPMBannerAdViewConfigBuilder new];
    LPMAdSize *bannerSize = [self getLevelPlayAdSize:self.adSize];
    if (bannerSize != nil) {
        [adConfigBuilder setWithAdSize:bannerSize];
    }
    if (self.placementName != nil && ![self.placementName isEqualToString:@""]) {
        [adConfigBuilder setWithPlacementName:self.placementName];
    }
    if (self.bidFloor != nil) {
        [adConfigBuilder setWithBidFloor:self.bidFloor];
    }
    LPMBannerAdViewConfig *adConfig = [adConfigBuilder build];

    // Create a new banner view
    self.bannerAdView = [[LPMBannerAdView alloc] initWithAdUnitId:self.adUnitId config:adConfig];

    [self.bannerAdView setDelegate:self];

    // Add the banner view to the view hierarchy
    [self addBannerViewWithSize:bannerSize];

    // Access adId property if available
    if ([self.bannerAdView respondsToSelector:@selector(adId)]) {
        self.adId = [self.bannerAdView adId];

    // Send event with adId to React Native
    if (self.adId != nil && self.onAdIdGeneratedEvent) {  // Add the null check!
      NSDictionary *args = @{
        @"adId": self.adId
      };
      self.onAdIdGeneratedEvent(args);
    }
  }
}

/**
 * Loads the native ad and informs the Flutter side upon completion.
 */
- (void)loadAd {
  // If the banner ad view is destroyed or not initialized, create a new one
  if (self.bannerAdView != nil) {
    [self.bannerAdView loadAdWithViewController: [LevelPlayUtils getRootViewController]];
  }
}

- (void)destroy {
  if (self.bannerAdView != nil) {
    [self.bannerAdView destroy];
  }
}

- (void)pauseAutoRefresh {
  if (self.bannerAdView != nil) {
    [self.bannerAdView pauseAutoRefresh];
  }
}

- (void)resumeAutoRefresh {
  if (self.bannerAdView != nil) {
    [self.bannerAdView resumeAutoRefresh];
  }
}

#pragma mark - Setters for React Props

- (void)setCreationParams:(NSDictionary *)creationParams
{
  _creationParams = creationParams;

  // Extract parameters from creationParams
  if (creationParams && !self.isInitialized) {
    // Set properties on the view
    if (creationParams[@"adUnitId"]) {
      self.adUnitId = creationParams[@"adUnitId"];
    }

    if (creationParams[@"placementName"]) {
      self.placementName = creationParams[@"placementName"];
    }

    if (creationParams[@"adSize"]) {
      self.adSize = creationParams[@"adSize"];
    }

    if (creationParams[@"bidFloor"]) {
      self.bidFloor = creationParams[@"bidFloor"];
    }

    // Initialize banner after setting all properties
    [self initializeBanner];
    self.isInitialized = YES;
  }
}

- (LPMAdSize *)getLevelPlayAdSize:(NSDictionary *)adSizeDict {
    NSNumber *widthNumber = adSizeDict[@"width"];
    NSNumber *heightNumber = adSizeDict[@"height"];
    NSString *adLabel = adSizeDict[@"adLabel"];
    NSNumber *isAdaptiveNumber = adSizeDict[@"isAdaptive"];

    int width = [widthNumber intValue];
    int height = [heightNumber intValue];
    BOOL isAdaptive = [isAdaptiveNumber boolValue];
    CGFloat widthFloat = [widthNumber floatValue];

    // At this point, developer has provided ad size, which means checks for
    // width and height already performed by the sdk and no need to check again.
    if (isAdaptive) {
        // Valid width provided as adaptive already called if entered here
        return [LPMAdSize createAdaptiveAdSizeWithWidth: widthFloat];
    } else if ([adLabel isEqualToString:@"BANNER"]) {
        return [LPMAdSize bannerSize];
    } else if ([adLabel isEqualToString:@"LARGE"]) {
        return [LPMAdSize largeSize];
    } else if ([adLabel isEqualToString:@"MEDIUM_RECTANGLE"]) {
        return [LPMAdSize mediumRectangleSize];
    } else if ([adLabel isEqualToString:@"CUSTOM"]) {
        return [LPMAdSize customSizeWithWidth:width height:height];
    } else {
        return nil;
    }
}

- (void)addBannerViewWithSize:(LPMAdSize *)bannerSize {
    self.bannerAdView.translatesAutoresizingMaskIntoConstraints = NO;

    // Add the banner view to the view hierarchy
    [self addSubview:self.bannerAdView];

    [NSLayoutConstraint activateConstraints:@[
        [self.bannerAdView.bottomAnchor constraintEqualToAnchor:self.safeAreaLayoutGuide.bottomAnchor],
        [self.bannerAdView.centerXAnchor constraintEqualToAnchor:self.centerXAnchor],
        [self.bannerAdView.widthAnchor constraintEqualToConstant:bannerSize.width],
        [self.bannerAdView.heightAnchor constraintEqualToConstant:bannerSize.height]
    ]];
}

- (void)configureEventBlocks {
#ifdef RCT_NEW_ARCH_ENABLED
    // onAdLoadedEvent
    self.onAdLoadedEvent = [self](NSDictionary *event) {
        if (_eventEmitter) {
            auto fabricEventEmitter = std::static_pointer_cast<const facebook::react::LevelPlayBannerAdViewEventEmitter>(_eventEmitter);

            NSDictionary *adInfoDict = event[@"adInfo"];
            facebook::react::LevelPlayBannerAdViewEventEmitter::OnAdLoadedEvent fabricEvent;
            fabricEvent.adInfo.adId = safeBannerStringFromDict(adInfoDict, @"adId");
            fabricEvent.adInfo.adUnitId = safeBannerStringFromDict(adInfoDict, @"adUnitId");
            fabricEvent.adInfo.adUnitName = safeBannerStringFromDict(adInfoDict, @"adUnitName");

            NSDictionary *adSizeDict = adInfoDict[@"adSize"];
            if (adSizeDict && ![adSizeDict isKindOfClass:[NSNull class]]) {
                fabricEvent.adInfo.adSize.width = safeBannerDoubleFromDict(adSizeDict, @"width");
                fabricEvent.adInfo.adSize.height = safeBannerDoubleFromDict(adSizeDict, @"height");
                fabricEvent.adInfo.adSize.adLabel = safeBannerStringFromDict(adSizeDict, @"adLabel");
                fabricEvent.adInfo.adSize.isAdaptive = safeBannerBoolFromDict(adSizeDict, @"isAdaptive");
            }

            fabricEvent.adInfo.adFormat = safeBannerStringFromDict(adInfoDict, @"adFormat");
            fabricEvent.adInfo.placementName = safeBannerStringFromDict(adInfoDict, @"placementName");
            fabricEvent.adInfo.auctionId = safeBannerStringFromDict(adInfoDict, @"auctionId");
            fabricEvent.adInfo.country = safeBannerStringFromDict(adInfoDict, @"country");
            fabricEvent.adInfo.ab = safeBannerStringFromDict(adInfoDict, @"ab");
            fabricEvent.adInfo.segmentName = safeBannerStringFromDict(adInfoDict, @"segmentName");
            fabricEvent.adInfo.adNetwork = safeBannerStringFromDict(adInfoDict, @"adNetwork");
            fabricEvent.adInfo.instanceName = safeBannerStringFromDict(adInfoDict, @"instanceName");
            fabricEvent.adInfo.instanceId = safeBannerStringFromDict(adInfoDict, @"instanceId");
            fabricEvent.adInfo.revenue = safeBannerDoubleFromDict(adInfoDict, @"revenue");
            fabricEvent.adInfo.precision = safeBannerStringFromDict(adInfoDict, @"precision");
            fabricEvent.adInfo.encryptedCPM = safeBannerStringFromDict(adInfoDict, @"encryptedCPM");
            fabricEvent.adInfo.conversionValue = safeBannerDoubleFromDict(adInfoDict, @"conversionValue");
            fabricEvent.adInfo.creativeId = safeBannerStringFromDict(adInfoDict, @"creativeId");

            fabricEventEmitter->onAdLoadedEvent(fabricEvent);
        }
    };

    // onAdLoadFailedEvent
    self.onAdLoadFailedEvent = [self](NSDictionary *event) {
        if (_eventEmitter) {
            auto fabricEventEmitter = std::static_pointer_cast<const facebook::react::LevelPlayBannerAdViewEventEmitter>(_eventEmitter);

            NSDictionary *errorDict = event[@"error"];
            facebook::react::LevelPlayBannerAdViewEventEmitter::OnAdLoadFailedEvent fabricEvent;
            fabricEvent.error.errorMessage = safeBannerStringFromDict(errorDict, @"errorMessage");
            fabricEvent.error.errorCode = (int)safeBannerDoubleFromDict(errorDict, @"errorCode");
            fabricEvent.error.adUnitId = safeBannerStringFromDict(errorDict, @"adUnitId");

            fabricEventEmitter->onAdLoadFailedEvent(fabricEvent);
        }
    };

    // onAdClickedEvent
    self.onAdClickedEvent = [self](NSDictionary *event) {
        if (_eventEmitter) {
            auto fabricEventEmitter = std::static_pointer_cast<const facebook::react::LevelPlayBannerAdViewEventEmitter>(_eventEmitter);

            NSDictionary *adInfoDict = event[@"adInfo"];
            facebook::react::LevelPlayBannerAdViewEventEmitter::OnAdClickedEvent fabricEvent;
            fabricEvent.adInfo.adId = safeBannerStringFromDict(adInfoDict, @"adId");
            fabricEvent.adInfo.adUnitId = safeBannerStringFromDict(adInfoDict, @"adUnitId");
            fabricEvent.adInfo.adUnitName = safeBannerStringFromDict(adInfoDict, @"adUnitName");

            NSDictionary *adSizeDict = adInfoDict[@"adSize"];
            if (adSizeDict && ![adSizeDict isKindOfClass:[NSNull class]]) {
                fabricEvent.adInfo.adSize.width = safeBannerDoubleFromDict(adSizeDict, @"width");
                fabricEvent.adInfo.adSize.height = safeBannerDoubleFromDict(adSizeDict, @"height");
                fabricEvent.adInfo.adSize.adLabel = safeBannerStringFromDict(adSizeDict, @"adLabel");
                fabricEvent.adInfo.adSize.isAdaptive = safeBannerBoolFromDict(adSizeDict, @"isAdaptive");
            }

            fabricEvent.adInfo.adFormat = safeBannerStringFromDict(adInfoDict, @"adFormat");
            fabricEvent.adInfo.placementName = safeBannerStringFromDict(adInfoDict, @"placementName");
            fabricEvent.adInfo.auctionId = safeBannerStringFromDict(adInfoDict, @"auctionId");
            fabricEvent.adInfo.country = safeBannerStringFromDict(adInfoDict, @"country");
            fabricEvent.adInfo.ab = safeBannerStringFromDict(adInfoDict, @"ab");
            fabricEvent.adInfo.segmentName = safeBannerStringFromDict(adInfoDict, @"segmentName");
            fabricEvent.adInfo.adNetwork = safeBannerStringFromDict(adInfoDict, @"adNetwork");
            fabricEvent.adInfo.instanceName = safeBannerStringFromDict(adInfoDict, @"instanceName");
            fabricEvent.adInfo.instanceId = safeBannerStringFromDict(adInfoDict, @"instanceId");
            fabricEvent.adInfo.revenue = safeBannerDoubleFromDict(adInfoDict, @"revenue");
            fabricEvent.adInfo.precision = safeBannerStringFromDict(adInfoDict, @"precision");
            fabricEvent.adInfo.encryptedCPM = safeBannerStringFromDict(adInfoDict, @"encryptedCPM");
            fabricEvent.adInfo.conversionValue = safeBannerDoubleFromDict(adInfoDict, @"conversionValue");
            fabricEvent.adInfo.creativeId = safeBannerStringFromDict(adInfoDict, @"creativeId");

            fabricEventEmitter->onAdClickedEvent(fabricEvent);
        }
    };

    // onAdDisplayedEvent
    self.onAdDisplayedEvent = [self](NSDictionary *event) {
        if (_eventEmitter) {
            auto fabricEventEmitter = std::static_pointer_cast<const facebook::react::LevelPlayBannerAdViewEventEmitter>(_eventEmitter);

            NSDictionary *adInfoDict = event[@"adInfo"];
            facebook::react::LevelPlayBannerAdViewEventEmitter::OnAdDisplayedEvent fabricEvent;
            fabricEvent.adInfo.adId = safeBannerStringFromDict(adInfoDict, @"adId");
            fabricEvent.adInfo.adUnitId = safeBannerStringFromDict(adInfoDict, @"adUnitId");
            fabricEvent.adInfo.adUnitName = safeBannerStringFromDict(adInfoDict, @"adUnitName");

            NSDictionary *adSizeDict = adInfoDict[@"adSize"];
            if (adSizeDict && ![adSizeDict isKindOfClass:[NSNull class]]) {
                fabricEvent.adInfo.adSize.width = safeBannerDoubleFromDict(adSizeDict, @"width");
                fabricEvent.adInfo.adSize.height = safeBannerDoubleFromDict(adSizeDict, @"height");
                fabricEvent.adInfo.adSize.adLabel = safeBannerStringFromDict(adSizeDict, @"adLabel");
                fabricEvent.adInfo.adSize.isAdaptive = safeBannerBoolFromDict(adSizeDict, @"isAdaptive");
            }

            fabricEvent.adInfo.adFormat = safeBannerStringFromDict(adInfoDict, @"adFormat");
            fabricEvent.adInfo.placementName = safeBannerStringFromDict(adInfoDict, @"placementName");
            fabricEvent.adInfo.auctionId = safeBannerStringFromDict(adInfoDict, @"auctionId");
            fabricEvent.adInfo.country = safeBannerStringFromDict(adInfoDict, @"country");
            fabricEvent.adInfo.ab = safeBannerStringFromDict(adInfoDict, @"ab");
            fabricEvent.adInfo.segmentName = safeBannerStringFromDict(adInfoDict, @"segmentName");
            fabricEvent.adInfo.adNetwork = safeBannerStringFromDict(adInfoDict, @"adNetwork");
            fabricEvent.adInfo.instanceName = safeBannerStringFromDict(adInfoDict, @"instanceName");
            fabricEvent.adInfo.instanceId = safeBannerStringFromDict(adInfoDict, @"instanceId");
            fabricEvent.adInfo.revenue = safeBannerDoubleFromDict(adInfoDict, @"revenue");
            fabricEvent.adInfo.precision = safeBannerStringFromDict(adInfoDict, @"precision");
            fabricEvent.adInfo.encryptedCPM = safeBannerStringFromDict(adInfoDict, @"encryptedCPM");
            fabricEvent.adInfo.conversionValue = safeBannerDoubleFromDict(adInfoDict, @"conversionValue");
            fabricEvent.adInfo.creativeId = safeBannerStringFromDict(adInfoDict, @"creativeId");

            fabricEventEmitter->onAdDisplayedEvent(fabricEvent);
        }
    };

    // onAdDisplayFailedEvent
    self.onAdDisplayFailedEvent = [self](NSDictionary *event) {
        if (_eventEmitter) {
            auto fabricEventEmitter = std::static_pointer_cast<const facebook::react::LevelPlayBannerAdViewEventEmitter>(_eventEmitter);

            NSDictionary *adInfoDict = event[@"adInfo"];
            NSDictionary *errorDict = event[@"error"];
            facebook::react::LevelPlayBannerAdViewEventEmitter::OnAdDisplayFailedEvent fabricEvent;

            fabricEvent.adInfo.adId = safeBannerStringFromDict(adInfoDict, @"adId");
            fabricEvent.adInfo.adUnitId = safeBannerStringFromDict(adInfoDict, @"adUnitId");
            fabricEvent.adInfo.adUnitName = safeBannerStringFromDict(adInfoDict, @"adUnitName");

            NSDictionary *adSizeDict = adInfoDict[@"adSize"];
            if (adSizeDict && ![adSizeDict isKindOfClass:[NSNull class]]) {
                fabricEvent.adInfo.adSize.width = safeBannerDoubleFromDict(adSizeDict, @"width");
                fabricEvent.adInfo.adSize.height = safeBannerDoubleFromDict(adSizeDict, @"height");
                fabricEvent.adInfo.adSize.adLabel = safeBannerStringFromDict(adSizeDict, @"adLabel");
                fabricEvent.adInfo.adSize.isAdaptive = safeBannerBoolFromDict(adSizeDict, @"isAdaptive");
            }

            fabricEvent.adInfo.adFormat = safeBannerStringFromDict(adInfoDict, @"adFormat");
            fabricEvent.adInfo.placementName = safeBannerStringFromDict(adInfoDict, @"placementName");
            fabricEvent.adInfo.auctionId = safeBannerStringFromDict(adInfoDict, @"auctionId");
            fabricEvent.adInfo.country = safeBannerStringFromDict(adInfoDict, @"country");
            fabricEvent.adInfo.ab = safeBannerStringFromDict(adInfoDict, @"ab");
            fabricEvent.adInfo.segmentName = safeBannerStringFromDict(adInfoDict, @"segmentName");
            fabricEvent.adInfo.adNetwork = safeBannerStringFromDict(adInfoDict, @"adNetwork");
            fabricEvent.adInfo.instanceName = safeBannerStringFromDict(adInfoDict, @"instanceName");
            fabricEvent.adInfo.instanceId = safeBannerStringFromDict(adInfoDict, @"instanceId");
            fabricEvent.adInfo.revenue = safeBannerDoubleFromDict(adInfoDict, @"revenue");
            fabricEvent.adInfo.precision = safeBannerStringFromDict(adInfoDict, @"precision");
            fabricEvent.adInfo.encryptedCPM = safeBannerStringFromDict(adInfoDict, @"encryptedCPM");
            fabricEvent.adInfo.conversionValue = safeBannerDoubleFromDict(adInfoDict, @"conversionValue");
            fabricEvent.adInfo.creativeId = safeBannerStringFromDict(adInfoDict, @"creativeId");

            fabricEvent.error.errorMessage = safeBannerStringFromDict(errorDict, @"errorMessage");
            fabricEvent.error.errorCode = (int)safeBannerDoubleFromDict(errorDict, @"errorCode");
            fabricEvent.error.adUnitId = safeBannerStringFromDict(errorDict, @"adUnitId");

            fabricEventEmitter->onAdDisplayFailedEvent(fabricEvent);
        }
    };

    // onAdLeftApplicationEvent
    self.onAdLeftApplicationEvent = [self](NSDictionary *event) {
        if (_eventEmitter) {
            auto fabricEventEmitter = std::static_pointer_cast<const facebook::react::LevelPlayBannerAdViewEventEmitter>(_eventEmitter);

            NSDictionary *adInfoDict = event[@"adInfo"];
            facebook::react::LevelPlayBannerAdViewEventEmitter::OnAdLeftApplicationEvent fabricEvent;
            fabricEvent.adInfo.adId = safeBannerStringFromDict(adInfoDict, @"adId");
            fabricEvent.adInfo.adUnitId = safeBannerStringFromDict(adInfoDict, @"adUnitId");
            fabricEvent.adInfo.adUnitName = safeBannerStringFromDict(adInfoDict, @"adUnitName");

            NSDictionary *adSizeDict = adInfoDict[@"adSize"];
            if (adSizeDict && ![adSizeDict isKindOfClass:[NSNull class]]) {
                fabricEvent.adInfo.adSize.width = safeBannerDoubleFromDict(adSizeDict, @"width");
                fabricEvent.adInfo.adSize.height = safeBannerDoubleFromDict(adSizeDict, @"height");
                fabricEvent.adInfo.adSize.adLabel = safeBannerStringFromDict(adSizeDict, @"adLabel");
                fabricEvent.adInfo.adSize.isAdaptive = safeBannerBoolFromDict(adSizeDict, @"isAdaptive");
            }

            fabricEvent.adInfo.adFormat = safeBannerStringFromDict(adInfoDict, @"adFormat");
            fabricEvent.adInfo.placementName = safeBannerStringFromDict(adInfoDict, @"placementName");
            fabricEvent.adInfo.auctionId = safeBannerStringFromDict(adInfoDict, @"auctionId");
            fabricEvent.adInfo.country = safeBannerStringFromDict(adInfoDict, @"country");
            fabricEvent.adInfo.ab = safeBannerStringFromDict(adInfoDict, @"ab");
            fabricEvent.adInfo.segmentName = safeBannerStringFromDict(adInfoDict, @"segmentName");
            fabricEvent.adInfo.adNetwork = safeBannerStringFromDict(adInfoDict, @"adNetwork");
            fabricEvent.adInfo.instanceName = safeBannerStringFromDict(adInfoDict, @"instanceName");
            fabricEvent.adInfo.instanceId = safeBannerStringFromDict(adInfoDict, @"instanceId");
            fabricEvent.adInfo.revenue = safeBannerDoubleFromDict(adInfoDict, @"revenue");
            fabricEvent.adInfo.precision = safeBannerStringFromDict(adInfoDict, @"precision");
            fabricEvent.adInfo.encryptedCPM = safeBannerStringFromDict(adInfoDict, @"encryptedCPM");
            fabricEvent.adInfo.conversionValue = safeBannerDoubleFromDict(adInfoDict, @"conversionValue");
            fabricEvent.adInfo.creativeId = safeBannerStringFromDict(adInfoDict, @"creativeId");

            fabricEventEmitter->onAdLeftApplicationEvent(fabricEvent);
        }
    };

    // onAdExpandedEvent
    self.onAdExpandedEvent = [self](NSDictionary *event) {
        if (_eventEmitter) {
            auto fabricEventEmitter = std::static_pointer_cast<const facebook::react::LevelPlayBannerAdViewEventEmitter>(_eventEmitter);

            NSDictionary *adInfoDict = event[@"adInfo"];
            facebook::react::LevelPlayBannerAdViewEventEmitter::OnAdExpandedEvent fabricEvent;
            fabricEvent.adInfo.adId = safeBannerStringFromDict(adInfoDict, @"adId");
            fabricEvent.adInfo.adUnitId = safeBannerStringFromDict(adInfoDict, @"adUnitId");
            fabricEvent.adInfo.adUnitName = safeBannerStringFromDict(adInfoDict, @"adUnitName");

            NSDictionary *adSizeDict = adInfoDict[@"adSize"];
            if (adSizeDict && ![adSizeDict isKindOfClass:[NSNull class]]) {
                fabricEvent.adInfo.adSize.width = safeBannerDoubleFromDict(adSizeDict, @"width");
                fabricEvent.adInfo.adSize.height = safeBannerDoubleFromDict(adSizeDict, @"height");
                fabricEvent.adInfo.adSize.adLabel = safeBannerStringFromDict(adSizeDict, @"adLabel");
                fabricEvent.adInfo.adSize.isAdaptive = safeBannerBoolFromDict(adSizeDict, @"isAdaptive");
            }

            fabricEvent.adInfo.adFormat = safeBannerStringFromDict(adInfoDict, @"adFormat");
            fabricEvent.adInfo.placementName = safeBannerStringFromDict(adInfoDict, @"placementName");
            fabricEvent.adInfo.auctionId = safeBannerStringFromDict(adInfoDict, @"auctionId");
            fabricEvent.adInfo.country = safeBannerStringFromDict(adInfoDict, @"country");
            fabricEvent.adInfo.ab = safeBannerStringFromDict(adInfoDict, @"ab");
            fabricEvent.adInfo.segmentName = safeBannerStringFromDict(adInfoDict, @"segmentName");
            fabricEvent.adInfo.adNetwork = safeBannerStringFromDict(adInfoDict, @"adNetwork");
            fabricEvent.adInfo.instanceName = safeBannerStringFromDict(adInfoDict, @"instanceName");
            fabricEvent.adInfo.instanceId = safeBannerStringFromDict(adInfoDict, @"instanceId");
            fabricEvent.adInfo.revenue = safeBannerDoubleFromDict(adInfoDict, @"revenue");
            fabricEvent.adInfo.precision = safeBannerStringFromDict(adInfoDict, @"precision");
            fabricEvent.adInfo.encryptedCPM = safeBannerStringFromDict(adInfoDict, @"encryptedCPM");
            fabricEvent.adInfo.conversionValue = safeBannerDoubleFromDict(adInfoDict, @"conversionValue");
            fabricEvent.adInfo.creativeId = safeBannerStringFromDict(adInfoDict, @"creativeId");

            fabricEventEmitter->onAdExpandedEvent(fabricEvent);
        }
    };

    // onAdCollapsedEvent
    self.onAdCollapsedEvent = [self](NSDictionary *event) {
        if (_eventEmitter) {
            auto fabricEventEmitter = std::static_pointer_cast<const facebook::react::LevelPlayBannerAdViewEventEmitter>(_eventEmitter);

            NSDictionary *adInfoDict = event[@"adInfo"];
            facebook::react::LevelPlayBannerAdViewEventEmitter::OnAdCollapsedEvent fabricEvent;
            fabricEvent.adInfo.adId = safeBannerStringFromDict(adInfoDict, @"adId");
            fabricEvent.adInfo.adUnitId = safeBannerStringFromDict(adInfoDict, @"adUnitId");
            fabricEvent.adInfo.adUnitName = safeBannerStringFromDict(adInfoDict, @"adUnitName");

            NSDictionary *adSizeDict = adInfoDict[@"adSize"];
            if (adSizeDict && ![adSizeDict isKindOfClass:[NSNull class]]) {
                fabricEvent.adInfo.adSize.width = safeBannerDoubleFromDict(adSizeDict, @"width");
                fabricEvent.adInfo.adSize.height = safeBannerDoubleFromDict(adSizeDict, @"height");
                fabricEvent.adInfo.adSize.adLabel = safeBannerStringFromDict(adSizeDict, @"adLabel");
                fabricEvent.adInfo.adSize.isAdaptive = safeBannerBoolFromDict(adSizeDict, @"isAdaptive");
            }

            fabricEvent.adInfo.adFormat = safeBannerStringFromDict(adInfoDict, @"adFormat");
            fabricEvent.adInfo.placementName = safeBannerStringFromDict(adInfoDict, @"placementName");
            fabricEvent.adInfo.auctionId = safeBannerStringFromDict(adInfoDict, @"auctionId");
            fabricEvent.adInfo.country = safeBannerStringFromDict(adInfoDict, @"country");
            fabricEvent.adInfo.ab = safeBannerStringFromDict(adInfoDict, @"ab");
            fabricEvent.adInfo.segmentName = safeBannerStringFromDict(adInfoDict, @"segmentName");
            fabricEvent.adInfo.adNetwork = safeBannerStringFromDict(adInfoDict, @"adNetwork");
            fabricEvent.adInfo.instanceName = safeBannerStringFromDict(adInfoDict, @"instanceName");
            fabricEvent.adInfo.instanceId = safeBannerStringFromDict(adInfoDict, @"instanceId");
            fabricEvent.adInfo.revenue = safeBannerDoubleFromDict(adInfoDict, @"revenue");
            fabricEvent.adInfo.precision = safeBannerStringFromDict(adInfoDict, @"precision");
            fabricEvent.adInfo.encryptedCPM = safeBannerStringFromDict(adInfoDict, @"encryptedCPM");
            fabricEvent.adInfo.conversionValue = safeBannerDoubleFromDict(adInfoDict, @"conversionValue");
            fabricEvent.adInfo.creativeId = safeBannerStringFromDict(adInfoDict, @"creativeId");

            fabricEventEmitter->onAdCollapsedEvent(fabricEvent);
        }
    };
#endif
}

#pragma mark - LevelPlayBannerAdViewDelegate
- (void)didLoadAdWithAdInfo:(LPMAdInfo *) adInfo {
  if (self.onAdLoadedEvent) {
    self.onAdLoadedEvent(@{@"adInfo": [LevelPlayUtils getDictForLevelPlayAdInfo:adInfo]});
  }
}

- (void)didFailToLoadAdWithAdUnitId:(NSString *)adUnitId error:(NSError *)error {
  if (self.onAdLoadFailedEvent) {
    self.onAdLoadFailedEvent(@{@"error": [LevelPlayUtils getDictForLevelPlayAdError:error adUnitId:adUnitId]});
  }
}

- (void)didClickAdWithAdInfo:(LPMAdInfo *)adInfo {
  if (self.onAdClickedEvent) {
    self.onAdClickedEvent(@{@"adInfo": [LevelPlayUtils getDictForLevelPlayAdInfo:adInfo]});
  }
}

- (void)didDisplayAdWithAdInfo:(LPMAdInfo *)adInfo {
  if (self.onAdDisplayedEvent) {
    self.onAdDisplayedEvent(@{@"adInfo": [LevelPlayUtils getDictForLevelPlayAdInfo:adInfo]});
  }
}

- (void)didFailToDisplayAdWithAdInfo:(LPMAdInfo *)adInfo error:(NSError *)error {
  if (self.onAdDisplayFailedEvent) {
    self.onAdDisplayFailedEvent(@{
      @"adInfo": [LevelPlayUtils getDictForLevelPlayAdInfo:adInfo],
      @"error": [LevelPlayUtils getDictForLevelPlayAdError:error adUnitId:self.adUnitId]
    });
  }
}

- (void)didLeaveAppWithAdInfo:(LPMAdInfo *)adInfo {
  if (self.onAdLeftApplicationEvent) {
    self.onAdLeftApplicationEvent(@{@"adInfo": [LevelPlayUtils getDictForLevelPlayAdInfo:adInfo]});
  }
}

- (void)didExpandAdWithAdInfo:(LPMAdInfo *)adInfo {
  if (self.onAdExpandedEvent) {
    self.onAdExpandedEvent(@{@"adInfo": [LevelPlayUtils getDictForLevelPlayAdInfo:adInfo]});
  }
}

- (void)didCollapseAdWithAdInfo:(LPMAdInfo *)adInfo {
  if (self.onAdCollapsedEvent) {
    self.onAdCollapsedEvent(@{@"adInfo": [LevelPlayUtils getDictForLevelPlayAdInfo:adInfo]});
  }
}

#ifdef RCT_NEW_ARCH_ENABLED
- (void)handleCommand:(NSString *)commandName args:(NSArray *)args
{
  RCTLevelPlayBannerAdViewHandleCommand(self, commandName, args);
}
#endif

@end

#ifdef RCT_NEW_ARCH_ENABLED
Class<RCTComponentViewProtocol> LevelPlayBannerAdViewCls(void)
{
    return [LevelPlayBannerAdView class];
}
#endif

