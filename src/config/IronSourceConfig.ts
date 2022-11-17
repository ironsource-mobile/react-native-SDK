/**
 * Internal Config module.
 */

import { NativeModules } from 'react-native'

type SetPluginDataFunction = (
  pluginType: string,
  pluginVersion: string,
  reactNativeVersion: string
) => Promise<void>

const { IronSourceConfig } = NativeModules

export const setPluginData =
  IronSourceConfig.setPluginData as SetPluginDataFunction
