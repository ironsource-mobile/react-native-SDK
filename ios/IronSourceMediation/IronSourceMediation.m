#import "IronSourceMediation.h"
#import <IronSource/IronSource.h>
#import "Constants.h"
#import "RCTLevelPlayRVDelegateWrapper.h"
#import "RCTLevelPlayISDelegateWrapper.h"
#import "RCTLevelPlayBNDelegateWrapper.h"
#import "RCTLevelPlayNativeAdViewManager.h"
#import "LevelPlayUtils.h"
#import "LevelPlayAdObjectManager.h"

@interface IronSourceMediation() <
    ISImpressionDataDelegate,
    ISConsentViewDelegate,
    ISInitializationDelegate,
    RCTLevelPlayRVDelegate,
    RCTLevelPlayISDelegate,
    RCTLevelPlayBNDelegate
>
@property (nonatomic) BOOL hasEventListeners;
@property (nonatomic,weak) ISBannerView* bannerView;
@property (nonatomic,strong) NSNumber* bannerVerticalOffset;
@property (nonatomic,strong) NSString* bannerPosition;
@property (nonatomic,strong) UIViewController* bannerViewController;
@property (nonatomic) BOOL shouldHideBanner;

// LevelPlay Delegates
@property (nonatomic, strong) RCTLevelPlayRVDelegateWrapper *rvLevelPlayDelegateWrapper;
@property (nonatomic, strong) RCTLevelPlayISDelegateWrapper *istLevelPlayDelegateWrapper;
@property (nonatomic, strong) RCTLevelPlayBNDelegateWrapper *bnLevelPlayDelegateWrapper;

// LevelPlay Ad Instance Manager
@property (nonatomic,strong) LevelPlayAdObjectManager *levelPlayAdObjectManager;


@end

@implementation IronSourceMediation

/**
 Suppress warning below:
   "Module IronSourceMediation requires main queue setup since it overrides `constantsToExport` but doesn't implement `requiresMainQueueSetup`.
   In a future release React Native will default to initializing all native modules on a background thread unless explicitly opted-out of."
*/
+ (BOOL)requiresMainQueueSetup
{
    return YES;
}


RCT_EXPORT_MODULE()

- (id)init {
    if (self = [super init]) {
        self.rvLevelPlayDelegateWrapper = [[RCTLevelPlayRVDelegateWrapper alloc]initWithDelegate:(id)self];
        self.istLevelPlayDelegateWrapper = [[RCTLevelPlayISDelegateWrapper alloc]initWithDelegate:(id)self];
        self.bnLevelPlayDelegateWrapper = [[RCTLevelPlayBNDelegateWrapper alloc]initWithDelegate:(id)self];

        // set ironSource Listeners
        [IronSource addImpressionDataDelegate:self];
        [IronSource setConsentViewWithDelegate:self];

        //set level play listeneres
        [IronSource setLevelPlayRewardedVideoDelegate:self.rvLevelPlayDelegateWrapper];
        [IronSource setLevelPlayInterstitialDelegate:self.istLevelPlayDelegateWrapper];
        [IronSource setLevelPlayBannerDelegate:self.bnLevelPlayDelegateWrapper];

        // observe device orientation changes
        [[UIDevice currentDevice] beginGeneratingDeviceOrientationNotifications];
        [[NSNotificationCenter defaultCenter] addObserver:self
                                                 selector:@selector(didChangeOrientation:)
                                                     name:UIDeviceOrientationDidChangeNotification
                                                   object:nil];
        self.shouldHideBanner = NO;
      
      // LevelPlay Object Manager registry
      self.levelPlayAdObjectManager = [[LevelPlayAdObjectManager alloc] init];
    }
    return self;
}

#pragma mark - Base API =========================================================================

/**
 @name getAdvertiserId
 @return IDFA in NSString | nil
 */
RCT_EXPORT_METHOD(getAdvertiserId:
                  (RCTPromiseResolveBlock)resolve
                  withRejecter:(RCTPromiseRejectBlock)reject) {
    NSString *advertiserId = [IronSource advertiserId];
    return resolve(advertiserId);
}

/**
 @name validateIntegration
 @return nil
 */
RCT_EXPORT_METHOD(validateIntegration:
                  (RCTPromiseResolveBlock)resolve
                  withRejecter:(RCTPromiseRejectBlock)reject) {
    [ISIntegrationHelper validateIntegration];
    return resolve(nil);
}

/**
 @name shouldTrackNetworkState
 @param isEnabled
 @return nil
 */
RCT_EXPORT_METHOD(shouldTrackNetworkState:(BOOL) isEnabled
                  withResolver:(RCTPromiseResolveBlock)resolve
                  withRejecter:(RCTPromiseRejectBlock)reject)  {
    [IronSource shouldTrackReachability:isEnabled];
    return resolve(nil);
}

/**
 @name setDynamicUserId
 @param userId
 @return nil
 */
RCT_EXPORT_METHOD(setDynamicUserId:(nonnull NSString *) userId
                  withResolver:(RCTPromiseResolveBlock)resolve
                  withRejecter:(RCTPromiseRejectBlock)reject) {
    [IronSource setDynamicUserId:userId];
    return resolve(nil);
}

/**
 @name setAdaptersDebug
 @param isEnabled
 @return nil
 */
RCT_EXPORT_METHOD(setAdaptersDebug:(BOOL) isEnabled
                  withResolver:(RCTPromiseResolveBlock)resolve
                  withRejecter:(RCTPromiseRejectBlock)reject)  {
    [IronSource setAdaptersDebug:isEnabled];
    return resolve(nil);
}

/**
 @name setConsent
 @param isConsent
 @return nil
 */
RCT_EXPORT_METHOD(setConsent:(BOOL) isConsent
                  withResolver:(RCTPromiseResolveBlock)resolve
                  withRejecter:(RCTPromiseRejectBlock)reject)  {
    [IronSource setConsent:isConsent];
    return resolve(nil);
}

/**
 @name setSegment
 @param segmentDict NSDictionary
    segmentName? : NSString
    gender? : NSString ("female" | "male")
    age? : NSNumber
    level? : NSNumber
    isPaying? : BOOL in NSNumber
    userCreationDateInMillis? : NSNumber
    iapTotal?: NSNumber
    customParameters? : NSDictionary<NSString, NSString>
 @return nil
 */
