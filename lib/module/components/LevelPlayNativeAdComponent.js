import { requireNativeComponent } from 'react-native';
// Object to cache native components
const componentCache = {};

/**
 * Retrieves or creates a native component for a given viewType and returns it as a HostComponent.
 * 
 * @param viewType The type of the native component to be retrieved or created.
 * @returns A HostComponent representing the native component with specified props and events.
 */
export const LevelPlayNativeAdComponent = viewType => {
  if (!componentCache[viewType]) {
    componentCache[viewType] = requireNativeComponent(viewType);
  }
  return componentCache[viewType];
};
//# sourceMappingURL=LevelPlayNativeAdComponent.js.map