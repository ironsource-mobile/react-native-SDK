#import "ATTrackingManagerBridge.h"
#import <AppTrackingTransparency/AppTrackingTransparency.h>

@implementation ATTrackingManagerBridge

RCT_EXPORT_MODULE();

#pragma mark - ATT API ======================================================================
/// https://developer.apple.com/documentation/apptrackingtransparency?language=objc

/**
 @name getTrackingAuthorizationStatus
 @return ATT Authorization Status in NSNumber
 */
RCT_EXPORT_METHOD(getTrackingAuthorizationStatus:
                  (RCTPromiseResolveBlock)resolve
                  withRejecter:(RCTPromiseRejectBlock)reject) {
    if (@available(iOS 14, *)) {
        resolve([NSNumber numberWithInt:(int)ATTrackingManager.trackingAuthorizationStatus]);
    } else {
        resolve([NSNumber numberWithInt:-1]);
    }
}

/**
 @name requestTrackingAuthorization
 @return ATT Authorization Status in NSNumber
 */
RCT_EXPORT_METHOD(requestTrackingAuthorization:
                  (RCTPromiseResolveBlock)resolve
                  withRejecter:(RCTPromiseRejectBlock)reject) {
    if (@available(iOS 14, *)) {
        [ATTrackingManager requestTrackingAuthorizationWithCompletionHandler:^(ATTrackingManagerAuthorizationStatus status) {
                resolve([NSNumber numberWithInt:(int)status]);
        }];
    } else {
        resolve([NSNumber numberWithInt:-1]);
    }
}

@end
