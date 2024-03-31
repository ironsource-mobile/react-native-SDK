#import "Utilities.h"

@implementation Utilities

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
            @"lifetimeRevenue": adInfo.lifetime_revenue ?: [NSNull null],
            @"encryptedCpm": adInfo.encrypted_cpm ?: [NSNull null],
            @"conversionValue": adInfo.conversion_value ?: [NSNull null],
    };
}

/**
 Creates a dictionary containing information about the error.
 @param error The NSError object representing the error.
 @return A dictionary containing the error information.
 */
+ (NSDictionary *)getDictWithError:(NSError *)error {
    return @{
        @"errorCode": @(error.code),
        @"errorMessage": error.localizedDescription ?: @"Unknown error"
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

@end
