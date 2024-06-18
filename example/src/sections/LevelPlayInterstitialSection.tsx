/**
 * LevelPlayInterstitialEvents example
 */
import React, { useEffect, useState } from 'react'
import { Text, View } from 'react-native'
import HighlightButton from '../components/HighlightButton'
import { containerStyles, positioningStyles, textStyles } from '../styles'
import { e, p, prettyJSON, showAlert } from '../util'
import { sectionWrapper } from './section-styles'
import {
  IronSource,
  type IronSourceError,
  type IronSourceAdInfo,
  type LevelPlayInterstitialListener
} from 'ironsource-mediation'

const INTERSTITIAL_PLACEMENT = 'Main_Menu'

const loadInterstitial = async () => {
  p('Load Interstitial Click')
  await IronSource.loadInterstitial()
}

function LevelPlayInterstitialSection() {
  const [isInterstitialAvailable, setIsInterstitialAvailable] = useState<boolean>(false)
  const showInterstitial = async () => {
    p('Show Interstitial Click')
    if (await IronSource.isInterstitialReady()) {
      // Show
      // IronSource.showInterstitial();

      // Show by placement
      const isCapped = await IronSource.isInterstitialPlacementCapped(
        INTERSTITIAL_PLACEMENT
      )
      if (!isCapped) {
        IronSource.showInterstitial(INTERSTITIAL_PLACEMENT)
      } else {
        showAlert('Interstitial Placement', [`${INTERSTITIAL_PLACEMENT} is capped`])
      }
    }
    setIsInterstitialAvailable(false)
  }

  // Interstitial Event listeners setup
  useEffect(() => {
    const TAG = 'LevelPlayInterstitialListener'

    const listener: LevelPlayInterstitialListener = {
      onAdReady: (adInfo: IronSourceAdInfo) => {
        p(`${TAG} - onAdReady: ${prettyJSON(adInfo)}`)
        setIsInterstitialAvailable(true)
      },
      onAdLoadFailed: (error: IronSourceError) => {
        showAlert('Ad Load Error', [prettyJSON(error)])
        e(`${TAG} - onAdLoadFailed error: ${prettyJSON(error)}`)
      },
      onAdOpened: (adInfo: IronSourceAdInfo) => {
        p(`${TAG} - onAdOpened: ${prettyJSON(adInfo)}`)
      },
      onAdClosed: (adInfo: IronSourceAdInfo) => {
        p(`${TAG} - onAdClosed: ${prettyJSON(adInfo)}`)
      },
      onAdShowFailed: (error: IronSourceError, adInfo: IronSourceAdInfo) => {
        showAlert('Ad Show Error', [prettyJSON(error)])
        p(
          `${TAG} - onAdShowFailed\n` +
            ` error: ${prettyJSON(error)}\n` +
            ` adInfo: ${prettyJSON(adInfo)}`
        )
      },
      onAdClicked: (adInfo: IronSourceAdInfo) => {
        p(`${TAG} - onAdClicked: ${prettyJSON(adInfo)}`)
      },
      onAdShowSucceeded: (adInfo: IronSourceAdInfo) => {
        p(`${TAG} - onAdShowSucceeded: ${prettyJSON(adInfo)}`)      
      }
    };
    IronSource.setLevelPlayInterstitialListener(listener);
  }, [])

  return (
    <View style={sectionWrapper}>
      <Text style={[textStyles.h2, positioningStyles.alignCenter]}>
        Interstitial
      </Text>
      <View style={containerStyles.horizontalSpaceBetween}>
        <HighlightButton onPress={loadInterstitial} buttonText="Load Interstitial" />
        <HighlightButton
          onPress={showInterstitial}
          buttonText="Show Interstitial"
          isDisabled={!isInterstitialAvailable}
        />
      </View>
    </View>
  )
}

export default LevelPlayInterstitialSection
