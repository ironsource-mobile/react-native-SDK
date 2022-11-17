import React, { useEffect, useState } from 'react'
import { Text, View } from 'react-native'
import {
  IronSource,
  RewardedVideoEvents as RV,
  IronSourceRVPlacement,
  IronSourceError,
} from 'ironsource-mediation'
import HighlightButton from '../components/HighlightButton'
import { containerStyles, positioningStyles, textStyles } from '../styles'
import { e, p, prettyJSON, showAlert } from '../util'
import { sectionWrapper } from './section-styles'

const RV_PLACEMENT = 'Home_Screen'

const setServerParams = async () => {
  const params = { currentTime: Date.now().toString() }
  await IronSource.setRewardedVideoServerParams(params)
  showAlert('Set RV Server Params', [prettyJSON(params)])
}

const clearServerParams = () => {
  IronSource.clearRewardedVideoServerParams()
}

const getPlacementInfo = async () => {
  const placement = await IronSource.getRewardedVideoPlacementInfo(RV_PLACEMENT)
  p(`placement info: ${prettyJSON(placement)}`)
  showAlert('Placement Info', [prettyJSON(placement)])
}

const showRV = async () => {
  p('Show RV Click')
  if (await IronSource.isRewardedVideoAvailable()) {
    // This must be called before show.
    // await IronSource.setDynamicUserId('some-dynamic-application-user-id');

    // Show
    // IronSource.showRewardedVideo();

    // Show by placement
    const isCapped = await IronSource.isRewardedVideoPlacementCapped(
      RV_PLACEMENT
    )
    if (!isCapped) {
      IronSource.showRewardedVideo(RV_PLACEMENT)
    } else {
      showAlert('RV Placement', [`${RV_PLACEMENT} is capped`])
    }
  } else {
    e('RV is not available')
  }
}

/**
 * Main
 */
function RewardedVideoSection() {
  const [isRVAvailable, setIsRVAvailable] = useState<boolean>(false)
  const [isRVVisible, setIsRVVisible] = useState<boolean>(false)
  // [context, placement]
  const [reservedPlacement, setReservedPlacement] = useState<
    IronSourceRVPlacement | undefined
  >(undefined)

  // RV Event listeners setup
  // depend on the placement state
  useEffect(() => {
    // initialize
    RV.removeAllListeners()
    // Set RV Events listeners
    RV.onRewardedVideoAvailabilityChanged.setListener(
      (isAvailable: boolean) => {
        p(`onRewardedVideoAvailabilityChanged isAvailable:${isAvailable}`)
        setIsRVAvailable(isAvailable)
      }
    )
    RV.onRewardedVideoAdRewarded.setListener(
      (placement: IronSourceRVPlacement) => {
        p(`onRewardedVideoAdRewarded placement:${prettyJSON(placement)}`)
        if (!isRVVisible) {
          showAlert('Ad Rewarded', [`placement: ${prettyJSON(placement)}`])
          setReservedPlacement(undefined)
        } else {
          setReservedPlacement(placement)
        }
      }
    )
    RV.onRewardedVideoAdOpened.setListener(() => {
      p('onRewardedVideoAdOpened')
      setIsRVVisible(true)
    })
    RV.onRewardedVideoAdClosed.setListener(() => {
      p('onRewardedVideoAdClosed')
      if (reservedPlacement !== undefined) {
        showAlert('Ad Rewarded', [
          `placement: ${prettyJSON(reservedPlacement)}`,
        ])
        setReservedPlacement(undefined)
      }
      setIsRVVisible(false)
    })
    RV.onRewardedVideoAdStarted.setListener(() => p('onRewardedVideoAdStarted'))
    RV.onRewardedVideoAdEnded.setListener(() => p('onRewardedVideoAdEnded'))
    RV.onRewardedVideoAdShowFailed.setListener((error: IronSourceError) => {
      showAlert('Ad Show Error', [prettyJSON(error)])
      e(`onRewardedVideoAdShowFailed error:${prettyJSON(error)}`)
    })
    RV.onRewardedVideoAdClicked.setListener(
      (placement: IronSourceRVPlacement) =>
        p(`onRewardedVideoAdClicked placement:${prettyJSON(placement)}`)
    )

    return () => RV.removeAllListeners()
  }, [isRVVisible, reservedPlacement])

  return (
    <View style={sectionWrapper}>
      <Text style={[textStyles.h2, positioningStyles.alignCenter]}>
        Rewarded Video
      </Text>
      <HighlightButton
        onPress={showRV}
        buttonText="Show Rewarded Video"
        isDisabled={!isRVAvailable}
      />
      <HighlightButton
        onPress={getPlacementInfo}
        buttonText="Get RV Placement Info"
      />
      <View style={containerStyles.horizontalSpaceBetween}>
        <HighlightButton
          onPress={setServerParams}
          buttonText="setRVServerParams"
        />
        <HighlightButton
          onPress={clearServerParams}
          buttonText="clearRVServerParams"
        />
      </View>
    </View>
  )
}

export default RewardedVideoSection
