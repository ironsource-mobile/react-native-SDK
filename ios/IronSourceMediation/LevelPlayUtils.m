#import "LevelPlayUtils.h"

@implementation LevelPlayUtils

+ (void)sendEventWithName:(NSString *)eventName args:(NSDictionary * _Nullable)args eventEmitter:(RCTEventEmitter *)eventEmitter {
    dispatch_async(dispatch_get_main_queue(), ^{
        [eventEmitter sendEventWithName:eventName body:args];
    });
}

/**
 Creates a dictionary containing information about the native ad.
 If the native ad object is null ,all fields in the map will also be null
 (except hasIconDrawable which is 'true'/'false').
 @param nativeAd The LevelPlayNativeAd object from which to extract information.
 @return A dictionary containing the native ad information.
 */
+ (NSDictionary *)getDictWithNativeAd:(LevelPlayNativeAd *)nativeAd {
    NSMutableDictionary *nativeAdDict = [NSMutableDictionary dictionary];
    [nativeAdDict setObject:(nativeAd.title ?: [NSNull null]) forKey:@"title"];
    [nativeAdDict setObject:(nativeAd.advertiser ?: [NSNull null]) forKey:@"advertiser"];
    [nativeAdDict setObject:(nativeAd.body ?: [NSNull null]) forKey:@"body"];
    [nativeAdDict setObject:(nativeAd.callToAction ?: [NSNull null]) forKey:@"callToAction"];

    NSMutableDictionary *iconDict = [NSMutableDictionary dictionary];
    [iconDict setObject:(nativeAd.icon.url ?: [NSNull null]) forKey:@"uri"];
    [iconDict setObject:([self dataFromImage:nativeAd.icon.image] ?: [NSNull null]) forKey:@"imageData"];
    [nativeAdDict setObject:(iconDict ?: [NSNull null]) forKey:@"icon"];

    return nativeAdDict;
}


/**
 Creates a dictionary containing information about the ad.
 @param adInfo The ISAdInfo object from which to extract information.
 @return A dictionary containing the ad information.
 */
+ (NSDictionary *)getDictWithAdInfo:(ISAdInfo *)adInfo {
    return @{
            @"auctionId": adInfo.auction_id ?: [NSNull null],
            @"adUnit": adInfo.ad_unit ?: [NSNull null],
            @"adNetwork": adInfo.ad_network ?: [NSNull null],
            @"instanceName": adInfo.instance_name ?: [NSNull null],
            @"instanceId": adInfo.instance_id ?: [NSNull null],
            @"country": adInfo.country ?: [NSNull null],
            @"revenue": adInfo.revenue != nil ? @(adInfo.revenue.doubleValue) : [NSNull null],
            @"precision": adInfo.precision ?: [NSNull null],
            @"ab": adInfo.ab ?: [NSNull null],
            @"segmentName": adInfo.segment_name ?: [NSNull null],
            @"lifetimeRevenue": adInfo.lifetime_revenue != nil ? @(adInfo.lifetime_revenue.doubleValue) : [NSNull null],
            @"encryptedCpm": adInfo.encrypted_cpm ?: [NSNull null],
            @"conversionValue": adInfo.conversion_value != nil ? @(adInfo.conversion_value.doubleValue) : [NSNull null],
    };
}

/**
 Creates a dictionary containing information about the error.
 @param error The NSError object representing the error.
 @return A dictionary containing the error information.
 */
+ (NSDictionary *)getDictWithError:(NSError *)error {
    return @{
            @"errorCode": [NSNumber numberWithInteger:error.code],
            @"message": error.userInfo[NSLocalizedDescriptionKey] ?: [NSNull null],
    };
}

/**
 Converts a UIImage object to NSData.
 @param image The UIImage object to convert.
 @return The NSData representation of the UIImage.
 */
+ (NSString *)dataFromImage:(UIImage *)image {
    if (image == nil) {
        return nil;
    }

    // Convert UIImage to NSData (PNG representation)
    NSData *imageData = UIImagePNGRepresentation(image);
    NSString *base64String = [imageData base64EncodedStringWithOptions:0];

    return base64String;
}

+ (NSDictionary *)getDictWithPlacementInfo:(ISPlacementInfo *)placementInfo {
    return @{
            @"placementName": placementInfo.placementName ?: [NSNull null],
            @"rewardName": placementInfo.rewardName ?: [NSNull null],
            @"rewardAmount": placementInfo.rewardAmount ?: [NSNull null],
    };
}

/**
 ConsentView Delegate utils
 */
+ (NSMutableDictionary *)getDictWithConsentViewType:(NSString *)consentViewType {
    NSMutableDictionary *dict = [[NSMutableDictionary alloc] init];
    dict[@"consentViewType"] = consentViewType;
    return dict;
}

+ (NSMutableDictionary *)getDictWithIronSourceConsentViewError:(NSString *)consentViewType error:(NSError *)error {
    NSMutableDictionary *dict = [[NSMutableDictionary alloc] init];
    dict[@"consentViewType"] = consentViewType;

    if(error != nil){
        dict[@"errorCode"] = [NSNumber numberWithInteger: error.code];
    }
    if(error != nil && error.userInfo != nil){
        dict[@"message"] = error.userInfo[NSLocalizedDescriptionKey];
    }
    return dict;
}

