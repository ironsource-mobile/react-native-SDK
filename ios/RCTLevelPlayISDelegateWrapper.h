//
//  RCTLevelPlayISDelegateWrapper.h
//  ironsource-mediation
//
//  Created by Kohei on 2022/07/25.
//
#import <Foundation/Foundation.h>
#import <IronSource/IronSource.h>

NS_ASSUME_NONNULL_BEGIN

@protocol RCTLevelPlayISDelegate <NSObject>

- (void)levelPlayISDidLoadWithAdInfo:(ISAdInfo *)adInfo;
- (void)levelPlayISDidFailToLoadWithError:(NSError *)error;
- (void)levelPlayISDidOpenWithAdInfo:(ISAdInfo *)adInfo;
- (void)levelPlayISDidCloseWithAdInfo:(ISAdInfo *)adInfo;
- (void)levelPlayISDidShowWithAdInfo:(ISAdInfo *)adInfo;
- (void)levelPlayISDidFailToShowWithError:(NSError *)error
                                andAdInfo:(ISAdInfo *)adInfo;
- (void)levelPlayISDidClickWithAdInfo:(ISAdInfo *)adInfo;

@end

@interface RCTLevelPlayISDelegateWrapper : NSObject <LevelPlayInterstitialDelegate>

@property (nonatomic, weak) id<RCTLevelPlayISDelegate> delegate;

- (instancetype) initWithDelegate:(id<RCTLevelPlayISDelegate>)delegate;

@end

NS_ASSUME_NONNULL_END
