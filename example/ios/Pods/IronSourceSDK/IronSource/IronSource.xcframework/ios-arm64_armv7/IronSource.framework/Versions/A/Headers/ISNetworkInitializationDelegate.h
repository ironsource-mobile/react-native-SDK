//
//  ISNetworkInitializationDelegate.h
//  IronSource
//
//  Created by Yonti Makmel on 07/06/2021.
//  Copyright © 2021 ironSource. All rights reserved.
//


NS_ASSUME_NONNULL_BEGIN

@protocol ISNetworkInitializationDelegate<NSObject>

- (void)onInitDidSucceed;

/// @param errorCode the error code if available, general ones in AdapterErrors
/// @param errorMessage the error message if available
- (void)onInitDidFailWithErrorCode:(NSInteger)errorCode
                      errorMessage:(nullable NSString*)errorMessage;

@end

NS_ASSUME_NONNULL_END
