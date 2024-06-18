/**
 * LevelPlayRewardedVideoEvents example
 */
import React, { useEffect, useState } from 'react'
import { Text, View } from 'react-native'
import {
  IronSource,
  type IronSourceRVPlacement,
  type IronSourceAdInfo,
  type IronSourceError,
  type LevelPlayRewardedVideoManualListener,
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

const loadRewardedVideo = async () => {
   p('Load Rewarded Video Click')
    IronSource.loadRewardedVideo();
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
    const TAG = 'LevelPlayRewardedVideoManualListener'

    const listener: LevelPlayRewardedVideoManualListener = {
        onAdOpened: (adInfo: IronSourceAdInfo) => {
          p(`${TAG} - onAdOpened: ${prettyJSON(adInfo)}`)
          setIsRewardedVideoVisible(true)
        },
        onAdClosed: (adInfo: IronSourceAdInfo) => {
          p(`${TAG} - onAdClosed: ${prettyJSON(adInfo)}`)
          if (reservedPlacement !== undefined) {
            showAlert('Ad Rewarded', [
              `placement: ${prettyJSON(reservedPlacement)}`,
            ])
            setReservedPlacement(undefined)
          }
          setIsRewardedVideoVisible(false)
          setIsRewardedVideoAvailable(false)
        },
        onAdRewarded: (placement: IronSourceRVPlacement, adInfo: IronSourceAdInfo) => {
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
        },
        onAdShowFailed: (error: IronSourceError, adInfo: IronSourceAdInfo) => {
          p(
            `${TAG} - onAdShowFailed\n` +
              ` error: ${prettyJSON(error)}\n` +
              ` adInfo: ${prettyJSON(adInfo)}`
          )
          setIsRewardedVideoVisible(false)
        },
        onAdClicked: (placement: IronSourceRVPlacement, adInfo: IronSourceAdInfo) => {
          p(
            `${TAG} - onAdClicked\n` +
              ` placement: ${prettyJSON(placement)}\n` +
              ` adInfo: ${prettyJSON(adInfo)}`
          )        
        },
        onAdReady: (adInfo: IronSourceAdInfo) => {
          p(`${TAG} - onAdReady: ${prettyJSON(adInfo)}`)
          setIsRewardedVideoAvailable(true)
        },
        onAdLoadFailed: () => {
         p(`${TAG} - onAdLoadFailed`)
         setIsRewardedVideoAvailable(false)
        },
    };
    IronSource.setLevelPlayRewardedVideoManualListener(listener);
  }, [])

  return (
    <View style={sectionWrapper}>
      <Text style={[textStyles.h2, positioningStyles.alignCenter]}>
        Rewarded Video
      </Text>
      <View style={containerStyles.horizontalSpaceBetween}>
        <HighlightButton
          onPress={showRewardedVideo}
          buttonText="Show Rewarded Video"
          isDisabled={!isRewardedVideoAvailable}
        />
        <HighlightButton
          onPress={loadRewardedVideo}
          buttonText="Load Rewarded Video"
          isDisabled={isRewardedVideoAvailable}
        />
      </View>
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
