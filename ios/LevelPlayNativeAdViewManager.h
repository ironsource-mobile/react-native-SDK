#import <React/RCTViewManager.h>
#import <IronSource/IronSource.h>

NS_ASSUME_NONNULL_BEGIN

@protocol LevelPlayNativeAdViewManagerDelegate <NSObject>
- (void)bindNativeAdToView:(LevelPlayNativeAd *)nativeAd isNativeAdView:(ISNativeAdView *)isNativeAdView;
@end

@interface LevelPlayNativeAdViewManager : RCTViewManager

@property (nonatomic, copy) NSDictionary *creationParams;
@property (nonatomic, strong) NSString *layoutName;
@property (nonatomic, strong) id<LevelPlayNativeAdViewManagerDelegate> delegate;

- (instancetype)initWithDelegate:(id<LevelPlayNativeAdViewManagerDelegate>)delegate layoutName:(nullable NSString *)layoutName;

@end

NS_ASSUME_NONNULL_END