RCT_EXPORT_METHOD(setSegment:(nonnull NSDictionary *) segmentDict
                  withResolver:(RCTPromiseResolveBlock)resolve
                  withRejecter:(RCTPromiseRejectBlock)reject) {
    ISSegment *segment = [[ISSegment alloc] init];
    NSMutableArray<NSString*> *allKeys = [[segmentDict allKeys] mutableCopy];

    for (NSString *key in allKeys)
    {
        if ([key isEqualToString:@"segmentName"]){
            NSString *segmentName = [segmentDict objectForKey:key];
            if(segmentName != nil && ![[NSNull null] isEqual:segmentName]){
                segment.segmentName = segmentName;
            }
        } else if ([key isEqualToString:@"age"]){
            NSNumber *age = [segmentDict objectForKey:key];
            if(age != nil && ![[NSNull null] isEqual:age]){
                segment.age = [age intValue];
            }
        } else if([key isEqualToString:@"gender"]){
            NSString *gender = [segmentDict objectForKey:key];
            if(gender != nil && ![[NSNull null] isEqual:gender]){
                if([gender isEqualToString:@"male"]){
                    segment.gender = IRONSOURCE_USER_MALE;
                } else if([gender isEqualToString:@"female"]){
                    segment.gender = IRONSOURCE_USER_FEMALE;
                }
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
        } else if ([key isEqualToString:@"userCreationDateInMillis"]){
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
            return reject(E_ILLEGAL_ARGUMENT, [NSString stringWithFormat: @"Invalid parameter. param: %@", key], nil);
        }
    }

    [IronSource setSegment:segment];
    return resolve(nil);
}

/**
 @name setMetaData
 @param key cannot be an empty string
 @param values NSArray<NSString>
 @return nil
 */
RCT_EXPORT_METHOD(setMetaData:(nonnull NSString *) key
                  withValues: (nonnull NSArray<NSString*> *) values
                  withResolver:(RCTPromiseResolveBlock)resolve
                  withRejecter:(RCTPromiseRejectBlock)reject)  {
    [IronSource setMetaDataWithKey:key values:[values mutableCopy]];
    return resolve(nil);
}

/**
 @name launchTestSuite
 @return nil
 */
RCT_EXPORT_METHOD(launchTestSuite:(RCTPromiseResolveBlock) resolve
                  withRejecter:(RCTPromiseRejectBlock) reject)  {
    dispatch_async(dispatch_get_main_queue(), ^{
        [IronSource launchTestSuite:[self getRootViewController]];
        return resolve(nil);
    });
}

/**
 @name setWaterfallConfiguration
 @return nil
 */
RCT_EXPORT_METHOD(setWaterfallConfiguration:(nonnull NSNumber *) ceiling
                  withFloor: (nonnull NSNumber *) floor
                  withAdUnit:(nonnull NSString*) adUnit
                  withResolver:(RCTPromiseResolveBlock)resolve
                  withRejecter:(RCTPromiseRejectBlock)reject)    {
    ISAdUnit* parsedAdUnit = [self parseAdUnit:adUnit];
    if (!parsedAdUnit){
        return reject(E_ILLEGAL_ARGUMENT, [NSString stringWithFormat: @"Unsupported ad unit: %@", adUnit], nil);
    }

    // Define a WaterallConfigurationBuilder
    ISWaterfallConfigurationBuilder *builder = [ISWaterfallConfiguration builder];
    // Build the WaterfallConfiguration and add data to constrain or control a waterfall
    [builder setCeiling:ceiling];
    [builder setFloor:floor];
    ISWaterfallConfiguration *configuration = [builder build];
    //set a configuration for an ad unit
    [IronSource setWaterfallConfiguration:configuration forAdUnit:parsedAdUnit];
    return resolve(nil);
}

/**
 @name clearWaterfallConfiguration
 @return nil
 */
RCT_EXPORT_METHOD(clearWaterfallConfiguration:(nonnull NSString*) adUnit
                  withResolver:(RCTPromiseResolveBlock) resolve
                  withRejecter:(RCTPromiseRejectBlock) reject) {
    ISAdUnit* parsedAdUnit = [self parseAdUnit:adUnit];
    if (!parsedAdUnit){
        return reject(E_ILLEGAL_ARGUMENT, [NSString stringWithFormat: @"Unsupported ad unit: %@", adUnit], nil);
    }

    ISWaterfallConfiguration *clearConfiguration = [ISWaterfallConfiguration clear];
    [IronSource setWaterfallConfiguration:clearConfiguration forAdUnit:parsedAdUnit];
    return resolve(nil);
}

- (ISAdUnit*) parseAdUnit:(NSString*) adUnit {
    if([adUnit isEqualToString:REWARDED_VIDEO]){
        return [ISAdUnit IS_AD_UNIT_REWARDED_VIDEO];
    } else if ([adUnit isEqualToString:INTERSTITIAL]){
        return [ISAdUnit IS_AD_UNIT_INTERSTITIAL];
    } else if ([adUnit isEqualToString:BANNER]){
        return [ISAdUnit IS_AD_UNIT_BANNER];
    } else if ([adUnit isEqualToString:NATIVE_AD]){
        return [ISAdUnit IS_AD_UNIT_NATIVE_AD];
    } else {
        return nil;
    }
}

/**
 This must be called before init.
 @name setClientSideCallbacks
 @param isEnabled BOOL
 @return nil
 */
RCT_EXPORT_METHOD(setClientSideCallbacks:(BOOL) isEnabled
                  withResolver:(RCTPromiseResolveBlock)resolve
                  withRejecter:(RCTPromiseRejectBlock)reject) {
    [[ISSupersonicAdsConfiguration configurations] setUseClientSideCallbacks: [NSNumber numberWithBool:isEnabled]];
    return resolve(nil);
}

#pragma mark - Init API =========================================================================

/**
 @name setUserId
 @param userId
 @return nil

 The SDK falls back to the default if userId is an empty string.
 */
RCT_EXPORT_METHOD(setUserId:(nonnull NSString *) userId
                  withResolver:(RCTPromiseResolveBlock)resolve
                  withRejecter:(RCTPromiseRejectBlock)reject) {
    [IronSource setUserId:userId];
    return resolve(nil);
}

/**
 @name init
 @param appKey
 @return nil
 */
RCT_EXPORT_METHOD(init:(nonnull NSString *) appKey
                  withResolver:(RCTPromiseResolveBlock)resolve
                  withRejecter:(RCTPromiseRejectBlock)reject) {
    if([appKey length] == 0){
        return reject(E_ILLEGAL_ARGUMENT, @"appKey must be provided.", nil);
    }

    [IronSource initWithAppKey:appKey delegate:self];
    return resolve(nil);
}

/**
 @name initWithAdUnits
 @param appKey cannot be an empty string
 @param adUnits Array<"REWARDED_VIDEO" | "INTERSTITIAL" | "BANNER" | "NATIVE_AD">
 @return nil
 */
RCT_EXPORT_METHOD(initWithAdUnits:(nonnull NSString *) appKey
                  adUnits:(nonnull NSArray<NSString*> *) adUnits
                  withResolver:(RCTPromiseResolveBlock)resolve
                  withRejecter:(RCTPromiseRejectBlock)reject) {
    if([appKey length] == 0){
        return reject(E_ILLEGAL_ARGUMENT, @"appKey must be provided.", nil);
    }

    if(adUnits.count){
        NSMutableArray<NSString*> *parsedAdUnits = [[NSMutableArray alloc]init];
        for(NSString *unit in adUnits){
            if([unit isEqualToString:REWARDED_VIDEO]){
                [parsedAdUnits addObject:IS_REWARDED_VIDEO];
            } else if ([unit isEqualToString:INTERSTITIAL]){
                [parsedAdUnits addObject:IS_INTERSTITIAL];
            } else if ([unit isEqualToString:BANNER]){
                [parsedAdUnits addObject:IS_BANNER];
            } else if ([unit isEqualToString:NATIVE_AD]){
               [parsedAdUnits addObject:IS_NATIVE_AD];
            } else {
                return reject(E_ILLEGAL_ARGUMENT, [NSString stringWithFormat: @"Unsupported ad unit: %@", unit], nil);
            }
        }

        [IronSource initWithAppKey:appKey adUnits:parsedAdUnits delegate:self];
    } else {
        [IronSource initWithAppKey:appKey delegate:self];
    }
    return resolve(nil);
}

#pragma mark - RV API ============================================================================

/**
 @name showRewardedVideo
 @return nil
 */
RCT_EXPORT_METHOD(showRewardedVideo:
                  (RCTPromiseResolveBlock)resolve
                  withRejecter:(RCTPromiseRejectBlock)reject) {
    dispatch_async(dispatch_get_main_queue(), ^{
        [IronSource showRewardedVideoWithViewController:[self getRootViewController]];
        return resolve(nil);
    });
}

/**
 @name showRewardedVideoForPlacement
 @param placementName
 @return nil
 */
RCT_EXPORT_METHOD(showRewardedVideoForPlacement:(nonnull NSString *) placementName
                  withResolver:(RCTPromiseResolveBlock)resolve
                  withRejecter:(RCTPromiseRejectBlock)reject) {
    dispatch_async(dispatch_get_main_queue(), ^{
        [IronSource showRewardedVideoWithViewController:[self getRootViewController]
                                              placement:placementName];
         return resolve(nil);
     });
}

/**
 @name isRewardedVideoAvailable
 @return boolean in NSNumber
 */
RCT_EXPORT_METHOD(isRewardedVideoAvailable:
                  (RCTPromiseResolveBlock)resolve
                  withRejecter:(RCTPromiseRejectBlock)reject) {
    BOOL isRVAvailable = [IronSource hasRewardedVideo];
    return resolve([NSNumber numberWithBool:isRVAvailable]);
}

/**
 @name isRewardedVideoPlacementCapped
 @param placementName
 @return boolean in NSNumber
 */
RCT_EXPORT_METHOD(isRewardedVideoPlacementCapped:(nonnull NSString *) placementName
                  withResolver:(RCTPromiseResolveBlock)resolve
                  withRejecter:(RCTPromiseRejectBlock)reject) {
    BOOL isCapped = [IronSource isRewardedVideoCappedForPlacement:placementName];
    return resolve([NSNumber numberWithBool:isCapped]);
}

/**
 @name getRewardedVideoPlacementInfo
 @param placementName
 @return ISPlacementInfo in NSDictionary | nil

 Returns nil if this is called before init.
 */
RCT_EXPORT_METHOD(getRewardedVideoPlacementInfo:(nonnull NSString *) placementName
                  withResolver:(RCTPromiseResolveBlock)resolve
                  withRejecter:(RCTPromiseRejectBlock)reject) {
    ISPlacementInfo *placementInfo = [IronSource rewardedVideoPlacementInfo:placementName];
    return resolve(placementInfo != nil ? [LevelPlayUtils getDictWithPlacementInfo:placementInfo] : nil);
}

/**
 @name setRewardedVideoServerParams
 @param params in NSDictionary with String values only
 @return nil
 */
RCT_EXPORT_METHOD(setRewardedVideoServerParams:(nonnull NSDictionary *) params
                  withResolver:(RCTPromiseResolveBlock)resolve
                  withRejecter:(RCTPromiseRejectBlock)reject) {
    [IronSource setRewardedVideoServerParameters:params];
    return resolve(nil);
}

/**
 @name clearRewardedVideoServerParams
 @return nil
 */
RCT_EXPORT_METHOD(clearRewardedVideoServerParams:
                  (RCTPromiseResolveBlock)resolve
                  withRejecter:(RCTPromiseRejectBlock)reject) {
    [IronSource clearRewardedVideoServerParameters];
    return resolve(nil);
}

/**
 Manual Load RV
 @name loadRewardedVideo
 @return nil
 */
RCT_EXPORT_METHOD(loadRewardedVideo:
                  (RCTPromiseResolveBlock)resolve
                  withRejecter:(RCTPromiseRejectBlock)reject) {
    [IronSource loadRewardedVideo];
    return resolve(nil);
}

/**
 @name setManualLoadRewardedVideo
 @return nil
 */
RCT_EXPORT_METHOD(setLevelPlayRewardedVideoManual:
(RCTPromiseResolveBlock)resolve
        withRejecter:(RCTPromiseRejectBlock)reject) {
    // Remove the auto load LevelPlay RewardedVideo listener
    [IronSource setLevelPlayRewardedVideoDelegate:nil];
    // Set the LevelPlay RewardedVideo manual
    [IronSource setLevelPlayRewardedVideoManualDelegate:self.rvLevelPlayDelegateWrapper];
    return resolve(nil);
}

#pragma mark - IS API ============================================================================

/**
 @name loadInterstitial
 @return nil
 */
RCT_EXPORT_METHOD(loadInterstitial:
                  (RCTPromiseResolveBlock)resolve
                  withRejecter:(RCTPromiseRejectBlock)reject) {
    [IronSource loadInterstitial];
    return resolve(nil);
}

/**
 @name showInterstitial
 @return nil
 */
RCT_EXPORT_METHOD(showInterstitial:
                  (RCTPromiseResolveBlock)resolve
                  withRejecter:(RCTPromiseRejectBlock)reject) {
    dispatch_async(dispatch_get_main_queue(), ^{
        [IronSource showInterstitialWithViewController:[self getRootViewController]];
        return resolve(nil);
    });
}

/**
 @name showInterstitialForPlacement
 @param placementName
 @return nil
 */
RCT_EXPORT_METHOD(showInterstitialForPlacement:(nonnull NSString *) placementName
                  withResolver:(RCTPromiseResolveBlock)resolve
                  withRejecter:(RCTPromiseRejectBlock)reject) {
    dispatch_async(dispatch_get_main_queue(), ^{
        [IronSource showInterstitialWithViewController:[self getRootViewController] placement:placementName];
        return resolve(nil);
    });
}

/**
 @name isInterstitialReady
 @return boolean in NSNumber
 */
RCT_EXPORT_METHOD(isInterstitialReady:
                  (RCTPromiseResolveBlock)resolve
                  withRejecter:(RCTPromiseRejectBlock)reject) {
    BOOL isISReady = [IronSource hasInterstitial];
    return resolve([NSNumber numberWithBool:isISReady]);
}

/**
 @name isInterstitialPlacementCapped
 @param placementName
 @return boolean in NSNumber
 */
RCT_EXPORT_METHOD(isInterstitialPlacementCapped:(nonnull NSString *) placementName
                  withResolver:(RCTPromiseResolveBlock)resolve
                  withRejecter:(RCTPromiseRejectBlock)reject) {
    BOOL isCapped = [IronSource isInterstitialCappedForPlacement:placementName];
    return resolve([NSNumber numberWithBool:isCapped]);
}

#pragma mark - BN API ===========================================================================

RCT_EXPORT_METHOD(loadBanner:(nonnull NSDictionary *) options
                  withResolver:(RCTPromiseResolveBlock)resolve
                  withRejecter:(RCTPromiseRejectBlock)reject) {
    dispatch_async(dispatch_get_main_queue(), ^{
        @synchronized(self) {
            // Required params
            NSString *position = [options valueForKey:@"position"];
            if(position == nil || [[NSNull null] isEqual:position]){
                return reject(E_ILLEGAL_ARGUMENT, @"position is missing", nil);
            }
            NSString *sizeDescription = [options valueForKey:@"sizeDescription"];
            BOOL hasSizeDescripton = sizeDescription != nil || ![[NSNull null] isEqual:sizeDescription];
            NSNumber *width = [options valueForKey:@"width"];
            NSNumber *height = [options valueForKey:@"height"];
            BOOL hasWidth = width != nil || ![[NSNull null] isEqual:width];
            BOOL hasHeight = height != nil || ![[NSNull null] isEqual:height];
            if(!hasSizeDescripton && !(hasWidth && hasHeight)) {
                return reject(E_ILLEGAL_ARGUMENT, @"Banner sizeDescription or width and height must be passed.", nil);
            }

            ISBannerSize* size = hasSizeDescripton ? [self getBannerSize:sizeDescription]
                : [[ISBannerSize alloc] initWithWidth:[width integerValue] andHeight:[height integerValue]];

            // Optional params
            NSNumber *verticalOffset = [options valueForKey:@"verticalOffset"];
            NSString *placementName = [options valueForKey:@"placementName"];
            NSNumber *isAdaptive =  [options valueForKey:@"isAdaptive"];

            NSDictionary *containerParamsMap = [options valueForKey:@"isContainerParams"];
            NSNumber *containerWidthNumber = [containerParamsMap valueForKey:@"width"];
            NSNumber *containerHeightNumber = [containerParamsMap valueForKey:@"height"];

            size.adaptive = [isAdaptive boolValue];
            if (isAdaptive) {
                 // isAdaptive is true
                // Convert NSNumber to CGFloat
                CGFloat containerWidthFloat = containerWidthNumber ? [containerWidthNumber doubleValue] : -1.0;
                CGFloat containerHeightFloat = containerHeightNumber ? [containerHeightNumber doubleValue] : -1.0;
                // Set container params with width and adaptiveHeight
                ISContainerParams *containerParams = [[ISContainerParams alloc] initWithWidth:containerWidthFloat height:containerHeightFloat];
                [size setContainerParams:containerParams];
            }

            self.bannerVerticalOffset = (verticalOffset != nil || [[NSNull null] isEqual:verticalOffset]) ? verticalOffset : [NSNumber numberWithInt:0];
            self.bannerViewController = [self getRootViewController];
            self.bannerPosition = position;

            // Load banner view
            // if already loaded, console error would be shown by iS SDK
            if(placementName == nil || [[NSNull null] isEqual:placementName]){
                [IronSource loadBannerWithViewController:self.bannerViewController size:size];
            } else {
                [IronSource loadBannerWithViewController:self.bannerViewController size:size placement:placementName];
            }
            return resolve(nil);
        }
    });
}

/**
 @name destroyBanner
 @return nil
 */
RCT_EXPORT_METHOD(destroyBanner:
                  (RCTPromiseResolveBlock)resolve
                  withRejecter:(RCTPromiseRejectBlock)reject) {
    dispatch_async(dispatch_get_main_queue(), ^{
        @synchronized(self) {
            if (self.bannerView != nil) {
                [IronSource destroyBanner:self.bannerView];
                self.bannerView = nil;
                self.bannerViewController = nil;
                self.bannerVerticalOffset = nil;
                self.shouldHideBanner = NO; // Reset the visibility
            }
            return resolve(nil);
        }
    });
}

/**
 @name displayBanner
 @return nil
 */
RCT_EXPORT_METHOD(displayBanner:
                  (RCTPromiseResolveBlock)resolve
                  withRejecter:(RCTPromiseRejectBlock)reject) {
    dispatch_async(dispatch_get_main_queue(), ^{
        @synchronized(self) {
            if (self.bannerView != nil) {
                self.shouldHideBanner = NO;
                [self.bannerView setHidden:NO];
            }
            return resolve(nil);
        }
    });
}

/**
 @name hideBanner
 @return nil
 */
RCT_EXPORT_METHOD(hideBanner:
                  (RCTPromiseResolveBlock)resolve
                  withRejecter:(RCTPromiseRejectBlock)reject) {
    self.shouldHideBanner = YES;
    dispatch_async(dispatch_get_main_queue(), ^{
        @synchronized(self) {
            if (self.bannerView != nil) {
                [self.bannerView setHidden:YES];
            }
            return resolve(nil);
        }
    });
}

/**
 @name isBannerPlacementCapped
 @param placementName
 @return boolean in NSNumber
 */
RCT_EXPORT_METHOD(isBannerPlacementCapped:(nonnull NSString *) placementName
                  withResolver:(RCTPromiseResolveBlock)resolve
                  withRejecter:(RCTPromiseRejectBlock)reject){
    BOOL isCapped = [IronSource isBannerCappedForPlacement:placementName];
    return resolve([NSNumber numberWithBool:isCapped]);
}


/**
 @name getMaximalAdaptiveHeight
 @param width
 @return adaptive height
 */
RCT_EXPORT_METHOD(getMaximalAdaptiveHeight:(nonnull NSNumber *) width
                  withResolver:(RCTPromiseResolveBlock)resolve
                  withRejecter:(RCTPromiseRejectBlock)reject){

    // Extract the CGFloat value from the NSNumber object
    CGFloat widthFloat = [width doubleValue];

    CGFloat adaptiveHeight = [ISBannerSize getMaximalAdaptiveHeightWithWidth: widthFloat];

    NSInteger adaptiveHeightInteger = (NSInteger)adaptiveHeight;
    return resolve([NSNumber numberWithInteger:adaptiveHeightInteger]);
}

#pragma mark - BN Utils =======================================

/**
 Fallback to BANNER in the case of an illegal description
 @param description size description
 @return ISBannerSize
 */
- (ISBannerSize *)getBannerSize:(NSString *)description {
    if([description isEqualToString:@"SMART"]) {
        return ISBannerSize_SMART;
    } else if ([description isEqualToString:@"BANNER"]) {
        return ISBannerSize_BANNER;
    } else if ([description isEqualToString:@"RECTANGLE"]) {
        return ISBannerSize_RECTANGLE;
    } else if ([description isEqualToString:@"LARGE"]) {
        return ISBannerSize_LARGE;
    } else {
        return ISBannerSize_BANNER;
    }
}

/**
 Fallback to BOTTOM in the case of unsupported position string
 @param position "TOP" "CENTER" "BOTTOM"
 @param rootView viewController rootView
 @param bnView bannerView
 @param verticalOffset offset in point
 @return CGPoint
 */
- (CGPoint)getBannerCenterWithPosition:(NSString *)position
                              rootView:(UIView *)rootView
                            bannerView:(ISBannerView*) bnView
                          bannerOffset:(NSNumber*) verticalOffset {
    //Positions
    NSString * const BANNER_POSITION_TOP = @"TOP";
    NSString * const BANNER_POSITION_CENTER = @"CENTER";
//    const NSString *BANNER_POSITION_BOTTOM = @"BOTTOM";

    CGFloat y;
    if ([position isEqualToString:BANNER_POSITION_TOP]) {
        y = (bnView.frame.size.height / 2);
        // safe area
        if (@available(ios 11.0, *)) {
            y += rootView.safeAreaInsets.top;
        }
        // vertical offset
        if(verticalOffset.intValue > 0){
            y += verticalOffset.floatValue;
        }
    } else if ([position isEqualToString:BANNER_POSITION_CENTER]) {
        y = (rootView.frame.size.height / 2) - (bnView.frame.size.height / 2);
        // vertical offset
        y += verticalOffset.floatValue;
    } else { // BANNER_POSITION_BOTTOM
        y = rootView.frame.size.height - (bnView.frame.size.height / 2);
        // safe area
        if (@available(ios 11.0, *)) {
            y -= rootView.safeAreaInsets.bottom;
        }
        // vertical offset
        if(verticalOffset.intValue < 0){
            y += verticalOffset.floatValue;
        }
    }
    return CGPointMake(rootView.frame.size.width / 2, y);
}

/**
 For banner center recalibration on device orientation changes.
 Called by UIDeviceOrientationDidChangeNotification
 */
- (void)didChangeOrientation:(NSNotification*)notification {
    [self setBannerCenter];
}

/**
 For orientation changes
 */
- (void)setBannerCenter {
    dispatch_async(dispatch_get_main_queue(), ^{
        @synchronized(self) {
            self.bannerView.center = [self getBannerCenterWithPosition:self.bannerPosition
                                                              rootView:self.bannerViewController.view
                                                            bannerView:self.bannerView
                                                          bannerOffset:self.bannerVerticalOffset];
        }
    });
}

#pragma mark - ConversionValue API ==================================================================

/**
 @name getConversionValue
 @return NSNumber
 */
RCT_EXPORT_METHOD(getConversionValue:
                  (RCTPromiseResolveBlock)resolve
                  withRejecter:(RCTPromiseRejectBlock)reject) {
    NSNumber *conversionValue = [IronSource getConversionValue];
    return resolve(conversionValue);
}

#pragma mark - ConsentView API ======================================================================

/**
 @name loadConsentViewWithType
 @param consentViewType cannot be an empty string
 @return nil
 */
RCT_EXPORT_METHOD(loadConsentViewWithType:(nonnull NSString *)consentViewType
                  withResolver:(RCTPromiseResolveBlock)resolve
                  withRejecter:(RCTPromiseRejectBlock)reject) {
    [IronSource loadConsentViewWithType:consentViewType];
    return resolve(nil);
}

/**
 @name showConsentViewWithType
 @param consentViewType cannot be an empty string
 @return nil
 */
RCT_EXPORT_METHOD(showConsentViewWithType:(nonnull NSString *)consentViewType
                  withResolver:(RCTPromiseResolveBlock)resolve
                  withRejecter:(RCTPromiseRejectBlock)reject) {
    dispatch_async(dispatch_get_main_queue(), ^{
        [IronSource showConsentViewWithViewController:[self getRootViewController]
                                              andType:consentViewType];
        return resolve(nil);
    });
}

#pragma mark - LevelPlay Init API ===================================================================
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
    return resolve(nil);
}

