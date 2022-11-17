//
//  ISAdapterAdDelegate.h
//  IronSource
//
//  Created by Yonti Makmel on 28/04/2021.
//  Copyright © 2021 ironSource. All rights reserved.
//


#ifndef ISAdapterAdDelegate_h
#define ISAdapterAdDelegate_h

#import "ISAdapterErrorType.h"

NS_ASSUME_NONNULL_BEGIN

@protocol ISAdapterAdDelegate <NSObject>

-(void)adDidLoad;

/// @param errorType the load error type, including NO_FILL
/// @param errorCode the error code if available, general ones in AdapterErrors
/// @param errorMessage the error message if available
-(void)adDidFailToLoadWithErrorType:(ISAdapterErrorType)errorType
                          errorCode:(NSInteger)errorCode
                       errorMessage:(nullable NSString*)errorMessage;

-(void)adDidClick;

@end

NS_ASSUME_NONNULL_END

#endif /* ISAdapterAdDelegate_h */
