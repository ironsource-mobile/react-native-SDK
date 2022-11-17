//
//  ISAdapterLoggerProtocol.h
//  UltraApp
//
//  Created by yossi mozgerashvily on 7/23/15.
//  Copyright (c) 2015 IronSource. All rights reserved.
//

#ifndef UltraApp_ISAdapterLoggerProtocol_h
#define UltraApp_ISAdapterLoggerProtocol_h

#import <Foundation/Foundation.h>
#import "ISLoggerManager.h"

@protocol ISAdapterLoggerProtocol

@required
- (void)log:(NSString *)message;
- (void)log:(NSString *)message withTag:(LogTag)logTag;
- (void)logFromError:(NSError*)error;
- (void)logFromException:(NSException*)exception;
@end

#endif
