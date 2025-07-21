//
//  LevelPlayMediation.m
//  Pods
//
//  Created by Elad Sabag on 03/07/2025.
//

#import "LevelPlayMediation.h"
#import <IronSource/IronSource.h>
#import "Constants.h"
#import "LevelPlayUtils.h"
#import "LevelPlayAdObjectManager.h"

@interface LevelPlayMediation() <LPMImpressionDataDelegate>

@property (nonatomic) BOOL hasEventListeners;

// LevelPlay Ad Instance Manager
@property (nonatomic,strong) LevelPlayAdObjectManager *levelPlayAdObjectManager;


@end

@implementation LevelPlayMediation

+ (BOOL)requiresMainQueueSetup
{
    return YES;
}


RCT_EXPORT_MODULE()

- (id)init {
    if (self = [super init]) {
      // LevelPlay Object Manager registry
      self.levelPlayAdObjectManager = [[LevelPlayAdObjectManager alloc] init];
    }
    return self;
}

#pragma mark - Base API =========================================================================

/**
 * Validates the integration of the LevelPlay SDK.
 */
RCT_EXPORT_METHOD(validateIntegration:
                  (RCTPromiseResolveBlock)resolve
                  withRejecter:(RCTPromiseRejectBlock)reject) {
    [LevelPlay validateIntegration];
    resolve(nil);
}

/**
 * Sets a dynamic user ID for tracking purposes.
 *
 * @param userId The user ID to set for LevelPlay SDK.
 */
RCT_EXPORT_METHOD(setDynamicUserId:(nonnull NSString *) userId
                  withResolver:(RCTPromiseResolveBlock)resolve
                  withRejecter:(RCTPromiseRejectBlock)reject) {
    [LevelPlay setDynamicUserId:userId];
     resolve(nil);
}

/**
 * Enables or disables debug mode for LevelPlay adapters.
 *
 * @param isEnabled A boolean flag to enable or disable debug mode.
 */
RCT_EXPORT_METHOD(setAdaptersDebug:(BOOL) isEnabled
                  withResolver:(RCTPromiseResolveBlock)resolve
                  withRejecter:(RCTPromiseRejectBlock)reject)  {
    [LevelPlay setAdaptersDebug:isEnabled];
    resolve(nil);
}

/**
 * Sets the user's consent status for data collection.
 *
 * @param isConsent A boolean flag indicating whether the user has given consent.
 */
RCT_EXPORT_METHOD(setConsent:(BOOL) isConsent
                  withResolver:(RCTPromiseResolveBlock)resolve
                  withRejecter:(RCTPromiseRejectBlock)reject)  {
    [LevelPlay setConsent:isConsent];
    resolve(nil);
}

/**
 * Configures a user segment with specific attributes for targeting purposes.
 *
 * @param segmentDict A dictionary containing segment details such as name, level, and custom parameters.
 */
RCT_EXPORT_METHOD(setSegment:(nonnull NSDictionary *) segmentDict
                  withResolver:(RCTPromiseResolveBlock)resolve
                  withRejecter:(RCTPromiseRejectBlock)reject) {
    LPMSegment *segment = [[LPMSegment alloc] init];
    NSMutableArray<NSString*> *allKeys = [[segmentDict allKeys] mutableCopy];

    for (NSString *key in allKeys)
    {
        if ([key isEqualToString:@"segmentName"]){
            NSString *segmentName = [segmentDict objectForKey:key];
            if(segmentName != nil && ![[NSNull null] isEqual:segmentName]){
                segment.segmentName = segmentName;
            }
        } else if ([key isEqualToString:@"level"]){
            NSNumber *level = [segmentDict objectForKey:key];
            if(level != nil && ![[NSNull null] isEqual:level]){
                segment.level = [level intValue];
            }
        } else if ([key isEqualToString:@"isPaying"]){
            NSNumber *isPayingNum = [segmentDict objectForKey:key];
            if(isPayingNum != nil && ![[NSNull null] isEqual:isPayingNum]){
                segment.paying = [isPayingNum boolValue];
            }
        } else if ([key isEqualToString:@"userCreationDate"]){
            NSNumber *ucd = [segmentDict objectForKey:key];
            if(ucd != nil && ![[NSNull null] isEqual:ucd]){
                NSDate *date = [NSDate dateWithTimeIntervalSince1970: [ucd doubleValue]/1000];
                segment.userCreationDate = date;
            }
        }  else if ([key isEqualToString:@"iapTotal"]){
            NSNumber *iapTotalNum = [segmentDict objectForKey:key];
            if(iapTotalNum != nil && ![[NSNull null] isEqual:iapTotalNum]){
                segment.iapTotal = [iapTotalNum doubleValue];
            }
        } else if ([key isEqualToString:@"customParameters"]){
            NSDictionary *customParams = [segmentDict objectForKey:key];
            if(customParams != nil && ![[NSNull null] isEqual:customParams]){
                // set custom values
                NSMutableArray<NSString*> *customKeys = [[customParams allKeys] mutableCopy];
                for (NSString *customKey in customKeys) {
                    NSString *customValue = [customParams objectForKey:customKey];
                    if(customValue != nil && ![[NSNull null] isEqual:customValue]){
                        [segment setCustomValue:customValue forKey:customKey];
                    }
                }
            }
        } else {
            reject(E_ILLEGAL_ARGUMENT, [NSString stringWithFormat: @"Invalid parameter. param: %@", key], nil);
        }
    }

    [LevelPlay setSegment:segment];
    resolve(nil);
}

