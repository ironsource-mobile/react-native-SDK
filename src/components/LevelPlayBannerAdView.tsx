import React, { forwardRef, useImperativeHandle } from 'react'
import { useCallback, useRef, useState } from 'react'
import { type NativeMethods, type ViewProps } from 'react-native'
import {
  type LevelPlayAdError,
  type LevelPlayAdInfo,
  LevelPlayAdSize,
  type LevelPlayBannerAdViewListener,
} from '../models'
import { levelPlayAdInfoFromMap } from '../utils/utils'
import LevelPlayBannerAdComponent, {
  Commands,
} from '../specs/LevelPlayBannerAdViewNativeComponent'
import type {
  AdLoadedEvent,
  AdLoadFailedEvent,
  AdDisplayedEvent,
  AdDisplayFailedEvent,
  AdClickedEvent,
  AdExpandedEvent,
  AdCollapsedEvent,
  AdLeftApplicationEvent,
  AdIdGeneratedEvent,
} from '../specs/LevelPlayBannerAdViewNativeComponent'
import type { DirectEventHandler } from 'react-native/Libraries/Types/CodegenTypes'

// Defining the type of the LevelPlayBannerAdView React component
export type LevelPlayBannerAdViewType =
  React.Component<LevelPlayBannerAdViewCreationParams> & NativeMethods

export type LevelPlayBannerAdViewCreationParams = {
  creationParams: {
    adUnitId: string
    adSize: LevelPlayAdSize
    placementName: string | null
    bidFloor?: number | null
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
  bidFloor?: number | null
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
  const { adUnitId, adSize, listener, placementName, bidFloor, ...otherProps } =
    props

  // A local reference to the bannerAdView
  const bannerAdViewRef = useRef<React.ElementRef<
    typeof LevelPlayBannerAdComponent
  > | null>(null)

  // State to store the adId received from native
  const [internalAdId, setInternalAdId] = useState<string>('')

  // Save the bannerAdViewRef element
  const saveElement = useCallback(
    (element: React.ElementRef<typeof LevelPlayBannerAdComponent> | null) => {
      bannerAdViewRef.current = element ?? null
    },
    []
  )

  // A method to load the banner ad
  const loadAd = useCallback(() => {
    bannerAdViewRef.current && Commands.loadAd(bannerAdViewRef.current)
  }, [])

  // A method to destroy the banner ad
  const destroy = useCallback(() => {
    bannerAdViewRef.current && Commands.destroy(bannerAdViewRef.current)
  }, [])

  // A method to resume the auto refresh of the banner after it is paused
  const resumeAutoRefresh = useCallback(() => {
    bannerAdViewRef.current &&
      Commands.resumeAutoRefresh(bannerAdViewRef.current)
  }, [])

  // A method to pause the auto refresh of loaded banner add
  const pauseAutoRefresh = useCallback(() => {
    bannerAdViewRef.current &&
      Commands.pauseAutoRefresh(bannerAdViewRef.current)
  }, [])

  // Expose methods to the parent using useImperativeHandle
  useImperativeHandle(
    ref,
    () => ({
      loadAd,
      destroy,
      resumeAutoRefresh,
      pauseAutoRefresh,
      getAdId: () => internalAdId,
    }),
    [loadAd, destroy, resumeAutoRefresh, pauseAutoRefresh, internalAdId]
  )

  // Handle the banner ad events:
  const onAdLoadedEvent: DirectEventHandler<AdLoadedEvent> = useCallback(
    event => {
      listener?.onAdLoaded(levelPlayAdInfoFromMap(event.nativeEvent.adInfo))
    },
    [listener]
  )

  const onAdLoadFailedEvent: DirectEventHandler<AdLoadFailedEvent> =
    useCallback(
      event => {
        listener?.onAdLoadFailed(event.nativeEvent.error)
      },
      [listener]
    )

  const onAdDisplayedEvent: DirectEventHandler<AdDisplayedEvent> = useCallback(
    event => {
      listener?.onAdDisplayed?.(
        levelPlayAdInfoFromMap(event.nativeEvent.adInfo)
      )
    },
    [listener]
  )

  const onAdDisplayFailedEvent: DirectEventHandler<AdDisplayFailedEvent> =
    useCallback(
      event => {
        listener?.onAdDisplayFailed?.(
          levelPlayAdInfoFromMap(event.nativeEvent.adInfo),
          event.nativeEvent.error
        )
      },
      [listener]
    )

  const onAdClickedEvent: DirectEventHandler<AdClickedEvent> = useCallback(
    event => {
      listener?.onAdClicked?.(levelPlayAdInfoFromMap(event.nativeEvent.adInfo))
    },
    [listener]
  )

  const onAdExpandedEvent: DirectEventHandler<AdExpandedEvent> = useCallback(
    event => {
      listener?.onAdExpanded?.(levelPlayAdInfoFromMap(event.nativeEvent.adInfo))
    },
    [listener]
  )

  const onAdCollapsedEvent: DirectEventHandler<AdCollapsedEvent> = useCallback(
    event => {
      listener?.onAdCollapsed?.(
        levelPlayAdInfoFromMap(event.nativeEvent.adInfo)
      )
    },
    [listener]
  )

  const onAdLeftApplicationEvent: DirectEventHandler<AdLeftApplicationEvent> =
    useCallback(
      event => {
        listener?.onAdLeftApplication?.(
          levelPlayAdInfoFromMap(event.nativeEvent.adInfo)
        )
      },
      [listener]
    )

  const onAdIdGeneratedEvent: DirectEventHandler<AdIdGeneratedEvent> =
    useCallback(event => {
      const adId = event.nativeEvent.adId
      setInternalAdId(adId) // Update the internal state with the new ad ID
    }, [])

  return (
    <LevelPlayBannerAdComponent
      ref={saveElement}
      creationParams={{
        adUnitId: adUnitId,
        adSize: adSize.toMap(),
        placementName: placementName || '',
        ...(bidFloor != null && { bidFloor }),
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
