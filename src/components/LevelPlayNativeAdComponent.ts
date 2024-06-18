import { requireNativeComponent } from 'react-native';
import type { ViewProps, HostComponent } from 'react-native';
import type { LevelPlayNativeAdViewProps, LevelPlayNativeAdViewNativeEvents } from './LevelPlayNativeAdView';

// Object to cache native components
const componentCache: { [key: string]: HostComponent<LevelPlayNativeAdViewProps & ViewProps & LevelPlayNativeAdViewNativeEvents> } = {};

/**
 * Retrieves or creates a native component for a given viewType and returns it as a HostComponent.
 * 
 * @param viewType The type of the native component to be retrieved or created.
 * @returns A HostComponent representing the native component with specified props and events.
 */
export const LevelPlayNativeAdComponent = (viewType: string): HostComponent<LevelPlayNativeAdViewProps & ViewProps & LevelPlayNativeAdViewNativeEvents> => {
  if (!componentCache[viewType]) {
    componentCache[viewType] = requireNativeComponent<LevelPlayNativeAdViewProps & ViewProps & LevelPlayNativeAdViewNativeEvents>(viewType);
  }
  return componentCache[viewType];
};