#pragma mark - LevelPlay Interstitial Ad API ===================================================================
RCT_EXPORT_METHOD(loadInterstitialAd:(nonnull id)args
                  withResolver:(RCTPromiseResolveBlock)resolve
                  withRejecter:(RCTPromiseRejectBlock)reject) {
  NSNumber *adObjectId = [args valueForKey:@"adObjectId"];
  NSString *adUnitId = [args valueForKey:@"adUnitId"];
  [self.levelPlayAdObjectManager loadInterstitialAd:adObjectId adUnitId:adUnitId eventEmitter:self];
  return resolve(nil);
}

RCT_EXPORT_METHOD(showInterstitialAd:(nonnull id)args
                  withResolver:(RCTPromiseResolveBlock)resolve
                  withRejecter:(RCTPromiseRejectBlock)reject) {
  NSNumber *adObjectId = [args valueForKey:@"adObjectId"];
  NSString *placementName = [args valueForKey:@"placementName"] ?: [NSNull null];
  [self.levelPlayAdObjectManager showInterstitialAd:adObjectId placementName:placementName rootViewController:[LevelPlayUtils getRootViewController]];
  return resolve(nil);
}

RCT_EXPORT_METHOD(isInterstitialAdReady:(nonnull id)args
                  withResolver:(RCTPromiseResolveBlock)resolve
                  withRejecter:(RCTPromiseRejectBlock)reject) {
  NSNumber *adObjectId = [args valueForKey:@"adObjectId"];
  BOOL isAdReady = [self.levelPlayAdObjectManager isInterstitialAdReady:adObjectId];
  return resolve([NSNumber numberWithBool: isAdReady]);
}

