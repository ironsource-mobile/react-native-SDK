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
            @"adNetwork": adInfo.ad_network ?: [NSNull null],
            @"instanceName": adInfo.instance_name ?: [NSNull null],
            @"instanceId": adInfo.instance_id ?: [NSNull null],
            @"country": adInfo.country ?: [NSNull null],
            @"revenue": adInfo.revenue != nil ? @(adInfo.revenue.doubleValue) : [NSNull null],
            @"precision": adInfo.precision ?: [NSNull null],
            @"ab": adInfo.ab ?: [NSNull null],
            @"segmentName": adInfo.segment_name ?: [NSNull null],
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
            @"isAdQualityEnabled": [NSNumber numberWithBool:config.isAdQualityEnabled],
            @"ab": config.ab ?: [NSNull null]
    };
}

/**
 Creates a dictionary containing information about the ad.

 @param adInfo The LPMAdInfo object from which to extract information.
 @return A dictionary containing the ad information.
 */
+ (NSDictionary *)getDictForLevelPlayAdInfo:(LPMAdInfo *)adInfo {
    return @{
            @"adId": adInfo.adId,
            @"adUnitId": adInfo.adUnitId,
            @"adUnitName": adInfo.adUnitName,
            @"adFormat": adInfo.adFormat,
            @"adSize": [self getDictForAdSize:adInfo.adSize] ?: [NSNull null],
            @"placementName": adInfo.placementName ?: [NSNull null],
            @"auctionId": adInfo.auctionId,
            @"country": adInfo.country,
            @"ab": adInfo.ab,
            @"segmentName": adInfo.segmentName,
            @"adNetwork": adInfo.adNetwork,
            @"instanceName": adInfo.instanceName,
            @"instanceId": adInfo.instanceId,
            @"revenue": @([adInfo.revenue doubleValue]),
            @"precision": adInfo.precision,
            @"encryptedCPM": adInfo.encryptedCPM,
            @"conversionValue": adInfo.conversionValue ? @([adInfo.conversionValue doubleValue]) : [NSNull null],
            @"creativeId": adInfo.creativeId ?: [NSNull null],
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
        return nil;
    }

    return @{
            @"width": @(adSize.width),
            @"height": @(adSize.height),
            @"adLabel": adSize.sizeDescription,
            @"isAdaptive": @(adSize.isAdaptive)
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

+ (NSDictionary *)getDictForLevelPlayReward:(LPMReward *)reward {
    return @{
            @"name": reward.name,
            @"amount": [NSNumber numberWithInteger: reward.amount],
    };
}

+ (NSDictionary *)getDictForLevelPlayImpressionData:(LPMImpressionData *)impressionData {
    return @{
            @"auctionId": impressionData.auctionId ?: [NSNull null],
            @"mediationAdUnitName": impressionData.mediationAdUnitName ?: [NSNull null],
            @"mediationAdUnitId": impressionData.mediationAdUnitId ?: [NSNull null],
            @"adFormat": impressionData.adFormat ?: [NSNull null],
            @"country": impressionData.country ?: [NSNull null],
            @"ab": impressionData.ab ?: [NSNull null],
            @"segmentName": impressionData.segmentName ?: [NSNull null],
            @"placement": impressionData.placement ?: [NSNull null],
            @"adNetwork": impressionData.adNetwork ?: [NSNull null],
            @"instanceName": impressionData.instanceName ?: [NSNull null],
            @"instanceId": impressionData.instanceId ?: [NSNull null],
            @"revenue": impressionData.revenue ? @([impressionData.revenue doubleValue]) : [NSNull null],
            @"precision": impressionData.precision ?: [NSNull null],
            @"encryptedCPM": impressionData.encryptedCpm ?: [NSNull null],
            @"conversionValue": impressionData.conversionValue ? @([impressionData.conversionValue doubleValue]) : [NSNull null],
            @"creativeId": impressionData.creativeId ?: [NSNull null],
    };
}

@end
