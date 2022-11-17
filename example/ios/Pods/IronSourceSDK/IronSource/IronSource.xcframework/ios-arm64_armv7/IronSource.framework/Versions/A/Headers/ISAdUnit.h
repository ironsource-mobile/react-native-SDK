//
//  ISAdUnit.h
//  IronSource
//
//  Created by Yonti Makmel on 18/04/2021.
//  Copyright © 2021 ironSource. All rights reserved.
//

NS_ASSUME_NONNULL_BEGIN

@interface ISAdUnit : NSObject


@property (strong, nonatomic) NSString *value;

+(ISAdUnit*)IS_AD_UNIT_REWARDED_VIDEO;
+(ISAdUnit*)IS_AD_UNIT_INTERSTITIAL;
+(ISAdUnit*)IS_AD_UNIT_OFFERWALL;
+(ISAdUnit*)IS_AD_UNIT_BANNER;

- (instancetype)initWithValue:(NSString*)value;

@end

NS_ASSUME_NONNULL_END