/**
 * Sets metadata with key-value pairs for custom configurations.
 *
 * @param key The metadata key.
 * @param values An array of string values associated with the key.
 */
RCT_EXPORT_METHOD(setMetaData:(nonnull NSString *) key
                  withValues: (nonnull NSArray<NSString*> *) values
                  withResolver:(RCTPromiseResolveBlock)resolve
                  withRejecter:(RCTPromiseRejectBlock)reject)  {
    [LevelPlay setMetaDataWithKey:key values:[values mutableCopy]];
    resolve(nil);
}

/**
 * Launches the LevelPlay Test Suite for debugging and validation.
 */
RCT_EXPORT_METHOD(launchTestSuite:(RCTPromiseResolveBlock) resolve
                  withRejecter:(RCTPromiseRejectBlock) reject)  {
    dispatch_async(dispatch_get_main_queue(), ^{
        [LevelPlay launchTestSuite:[self getRootViewController]];
        resolve(nil);
    });
}

/**
 * Adds a listener for receiving impression data events.
 */
RCT_EXPORT_METHOD(addImpressionDataListener:(RCTPromiseResolveBlock) resolve
                  withRejecter:(RCTPromiseRejectBlock) reject)  {
    [LevelPlay addImpressionDataDelegate:self];
    resolve(nil);
}

#pragma mark - LevelPlay Init API ===================================================================

/**
 * Initializes the LevelPlay SDK with the provided configuration.
 * 
 * @param args A dictionary containing:
 *   - "appKey" (NSString): The application key for initializing LevelPlay.
 *   - "userId" (NSString, optional): The user ID for tracking.
 *   - "adFormats" (NSArray<NSString *>): List of ad formats to support (e.g., REWARDED, INTERSTITIAL, etc.).
 * @param resolve A block to resolve the promise when initialization is complete.
 * @param reject A block to reject the promise if there is an error.
 */
RCT_EXPORT_METHOD(initLevelPlay:(nonnull id)args
                  withResolver:(RCTPromiseResolveBlock)resolve
                  withRejecter:(RCTPromiseRejectBlock)reject) {
    NSString *appKey = [args valueForKey:@"appKey"];
    NSString *userId = [args valueForKey:@"userId"];
    NSArray<NSString*> *adFormats = [args valueForKey:@"adFormats"];

    NSMutableArray<NSString*> *parsedLegacyAdFormats = [[NSMutableArray alloc]init];
    if(adFormats != nil && adFormats.count) {
        for(NSString *unit in adFormats){
            if([unit isEqualToString:@"REWARDED"]){
                [parsedLegacyAdFormats addObject:IS_REWARDED_VIDEO];
            } else if ([unit isEqualToString:@"INTERSTITIAL"]){
                [parsedLegacyAdFormats addObject:IS_INTERSTITIAL];
            } else if ([unit isEqualToString:@"BANNER"]){
                [parsedLegacyAdFormats addObject:IS_BANNER];
            } else if ([unit isEqualToString:@"NATIVE_AD"]){
                [parsedLegacyAdFormats addObject:IS_NATIVE_AD];
            }
        }
    }
    LPMInitRequestBuilder *requestBuilder = [[LPMInitRequestBuilder alloc] initWithAppKey: appKey];
    [requestBuilder withLegacyAdFormats: parsedLegacyAdFormats];
    if(userId != nil){
        [requestBuilder withUserId: userId];
    }
    LPMInitRequest *initRequest = [requestBuilder build];
    [LevelPlay initWithRequest:initRequest completion:^(LPMConfiguration *_Nullable config, NSError *_Nullable error){
        if(error) {
            // There was an error on initialization. Take necessary actions or retry
            [self sendEventWithEventName:ON_INIT_FAILED withArgs:[LevelPlayUtils getDictWithInitError: error]];
        } else {
            // Initialization was successful. You can now load banner ad or perform other tasks
            [self sendEventWithEventName:ON_INIT_SUCCESS withArgs:[LevelPlayUtils getDictWithInitSuccess: config]];
        }
    }];
    resolve(nil);
}

