import React, { forwardRef, useImperativeHandle } from 'react'
import { useCallback, useRef, useState } from 'react'
import {
  findNodeHandle,
  Platform,
  requireNativeComponent,
  UIManager,
  type NativeMethods,
  type ViewProps,
} from 'react-native'
import {
  type LevelPlayAdError,
  type LevelPlayAdInfo,
  LevelPlayAdSize,
  type LevelPlayBannerAdViewListener,
} from '../models'
import { levelPlayAdInfoFromMap } from '../utils/utils'

// Object represents native component
const LevelPlayBannerAdComponent = requireNativeComponent<
  LevelPlayBannerAdViewCreationParams & ViewProps & LevelPlayBannerAdViewNativeEvents
>('levelPlayBannerAdView')

// Defining the type of the LevelPlayBannerAdView React component
export type LevelPlayBannerAdViewType =
  React.Component<LevelPlayBannerAdViewCreationParams> & NativeMethods

export type LevelPlayBannerAdViewCreationParams = {
  creationParams: {
    adUnitId: string
    adSize: LevelPlayAdSize
    placementName: string | null
  }
}

// Defining the banner ad view methods to be exposed
export interface LevelPlayBannerAdViewMethods {
  loadAd: () => void
  destroy: () => void
  pauseAutoRefresh: () => void
  resumeAutoRefresh: () => void
  getAdId: () => string 
}

// Props interface for the LevelPlayBannerAdView compoenent
export interface LevelPlayBannerAdViewProps extends ViewProps {
  adUnitId: string
  adSize: LevelPlayAdSize
  listener?: LevelPlayBannerAdViewListener
  placementName: string | null
}

// Native events for the LevelPlayBannerAdView component
export type LevelPlayBannerAdViewNativeEvents = {
  onAdLoadedEvent(event: { nativeEvent: { adInfo: LevelPlayAdInfo } }): void
  onAdLoadFailedEvent(event: { nativeEvent: { error: LevelPlayAdError } }): void
  onAdDisplayedEvent(event: { nativeEvent: { adInfo: LevelPlayAdInfo } }): void
  onAdDisplayFailedEvent(event: {
    nativeEvent: { adInfo: LevelPlayAdInfo; error: LevelPlayAdError }
  }): void
  onAdClickedEvent(event: { nativeEvent: { adInfo: LevelPlayAdInfo } }): void
  onAdExpandedEvent(event: { nativeEvent: { adInfo: LevelPlayAdInfo } }): void
  onAdCollapsedEvent(event: { nativeEvent: { adInfo: LevelPlayAdInfo } }): void
  onAdLeftApplicationEvent(event: {
    nativeEvent: { adInfo: LevelPlayAdInfo }
  }): void
  onAdIdGeneratedEvent(event: { nativeEvent: { adId: string } }): void
}

/**
 * LevelPlay React component for displaying banner ads
 */
export const LevelPlayBannerAdView = forwardRef<
  LevelPlayBannerAdViewMethods,
  LevelPlayBannerAdViewProps
