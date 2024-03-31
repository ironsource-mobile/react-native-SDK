//
//  RCTLevelPlayISDelegateWrapper.m
//  ironsource-mediation
//
//  Created by Kohei on 2022/07/25.
//

#import "RCTLevelPlayISDelegateWrapper.h"

@implementation RCTLevelPlayISDelegateWrapper

-(instancetype)initWithDelegate:(id<RCTLevelPlayISDelegate>)delegate {
    self = [super init];
    
    if (self) {
        _delegate = delegate;
    }
    
    return self;
}

#pragma mark - LevelPlayInterstitialDelegate Functions

- (void)didLoadWithAdInfo:(ISAdInfo *)adInfo {
    [_delegate levelPlayISDidLoadWithAdInfo:adInfo];
}

- (void)didFailToLoadWithError:(NSError *)error {
    [_delegate levelPlayISDidFailToLoadWithError:error];
}

- (void)didOpenWithAdInfo:(ISAdInfo *)adInfo {
    [_delegate levelPlayISDidOpenWithAdInfo:adInfo];
}

- (void)didCloseWithAdInfo:(ISAdInfo *)adInfo {
    [_delegate levelPlayISDidCloseWithAdInfo:adInfo];
}

- (void)didShowWithAdInfo:(ISAdInfo *)adInfo {
    [_delegate levelPlayISDidShowWithAdInfo:adInfo];
}

- (void)didFailToShowWithError:(NSError *)error
                     andAdInfo:(ISAdInfo *)adInfo {
    [_delegate levelPlayISDidFailToShowWithError:error
                                       andAdInfo:adInfo];
}

- (void)didClickWithAdInfo:(ISAdInfo *)adInfo {
    [_delegate levelPlayISDidClickWithAdInfo:adInfo];
}

@end
