#import <UIKit/UIKit.h>

#import <React/RCTUIManager.h>
#import <React/RCTComponent.h>
#import <React/RCTUIManagerUtils.h>
#import <React/RCTImageView.h>
#import <React/RCTBridgeModule.h>
#import <IronSource/IronSource.h>
#import "LevelPlayNativeAdViewManager.h"
#import "LevelPlayNativeAdTemplateStyle.h"

#ifdef RCT_NEW_ARCH_ENABLED
#import <React/RCTViewComponentView.h>
@interface LevelPlayNativeAdView : RCTViewComponentView
#else
@interface LevelPlayNativeAdView : UIView
#endif

NS_ASSUME_NONNULL_BEGIN

@property (nonatomic, weak) RCTBridge *bridge;
@property (nonatomic, strong) NSString *layoutName;
@property (nonatomic, weak) id<LevelPlayNativeAdViewManagerDelegate> delegate;
@property (nonatomic, copy, nullable) NSString *placement;
@property (nonatomic, copy, nullable) NSString *templateType;
@property (nonatomic, copy, nullable) NSString *viewType;
@property (nonatomic, copy, nullable) LevelPlayNativeAdTemplateStyle *templateStyle;
@property (nonatomic, strong, nullable) LevelPlayNativeAd *nativeAd;
@property (nonatomic, strong) ISNativeAdView *isNativeAdView;
@property (nonatomic, assign) BOOL isInitialized;
@property (nonatomic, copy, nullable) RCTDirectEventBlock onAdLoadedEvent;
@property (nonatomic, copy, nullable) RCTDirectEventBlock onAdLoadFailedEvent;
@property (nonatomic, copy, nullable) RCTDirectEventBlock onAdClickedEvent;
@property (nonatomic, copy, nullable) RCTDirectEventBlock onAdImpressionEvent;

- (instancetype)initWithBridge:(RCTBridge *)bridge layoutName:(nullable NSString *)layoutName;
- (void)loadAd;
- (void)destroyAd;

@end

NS_ASSUME_NONNULL_END

