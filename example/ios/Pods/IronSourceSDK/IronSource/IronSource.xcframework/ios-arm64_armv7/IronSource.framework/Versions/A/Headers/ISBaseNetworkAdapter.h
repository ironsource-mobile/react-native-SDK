//
//  ISBaseNetworkAdapter.h
//  IronSource
//
//  Created by Guy Lis on 05/07/2021.
//  Copyright © 2021 ironSource. All rights reserved.
//

#import "ISAdapterBaseProtocol.h"
#import "ISAdapterDebugProtocol.h"
#import "ISAdapterConsentProtocol.h"
#import "ISAdapterMetaDataProtocol.h"
#import "ISAdapterSettingsProtocol.h"

NS_ASSUME_NONNULL_BEGIN

@interface ISBaseNetworkAdapter : NSObject
<ISAdapterBaseProtocol, ISAdapterDebugProtocol, ISAdapterConsentProtocol, ISAdapterMetaDataProtocol, ISAdapterSettingsProtocol>

@end

NS_ASSUME_NONNULL_END