RCT_EXPORT_METHOD(removeInterstitialAd:(nonnull id)args
                  withResolver:(RCTPromiseResolveBlock)resolve
                  withRejecter:(RCTPromiseRejectBlock)reject) {
  NSNumber *adObjectId = [args valueForKey:@"adObjectId"];
  [self.levelPlayAdObjectManager removeAd:adObjectId];
  return resolve(nil);
}

RCT_EXPORT_METHOD(removeAllInterstitialAds:(nonnull id)args
                  withResolver:(RCTPromiseResolveBlock)resolve
                  withRejecter:(RCTPromiseRejectBlock)reject) {
  [self.levelPlayAdObjectManager removeAllAds];
  return resolve(nil);
}

RCT_EXPORT_METHOD(isInterstitialAdPlacementCapped:(nonnull id)args
                  withResolver:(RCTPromiseResolveBlock)resolve
                  withRejecter:(RCTPromiseRejectBlock)reject) {
  NSString *placementName = [args valueForKey:@"placementName"];
  BOOL isCapped = [LPMInterstitialAd isPlacementCapped:placementName];
  return resolve([NSNumber numberWithBool:isCapped]);
}

#pragma mark - LPMAdSize API ========================================================================
RCT_EXPORT_METHOD(createAdaptiveAdSize:(NSNumber *) width
                  withResolver:(RCTPromiseResolveBlock)resolve
                  withRejecter:(RCTPromiseRejectBlock)reject) {
    if (width == nil) {
        LPMAdSize *adSize = [LPMAdSize createAdaptiveAdSize];
        return resolve([LevelPlayUtils getDictForAdSize: adSize]);
    }
    CGFloat widthFloat = [width floatValue];
    LPMAdSize *adSize = [LPMAdSize createAdaptiveAdSizeWithWidth: widthFloat];
    return resolve([LevelPlayUtils getDictForAdSize: adSize]);
}


