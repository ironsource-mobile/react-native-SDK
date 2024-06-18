#import "RCTLevelPlayNativeAdViewManager.h"
#import "RCTLevelPlayNativeAdView.h"
#import <React/RCTBridge.h>
#import <React/RCTUIManager.h>

/**
 * Manager abstract class for creating instances of LevelPlayNativeAdView with build-in templates and custom layouts.
 * This factory is responsible for creating instances of LevelPlayNativeAdView and bind their views
 * to the native ad created.
 *
 * @param layoutName The layout layoutName used for custom native ad layout.
 */
@implementation RCTLevelPlayNativeAdViewManager

// Export manager module named 'RCTLevelPlayNativeAdViewManager'
RCT_EXPORT_MODULE()

// Map React Native properties to the view's properties
RCT_EXPORT_VIEW_PROPERTY(placement, NSString)
RCT_EXPORT_VIEW_PROPERTY(creationParams, NSDictionary)

// Event Callbacks
RCT_EXPORT_VIEW_PROPERTY(onAdLoadedEvent, RCTDirectEventBlock)
RCT_EXPORT_VIEW_PROPERTY(onAdLoadFailedEvent, RCTDirectEventBlock)
RCT_EXPORT_VIEW_PROPERTY(onAdImpressionEvent, RCTDirectEventBlock)
RCT_EXPORT_VIEW_PROPERTY(onAdClickedEvent, RCTDirectEventBlock)

- (instancetype)initWithDelegate:(id<RCTLevelPlayNativeAdViewManagerDelegate>)delegate layoutName:(nullable NSString *)layoutName
{
    self = [super init];
    if (self) {
        self.delegate = delegate;
        self.layoutName = layoutName;
    }
    return self;
}

+ (BOOL)requiresMainQueueSetup {
    // Determine whether the module needs to be initialized on the main thread.
    return YES;
}

- (UIView *)view
{
    RCTLevelPlayNativeAdView *nativeAdView = [[RCTLevelPlayNativeAdView alloc] initWithBridge: self.bridge layoutName:self.layoutName];
    nativeAdView.delegate = self.delegate;
    return nativeAdView;
}

RCT_EXPORT_METHOD(loadAd:(nonnull NSNumber *)reactTag)
{
    [self executeCommandById:@0 forViewTag:reactTag];
}

RCT_EXPORT_METHOD(destroyAd:(nonnull NSNumber *)reactTag)
{
    [self executeCommandById:@1 forViewTag:reactTag];
}

- (void)executeCommandById:(NSNumber *)commandId forViewTag:(NSNumber *)reactTag
{
    [self.bridge.uiManager addUIBlock:^(__unused RCTUIManager *uiManager, NSDictionary<NSNumber *, RCTLevelPlayNativeAdView *> *viewRegistry) {
        RCTLevelPlayNativeAdView *view = viewRegistry[reactTag];
        if (!view || ![view isKindOfClass:[RCTLevelPlayNativeAdView class]]) {
            RCTLogError(@"Cannot find RCTLevelPlayNativeAdView with tag #%@", reactTag);
            return;
        }

        switch ([commandId intValue]) {
            case 0:
                [view loadAd];
                break;
            case 1:
                [view destroyAd];
                break;
            default:
                RCTLogError(@"Unrecognized command ID #%@ for RCTLevelPlayNativeAdView", commandId);
                break;
        }
    }];
}

@end
