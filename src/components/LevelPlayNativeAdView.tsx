import * as React from 'react'
import {
  useRef,
  useCallback,
  useEffect,
  useState,
  useImperativeHandle,
} from 'react'
import {
  type NativeMethods,
  type ViewProps,
  type ColorValue,
  type HostComponent,
  requireNativeComponent,
} from 'react-native'
import { type AdInfo, type IronSourceError, LevelPlayNativeAd } from '../models'
import {
  levelPlayNativeAdFromMap,
  adInfoFromMap,
  ironSourceErrorFromMap,
} from '../utils/utils'
import LevelPlayNativeAdViewComponent, {
  Commands,
} from '../specs/LevelPlayNativeAdViewNativeComponent'
import type {
  AdLoadedEvent,
  AdLoadFailedEvent,
  AdClickedEvent,
  AdImpressionEvent,
} from '../specs/LevelPlayNativeAdViewNativeComponent'
import type { DirectEventHandler } from 'react-native/Libraries/Types/CodegenTypes'

// Object to cache native components
const componentCache: { [key: string]: HostComponent<any> } = {}

/**
 * Retrieves or creates a native component for a given viewType.
 *
 * @param viewType The type of the native component to be retrieved or created.
 * @returns A HostComponent representing the native component with specified props and events.
 */
const LevelPlayNativeAdComponent = (viewType: string): HostComponent<any> => {
  if (!componentCache[viewType]) {
    if (viewType !== 'LevelPlayNativeAdView') {
      // Custom layout - developer creates their own native module extending the abstract manager
      // Use requireNativeComponent since custom modules are created dynamically by developers
      componentCache[viewType] = requireNativeComponent(viewType)
    } else {
      // Built-in templates (Small/Medium) - uses template manager with XIB files
      componentCache[viewType] = LevelPlayNativeAdViewComponent
    }
  }
  return componentCache[viewType]
}

// Defining the type of the LevelPlayNativeAdView React component
export type LevelPlayNativeAdViewType =
  React.Component<LevelPlayNativeAdViewCreationParams> & NativeMethods

export type LevelPlayNativeAdViewCreationParams = {
  creationParams: {
    templateType?: LevelPlayTemplateType
    templateStyle?: LevelPlayNativeAdTemplateStyle
    viewType?: string
    nativeAd: LevelPlayNativeAd | null
  }
}

// Defining the native ad view methods to be exposed
export interface LevelPlayNativeAdViewMethods {
  loadAd(): void
  destroyAd(): void
}

// Props interface for the LevelPlayNativeAdView component
export interface LevelPlayNativeAdViewProps extends ViewProps {
  templateType?: LevelPlayTemplateType // Type of native ad template
  templateStyle?: LevelPlayNativeAdTemplateStyle // Style for native ad elements
  viewType?: string // Type of the native ad view
  nativeAd: LevelPlayNativeAd | null // Native ad data
}

// Native events for the LevelPlayNativeAdView component
export type LevelPlayNativeAdViewNativeEvents = {
  onAdLoadedEvent(event: {
    nativeEvent: { nativeAd: LevelPlayNativeAd; adInfo: AdInfo }
  }): void
  onAdLoadFailedEvent(event: {
    nativeEvent: { nativeAd: LevelPlayNativeAd; error: IronSourceError }
  }): void
  onAdClickedEvent(event: {
    nativeEvent: { nativeAd: LevelPlayNativeAd; adInfo: AdInfo }
  }): void
  onAdImpressionEvent(event: {
    nativeEvent: { nativeAd: LevelPlayNativeAd; adInfo: AdInfo }
  }): void
}

/**
 * LevelPlay React component for displaying native ads
 */
export const LevelPlayNativeAdView = React.forwardRef<
  LevelPlayNativeAdViewMethods,
  LevelPlayNativeAdViewProps
