#import <UIKit/UIKit.h>
#import <React/RCTComponent.h>
#import <React/RCTUIManagerUtils.h>
#import <React/RCTImageView.h>
#import <React/RCTBridgeModule.h>
#import <IronSource/IronSource.h>
#import "RCTLevelPlayNativeAdViewManager.h"
#import "LevelPlayNativeAdTemplateStyle.h"

@interface RCTLevelPlayNativeAdView : UIView

@property (nonatomic, weak) RCTBridge *bridge;
@property (nonatomic, strong) NSString *layoutName;
@property (nonatomic, weak) id<RCTLevelPlayNativeAdViewManagerDelegate> delegate;
@property (nonatomic, copy, nullable) NSString *placement;
@property (nonatomic, copy, nullable) NSString *templateType;
@property (nonatomic, copy, nullable) NSString *viewType;
@property (nonatomic, copy, nullable) LevelPlayNativeAdTemplateStyle *templateStyle;
@property (nonatomic, strong, nullable) LevelPlayNativeAd *nativeAd;
@property (nonatomic, strong) ISNativeAdView *isNativeAdView;
@property (nonatomic, copy, nullable) RCTDirectEventBlock onAdLoadedEvent;
@property (nonatomic, copy, nullable) RCTDirectEventBlock onAdLoadFailedEvent;
@property (nonatomic, copy, nullable) RCTDirectEventBlock onAdClickedEvent;
@property (nonatomic, copy, nullable) RCTDirectEventBlock onAdImpressionEvent;

- (instancetype)initWithBridge:(RCTBridge *)bridge layoutName:(nullable NSString *)layoutName;
- (void)loadAd;
- (void)destroyAd;

@end
