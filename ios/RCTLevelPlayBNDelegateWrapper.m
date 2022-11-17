//
//  RCTLevelPlayBNDelegateWrapper.m
//  ironsource-mediation
//
//  Created by Kohei on 2022/08/09.
//

#import "RCTLevelPlayBNDelegateWrapper.h"

@implementation RCTLevelPlayBNDelegateWrapper

-(instancetype)initWithDelegate:(id<RCTLevelPlayBNDelegate>)delegate {
    self = [super init];
    
    if (self) {
        _delegate = delegate;
    }
    
    return self;
}

#pragma mark - LevelPlayBannerDelegate Functions

- (void)didLoad:(ISBannerView *)bannerView withAdInfo:(ISAdInfo *)adInfo {
    [_delegate levelPlayBNDidLoad:bannerView withAdInfo:adInfo];
}

- (void)didFailToLoadWithError:(NSError *)error {
    [_delegate levelPlayBNDidFailToLoadWithError:error];
}

- (void)didClickWithAdInfo:(ISAdInfo *)adInfo {
    [_delegate levelPlayBNDidClickWithAdInfo:adInfo];
}

- (void)didPresentScreenWithAdInfo:(ISAdInfo *)adInfo {
    [_delegate levelPlayBNDidPresentScreenWithAdInfo:adInfo];
}

- (void)didDismissScreenWithAdInfo:(ISAdInfo *)adInfo {
    [_delegate levelPlayBNDidDismissScreenWithAdInfo:adInfo];
}

- (void)didLeaveApplicationWithAdInfo:(ISAdInfo *)adInfo {
    [_delegate levelPlayBNDidLeaveApplicationWithAdInfo:adInfo];
}

@end
