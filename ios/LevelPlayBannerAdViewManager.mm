#import "LevelPlayBannerAdViewManager.h"
#import "LevelPlayBannerAdView.h"
#import <React/RCTBridge.h>
#import <React/RCTUIManager.h>

@implementation LevelPlayBannerAdViewManager

// Export manager module
RCT_EXPORT_MODULE(LevelPlayBannerAdView)

// Map React Native properties to the view's properties
RCT_EXPORT_VIEW_PROPERTY(creationParams, NSDictionary)

// Event Callbacks
RCT_EXPORT_VIEW_PROPERTY(onAdLoadedEvent, RCTDirectEventBlock)
RCT_EXPORT_VIEW_PROPERTY(onAdLoadFailedEvent, RCTDirectEventBlock)
RCT_EXPORT_VIEW_PROPERTY(onAdDisplayedEvent, RCTDirectEventBlock)
RCT_EXPORT_VIEW_PROPERTY(onAdDisplayFailedEvent, RCTDirectEventBlock)
RCT_EXPORT_VIEW_PROPERTY(onAdClickedEvent, RCTDirectEventBlock)
RCT_EXPORT_VIEW_PROPERTY(onAdCollapsedEvent, RCTDirectEventBlock)
RCT_EXPORT_VIEW_PROPERTY(onAdExpandedEvent, RCTDirectEventBlock)
RCT_EXPORT_VIEW_PROPERTY(onAdLeftApplicationEvent, RCTDirectEventBlock)
RCT_EXPORT_VIEW_PROPERTY(onAdIdGeneratedEvent, RCTDirectEventBlock)

+ (BOOL)requiresMainQueueSetup {
    // Determine whether the module needs to be initialized on the main thread.
    return YES;
}

- (UIView *)view
{
  return [[LevelPlayBannerAdView alloc] initWithBridge: self.bridge];;
}

RCT_EXPORT_METHOD(loadAd:(nonnull NSNumber *)reactTag)
{
    [self executeCommandById:@0 forViewTag:reactTag];
}

RCT_EXPORT_METHOD(destroy:(nonnull NSNumber *)reactTag)
{
    [self executeCommandById:@1 forViewTag:reactTag];
}

RCT_EXPORT_METHOD(resumeAutoRefresh:(nonnull NSNumber *)reactTag)
{
    [self executeCommandById:@2 forViewTag:reactTag];
}

RCT_EXPORT_METHOD(pauseAutoRefresh:(nonnull NSNumber *)reactTag)
{
    [self executeCommandById:@3 forViewTag:reactTag];
}

- (void)executeCommandById:(NSNumber *)commandId forViewTag:(NSNumber *)reactTag
{
  [self.bridge.uiManager addUIBlock:^(__unused RCTUIManager *uiManager, NSDictionary<NSNumber *, UIView *> *viewRegistry) {
    UIView *view = viewRegistry[reactTag];
        if (!view || ![view isKindOfClass:[LevelPlayBannerAdView class]]) {
            RCTLogError(@"Cannot find LevelPlayBannerAdView with tag #%@", reactTag);
            return;
        }

        LevelPlayBannerAdView *adView = (LevelPlayBannerAdView *) view;
        switch ([commandId intValue]) {
            case 0:
                [adView loadAd];
                break;
            case 1:
                [adView destroy];
                break;
            case 2:
                [adView resumeAutoRefresh];
                break;
            case 3:
                [adView pauseAutoRefresh];
                break;
            default:
                RCTLogError(@"Unrecognized command ID #%@ for LevelPlayBannerAdView", commandId);
                break;
        }
    }];
}

@end