#pragma mark - LevelPlay Interstitial Ad API ===================================================================

/**
 * Creates an interstitial ad with the specified ad unit ID and optional bid floor.
 */
RCT_EXPORT_METHOD(createInterstitialAd:(nonnull NSDictionary *)args
                  withResolver:(RCTPromiseResolveBlock)resolve
                  withRejecter:(RCTPromiseRejectBlock)reject)
{
    NSString *adUnitId = args[@"adUnitId"];
    NSNumber *bidFloor = args[@"bidFloor"];
    NSString *adId = [self.levelPlayAdObjectManager createInterstitialAd:adUnitId bidFloor:bidFloor eventEmitter:self];
    resolve(adId);
}

/**
 * Loads an interstitial ad with the specified ad ID.
 */
RCT_EXPORT_METHOD(loadInterstitialAd:(nonnull id)args
                  withResolver:(RCTPromiseResolveBlock)resolve
                  withRejecter:(RCTPromiseRejectBlock)reject) {
    NSString *adId = [args valueForKey:@"adId"];
    [self.levelPlayAdObjectManager loadInterstitialAd:adId];
    resolve(nil);
}

/**
 * Displays an interstitial ad with the specified ad ID and optional placement name.
 */
RCT_EXPORT_METHOD(showInterstitialAd:(nonnull id)args
                  withResolver:(RCTPromiseResolveBlock)resolve
                  withRejecter:(RCTPromiseRejectBlock)reject) {
    NSString *adId = [args valueForKey:@"adId"];
    NSString *placementName = [args valueForKey:@"placementName"] ?: [NSNull null];
    [self.levelPlayAdObjectManager showInterstitialAd:adId placementName:placementName rootViewController:[LevelPlayUtils getRootViewController]];
    resolve(nil);
}

/**
 * Checks if an interstitial ad is ready for the specified ad ID.
 */
RCT_EXPORT_METHOD(isInterstitialAdReady:(nonnull id)args
                  withResolver:(RCTPromiseResolveBlock)resolve
                  withRejecter:(RCTPromiseRejectBlock)reject) {
    NSString *adId = [args valueForKey:@"adId"];
    BOOL isAdReady = [self.levelPlayAdObjectManager isInterstitialAdReady:adId];
    resolve([NSNumber numberWithBool: isAdReady]);
}

/**
 * Checks if an interstitial ad placement is capped for the specified placement name.
 */
RCT_EXPORT_METHOD(isInterstitialAdPlacementCapped:(nonnull id)args
                  withResolver:(RCTPromiseResolveBlock)resolve
                  withRejecter:(RCTPromiseRejectBlock)reject) {
    NSString *placementName = [args valueForKey:@"placementName"];
    BOOL isCapped = [LPMInterstitialAd isPlacementCapped:placementName];
    resolve([NSNumber numberWithBool:isCapped]);
}

/**
 * Removes a specific ad by its ID.
 */
RCT_EXPORT_METHOD(removeAd:(nonnull id)args
                  withResolver:(RCTPromiseResolveBlock)resolve
                  withRejecter:(RCTPromiseRejectBlock)reject) {
    NSString *adId = [args valueForKey:@"adId"];
    [self.levelPlayAdObjectManager removeAd:adId];
    resolve(nil);
}

/**
 * Removes all ads.
 */
RCT_EXPORT_METHOD(removeAllAds:(nonnull id)args
                  withResolver:(RCTPromiseResolveBlock)resolve
                  withRejecter:(RCTPromiseRejectBlock)reject) {
    [self.levelPlayAdObjectManager removeAllAds];
    resolve(nil);
}

