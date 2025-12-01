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
- (instancetype)initWithFrame:(CGRect)frame
{
  if (self = [super initWithFrame:frame]) {
    static const auto defaultProps = std::make_shared<const facebook::react::LevelPlayBannerAdViewProps>();
    _props = defaultProps;
  }
  return self;
}

- (void)updateProps:(Props::Shared const &)props oldProps:(Props::Shared const &)oldProps
{
  const auto &oldViewProps = *std::static_pointer_cast<LevelPlayBannerAdViewProps const>(_props);
  const auto &newViewProps = *std::static_pointer_cast<LevelPlayBannerAdViewProps const>(props);
  
  _props = std::static_pointer_cast<LevelPlayBannerAdViewProps const>(props);
  
  // Basic implementation - add specific prop handling as needed
  // For now, just call super to handle the basic props update
  
  [super updateProps:props oldProps:oldProps];
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
  if (creationParams) {
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

#pragma mark - LevelPlayBannerAdViewDelegate
- (void)didLoadAdWithAdInfo:(LPMAdInfo *) adInfo {
  NSDictionary *args = @{
          @"adInfo": [LevelPlayUtils getDictForLevelPlayAdInfo:adInfo]
  };
  if (self.onAdLoadedEvent) {
      self.onAdLoadedEvent(args);
  }
}

- (void)didFailToLoadAdWithAdUnitId:(NSString *)adUnitId error:(NSError *)error {
  NSDictionary *args = @{
    @"error": [LevelPlayUtils getDictForLevelPlayAdError:error adUnitId:adUnitId]
  };
  if (self.onAdLoadFailedEvent) {
      self.onAdLoadFailedEvent(args);
  }
}

- (void)didClickAdWithAdInfo:(LPMAdInfo *)adInfo {
  NSDictionary *args = @{
          @"adInfo": [LevelPlayUtils getDictForLevelPlayAdInfo:adInfo]
  };
  if (self.onAdClickedEvent) {
      self.onAdClickedEvent(args);
  }
}

- (void)didDisplayAdWithAdInfo:(LPMAdInfo *)adInfo {
  NSDictionary *args = @{
          @"adInfo": [LevelPlayUtils getDictForLevelPlayAdInfo:adInfo]
  };
  if (self.onAdDisplayedEvent) {
      self.onAdDisplayedEvent(args);
  }
}

- (void)didFailToDisplayAdWithAdInfo:(LPMAdInfo *)adInfo error:(NSError *)error {
  NSDictionary *args = @{
          @"adInfo": [LevelPlayUtils getDictForLevelPlayAdInfo:adInfo],
          @"error": [LevelPlayUtils getDictForLevelPlayAdError:error adUnitId: self.adUnitId]
  };
  if (self.onAdDisplayFailedEvent) {
      self.onAdDisplayFailedEvent(args);
  }
}

- (void)didLeaveAppWithAdInfo:(LPMAdInfo *)adInfo {
  NSDictionary *args = @{
          @"adInfo": [LevelPlayUtils getDictForLevelPlayAdInfo:adInfo]
  };
  if (self.onAdLeftApplicationEvent) {
      self.onAdLeftApplicationEvent(args);
  }
}

- (void)didExpandAdWithAdInfo:(LPMAdInfo *)adInfo {
  NSDictionary *args = @{
          @"adInfo": [LevelPlayUtils getDictForLevelPlayAdInfo:adInfo]
  };
  if (self.onAdExpandedEvent) {
      self.onAdExpandedEvent(args);
  }
}

- (void)didCollapseAdWithAdInfo:(LPMAdInfo *)adInfo {
  NSDictionary *args = @{
          @"adInfo": [LevelPlayUtils getDictForLevelPlayAdInfo:adInfo]
  };
  if (self.onAdCollapsedEvent) {
      self.onAdCollapsedEvent(args);
  }
}

@end

#ifdef RCT_NEW_ARCH_ENABLED
Class<RCTComponentViewProtocol> LevelPlayBannerAdViewCls(void)
{
    return [LevelPlayBannerAdView class];
}
#endif