#pragma mark - ISImpressionDataDelegate Functions ===================================================

- (void)impressionDataDidSucceed:(ISImpressionData *)impressionData {
    [self sendEventWithEventName:ON_IMPRESSION_SUCCESS withArgs:impressionData != nil ? [LevelPlayUtils getDictForImpressionData: impressionData] : [NSNull null]];
}

#pragma mark - ISConsentViewDelegate Functions =======================================================
/**
 Pass arguments in the form of NSDictionary
 */

- (void)consentViewDidLoadSuccess:(NSString *)consentViewType {
    NSDictionary *args = [LevelPlayUtils getDictWithConsentViewType:consentViewType];
    [self sendEventWithEventName:CONSENT_VIEW_DID_LOAD_SUCCESS withArgs:args];
}

- (void)consentViewDidFailToLoadWithError:(NSError *)error consentViewType:(NSString *)consentViewType {
    NSDictionary *args = [LevelPlayUtils getDictWithIronSourceConsentViewError:consentViewType error:error];
    [self sendEventWithEventName:CONSENT_VIEW_DID_FAIL_TO_LOAD withArgs:args];
}

- (void)consentViewDidShowSuccess:(NSString *)consentViewType {
    NSDictionary *args = [LevelPlayUtils getDictWithConsentViewType:consentViewType];
    [self sendEventWithEventName:CONSENT_VIEW_DID_SHOW_SUCCESS withArgs:args];
}

