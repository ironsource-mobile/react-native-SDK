import React, { useEffect, useState } from 'react'
import { Text, View } from 'react-native'
import HighlightButton from '../components/HighlightButton'
import { containerStyles, positioningStyles, textStyles } from '../styles'
import { e, p, prettyJSON, showAlert } from '../util'
import { sectionWrapper } from './section-styles'
import {
  InterstitialEvents as Interstitial,
  IronSource,
  IronSourceError,
} from 'ironsource-mediation'

const INTERSTITIAL_PLACEMENT = 'Main_Menu'

const loadInterstitial = async () => {
  p('Load Interstitial Click')
  await IronSource.loadInterstitial()
}

function InterstitialSection() {
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
    // initialize
    Interstitial.removeAllListeners()
    // Set Interstitial Events listeners
    Interstitial.onInterstitialAdReady.setListener(() => {
      p(`onInterstitialAdReady`)
      setIsInterstitialAvailable(true)
    })
    Interstitial.onInterstitialAdLoadFailed.setListener((error: IronSourceError) => {
      showAlert('Ad Load Error', [prettyJSON(error)])
      e(`onInterstitialAdLoadFailed error:${prettyJSON(error)}`)
    })
    Interstitial.onInterstitialAdOpened.setListener(() => p('onInterstitialAdOpened'))
    Interstitial.onInterstitialAdClosed.setListener(() => p('onInterstitialAdClosed'))
    Interstitial.onInterstitialAdShowSucceeded.setListener(() =>
      p('onInterstitialAdShowSucceeded')
    )
    Interstitial.onInterstitialAdShowFailed.setListener((error: IronSourceError) => {
      showAlert('Ad Show Error', [prettyJSON(error)])
      e(`onInterstitialAdShowFailed error:${prettyJSON(error)}`)
    })
    Interstitial.onInterstitialAdClicked.setListener(() => p('onInterstitialAdClicked'))

    return () => Interstitial.removeAllListeners()
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

export default InterstitialSection