#pragma mark - LPMAdSize API ========================================================================

/**
 * Creates an adaptive ad size based on the specified width.
 */
RCT_EXPORT_METHOD(createAdaptiveAdSizeWithWidth:(nonnull NSNumber *) width
                  withResolver:(RCTPromiseResolveBlock)resolve
                  withRejecter:(RCTPromiseRejectBlock)reject) {
    CGFloat widthFloat = [width floatValue];
    LPMAdSize *adSize = [LPMAdSize createAdaptiveAdSizeWithWidth: widthFloat];
    resolve([LevelPlayUtils getDictForAdSize: adSize]);
}

/**
 * Creates a default adaptive ad size.
 */
RCT_EXPORT_METHOD(createAdaptiveAdSize:(RCTPromiseResolveBlock)resolve
                  withRejecter:(RCTPromiseRejectBlock)reject) {
    LPMAdSize *adSize = [LPMAdSize createAdaptiveAdSize];
    resolve([LevelPlayUtils getDictForAdSize: adSize]);
}


#pragma mark - LevelPlay Rewarded Ad API ===================================================================

/**
 * Creates a rewarded ad with the specified ad unit ID and optional bid floor.
 */
RCT_EXPORT_METHOD(createRewardedAd:(nonnull NSDictionary *)args
                  withResolver:(RCTPromiseResolveBlock)resolve
                  withRejecter:(RCTPromiseRejectBlock)reject)
{
    NSString *adUnitId = args[@"adUnitId"];
    NSNumber *bidFloor = args[@"bidFloor"];
    NSString *adId = [self.levelPlayAdObjectManager createRewardedAd:adUnitId bidFloor:bidFloor eventEmitter:self];
    resolve(adId);
}

/**
 * Loads a rewarded ad with the specified ad ID.
 */
RCT_EXPORT_METHOD(loadRewardedAd:(nonnull id)args
                  withResolver:(RCTPromiseResolveBlock)resolve
                  withRejecter:(RCTPromiseRejectBlock)reject) {
    NSString *adId = [args valueForKey:@"adId"];
    [self.levelPlayAdObjectManager loadRewardedAd:adId];
    resolve(nil);
}

/**
 * Displays a rewarded ad with the specified ad ID and optional placement name.
 */
RCT_EXPORT_METHOD(showRewardedAd:(nonnull id)args
                  withResolver:(RCTPromiseResolveBlock)resolve
                  withRejecter:(RCTPromiseRejectBlock)reject) {
    NSString *adId = [args valueForKey:@"adId"];
    NSString *placementName = [args valueForKey:@"placementName"] ?: [NSNull null];
    [self.levelPlayAdObjectManager showRewardedAd:adId placementName:placementName rootViewController:[LevelPlayUtils getRootViewController]];
    resolve(nil);
}

/**
 * Checks if a rewarded ad is ready for the specified ad ID.
 */
RCT_EXPORT_METHOD(isRewardedAdReady:(nonnull id)args
                  withResolver:(RCTPromiseResolveBlock)resolve
                  withRejecter:(RCTPromiseRejectBlock)reject) {
    NSString *adId = [args valueForKey:@"adId"];
    BOOL isAdReady = [self.levelPlayAdObjectManager isRewardedAdReady:adId];
    resolve([NSNumber numberWithBool: isAdReady]);
}

/**
 * Checks if a rewarded ad placement is capped for the specified placement name.
 */
RCT_EXPORT_METHOD(isRewardedAdPlacementCapped:(nonnull id)args
                  withResolver:(RCTPromiseResolveBlock)resolve
                  withRejecter:(RCTPromiseRejectBlock)reject) {
    NSString *placementName = [args valueForKey:@"placementName"];
    BOOL isCapped = [LPMRewardedAd isPlacementCapped:placementName];
    resolve([NSNumber numberWithBool:isCapped]);
}

#pragma mark - LPMImpressionDataDelegate Functions ===================================================

- (void)impressionDataDidSucceed:(LPMImpressionData *)impressionData {
    [self sendEventWithEventName:ON_LEVEL_PLAY_IMPRESSION_SUCCESS withArgs:impressionData != nil ? [LevelPlayUtils getDictForLevelPlayImpressionData: impressionData] : [NSNull null]];
}

#pragma mark - Utils ============================================================================