- (void)consentViewDidFailToShowWithError:(NSError *)error consentViewType:(NSString *)consentViewType {
    NSDictionary *args = [LevelPlayUtils getDictWithIronSourceConsentViewError:consentViewType error:error];
    [self sendEventWithEventName:CONSENT_VIEW_DID_FAIL_TO_SHOW withArgs:args];
}

- (void)consentViewDidAccept:(NSString *)consentViewType {
    NSDictionary *args = [LevelPlayUtils getDictWithConsentViewType:consentViewType];
    [self sendEventWithEventName:CONSENT_VIEW_DID_ACCEPT withArgs:args];
}

- (void)consentViewDidDismiss:(NSString *)consentViewType {
    // Deprecated: Will never be called by the SDK.
}

# pragma mark - Initialization Delegate Functions ===================================================

- (void)initializationDidComplete {
    [self sendEventWithEventName:ON_INITIALIZATION_COMPLETE withArgs:nil];
}

#pragma mark - RCTLevelPlayRVDelegate Functions ==================================================

- (void)hasAvailableAdWithAdInfo:(nonnull ISAdInfo *)adInfo {
    NSDictionary *args = [LevelPlayUtils getDictWithAdInfo:adInfo];
    [self sendEventWithEventName:LP_RV_ON_AD_AVAILABLE withArgs:args];
}

- (void)hasNoAvailableAd {
    [self sendEventWithEventName:LP_RV_ON_AD_UNAVAILABLE withArgs:nil];
}

- (void)levelPlayRVDidReceiveRewardForPlacement:(nonnull ISPlacementInfo *)placementInfo withAdInfo:(nonnull ISAdInfo *)adInfo {
    NSMutableDictionary *args = [[NSMutableDictionary alloc] init];
    NSDictionary *placmentDict = [LevelPlayUtils getDictWithPlacementInfo:placementInfo];
    NSDictionary *adInfoDict = [LevelPlayUtils getDictWithAdInfo:adInfo];
    args[@"placement"] = placmentDict;
    args[@"adInfo"] = adInfoDict;
    [self sendEventWithEventName:LP_RV_ON_AD_REWARDED withArgs:args];
}

- (void)levelPlayRVDidFailToShowWithError:(nonnull NSError *)error
                                andAdInfo:(nonnull ISAdInfo *)adInfo {
    NSMutableDictionary *args = [[NSMutableDictionary alloc] init];
    NSDictionary *errorDict = [LevelPlayUtils getDictWithError:error];
    NSDictionary *adInfoDict = [LevelPlayUtils getDictWithAdInfo:adInfo];
    args[@"error"] = errorDict;
    args[@"adInfo"] = adInfoDict;
    [self sendEventWithEventName:LP_RV_ON_AD_SHOW_FAILED withArgs:args];
}

