//
//  ISAdapterAdInteractionDelegate.h
//  IronSource
//
//  Created by Bar David on 21/10/2021.
//  Copyright © 2021 IronSource. All rights reserved.
//

#ifndef ISAdapterAdInteractionDelegate_h
#define ISAdapterAdInteractionDelegate_h

#import "ISAdapterAdDelegate.h"

NS_ASSUME_NONNULL_BEGIN

@protocol ISAdapterAdInteractionDelegate<ISAdapterAdDelegate>

-(void)adDidOpen;

-(void)adDidClose;

/// @param errorCode the error code if available, general ones in AdapterErrors
/// @param errorMessage the error message if available
-(void)adDidFailToShowWithErrorCode:(NSInteger)errorCode
                       errorMessage:(nullable NSString*)errorMessage;

-(void)adDidShowSucceed;

-(void)adDidBecomeVisible;

-(void)adDidStart;

-(void)adDidEnd;

@end

NS_ASSUME_NONNULL_END

#endif /* ISAdapterAdInteractionDelegate_h */