/**
 Creates a dictionary containing information about the init error.

 @param error The NSError object representing the error.
 @return A dictionary containing the error information.
 */
+ (NSDictionary *)getDictWithInitError:(NSError *)error {
    return @{
            @"errorCode": [NSNumber numberWithInteger:error.code],
            @"errorMessage": error.userInfo[NSLocalizedDescriptionKey] ?: [NSNull null],
    };
}

/**
 Creates a dictionary containing information about the init error.

 @return A dictionary containing the error information.
 */
+ (NSDictionary *)getDictWithInitSuccess:(LPMConfiguration *)config {
    return @{
            @"isAdQualityEnabled": [NSNumber numberWithBool:config.isAdQualityEnabled]
    };
}

/**
 Creates a dictionary containing information about the ad.

 @param adInfo The LPMAdInfo object from which to extract information.
 @return A dictionary containing the ad information.
 */
+ (NSDictionary *)getDictForLevelPlayAdInfo:(LPMAdInfo *)adInfo {
    return @{
            @"adUnitId": adInfo.adUnitId, // (nonnull)
            @"adFormat": adInfo.adFormat, // (nonnull)
            @"impressionData": @{
                    @"auctionId": adInfo.auctionId, // (nonnull)
                    @"adUnitName": adInfo.adUnitName, // (nonnull)
                    @"adUnitId": adInfo.adUnitId, // (nonnull)
                    @"adFormat": adInfo.adFormat, // (nonnull)
                    @"country": adInfo.country, // (nonnull)
                    @"ab": adInfo.ab, // (nonnull)
                    @"segmentName": adInfo.segmentName, // (nonnull)
                    @"placement": adInfo.placementName ?: [NSNull null], // (nullable)
                    @"adNetwork": adInfo.adNetwork, // (nonnull)
                    @"instanceName": adInfo.instanceName, // (nonnull)
                    @"instanceId": adInfo.instanceId, // (nonnull)
                    @"revenue": @([adInfo.revenue doubleValue]), // (nonnull)
                    @"precision": adInfo.precision, // (nonnull)
                    @"encryptedCPM": adInfo.encryptedCPM,  // (nonnull)
                    @"conversionValue": adInfo.conversionValue ? @([adInfo.conversionValue doubleValue]) : [NSNull null], // (nullable)
            },
            @"adSize": [self getDictForAdSize:adInfo.adSize]
    };
}

+ (NSDictionary *)getDictForLevelPlayAdError:(NSError *)error adUnitId:(NSString *) adUnitId {
    return @{
            @"adUnitId": adUnitId?: [NSNull null],
            @"errorCode": [NSNumber numberWithInteger:error.code],
            @"errorMessage": error.userInfo[NSLocalizedDescriptionKey],
    };
}

/**
 Creates a dictionary containing information about the ad size.

 @param adSize The LPMAdSize object.
 @return A dictionary containing the adSize information.
 */
+ (NSDictionary *)getDictForAdSize:(LPMAdSize *)adSize {
    if (adSize == nil) {
        return [NSNull null];
    }

    return @{
            @"width": @(adSize.width),
            @"height": @(adSize.height),
            @"adLabel": adSize.sizeDescription,
            @"isAdaptive": @(adSize.isAdaptive)
    };
}

+ (NSDictionary *)getDictForImpressionData:(ISImpressionData *)impressionData {
    return @{
            @"auctionId": impressionData.auction_id ?: [NSNull null],
            @"adUnit": impressionData.ad_unit ?: [NSNull null],
            @"adUnitName": impressionData.mediation_ad_unit_name ?: [NSNull null],
            @"adUnitId": impressionData.mediation_ad_unit_id ?: [NSNull null],
            @"adFormat": impressionData.ad_format ?: [NSNull null],
            @"country": impressionData.instance_name ?: [NSNull null],
            @"ab": impressionData.ab ?: [NSNull null],
            @"segmentName": impressionData.segment_name ?: [NSNull null],
            @"placement": impressionData.placement ?: [NSNull null],
            @"adNetwork": impressionData.ad_network ?: [NSNull null],
            @"instanceName": impressionData.instance_name ?: [NSNull null],
            @"instanceId": impressionData.instance_id ?: [NSNull null],
            @"revenue": impressionData.revenue ? @([impressionData.revenue doubleValue]) : [NSNull null],
            @"precision": impressionData.precision ?: [NSNull null],
            @"lifetimeRevenue": impressionData.lifetime_revenue ? @([impressionData.lifetime_revenue doubleValue]) : [NSNull null],
            @"encryptedCPM": impressionData.encrypted_cpm ?: [NSNull null],
            @"conversionValue": impressionData.conversion_value ? @([impressionData.conversion_value doubleValue]) : [NSNull null],
    };
}

+ (UIViewController *)getRootViewController {
    UIWindow *keyWindow = [UIApplication sharedApplication].keyWindow;
    UIViewController *rootViewController = keyWindow.rootViewController;

    if (!rootViewController) {
        UIWindow *delegateWindow = [UIApplication sharedApplication].delegate.window;
        rootViewController = delegateWindow.rootViewController;
    }

    NSAssert(rootViewController != nil, @"Root view controller should not be nil");

    return rootViewController;
}

@end