- (void)levelPlayRVDidOpenWithAdInfo:(nonnull ISAdInfo *)adInfo {
    NSDictionary *args = [LevelPlayUtils getDictWithAdInfo:adInfo];
    [self sendEventWithEventName:LP_RV_ON_AD_OPENED withArgs:args];
}

- (void)levelPlayRVDidCloseWithAdInfo:(nonnull ISAdInfo *)adInfo {
    NSDictionary *args = [LevelPlayUtils getDictWithAdInfo:adInfo];
    [self sendEventWithEventName:LP_RV_ON_AD_CLOSED withArgs:args];
}

- (void)levelPlayRVDidClick:(nonnull ISPlacementInfo *)placementInfo withAdInfo:(nonnull ISAdInfo *)adInfo {
    NSMutableDictionary *args = [[NSMutableDictionary alloc] init];
    NSDictionary *placmentDict = [LevelPlayUtils getDictWithPlacementInfo:placementInfo];
    NSDictionary *adInfoDict = [LevelPlayUtils getDictWithAdInfo:adInfo];
    args[@"placement"] = placmentDict;
    args[@"adInfo"] = adInfoDict;
    [self sendEventWithEventName:LP_RV_ON_AD_CLICKED withArgs:args];
}

/// Manual RV
- (void)rewardedVideoLevelPlayDidLoadWithAdInfo:(nonnull ISAdInfo *)adInfo {
    NSDictionary *args = [LevelPlayUtils getDictWithAdInfo:adInfo];
    [self sendEventWithEventName:LP_MANUAL_RV_ON_AD_READY withArgs:args];
}

/// Manual RV
- (void)rewardedVideoLevelPlayDidFailToLoadWithError:(nonnull NSError *)error {
    NSDictionary *args = [LevelPlayUtils getDictWithError:error];
    [self sendEventWithEventName:LP_MANUAL_RV_ON_AD_LOAD_FAILED withArgs:args];
}

#pragma mark - RCTLevelPlayISDelegate Functions ==================================================
- (void)levelPlayISDidLoadWithAdInfo:(nonnull ISAdInfo *)adInfo {
    NSDictionary *args = [LevelPlayUtils getDictWithAdInfo:adInfo];
    [self sendEventWithEventName:LP_IS_ON_AD_READY withArgs:args];
}

- (void)levelPlayISDidFailToLoadWithError:(nonnull NSError *)error {
    NSDictionary *args = [LevelPlayUtils getDictWithError:error];
    [self sendEventWithEventName:LP_IS_ON_AD_LOAD_FAILED withArgs:args];
}

- (void)levelPlayISDidOpenWithAdInfo:(nonnull ISAdInfo *)adInfo {
    NSDictionary *args = [LevelPlayUtils getDictWithAdInfo:adInfo];
    [self sendEventWithEventName:LP_IS_ON_AD_OPENED withArgs:args];
}


- (void)levelPlayISDidCloseWithAdInfo:(nonnull ISAdInfo *)adInfo {
    NSDictionary *args = [LevelPlayUtils getDictWithAdInfo:adInfo];
    [self sendEventWithEventName:LP_IS_ON_AD_CLOSED withArgs:args];
}

- (void)levelPlayISDidShowWithAdInfo:(nonnull ISAdInfo *)adInfo {
    NSDictionary *args = [LevelPlayUtils getDictWithAdInfo:adInfo];
    [self sendEventWithEventName:LP_IS_ON_AD_SHOW_SUCCEEDED withArgs:args];
}

- (void)levelPlayISDidFailToShowWithError:(nonnull NSError *)error
                                andAdInfo:(nonnull ISAdInfo *)adInfo {
    NSMutableDictionary *args = [[NSMutableDictionary alloc] init];
    NSDictionary *errorDict = [LevelPlayUtils getDictWithError:error];
    NSDictionary *adInfoDict = [LevelPlayUtils getDictWithAdInfo:adInfo];
    args[@"error"] = errorDict;
    args[@"adInfo"] = adInfoDict;
    [self sendEventWithEventName:LP_IS_ON_AD_SHOW_FAILED withArgs:args];
}

- (void)levelPlayISDidClickWithAdInfo:(nonnull ISAdInfo *)adInfo {
    NSDictionary *args = [LevelPlayUtils getDictWithAdInfo:adInfo];
    [self sendEventWithEventName:LP_IS_ON_AD_CLICKED withArgs:args];
}


#pragma mark - RCTLevelPlayBNDelegate Functions ==================================================
- (void)levelPlayBNDidLoad:(nonnull ISBannerView *)bannerView
                withAdInfo:(nonnull ISAdInfo *)adInfo {
    dispatch_async(dispatch_get_main_queue(), ^{
        @synchronized(self) {
            self.bannerView = bannerView;
            [self.bannerView setAccessibilityLabel:@"bannerContainer"];
            [self.bannerView setHidden:self.shouldHideBanner];
            self.bannerView.center = [self getBannerCenterWithPosition:self.bannerPosition
                                                              rootView:self.bannerViewController.view
                                                            bannerView:self.bannerView
                                                          bannerOffset:self.bannerVerticalOffset];
            [self.bannerViewController.view addSubview:self.bannerView];
        }
    });
    NSDictionary *args = [LevelPlayUtils getDictWithAdInfo:adInfo];
    [self sendEventWithEventName:LP_BN_ON_AD_LOADED withArgs:args];
}

- (void)levelPlayBNDidFailToLoadWithError:(nonnull NSError *)error {
    NSDictionary *args = [LevelPlayUtils getDictWithError:error];
    [self sendEventWithEventName:LP_BN_ON_AD_LOAD_FAILED withArgs:args];
}

- (void)levelPlayBNDidClickWithAdInfo:(nonnull ISAdInfo *)adInfo {
    NSDictionary *args = [LevelPlayUtils getDictWithAdInfo:adInfo];
    [self sendEventWithEventName:LP_BN_ON_AD_CLICKED withArgs:args];
}

- (void)levelPlayBNDidPresentScreenWithAdInfo:(nonnull ISAdInfo *)adInfo {
    NSDictionary *args = [LevelPlayUtils getDictWithAdInfo:adInfo];
    [self sendEventWithEventName:LP_BN_ON_AD_SCREEN_PRESENTED withArgs:args];
}

