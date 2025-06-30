//
//  RCTLevelPlayBannerAdViewManager.m
//  IronSourceMediation
//
//  Created by Elad Sabag on 14/10/2024.
//  Copyright © 2024 Facebook. All rights reserved.
//
#import "RCTLevelPlayBannerAdViewManager.h"
#import "RCTLevelPlayBannerAdView.h"
#import <React/RCTBridge.h>
#import <React/RCTUIManager.h>

@implementation RCTLevelPlayBannerAdViewManager

// Export manager module
RCT_EXPORT_MODULE(levelPlayBannerAdView)

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
  return [[RCTLevelPlayBannerAdView alloc] initWithBridge: self.bridge];;
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
  [self.bridge.uiManager addUIBlock:^(__unused RCTUIManager *uiManager, NSDictionary<NSNumber *, RCTLevelPlayBannerAdView *> *viewRegistry) {
    RCTLevelPlayBannerAdView *view = viewRegistry[reactTag];
        if (!view || ![view isKindOfClass:[RCTLevelPlayBannerAdView class]]) {
            RCTLogError(@"Cannot find RCTLevelPlayBannerAdView with tag #%@", reactTag);
            return;
        }

        switch ([commandId intValue]) {
            case 0:
                [view loadAd];
                break;
            case 1:
                [view destroy];
                break;
            case 2:
                [view resumeAutoRefresh];
                break;
            case 3:
                [view pauseAutoRefresh];
                break;
            default:
                RCTLogError(@"Unrecognized command ID #%@ for RCTLevelPlayBannerAdView", commandId);
                break;
        }
    }];
}

@end
