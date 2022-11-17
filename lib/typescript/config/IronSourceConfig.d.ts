/**
 * Internal Config module.
 */
declare type SetPluginDataFunction = (pluginType: string, pluginVersion: string, reactNativeVersion: string) => Promise<void>;
export declare const setPluginData: SetPluginDataFunction;
export {};
