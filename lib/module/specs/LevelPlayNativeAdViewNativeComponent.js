import codegenNativeComponent from 'react-native/Libraries/Utilities/codegenNativeComponent';
import codegenNativeCommands from 'react-native/Libraries/Utilities/codegenNativeCommands';

// CodeGen-compatible interfaces (no imports from models to avoid class type issues)

/**
 * Native commands callable from JS for managing LevelPlay Native Ad View.
 */

/**
 * JS interface to native ad view commands for LevelPlay Native Ad View.
 */
export const Commands = codegenNativeCommands({
  supportedCommands: ['loadAd', 'destroyAd']
});
export default codegenNativeComponent('LevelPlayNativeAdView');
//# sourceMappingURL=LevelPlayNativeAdViewNativeComponent.js.map