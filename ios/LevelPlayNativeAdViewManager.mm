#import "LevelPlayNativeAdViewManager.h"
#import "LevelPlayNativeAdView.h"
#import "LevelPlayNativeAdViewManagerTemplate.h"
#import <React/RCTBridge.h>
#import <React/RCTUIManager.h>

/**
 * Manager abstract class for creating instances of LevelPlayNativeAdView with build-in templates and custom layouts.
 * This factory is responsible for creating instances of LevelPlayNativeAdView and bind their views
 * to the native ad created.
 *
 * @param layoutName The layout layoutName used for custom native ad layout.
 */
@implementation LevelPlayNativeAdViewManager

// Base manager - exports as LevelPlayNativeAdView (default template)
RCT_EXPORT_MODULE(LevelPlayNativeAdView)

// Map React Native properties to the view's properties
RCT_EXPORT_VIEW_PROPERTY(creationParams, NSDictionary)

// Event Callbacks
RCT_EXPORT_VIEW_PROPERTY(onAdLoadedEvent, RCTDirectEventBlock)
RCT_EXPORT_VIEW_PROPERTY(onAdLoadFailedEvent, RCTDirectEventBlock)
RCT_EXPORT_VIEW_PROPERTY(onAdImpressionEvent, RCTDirectEventBlock)
RCT_EXPORT_VIEW_PROPERTY(onAdClickedEvent, RCTDirectEventBlock)

- (instancetype)initWithDelegate:(id<LevelPlayNativeAdViewManagerDelegate>)delegate layoutName:(nullable NSString *)layoutName
{
    self = [super init];
    if (self) {
        self.delegate = delegate;
        self.layoutName = layoutName;
    }
    return self;
}

- (instancetype)init
{
    self = [super init];
    if (self) {
        // React Native calls this for LevelPlayNativeAdView module
        // Create template manager as delegate for built-in templates
        self.delegate = [[LevelPlayNativeAdViewManagerTemplate alloc] init];
        self.layoutName = nil;
    }
    return self;
}

+ (BOOL)requiresMainQueueSetup {
    // Determine whether the module needs to be initialized on the main thread.
    return YES;
}

- (UIView *)view
{
    LevelPlayNativeAdView *nativeAdView = [[LevelPlayNativeAdView alloc] initWithBridge: self.bridge layoutName:self.layoutName];
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
    [self.bridge.uiManager addUIBlock:^(__unused RCTUIManager *uiManager, NSDictionary<NSNumber *, UIView *> *viewRegistry) {
        UIView *view = viewRegistry[reactTag];
        if (!view || ![view isKindOfClass:[LevelPlayNativeAdView class]]) {
            RCTLogError(@"Cannot find LevelPlayNativeAdView with tag #%@", reactTag);
            return;
        }

        LevelPlayNativeAdView *adView = (LevelPlayNativeAdView *) view;
        switch ([commandId intValue]) {
            case 0:
                [adView loadAd];
                break;
            case 1:
                [adView destroyAd];
                break;
            default:
                RCTLogError(@"Unrecognized command ID #%@ for LevelPlayNativeAdView", commandId);
                break;
        }
    }];
}

@end

