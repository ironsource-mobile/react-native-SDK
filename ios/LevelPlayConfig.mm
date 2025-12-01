#import "LevelPlayConfig.h"
#import <IronSource/IronSource.h>
#import "LevelPlayConstants.h"

#pragma mark - Internal Config API =======================================================
@implementation LevelPlayConfig

RCT_EXPORT_MODULE();

/**
 @name setPluginData
 @param pluginType
 @param pluginVersion
 @return nil
 */
RCT_EXPORT_METHOD(setPluginData:(nonnull NSString *) pluginType
                  pluginVersion:(nonnull NSString *) pluginVersion
                  reactNativeVersion:(nonnull NSString *) reactNativeVersion
                  resolve:(RCTPromiseResolveBlock)resolve
                  reject:(RCTPromiseRejectBlock)reject)  {
    if([pluginType length] == 0){
        return reject(E_ILLEGAL_ARGUMENT, @"pluginType must be provided.", nil);
    }
    if([pluginVersion length] == 0){
        return reject(E_ILLEGAL_ARGUMENT, @"pluginVersion must be provided.", nil);
    }
    
    [ISConfigurations getConfigurations].plugin = pluginType;
    [ISConfigurations getConfigurations].pluginVersion = pluginVersion;
    [ISConfigurations getConfigurations].pluginFrameworkVersion = reactNativeVersion;

    return resolve(nil);
}

@end

