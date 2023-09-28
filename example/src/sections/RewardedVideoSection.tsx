import React, { useEffect, useState } from 'react'
import { Text, View } from 'react-native'
import {
  IronSource,
  RewardedVideoEvents as RewardedVideo,
  IronSourceRVPlacement,
  IronSourceError,
} from 'ironsource-mediation'
import HighlightButton from '../components/HighlightButton'
import { containerStyles, positioningStyles, textStyles } from '../styles'
import { e, p, prettyJSON, showAlert } from '../util'
import { sectionWrapper } from './section-styles'

const REWARDED_VIDEO_PLACEMENT = 'Home_Screen'

const setServerParams = async () => {
  const params = { currentTime: Date.now().toString() }
  await IronSource.setRewardedVideoServerParams(params)
  showAlert('Set Rewarded Video Server Params', [prettyJSON(params)])
}

const clearServerParams = () => {
  IronSource.clearRewardedVideoServerParams()
}

const getPlacementInfo = async () => {
  const placement = await IronSource.getRewardedVideoPlacementInfo(REWARDED_VIDEO_PLACEMENT)
  p(`placement info: ${prettyJSON(placement)}`)
  showAlert('Placement Info', [prettyJSON(placement)])
}

const showRewardedVideo = async () => {
  p('Show Rewarded Video Click')
  if (await IronSource.isRewardedVideoAvailable()) {
    // This must be called before show.
    // await IronSource.setDynamicUserId('some-dynamic-application-user-id');

    // Show
    // IronSource.showRewardedVideo();

    // Show by placement
    const isCapped = await IronSource.isRewardedVideoPlacementCapped(
      REWARDED_VIDEO_PLACEMENT
    )
    if (!isCapped) {
      IronSource.showRewardedVideo(REWARDED_VIDEO_PLACEMENT)
    } else {
      showAlert('Rewarded Video Placement', [`${REWARDED_VIDEO_PLACEMENT} is capped`])
    }
  } else {
    e('Rewarded Video is not available')
  }
}

/**
 * Main
 */
function RewardedVideoSection() {
  const [isRewardedVideoAvailable, setIsRewardedVideoAvailable] = useState<boolean>(false)
  const [isRewardedVideoVisible, setIsRewardedVideoVisible] = useState<boolean>(false)
  // [context, placement]
  const [reservedPlacement, setReservedPlacement] = useState<
    IronSourceRVPlacement | undefined
  >(undefined)

  // Rewarded Video Event listeners setup
  // depend on the placement state
  useEffect(() => {
    // initialize
    RewardedVideo.removeAllListeners()
    // Set Rewarded Video Events listeners
    RewardedVideo.onRewardedVideoAvailabilityChanged.setListener(
      (isAvailable: boolean) => {
        p(`onRewardedVideoAvailabilityChanged isAvailable:${isAvailable}`)
        setIsRewardedVideoAvailable(isAvailable)
      }
    )
    RewardedVideo.onRewardedVideoAdRewarded.setListener(
      (placement: IronSourceRVPlacement) => {
        p(`onRewardedVideoAdRewarded placement:${prettyJSON(placement)}`)
        if (!isRewardedVideoVisible) {
          showAlert('Ad Rewarded', [`placement: ${prettyJSON(placement)}`])
          setReservedPlacement(undefined)
        } else {
          setReservedPlacement(placement)
        }
      }
    )
    RewardedVideo.onRewardedVideoAdOpened.setListener(() => {
      p('onRewardedVideoAdOpened')
      setIsRewardedVideoVisible(true)
    })
    RewardedVideo.onRewardedVideoAdClosed.setListener(() => {
      p('onRewardedVideoAdClosed')
      if (reservedPlacement !== undefined) {
        showAlert('Ad Rewarded', [
          `placement: ${prettyJSON(reservedPlacement)}`,
        ])
        setReservedPlacement(undefined)
      }
      setIsRewardedVideoVisible(false)
    })
    RewardedVideo.onRewardedVideoAdStarted.setListener(() => p('onRewardedVideoAdStarted'))
    RewardedVideo.onRewardedVideoAdEnded.setListener(() => p('onRewardedVideoAdEnded'))
    RewardedVideo.onRewardedVideoAdShowFailed.setListener((error: IronSourceError) => {
      showAlert('Ad Show Error', [prettyJSON(error)])
      e(`onRewardedVideoAdShowFailed error:${prettyJSON(error)}`)
    })
    RewardedVideo.onRewardedVideoAdClicked.setListener(
      (placement: IronSourceRVPlacement) =>
        p(`onRewardedVideoAdClicked placement:${prettyJSON(placement)}`)
    )

    return () => RewardedVideo.removeAllListeners()
  }, [isRewardedVideoVisible, reservedPlacement])

  return (
    <View style={sectionWrapper}>
      <Text style={[textStyles.h2, positioningStyles.alignCenter]}>
        Rewarded Video
      </Text>
      <HighlightButton
        onPress={showRewardedVideo}
        buttonText="Show Rewarded Video"
        isDisabled={!isRewardedVideoAvailable}
      />
      <HighlightButton
        onPress={getPlacementInfo}
        buttonText="Get Rewarded Video Placement Info"
      />
      <View style={containerStyles.horizontalSpaceBetween}>
        <HighlightButton
          onPress={setServerParams}
          buttonText="Set Rewarded Video ServerParams"
        />
        <HighlightButton
          onPress={clearServerParams}
          buttonText="Clear Rewarded Video ServerParams"
        />
      </View>
    </View>
  )
}

export default RewardedVideoSection
