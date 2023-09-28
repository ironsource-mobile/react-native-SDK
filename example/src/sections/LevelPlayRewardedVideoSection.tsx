/**
 * LevelPlayRewardedVideoEvents example
 */
import React, { useEffect, useState } from 'react'
import { Text, View } from 'react-native'
import {
  IronSource,
  LevelPlayRewardedVideoEvents as LevelPlayRewardedVideo,
  IronSourceRVPlacement,
  IronSourceAdInfo,
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

function LevelPlayRewardedVideoSection() {
  const [isRewardedVideoAvailable, setIsRewardedVideoAvailable] = useState<boolean>(false)
  const [isRewardedVideoVisible, setIsRewardedVideoVisible] = useState<boolean>(false)
  // [context, placement]
  const [reservedPlacement, setReservedPlacement] = useState<
    IronSourceRVPlacement | undefined
  >(undefined)

  // Rewarded Video Event listeners setup
  // depend on the placement state
  useEffect(() => {
    const TAG = 'LevelPlayRewardedVideoListener'
    // initialize
    LevelPlayRewardedVideo.removeAllListeners()
    // Set Rewarded Video Event listeners
    LevelPlayRewardedVideo.onAdAvailable.setListener((adInfo: IronSourceAdInfo) => {
      p(`${TAG} - onAdAvailable: ${prettyJSON(adInfo)}`)
      setIsRewardedVideoAvailable(true)
    })
    LevelPlayRewardedVideo.onAdUnavailable.setListener(() => {
      p(`${TAG} - onAdUnavailable`)
      setIsRewardedVideoAvailable(false)
    })
    LevelPlayRewardedVideo.onAdOpened.setListener((adInfo: IronSourceAdInfo) => {
      p(`${TAG} - onAdOpened: ${prettyJSON(adInfo)}`)
      setIsRewardedVideoVisible(true)
    })
    LevelPlayRewardedVideo.onAdClosed.setListener((adInfo: IronSourceAdInfo) => {
      p(`${TAG} - onAdClosed: ${prettyJSON(adInfo)}`)
      if (reservedPlacement !== undefined) {
        showAlert('Ad Rewarded', [
          `placement: ${prettyJSON(reservedPlacement)}`,
        ])
        setReservedPlacement(undefined)
      }
      setIsRewardedVideoVisible(false)
    })
    LevelPlayRewardedVideo.onAdRewarded.setListener(
      (placement: IronSourceRVPlacement, adInfo: IronSourceAdInfo) => {
        p(
          `${TAG} - onAdRewarded\n` +
            ` placement: ${prettyJSON(placement)}\n` +
            ` adInfo: ${prettyJSON(adInfo)}`
        )
        if (!isRewardedVideoVisible) {
          showAlert('Ad Rewarded', [`placement: ${prettyJSON(placement)}`])
          setReservedPlacement(undefined)
        } else {
          setReservedPlacement(placement)
        }
      }
    )
    LevelPlayRewardedVideo.onAdShowFailed.setListener(
      (error: IronSourceError, adInfo: IronSourceAdInfo) => {
        p(
          `${TAG} - onAdShowFailed\n` +
            ` error: ${prettyJSON(error)}\n` +
            ` adInfo: ${prettyJSON(adInfo)}`
        )
        setIsRewardedVideoVisible(false)
      }
    )
    LevelPlayRewardedVideo.onAdClicked.setListener(
      (placement: IronSourceRVPlacement, adInfo: IronSourceAdInfo) => {
        p(
          `${TAG} - onAdClicked\n` +
            ` placement: ${prettyJSON(placement)}\n` +
            ` adInfo: ${prettyJSON(adInfo)}`
        )
      }
    )

    return () => LevelPlayRewardedVideo.removeAllListeners()
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

export default LevelPlayRewardedVideoSection
