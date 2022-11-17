//
//  ISBaseAdAdapter.h
//  IronSource
//
//  Created by Yonti Makmel on 27/04/2021.
//  Copyright © 2021 ironSource. All rights reserved.
//

#import "ISAdUnit.h"
#import "ISAdapterConfig.h"
#import "ISAdapterBaseProtocol.h"
#import "ISAdData.h"
#import "ISAdapterAdDelegate.h"
#import <UIKit/UIKit.h>

NS_ASSUME_NONNULL_BEGIN

@protocol ISBaseAdAdapterProtocol <NSObject>

/// load the ad
/// @param adData data containing the configuration passed from the server and other related parameters passed from the publisher like userId
/// @param delegate the delegate to return mandatory callbacks based on the network - load success, load failure, ad opened, ad closed, show failed
/// optional callbacks - show success, clicked
- (void)loadAdWithAdData:(ISAdData*)adData
                delegate:(id<ISAdapterAdDelegate>)delegate;

@end

@interface ISBaseAdAdapter : NSObject<ISBaseAdAdapterProtocol>

@property (nonatomic) ISAdUnit                              *adUnit; 
@property (nonatomic, readonly) ISAdapterConfig             *adapterConfig;

/// @param adUnit the ad unit represented by the adapter
/// @param adapterConfig the configuration relevant for the adapter instance
- (instancetype)initWithAdUnit:(ISAdUnit*)adUnit
                 adapterConfig:(ISAdapterConfig*)adapterConfig;

/// the network sdk version
-(nullable id<ISAdapterBaseProtocol>)getNetworkAdapter;

/// When the adapter needs to release certain elements to avoid memory leaks before being destroyed
- (void)releaseMemory;

@end

NS_ASSUME_NONNULL_END
