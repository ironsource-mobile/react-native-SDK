#import <React/RCTViewManager.h>
#import <IronSource/IronSource.h>

NS_ASSUME_NONNULL_BEGIN

@protocol RCTLevelPlayNativeAdViewManagerDelegate <NSObject>
- (void)bindNativeAdToView:(LevelPlayNativeAd *)nativeAd isNativeAdView:(ISNativeAdView *)isNativeAdView;
@end

@interface RCTLevelPlayNativeAdViewManager : RCTViewManager

@property (nonatomic, copy) NSDictionary *creationParams;
@property (nonatomic, strong) NSString *layoutName;
@property (nonatomic, weak) id<RCTLevelPlayNativeAdViewManagerDelegate> delegate;

- (instancetype)initWithDelegate:(id<RCTLevelPlayNativeAdViewManagerDelegate>)delegate layoutName:(nullable NSString *)layoutName;

@end

NS_ASSUME_NONNULL_END