- (void)sendEventWithEventName:(NSString *) eventName withArgs: (NSDictionary * _Nullable) args {
    dispatch_async(dispatch_get_main_queue(), ^{
        if (self.hasEventListeners) {
            [self sendEventWithName:eventName body:args];
        }
    });
}

/// must be called from UI Thread
- (UIViewController *)getRootViewController {
    return [UIApplication sharedApplication].keyWindow.rootViewController;
}

#pragma mark - RCTEventEmitter Constants ========================================================
- (NSDictionary *)constantsToExport {
    return @{
        // LevelPlay Init
        @"ON_INIT_FAILED": ON_INIT_FAILED,
        @"ON_INIT_SUCCESS": ON_INIT_SUCCESS,

        // LevelPlay Interstitial Ad
        @"ON_INTERSTITIAL_AD_LOADED": ON_INTERSTITIAL_AD_LOADED,
        @"ON_INTERSTITIAL_AD_LOAD_FAILED": ON_INTERSTITIAL_AD_LOAD_FAILED,
        @"ON_INTERSTITIAL_AD_INFO_CHANGED": ON_INTERSTITIAL_AD_INFO_CHANGED,
        @"ON_INTERSTITIAL_AD_DISPLAYED": ON_INTERSTITIAL_AD_DISPLAYED,
        @"ON_INTERSTITIAL_AD_DISPLAY_FAILED": ON_INTERSTITIAL_AD_DISPLAY_FAILED,
        @"ON_INTERSTITIAL_AD_CLICKED": ON_INTERSTITIAL_AD_CLICKED,
        @"ON_INTERSTITIAL_AD_CLOSED": ON_INTERSTITIAL_AD_CLOSED,

        // LevelPlay Rewarded Ad
        @"ON_REWARDED_AD_LOADED": ON_REWARDED_AD_LOADED,
        @"ON_REWARDED_AD_LOAD_FAILED": ON_REWARDED_AD_LOAD_FAILED,
        @"ON_REWARDED_AD_INFO_CHANGED": ON_REWARDED_AD_INFO_CHANGED,
        @"ON_REWARDED_AD_DISPLAYED": ON_REWARDED_AD_DISPLAYED,
        @"ON_REWARDED_AD_DISPLAY_FAILED": ON_REWARDED_AD_DISPLAY_FAILED,
        @"ON_REWARDED_AD_CLICKED": ON_REWARDED_AD_CLICKED,
        @"ON_REWARDED_AD_CLOSED": ON_REWARDED_AD_CLOSED,
        @"ON_REWARDED_AD_REWARDED": ON_REWARDED_AD_REWARDED,
        
        // LevelPlay ImpressionData
        @"ON_LEVEL_PLAY_IMPRESSION_SUCCESS": ON_LEVEL_PLAY_IMPRESSION_SUCCESS,
    };
}

#pragma mark - RCTEventEmitter methods ==========================================================

// All events must be registered here.
- (NSArray<NSString *> *)supportedEvents {
    return @[
        // LevelPlay Init
        ON_INIT_FAILED,
        ON_INIT_SUCCESS,

        // LevelPlay Interstitial Ad
        ON_INTERSTITIAL_AD_LOADED,
        ON_INTERSTITIAL_AD_LOAD_FAILED,
        ON_INTERSTITIAL_AD_INFO_CHANGED,
        ON_INTERSTITIAL_AD_DISPLAYED,
        ON_INTERSTITIAL_AD_DISPLAY_FAILED,
        ON_INTERSTITIAL_AD_CLICKED,
        ON_INTERSTITIAL_AD_CLOSED,

        // LevelPlay Interstitial Ad
        ON_REWARDED_AD_LOADED,
        ON_REWARDED_AD_LOAD_FAILED,
        ON_REWARDED_AD_INFO_CHANGED,
        ON_REWARDED_AD_DISPLAYED,
        ON_REWARDED_AD_DISPLAY_FAILED,
        ON_REWARDED_AD_CLICKED,
        ON_REWARDED_AD_CLOSED,
        ON_REWARDED_AD_REWARDED,
        
        // LevelPlay ImpressionData
        ON_LEVEL_PLAY_IMPRESSION_SUCCESS
    ];
}

// Will be called when this module's first listener is added.
-(void)startObserving {
    self.hasEventListeners = YES;
}

// Will be called when this module's last listener is removed, or on dealloc.
-(void)stopObserving {
    self.hasEventListeners = NO;
}
@end
