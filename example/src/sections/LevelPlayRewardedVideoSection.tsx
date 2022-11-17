/**
 * LevelPlayRewardedVideoEvents example
 */
import React, { useEffect, useState } from 'react'
import { Text, View } from 'react-native'
import {
  IronSource,
  LevelPlayRewardedVideoEvents as LP_RV,
  IronSourceRVPlacement,
  IronSourceAdInfo,
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

function LevelPlayRewardedVideoSection() {
  const [isRVAvailable, setIsRVAvailable] = useState<boolean>(false)
  const [isRVVisible, setIsRVVisible] = useState<boolean>(false)
  // [context, placement]
  const [reservedPlacement, setReservedPlacement] = useState<
    IronSourceRVPlacement | undefined
  >(undefined)

  // RV Event listeners setup
  // depend on the placement state
  useEffect(() => {
    const TAG = 'LevelPlayRVListener'
    // initialize
    LP_RV.removeAllListeners()
    // Set RV Event listeners
    LP_RV.onAdAvailable.setListener((adInfo: IronSourceAdInfo) => {
      p(`${TAG} - onAdAvailable: ${prettyJSON(adInfo)}`)
      setIsRVAvailable(true)
    })
    LP_RV.onAdUnavailable.setListener(() => {
      p(`${TAG} - onAdUnavailable`)
      setIsRVAvailable(false)
    })
    LP_RV.onAdOpened.setListener((adInfo: IronSourceAdInfo) => {
      p(`${TAG} - onAdOpened: ${prettyJSON(adInfo)}`)
      setIsRVVisible(true)
    })
    LP_RV.onAdClosed.setListener((adInfo: IronSourceAdInfo) => {
      p(`${TAG} - onAdClosed: ${prettyJSON(adInfo)}`)
      if (reservedPlacement !== undefined) {
        showAlert('Ad Rewarded', [
          `placement: ${prettyJSON(reservedPlacement)}`,
        ])
        setReservedPlacement(undefined)
      }
      setIsRVVisible(false)
    })
    LP_RV.onAdRewarded.setListener(
      (placement: IronSourceRVPlacement, adInfo: IronSourceAdInfo) => {
        p(
          `${TAG} - onAdRewarded\n` +
            ` placement: ${prettyJSON(placement)}\n` +
            ` adInfo: ${prettyJSON(adInfo)}`
        )
        if (!isRVVisible) {
          showAlert('Ad Rewarded', [`placement: ${prettyJSON(placement)}`])
          setReservedPlacement(undefined)
        } else {
          setReservedPlacement(placement)
        }
      }
    )
    LP_RV.onAdShowFailed.setListener(
      (error: IronSourceError, adInfo: IronSourceAdInfo) => {
        p(
          `${TAG} - onAdShowFailed\n` +
            ` error: ${prettyJSON(error)}\n` +
            ` adInfo: ${prettyJSON(adInfo)}`
        )
        setIsRVVisible(false)
      }
    )
    LP_RV.onAdClicked.setListener(
      (placement: IronSourceRVPlacement, adInfo: IronSourceAdInfo) => {
        p(
          `${TAG} - onAdClicked\n` +
            ` placement: ${prettyJSON(placement)}\n` +
            ` adInfo: ${prettyJSON(adInfo)}`
        )
      }
    )

    return () => LP_RV.removeAllListeners()
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

export default LevelPlayRewardedVideoSection
