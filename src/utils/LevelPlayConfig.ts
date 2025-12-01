/**
 * Internal Config module.
 */

import { NativeModules } from 'react-native'

type SetPluginDataFunction = (
  pluginType: string,
  pluginVersion: string,
  reactNativeVersion: string
) => Promise<void>

const { LevelPlayConfig } = NativeModules

export const setPluginData =
  LevelPlayConfig.setPluginData as SetPluginDataFunction

