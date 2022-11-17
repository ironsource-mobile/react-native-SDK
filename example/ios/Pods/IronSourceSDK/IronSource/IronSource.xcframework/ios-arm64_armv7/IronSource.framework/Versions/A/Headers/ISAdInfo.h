//
//  ISAdInfo.h
//  IronSource
//
//  Created by Hadar Pur on 23/03/2022.
//  Copyright © 2022 IronSource. All rights reserved.
//

#import "ISImpressionData.h"

NS_ASSUME_NONNULL_BEGIN

@interface ISAdInfo : NSObject

@property (readonly, copy) NSString*         auction_id;
@property (readonly, copy) NSString*         ad_unit;
@property (readonly, copy) NSString*         ad_network;
@property (readonly, copy) NSString*         instance_name;
@property (readonly, copy) NSString*         instance_id;
@property (readonly, copy) NSString*         country;
@property (readonly, copy) NSNumber*         revenue;
@property (readonly, copy) NSString*         precision;
@property (readonly, copy) NSString*         ab;
@property (readonly, copy) NSString*         segment_name;
@property (readonly, copy) NSNumber*         lifetime_revenue;
@property (readonly, copy) NSString*         encrypted_cpm;
@property (readonly, copy) NSNumber*         conversion_value;

- (instancetype)init;
- (instancetype)initWithImpressionData:(ISImpressionData * _Nonnull)impressionData;

@end

NS_ASSUME_NONNULL_END
