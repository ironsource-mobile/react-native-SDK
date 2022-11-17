//
//  ISAdapterDispatcherProtocol.h
//  UltraApp
//
//  Created by yossi mozgerashvily on 7/23/15.
//  Copyright (c) 2015 IronSource. All rights reserved.
//

#ifndef UltraApp_ISAdapterDispatcherProtocol_h
#define UltraApp_ISAdapterDispatcherProtocol_h

@protocol ISAdapterDispatcherProtocol
@required
- (void) dispatchAsyncWithQueue:(dispatch_queue_t)queue withBlock:(dispatch_block_t) block;
@end
#endif
