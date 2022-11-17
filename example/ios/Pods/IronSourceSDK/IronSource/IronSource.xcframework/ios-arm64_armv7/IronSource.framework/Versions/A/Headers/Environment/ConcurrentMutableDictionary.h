//
//  ConcurrentMutableDictionary.h
//  Environment
//
//  Created by Hadar Pur on 02/06/2021.
//  Copyright © 2021 ironSource. All rights reserved.
//

#import <Foundation/Foundation.h>

@interface ConcurrentMutableDictionary : NSObject

+ (instancetype)dictionary;
+ (instancetype)dictionaryWithDictionary:(id)dictionary;

- (instancetype)initCommon;
- (instancetype)init;
- (instancetype)initWithCapacity:(NSUInteger)numItems;
- (instancetype)initWithContentsOfFile:(NSString *)path;
- (instancetype)initWithContentsOfURL:(NSURL *)url;
- (instancetype)initWithCoder:(NSCoder *)aDecoder;
- (instancetype)initWithDictionary:(NSMutableDictionary *)dictionary;

- (NSUInteger)count;
- (id)objectForKey:(id)key;
- (NSEnumerator *)keyEnumerator;

- (void)setObject:(id)object forKey:(id<NSCopying>)key;
- (void)setDictionary:(NSDictionary *)otherDictionary;
- (void)addEntriesFromDictionary:(NSDictionary *)otherDictionary;

- (void)removeObjectForKey:(id)key;
- (void)removeObjectsForKeys:(NSArray *)keyArray;
- (void)removeAllObjects;

- (NSArray *)allKeys;
- (NSArray *)allValues;
- (NSDictionary *)allData;

- (BOOL)hasObjectForKey:(id)key;

@end
