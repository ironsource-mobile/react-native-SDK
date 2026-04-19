//
//  LevelPlayMediation.m
//  LevelPlayMediation
//
//  Copyright © 2024 Unity Technologies. All rights reserved.

#import "LevelPlayMediation.h"
#import <IronSource/IronSource.h>
#import "LevelPlayConstants.h"
#import "LevelPlayUtils.h"
#import "LevelPlayAdObjectManager.h"
#import <IronSource/LPMPrivacySettings.h>

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

- (dispatch_queue_t)methodQueue
{
    return dispatch_get_main_queue();
}

- (NSDictionary *)getConstants
{
    return [self constantsToExport];
}

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
RCT_EXPORT_METHOD(validateIntegration:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject) {
    [LevelPlay validateIntegration];
    resolve(nil);
}

/**
 * Sets a dynamic user ID for tracking purposes.
 *
 * @param userId The user ID to set for LevelPlay SDK.
 */
RCT_EXPORT_METHOD(setDynamicUserId:(nonnull NSString *)userId resolve:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject) {
    [LevelPlay setDynamicUserId:userId];
    resolve(nil);
}

/**
 * Enables or disables debug mode for LevelPlay adapters.
 *
 * @param isEnabled A boolean flag to enable or disable debug mode.
 */
RCT_EXPORT_METHOD(setAdaptersDebug:(BOOL)isEnabled resolve:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject) {
    [LevelPlay setAdaptersDebug:isEnabled];
    resolve(nil);
}

/**
 * Sets the user's consent status for data collection.
 *
 * @deprecated Use LPMPrivacySettings.setGDPRConsents() instead for more granular control per network.
 * @param isConsent A boolean flag indicating whether the user has given consent.
 */
RCT_EXPORT_METHOD(setConsent:(BOOL)isConsent resolve:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject) {
    [LevelPlay setConsent:isConsent];
    resolve(nil);
}

/**
 * Configures a user segment with specific attributes for targeting purposes.
 *
 * @param segmentDict A dictionary containing segment details such as name, level, and custom parameters.
 */
