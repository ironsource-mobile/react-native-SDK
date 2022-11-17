//
//  ConcurrentMutableSet.h
//  Environment
//
//  Created by Hadar Pur on 02/06/2021.
//  Copyright © 2021 ironSource. All rights reserved.
//

#import <Foundation/Foundation.h>

@interface ConcurrentMutableSet : NSObject

+ (instancetype)set;
+ (instancetype)setWithSet:(id)set;

- (instancetype)initCommon;
- (instancetype)init;
- (instancetype)initWithCapacity:(NSUInteger)numItems;
- (instancetype)initWithCoder:(NSCoder *)aDecoder;
- (instancetype)initWithSet:(NSMutableSet *)set;
- (instancetype)initWithArray:(NSArray *)array;

- (NSUInteger)count;
- (void)addObject:(id)object;
- (void)removeObject:(id)object;
- (void)addObjectsFromArray:(NSArray *)array;
- (void)intersectSet:(NSSet *)otherSet;
- (void)minusSet:(NSSet *)otherSet;
- (void)removeAllObjects;
- (void)unionSet:(NSSet *)otherSet;
- (NSArray *)allObjects;
- (BOOL)hasObject:(id)object;
- (NSEnumerator *)objectEnumerator;

@end
