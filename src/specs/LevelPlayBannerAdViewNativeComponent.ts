import type { ViewProps } from 'react-native'
import type { HostComponent } from 'react-native'
import codegenNativeComponent from 'react-native/Libraries/Utilities/codegenNativeComponent'
import codegenNativeCommands from 'react-native/Libraries/Utilities/codegenNativeCommands'
import type {
  DirectEventHandler,
  Double,
  Int32,
} from 'react-native/Libraries/Types/CodegenTypes'

// CodeGen-compatible interfaces (no imports from models to avoid class type issues)

export interface CreationParams {
  adUnitId: string
  adSize: {
    width: Double
    height: Double
    adLabel?: string | null
    isAdaptive: boolean
  }
  placementName: string
  bidFloor?: Double
}

export interface AdLoadedEvent {
  adInfo: {
    adId: string
    adUnitId: string
    adUnitName: string
    adSize: {
      width: Double
      height: Double
      adLabel?: string | null
      isAdaptive: boolean
    } | null
    adFormat: string
    placementName: string
    auctionId: string
    country: string
    ab: string
    segmentName: string
    adNetwork: string
    instanceName: string
    instanceId: string
    revenue: Double
    precision: string
    encryptedCPM: string
    conversionValue: Double | null
    creativeId: string
  }
}

export interface AdLoadFailedEvent {
  error: {
    errorMessage: string
    errorCode: Int32
    adUnitId: string | null
  }
}

export interface AdDisplayedEvent {
  adInfo: {
    adId: string
    adUnitId: string
    adUnitName: string
    adSize: {
      width: Double
      height: Double
      adLabel?: string | null
      isAdaptive: boolean
    } | null
    adFormat: string
    placementName: string
    auctionId: string
    country: string
    ab: string
    segmentName: string
    adNetwork: string
    instanceName: string
    instanceId: string
    revenue: Double
    precision: string
    encryptedCPM: string
    conversionValue: Double | null
    creativeId: string
  }
}

export interface AdDisplayFailedEvent {
  adInfo: {
    adId: string
    adUnitId: string
    adUnitName: string
    adSize: {
      width: Double
      height: Double
      adLabel?: string | null
      isAdaptive: boolean
    } | null
    adFormat: string
    placementName: string
    auctionId: string
    country: string
    ab: string
    segmentName: string
    adNetwork: string
    instanceName: string
    instanceId: string
    revenue: Double
    precision: string
    encryptedCPM: string
    conversionValue: Double | null
    creativeId: string
  }
  error: {
    errorMessage: string
    errorCode: Int32
    adUnitId: string | null
  }
}

export interface AdClickedEvent {
  adInfo: {
    adId: string
    adUnitId: string
    adUnitName: string
    adSize: {
      width: Double
      height: Double
      adLabel?: string | null
      isAdaptive: boolean
    } | null
    adFormat: string
    placementName: string
    auctionId: string
    country: string
    ab: string
    segmentName: string
    adNetwork: string
    instanceName: string
    instanceId: string
    revenue: Double
    precision: string
    encryptedCPM: string
    conversionValue: Double | null
    creativeId: string
  }
}

export interface AdExpandedEvent {
  adInfo: {
    adId: string
    adUnitId: string
    adUnitName: string
    adSize: {
      width: Double
      height: Double
      adLabel?: string | null
      isAdaptive: boolean
    } | null
    adFormat: string
    placementName: string
    auctionId: string
    country: string
    ab: string
    segmentName: string
    adNetwork: string
    instanceName: string
    instanceId: string
    revenue: Double
    precision: string
    encryptedCPM: string
    conversionValue: Double | null
    creativeId: string
  }
}

export interface AdCollapsedEvent {
  adInfo: {
    adId: string
    adUnitId: string
    adUnitName: string
    adSize: {
      width: Double
      height: Double
      adLabel?: string | null
      isAdaptive: boolean
    } | null
    adFormat: string
    placementName: string
    auctionId: string
    country: string
    ab: string
    segmentName: string
    adNetwork: string
    instanceName: string
    instanceId: string
    revenue: Double
    precision: string
    encryptedCPM: string
    conversionValue: Double | null
    creativeId: string
  }
}

export interface AdLeftApplicationEvent {
  adInfo: {
    adId: string
    adUnitId: string
    adUnitName: string
    adSize: {
      width: Double
      height: Double
      adLabel?: string | null
      isAdaptive: boolean
    } | null
    adFormat: string
    placementName: string
    auctionId: string
    country: string
    ab: string
    segmentName: string
    adNetwork: string
    instanceName: string
    instanceId: string
    revenue: Double
    precision: string
    encryptedCPM: string
    conversionValue: Double | null
    creativeId: string
  }
}

export interface AdIdGeneratedEvent {
  adId: string
}

export interface NativeProps extends ViewProps {
  creationParams: CreationParams
  onAdLoadedEvent?: DirectEventHandler<AdLoadedEvent>
  onAdLoadFailedEvent?: DirectEventHandler<AdLoadFailedEvent>
  onAdDisplayedEvent?: DirectEventHandler<AdDisplayedEvent>
  onAdDisplayFailedEvent?: DirectEventHandler<AdDisplayFailedEvent>
  onAdClickedEvent?: DirectEventHandler<AdClickedEvent>
  onAdExpandedEvent?: DirectEventHandler<AdExpandedEvent>
  onAdCollapsedEvent?: DirectEventHandler<AdCollapsedEvent>
  onAdLeftApplicationEvent?: DirectEventHandler<AdLeftApplicationEvent>
  onAdIdGeneratedEvent?: DirectEventHandler<AdIdGeneratedEvent>
}

type LevelPlayBannerAdViewNativeComponentType = HostComponent<NativeProps>

/**
 * Native commands callable from JS for managing LevelPlay Banner Ad View.
 */
interface NativeCommands {
  /**
   * Manually loads a new banner ad.
   *
   * @param viewRef - Reference to the banner ad view.
   */
  loadAd(
    viewRef: React.ElementRef<LevelPlayBannerAdViewNativeComponentType>
  ): void

  /**
   * Destroys the currently loaded banner ad.
   *
   * @param viewRef - Reference to the banner ad view.
   */
  destroy(
    viewRef: React.ElementRef<LevelPlayBannerAdViewNativeComponentType>
  ): void

  /**
   * Pauses auto-refresh for the banner ad.
   *
   * @param viewRef - Reference to the banner ad view.
   */
  pauseAutoRefresh(
    viewRef: React.ElementRef<LevelPlayBannerAdViewNativeComponentType>
  ): void

  /**
   * Resumes auto-refresh for the banner ad.
   *
   * @param viewRef - Reference to the banner ad view.
   */
  resumeAutoRefresh(
    viewRef: React.ElementRef<LevelPlayBannerAdViewNativeComponentType>
  ): void
}

/**
 * JS interface to banner ad view commands for LevelPlay Banner Ad View.
 */
export const Commands: NativeCommands = codegenNativeCommands<NativeCommands>({
  supportedCommands: [
    'loadAd',
    'destroy',
    'pauseAutoRefresh',
    'resumeAutoRefresh',
  ],
})

export default codegenNativeComponent<NativeProps>(
  'LevelPlayBannerAdView'
) as HostComponent<NativeProps>
