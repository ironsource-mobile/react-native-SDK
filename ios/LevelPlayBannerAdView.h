#import <UIKit/UIKit.h>

#import <React/RCTUIManager.h>
#import <React/RCTComponent.h>
#import <React/RCTUIManagerUtils.h>
#import <React/RCTBridgeModule.h>
#import <IronSource/IronSource.h>
#import "LevelPlayBannerAdViewManager.h"

#ifdef RCT_NEW_ARCH_ENABLED
#import <React/RCTViewComponentView.h>
@interface LevelPlayBannerAdView : RCTViewComponentView
#else
@interface LevelPlayBannerAdView : UIView
#endif

NS_ASSUME_NONNULL_BEGIN

@property (nonatomic, weak) RCTBridge *bridge;
@property (nonatomic, copy, nullable) NSString *adId;
@property (nonatomic, copy, nullable) NSString *adUnitId;
@property (nonatomic, copy, nullable) NSDictionary *adSize;
@property (nonatomic, copy, nullable) NSDictionary *creationParams;
@property (nonatomic, copy, nullable) NSString *placementName;
@property (nonatomic, copy, nullable) NSNumber *bidFloor;
@property (nonatomic, strong, nullable) LPMBannerAdView *bannerAdView;
@property (nonatomic, copy, nullable) RCTDirectEventBlock onAdLoadedEvent;
@property (nonatomic, copy, nullable) RCTDirectEventBlock onAdLoadFailedEvent;
@property (nonatomic, copy, nullable) RCTDirectEventBlock onAdDisplayedEvent;
@property (nonatomic, copy, nullable) RCTDirectEventBlock onAdDisplayFailedEvent;
@property (nonatomic, copy, nullable) RCTDirectEventBlock onAdClickedEvent;
@property (nonatomic, copy, nullable) RCTDirectEventBlock onAdCollapsedEvent;
@property (nonatomic, copy, nullable) RCTDirectEventBlock onAdExpandedEvent;
@property (nonatomic, copy, nullable) RCTDirectEventBlock onAdLeftApplicationEvent;
@property (nonatomic, copy, nullable) RCTDirectEventBlock onAdIdGeneratedEvent;
@property (nonatomic, assign) BOOL isInitialized;

- (instancetype)initWithBridge:(RCTBridge *)bridge;
- (void)initializeBanner;
- (void)loadAd;
- (void)destroy;
- (void)pauseAutoRefresh;
- (void)resumeAutoRefresh;
- (LPMAdSize *)getLevelPlayAdSize:(NSDictionary *)adSizeDict;
- (void)addBannerViewWithSize:(LPMAdSize *)bannerSize;

@end

NS_ASSUME_NONNULL_END


