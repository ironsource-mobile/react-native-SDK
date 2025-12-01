//
//  LevelPlayMediation.h
//  LevelPlayMediation
//
//  Copyright © 2024 Unity Technologies. All rights reserved.

#import <React/RCTEventEmitter.h>
#import <IronSource/IronSource.h>

#ifdef RCT_NEW_ARCH_ENABLED
#import <LevelPlayMediationSpec/LevelPlayMediationSpec.h>
@interface LevelPlayMediation : RCTEventEmitter <NativeLevelPlayMediationSpec>
#else
#import <React/RCTBridgeModule.h>
@interface LevelPlayMediation : RCTEventEmitter <RCTBridgeModule>
#endif

@end
