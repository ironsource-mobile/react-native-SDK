//
//  ISBiddingDataAdapterProtocol.h
//  IronSource
//
//  Created by Bar David on 29/06/2020.
//  Copyright © 2020 ironSource. All rights reserved.
//

@class ISBiddingDataAdapterProtocol;
@protocol ISBiddingDataAdapterProtocol <NSObject>

@optional

- (NSDictionary *)getPlayerBiddingData;

@end
