//
//  RCTLevelPlayBNDelegateWrapper.h
//  ironsource-mediation
//
//  Created by Kohei on 2022/08/09.
//

#import <Foundation/Foundation.h>
#import <IronSource/IronSource.h>

NS_ASSUME_NONNULL_BEGIN

@protocol RCTLevelPlayBNDelegate <NSObject>

- (void)levelPlayBNDidLoad:(ISBannerView *)bannerView
                withAdInfo:(ISAdInfo *)adInfo;
- (void)levelPlayBNDidFailToLoadWithError:(NSError *)error;
- (void)levelPlayBNDidClickWithAdInfo:(ISAdInfo *)adInfo;
- (void)levelPlayBNDidPresentScreenWithAdInfo:(ISAdInfo *)adInfo;
- (void)levelPlayBNDidDismissScreenWithAdInfo:(ISAdInfo *)adInfo;
- (void)levelPlayBNDidLeaveApplicationWithAdInfo:(ISAdInfo *)adInfo;

@end

@interface RCTLevelPlayBNDelegateWrapper : NSObject<LevelPlayBannerDelegate>

@property (nonatomic, weak) id<RCTLevelPlayBNDelegate> delegate;

- (instancetype) initWithDelegate:(id<RCTLevelPlayBNDelegate>)delegate;

@end

NS_ASSUME_NONNULL_END