>((props, ref) => {
  // Access props directly
  const { adUnitId, adSize, listener, placementName, ...otherProps } = props

  // A local reference to the bannerAdView
  const bannerAdViewRef = useRef<LevelPlayBannerAdViewType | null>(null)

  // State to store the adId received from native
  const [internalAdId, setInternalAdId] = useState<string>('')

  // Save the bannerAdViewRef element
  const saveElement = useCallback(
    (element: LevelPlayBannerAdViewType | null) => {
      if (element) {
        bannerAdViewRef.current = element
      }
    },
    []
  )

  // A method to load the banner ad
  const loadAd = useCallback(() => {
    if (bannerAdViewRef.current) {
      const viewId = findNodeHandle(bannerAdViewRef.current)
      const command = UIManager.getViewManagerConfig('levelPlayBannerAdView')
        .Commands.loadAd
      const finalCommand = Platform.OS === 'ios' ? command : command.toString()

      UIManager.dispatchViewManagerCommand(viewId, finalCommand, [])
    }
  }, [])

  // A method to destroy the banner ad
  const destroy = useCallback(() => {
    if (bannerAdViewRef.current) {
      const viewId = findNodeHandle(bannerAdViewRef.current)
      const command = UIManager.getViewManagerConfig('levelPlayBannerAdView')
        .Commands.destroy
      const finalCommand = Platform.OS === 'ios' ? command : command.toString()

      UIManager.dispatchViewManagerCommand(viewId, finalCommand, [])
    }
  }, [])

  // A method to resume the auto refresh of the banner after it is paused
  const resumeAutoRefresh = useCallback(() => {
    if (bannerAdViewRef.current) {
      const viewId = findNodeHandle(bannerAdViewRef.current)
      const command = UIManager.getViewManagerConfig('levelPlayBannerAdView')
        .Commands.resumeAutoRefresh
      const finalCommand = Platform.OS === 'ios' ? command : command.toString()

      UIManager.dispatchViewManagerCommand(viewId, finalCommand, [])
    }
  }, [])

  // A method to pause the auto refresh of loaded banner add
  const pauseAutoRefresh = useCallback(() => {
    if (bannerAdViewRef.current) {
      const viewId = findNodeHandle(bannerAdViewRef.current)
      const command = UIManager.getViewManagerConfig('levelPlayBannerAdView')
        .Commands.pauseAutoRefresh
      const finalCommand = Platform.OS === 'ios' ? command : command.toString()

      UIManager.dispatchViewManagerCommand(viewId, finalCommand, [])
    }
  }, [])

  // Expose methods to the parent using useImperativeHandle
  useImperativeHandle(
    ref,
    () => ({
      loadAd,
      destroy,
      resumeAutoRefresh,
      pauseAutoRefresh,
      getAdId : () => internalAdId,
    }),
    [loadAd, destroy, resumeAutoRefresh, pauseAutoRefresh, internalAdId]
  )

  // Handle the banner ad events:
  const onAdLoadedEvent = useCallback(
    (event: { nativeEvent: { adInfo: LevelPlayAdInfo } }) => {
      listener?.onAdLoaded(levelPlayAdInfoFromMap(event.nativeEvent.adInfo))
    },
    [listener]
  )

  const onAdLoadFailedEvent = useCallback(
    (event: { nativeEvent: { error: LevelPlayAdError } }) => {
      listener?.onAdLoadFailed(event.nativeEvent.error)
    },
    [listener]
  )

  const onAdDisplayedEvent = useCallback(
    (event: { nativeEvent: { adInfo: LevelPlayAdInfo } }) => {
      listener?.onAdDisplayed?.(levelPlayAdInfoFromMap(event.nativeEvent.adInfo))
    },
    [listener]
  )

  const onAdDisplayFailedEvent = useCallback(
    (event: {
      nativeEvent: { adInfo: LevelPlayAdInfo; error: LevelPlayAdError }
    }) => {
      listener?.onAdDisplayFailed?.(
        levelPlayAdInfoFromMap(event.nativeEvent.adInfo),
        event.nativeEvent.error
      )
    },
    [listener]
  )

  const onAdClickedEvent = useCallback(
    (event: { nativeEvent: { adInfo: LevelPlayAdInfo } }) => {
      listener?.onAdClicked?.(levelPlayAdInfoFromMap(event.nativeEvent.adInfo))
    },
    [listener]
  )

  const onAdExpandedEvent = useCallback(
    (event: { nativeEvent: { adInfo: LevelPlayAdInfo } }) => {
      listener?.onAdExpanded?.(levelPlayAdInfoFromMap(event.nativeEvent.adInfo))
    },
    [listener]
  )

  const onAdCollapsedEvent = useCallback(
    (event: { nativeEvent: { adInfo: LevelPlayAdInfo } }) => {
      listener?.onAdCollapsed?.(levelPlayAdInfoFromMap(event.nativeEvent.adInfo))
    },
    [listener]
  )

  const onAdLeftApplicationEvent = useCallback(
    (event: { nativeEvent: { adInfo: LevelPlayAdInfo } }) => {
      listener?.onAdLeftApplication?.(levelPlayAdInfoFromMap(event.nativeEvent.adInfo))
    },
    [listener]
  )

    // Handle the new event
  const onAdIdGeneratedEvent = useCallback(
    (event: { nativeEvent: { adId: string } }) => {
      const adId = event.nativeEvent.adId
        setInternalAdId(adId) // Update the internal state with the new ad ID
    },
    [] 
  )

  return (
    <LevelPlayBannerAdComponent
      ref={saveElement}
      creationParams={{
        adUnitId: adUnitId,
        adSize: adSize,
        placementName: placementName ?? ''
      }}
      {...otherProps}
      onAdLoadedEvent={onAdLoadedEvent}
      onAdLoadFailedEvent={onAdLoadFailedEvent}
      onAdDisplayedEvent={onAdDisplayedEvent}
      onAdDisplayFailedEvent={onAdDisplayFailedEvent}
      onAdClickedEvent={onAdClickedEvent}
      onAdExpandedEvent={onAdExpandedEvent}
      onAdCollapsedEvent={onAdCollapsedEvent}
      onAdLeftApplicationEvent={onAdLeftApplicationEvent}
      onAdIdGeneratedEvent={onAdIdGeneratedEvent} 
    />
  )
})