>((props, ref) => {
  // Access props directly
  const templateType = props.templateType
  const templateStyle = props.templateStyle
  const viewType = props.viewType
  const nativeAd = props.nativeAd
  const style = props.style
  const otherProps = { ...props } // Exclude known props

  // A reference to the nativeAdView
  const nativeAdViewRef = useRef<React.ElementRef<
    typeof LevelPlayNativeAdViewComponent
  > | null>(null)

  // State for holding the NativeComponent
  const [NativeComponent, setNativeComponent] =
    useState<HostComponent<any> | null>(null)

  // Command methods (moved from LevelPlayNativeAd)
  const loadAd = useCallback(() => {
    nativeAdViewRef.current && Commands.loadAd(nativeAdViewRef.current)
  }, [])

  const destroyAd = useCallback(() => {
    nativeAdViewRef.current && Commands.destroyAd(nativeAdViewRef.current)
  }, [])

  useEffect(() => {
    // Assign callbacks to the native ad model using setter methods
    if (nativeAd) {
      nativeAd.setLoadAdCallback(loadAd)
      nativeAd.setDestroyAdCallback(destroyAd)
    }

    // Get the native component based on viewType
    const component = LevelPlayNativeAdComponent(
      viewType || 'LevelPlayNativeAdView'
    )
    setNativeComponent(component)
  }, [viewType, loadAd, destroyAd, nativeAd])

  // Expose methods to the parent using useImperativeHandle
  useImperativeHandle(
    ref,
    () => ({
      loadAd,
      destroyAd,
    }),
    [loadAd, destroyAd]
  )

  // Save the nativeAdViewRef element
  const saveElement = useCallback(
    (
      element: React.ElementRef<typeof LevelPlayNativeAdViewComponent> | null
    ) => {
      if (element) {
        nativeAdViewRef.current = element
      }
    },
    []
  )

  // Handle the native ad events:
  const onAdLoadedEvent: DirectEventHandler<AdLoadedEvent> = useCallback(
    event => {
      if (nativeAd?.listener?.onAdLoaded && nativeAd) {
        nativeAd.listener.onAdLoaded(
          levelPlayNativeAdFromMap(event.nativeEvent.nativeAd, nativeAd),
          adInfoFromMap(event.nativeEvent.adInfo)
        )
      }
    },
    [nativeAd]
  )

  const onAdLoadFailedEvent: DirectEventHandler<AdLoadFailedEvent> =
    useCallback(
      event => {
        if (nativeAd?.listener?.onAdLoadFailed && nativeAd) {
          nativeAd.listener.onAdLoadFailed(
            levelPlayNativeAdFromMap(event.nativeEvent.nativeAd, nativeAd),
            ironSourceErrorFromMap(event.nativeEvent.error)
          )
        }
      },
      [nativeAd]
    )

  const onAdClickedEvent: DirectEventHandler<AdClickedEvent> = useCallback(
    event => {
      if (nativeAd?.listener?.onAdClicked && nativeAd) {
        nativeAd.listener.onAdClicked(
          levelPlayNativeAdFromMap(event.nativeEvent.nativeAd, nativeAd),
          adInfoFromMap(event.nativeEvent.adInfo)
        )
      }
    },
    [nativeAd]
  )

  const onAdImpressionEvent: DirectEventHandler<AdImpressionEvent> =
    useCallback(
      event => {
        if (nativeAd?.listener?.onAdImpression && nativeAd) {
          nativeAd.listener.onAdImpression(
            levelPlayNativeAdFromMap(event.nativeEvent.nativeAd, nativeAd),
            adInfoFromMap(event.nativeEvent.adInfo)
          )
        }
      },
      [nativeAd]
    )

  if (!NativeComponent) {
    return null // Render nothing if the component is not set yet
  }

  return (
    <NativeComponent
      creationParams={{
        placement: nativeAd?.placement ?? '',
        templateStyle: templateStyle,
        templateType: templateType,
        viewType: viewType,
      }}
      ref={saveElement}
      onAdLoadedEvent={onAdLoadedEvent}
      onAdLoadFailedEvent={onAdLoadFailedEvent}
      onAdClickedEvent={onAdClickedEvent}
      onAdImpressionEvent={onAdImpressionEvent}
      style={style}
      {...otherProps}
    />
  )
})

/// LevelPlayTemplateType - native ad template options
export enum LevelPlayTemplateType {
  Small = 'SMALL',
  Medium = 'MEDIUM',
}

/// LevelPlayNativeTemplateFontStyle - native element font style options
export enum LevelPlayNativeTemplateFontStyle {
  Normal = 'normal',
  Bold = 'bold',
  Italic = 'italic',
  Monospace = 'monospace',
}

/// LevelPlayNativeAdElementStyle - styling options for every ad element
export interface LevelPlayNativeAdElementStyle {
  backgroundColor?: ColorValue
  textSize?: number
  textColor?: ColorValue
  fontStyle?: LevelPlayNativeTemplateFontStyle
  cornerRadius?: number
}

/// LevelPlayNativeAdElementStyle - class holder for all available styling element
export interface LevelPlayNativeAdTemplateStyle {
  mainBackgroundColor?: ColorValue
  titleStyle?: LevelPlayNativeAdElementStyle
  bodyStyle?: LevelPlayNativeAdElementStyle
  advertiserStyle?: LevelPlayNativeAdElementStyle
  callToActionStyle?: LevelPlayNativeAdElementStyle
}