- (void)levelPlayBNDidDismissScreenWithAdInfo:(nonnull ISAdInfo *)adInfo {
    NSDictionary *args = [LevelPlayUtils getDictWithAdInfo:adInfo];
    [self sendEventWithEventName:LP_BN_ON_AD_SCREEN_DISMISSED withArgs:args];
}

- (void)levelPlayBNDidLeaveApplicationWithAdInfo:(nonnull ISAdInfo *)adInfo {
    NSDictionary *args = [LevelPlayUtils getDictWithAdInfo:adInfo];
    [self sendEventWithEventName:LP_BN_ON_AD_LEFT_APPLICATION withArgs:args];
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
        // ARM ImpressionData Event
        @"ON_IMPRESSION_SUCCESS" : ON_IMPRESSION_SUCCESS,

        // ConsentView Events
        @"CONSENT_VIEW_DID_LOAD_SUCCESS" : CONSENT_VIEW_DID_LOAD_SUCCESS,
        @"CONSENT_VIEW_DID_FAIL_TO_LOAD" : CONSENT_VIEW_DID_FAIL_TO_LOAD,
        @"CONSENT_VIEW_DID_SHOW_SUCCESS" : CONSENT_VIEW_DID_SHOW_SUCCESS,
        @"CONSENT_VIEW_DID_FAIL_TO_SHOW" : CONSENT_VIEW_DID_FAIL_TO_SHOW,
        @"CONSENT_VIEW_DID_ACCEPT" : CONSENT_VIEW_DID_ACCEPT,

        // Init Listener Event
        @"ON_INITIALIZATION_COMPLETE" : ON_INITIALIZATION_COMPLETE,

        // LevelPlayListener Events
        // LevelPlay RV
        @"LP_RV_ON_AD_AVAILABLE" : LP_RV_ON_AD_AVAILABLE,
        @"LP_RV_ON_AD_UNAVAILABLE" : LP_RV_ON_AD_UNAVAILABLE,
        @"LP_RV_ON_AD_OPENED" : LP_RV_ON_AD_OPENED,
        @"LP_RV_ON_AD_CLOSED" : LP_RV_ON_AD_CLOSED,
        @"LP_RV_ON_AD_REWARDED" : LP_RV_ON_AD_REWARDED,
        @"LP_RV_ON_AD_SHOW_FAILED" : LP_RV_ON_AD_SHOW_FAILED,
        @"LP_RV_ON_AD_CLICKED" : LP_RV_ON_AD_CLICKED,
        // LevelPlay Manual RV
        @"LP_MANUAL_RV_ON_AD_READY" : LP_MANUAL_RV_ON_AD_READY,
        @"LP_MANUAL_RV_ON_AD_LOAD_FAILED" : LP_MANUAL_RV_ON_AD_LOAD_FAILED,

        // LevelPlay IS
        @"LP_IS_ON_AD_READY": LP_IS_ON_AD_READY,
        @"LP_IS_ON_AD_LOAD_FAILED": LP_IS_ON_AD_LOAD_FAILED,
        @"LP_IS_ON_AD_OPENED": LP_IS_ON_AD_OPENED,
        @"LP_IS_ON_AD_CLOSED": LP_IS_ON_AD_CLOSED,
        @"LP_IS_ON_AD_SHOW_FAILED": LP_IS_ON_AD_SHOW_FAILED,
        @"LP_IS_ON_AD_CLICKED": LP_IS_ON_AD_CLICKED,
        @"LP_IS_ON_AD_SHOW_SUCCEEDED": LP_IS_ON_AD_SHOW_SUCCEEDED,

        // LevelPlay BN
        @"LP_BN_ON_AD_LOADED" : LP_BN_ON_AD_LOADED,
        @"LP_BN_ON_AD_LOAD_FAILED" : LP_BN_ON_AD_LOAD_FAILED,
        @"LP_BN_ON_AD_CLICKED" : LP_BN_ON_AD_CLICKED,
        @"LP_BN_ON_AD_SCREEN_PRESENTED" : LP_BN_ON_AD_SCREEN_PRESENTED,
        @"LP_BN_ON_AD_SCREEN_DISMISSED" : LP_BN_ON_AD_SCREEN_DISMISSED,
        @"LP_BN_ON_AD_LEFT_APPLICATION" : LP_BN_ON_AD_LEFT_APPLICATION,
        
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
        @"ON_INTERSTITIAL_AD_CLOSED": ON_INTERSTITIAL_AD_CLOSED
    };
}

#pragma mark - RCTEventEmitter methods ==========================================================

// All events must be registered here.
- (NSArray<NSString *> *)supportedEvents {
    return @[
        // ARM ImpressionData Event
        ON_IMPRESSION_SUCCESS,

        // ConsentView Events
        CONSENT_VIEW_DID_LOAD_SUCCESS,
        CONSENT_VIEW_DID_FAIL_TO_LOAD,
        CONSENT_VIEW_DID_SHOW_SUCCESS,
        CONSENT_VIEW_DID_FAIL_TO_SHOW,
        CONSENT_VIEW_DID_ACCEPT,

        // Init Listener Event
        ON_INITIALIZATION_COMPLETE,

        // LevelPlayListener Events
        // LevelPlay RV
        LP_RV_ON_AD_AVAILABLE,
        LP_RV_ON_AD_UNAVAILABLE,
        LP_RV_ON_AD_OPENED,
        LP_RV_ON_AD_CLOSED,
        LP_RV_ON_AD_REWARDED,
        LP_RV_ON_AD_SHOW_FAILED,
        LP_RV_ON_AD_CLICKED,
        // LevelPlay Manual RV
        LP_MANUAL_RV_ON_AD_READY,
        LP_MANUAL_RV_ON_AD_LOAD_FAILED,

        // LevelPlay IS
        LP_IS_ON_AD_READY,
        LP_IS_ON_AD_LOAD_FAILED,
        LP_IS_ON_AD_OPENED,
        LP_IS_ON_AD_CLOSED,
        LP_IS_ON_AD_SHOW_FAILED,
        LP_IS_ON_AD_CLICKED,
        LP_IS_ON_AD_SHOW_SUCCEEDED,

        // LevelPlay BN
        LP_BN_ON_AD_LOADED,
        LP_BN_ON_AD_LOAD_FAILED,
        LP_BN_ON_AD_CLICKED,
        LP_BN_ON_AD_SCREEN_PRESENTED,
        LP_BN_ON_AD_SCREEN_DISMISSED,
        LP_BN_ON_AD_LEFT_APPLICATION,

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
        ON_INTERSTITIAL_AD_CLOSED
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
