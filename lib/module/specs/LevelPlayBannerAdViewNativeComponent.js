import codegenNativeComponent from 'react-native/Libraries/Utilities/codegenNativeComponent';
import codegenNativeCommands from 'react-native/Libraries/Utilities/codegenNativeCommands';

// CodeGen-compatible interfaces (no imports from models to avoid class type issues)

/**
 * Native commands callable from JS for managing LevelPlay Banner Ad View.
 */

/**
 * JS interface to banner ad view commands for LevelPlay Banner Ad View.
 */
export const Commands = codegenNativeCommands({
  supportedCommands: ['loadAd', 'destroy', 'pauseAutoRefresh', 'resumeAutoRefresh']
});
export default codegenNativeComponent('LevelPlayBannerAdView');
//# sourceMappingURL=LevelPlayBannerAdViewNativeComponent.js.map