RCT_EXPORT_METHOD(setSegment:(nonnull NSDictionary *)segmentDict resolve:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject) {
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
RCT_EXPORT_METHOD(setMetaData:(nonnull NSString *)key values:(nonnull NSArray<NSString*> *)values resolve:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject) {
    [LevelPlay setMetaDataWithKey:key values:[values mutableCopy]];
    resolve(nil);
}

/**
 * Launches the LevelPlay Test Suite for debugging and validation.
 */
RCT_EXPORT_METHOD(launchTestSuite:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject) {
    dispatch_async(dispatch_get_main_queue(), ^{
        [LevelPlay launchTestSuite:[self getRootViewController]];
        resolve(nil);
    });
}

#pragma mark - Privacy Settings API ===================================================================

/**
 * Sets the consent per network, a dictionary of network keys to boolean values that indicates whether
 * the user has granted consent for each network to collect and share data. Consent is used for
 * GDPR compliance.
 *
 * @param networkConsents A dictionary where keys are network identifiers (NSString) and values are
 * NSNumber objects wrapping boolean values.
 */
RCT_EXPORT_METHOD(setGDPRConsents:(nonnull NSDictionary *)networkConsents resolve:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject) {
    NSMutableDictionary<NSString *, NSNumber *> *consentsDict = [NSMutableDictionary new];
    for (NSString *key in networkConsents) {
        NSNumber *value = networkConsents[key];
        if (value != nil && ![[NSNull null] isEqual:value]) {
            consentsDict[key] = value;
        }
    }
    [LPMPrivacySettings setGDPRConsents:consentsDict];
    resolve(nil);
}

/**
 * Sets the CCPA (California Consumer Privacy Act) flag. This flag indicates whether the user has
 * opted out of the sale of their personal information.
 *
 * @param value YES if the user has opted out of the sale of their personal information, NO otherwise.
 */
RCT_EXPORT_METHOD(setCCPA:(BOOL)value resolve:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject) {
    [LPMPrivacySettings setCCPA:value];
    resolve(nil);
}

/**
 * Sets the COPPA (Children's Online Privacy Protection Act) flag. This flag indicates whether the
 * user is a child and the app should comply with COPPA regulations.
 *
 * @param value YES if the user is a child and COPPA compliance is required, NO otherwise.
 */
RCT_EXPORT_METHOD(setCOPPA:(BOOL)value resolve:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject) {
    [LPMPrivacySettings setCOPPA:value];
    resolve(nil);
}

/**
 * Adds a listener for receiving impression data events.
 */
RCT_EXPORT_METHOD(addImpressionDataListener:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject) {
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
RCT_EXPORT_METHOD(init:(NSString *)appKey userId:(NSString *)userId resolve:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject) {

    LPMInitRequestBuilder *requestBuilder = [[LPMInitRequestBuilder alloc] initWithAppKey: appKey];
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
RCT_EXPORT_METHOD(createInterstitialAd:(NSString *)adUnitId bidFloor:(nonnull NSNumber *)bidFloor resolve:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject) {
    // Old architecture requires nonnull NSNumber. Use -1 as sentinel for "not set", then convert to nil.
    NSNumber *finalBidFloor = ([bidFloor doubleValue] < 0) ? nil : bidFloor;
    NSString *adId = [self.levelPlayAdObjectManager createInterstitialAd:adUnitId bidFloor:finalBidFloor eventEmitter:self];
    resolve(adId);
}

/**
 * Loads an interstitial ad with the specified ad ID.
 */
RCT_EXPORT_METHOD(loadInterstitialAd:(NSString *)adId resolve:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject) {
    [self.levelPlayAdObjectManager loadInterstitialAd:adId];
    resolve(nil);
}

/**
 * Displays an interstitial ad with the specified ad ID and optional placement name.
 */
RCT_EXPORT_METHOD(showInterstitialAd:(NSString *)adId placementName:(NSString *)placementName resolve:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject) {
    [self.levelPlayAdObjectManager showInterstitialAd:adId placementName:placementName rootViewController:[LevelPlayUtils getRootViewController]];
    resolve(nil);
}

/**
 * Checks if an interstitial ad is ready for the specified ad ID.
 */
RCT_EXPORT_METHOD(isInterstitialAdReady:(NSString *)adId resolve:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject) {
    BOOL isAdReady = [self.levelPlayAdObjectManager isInterstitialAdReady:adId];
    resolve([NSNumber numberWithBool: isAdReady]);
}

/**
 * Checks if an interstitial ad placement is capped for the specified placement name.
 */
RCT_EXPORT_METHOD(isInterstitialAdPlacementCapped:(NSString *)placementName resolve:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject) {
    BOOL isCapped = [LPMInterstitialAd isPlacementCapped:placementName];
    resolve([NSNumber numberWithBool:isCapped]);
}

/**
 * Removes a specific ad by its ID.
 */
RCT_EXPORT_METHOD(removeAd:(NSString *)adId resolve:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject) {
    [self.levelPlayAdObjectManager removeAd:adId];
    resolve(nil);
}

/**
 * Removes all ads.
 */
RCT_EXPORT_METHOD(removeAllAds:(RCTPromiseResolveBlock)resolve
                  reject:(RCTPromiseRejectBlock)reject) {
    [self.levelPlayAdObjectManager removeAllAds];
    resolve(nil);
}

#pragma mark - LPMAdSize API ========================================================================

/**
 * Creates an adaptive ad size based on the specified width.
 */
RCT_EXPORT_METHOD(createAdaptiveAdSizeWithWidth:(nonnull NSNumber *) width
                  resolve:(RCTPromiseResolveBlock)resolve
                  reject:(RCTPromiseRejectBlock)reject) {
    CGFloat widthFloat = [width floatValue];
    LPMAdSize *adSize = [LPMAdSize createAdaptiveAdSizeWithWidth: widthFloat];
    resolve([LevelPlayUtils getDictForAdSize: adSize]);
}

/**
 * Creates a default adaptive ad size.
 */
RCT_EXPORT_METHOD(createAdaptiveAdSize:(RCTPromiseResolveBlock)resolve
                  reject:(RCTPromiseRejectBlock)reject) {
    LPMAdSize *adSize = [LPMAdSize createAdaptiveAdSize];
    resolve([LevelPlayUtils getDictForAdSize: adSize]);
}


#pragma mark - LevelPlay Rewarded Ad API ===================================================================

/**
 * Creates a rewarded ad with the specified ad unit ID and optional bid floor.
 */
RCT_EXPORT_METHOD(createRewardedAd:(NSString *)adUnitId bidFloor:(nonnull NSNumber *)bidFloor resolve:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject) {
    // Old architecture requires nonnull NSNumber. Use -1 as sentinel for "not set", then convert to nil.
    NSNumber *finalBidFloor = ([bidFloor doubleValue] < 0) ? nil : bidFloor;
    NSString *adId = [self.levelPlayAdObjectManager createRewardedAd:adUnitId bidFloor:finalBidFloor eventEmitter:self];
    resolve(adId);
}

/**
 * Loads a rewarded ad with the specified ad ID.
 */
RCT_EXPORT_METHOD(loadRewardedAd:(NSString *)adId resolve:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject) {
    [self.levelPlayAdObjectManager loadRewardedAd:adId];
    resolve(nil);
}

/**
 * Displays a rewarded ad with the specified ad ID and optional placement name.
 */
RCT_EXPORT_METHOD(showRewardedAd:(NSString *)adId placementName:(NSString *)placementName resolve:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject) {
    [self.levelPlayAdObjectManager showRewardedAd:adId placementName:placementName rootViewController:[LevelPlayUtils getRootViewController]];
    resolve(nil);
}

/**
 * Checks if a rewarded ad is ready for the specified ad ID.
 */
RCT_EXPORT_METHOD(isRewardedAdReady:(NSString *)adId resolve:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject) {
    BOOL isAdReady = [self.levelPlayAdObjectManager isRewardedAdReady:adId];
    resolve([NSNumber numberWithBool: isAdReady]);
}

/**
 * Checks if a rewarded ad placement is capped for the specified placement name.
 */
RCT_EXPORT_METHOD(isRewardedAdPlacementCapped:(NSString *)placementName resolve:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject) {
    BOOL isCapped = [LPMRewardedAd isPlacementCapped:placementName];
    resolve([NSNumber numberWithBool:isCapped]);
}

#pragma mark - LPMImpressionDataDelegate Functions ===================================================

- (void)impressionDataDidSucceed:(LPMImpressionData *)impressionData {
    [self sendEventWithEventName:ON_IMPRESSION_SUCCESS withArgs:impressionData != nil ? [LevelPlayUtils getDictForLevelPlayImpressionData: impressionData] : [NSNull null]];
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

        // LevelPlay ImpressionData
        @"ON_IMPRESSION_SUCCESS": ON_IMPRESSION_SUCCESS,
        
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
    };
}

#pragma mark - RCTEventEmitter methods ==========================================================

// All events must be registered here.
- (NSArray<NSString *> *)supportedEvents {
    return @[
        // LevelPlay Init
        ON_INIT_FAILED,
        ON_INIT_SUCCESS,

        // LevelPlay ImpressionData
        ON_IMPRESSION_SUCCESS,

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

#ifdef RCT_NEW_ARCH_ENABLED
- (std::shared_ptr<facebook::react::TurboModule>)getTurboModule:
    (const facebook::react::ObjCTurboModule::InitParams &)params
{
    return std::make_shared<facebook::react::NativeLevelPlayMediationSpecJSI>(params);
}
#endif

@end
