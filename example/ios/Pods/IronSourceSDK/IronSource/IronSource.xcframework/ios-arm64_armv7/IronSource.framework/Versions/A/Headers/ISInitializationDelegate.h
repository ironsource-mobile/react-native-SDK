//
//  ISInitializationDelegate.h
//  IronSource
//
//  Created by Hadar Pur on 06/01/2022.
//  Copyright © 2022 IronSource. All rights reserved.
//

#ifndef ISInitializationDelegate_h
#define ISInitializationDelegate_h

@protocol ISInitializationDelegate <NSObject>

@required

/**
 Called after init mediation completed
 */
- (void)initializationDidComplete;

@end

#endif /* ISInitializationDelegate_h */
