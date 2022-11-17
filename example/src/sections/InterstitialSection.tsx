import React, { useEffect, useState } from 'react'
import { Text, View } from 'react-native'
import HighlightButton from '../components/HighlightButton'
import { containerStyles, positioningStyles, textStyles } from '../styles'
import { e, p, prettyJSON, showAlert } from '../util'
import { sectionWrapper } from './section-styles'
import {
  InterstitialEvents as IS,
  IronSource,
  IronSourceError,
} from 'ironsource-mediation'

const IS_PLACEMENT = 'Main_Menu'

const loadIS = async () => {
  p('Load IS Click')
  await IronSource.loadInterstitial()
}

function InterstitialSection() {
  const [isISAvailable, setIsISAvailable] = useState<boolean>(false)
  const showIS = async () => {
    p('Show IS Click')
    if (await IronSource.isInterstitialReady()) {
      // Show
      // IronSource.showInterstitial();

      // Show by placement
      const isCapped = await IronSource.isInterstitialPlacementCapped(
        IS_PLACEMENT
      )
      if (!isCapped) {
        IronSource.showInterstitial(IS_PLACEMENT)
      } else {
        showAlert('IS Placement', [`${IS_PLACEMENT} is capped`])
      }
    }
    setIsISAvailable(false)
  }

  // IS Event listeners setup
  useEffect(() => {
    // initialize
    IS.removeAllListeners()
    // Set IS Events listeners
    IS.onInterstitialAdReady.setListener(() => {
      p(`onInterstitialAdReady`)
      setIsISAvailable(true)
    })
    IS.onInterstitialAdLoadFailed.setListener((error: IronSourceError) => {
      showAlert('Ad Load Error', [prettyJSON(error)])
      e(`onInterstitialAdLoadFailed error:${prettyJSON(error)}`)
    })
    IS.onInterstitialAdOpened.setListener(() => p('onInterstitialAdOpened'))
    IS.onInterstitialAdClosed.setListener(() => p('onInterstitialAdClosed'))
    IS.onInterstitialAdShowSucceeded.setListener(() =>
      p('onInterstitialAdShowSucceeded')
    )
    IS.onInterstitialAdShowFailed.setListener((error: IronSourceError) => {
      showAlert('Ad Show Error', [prettyJSON(error)])
      e(`onInterstitialAdShowFailed error:${prettyJSON(error)}`)
    })
    IS.onInterstitialAdClicked.setListener(() => p('onInterstitialAdClicked'))

    return () => IS.removeAllListeners()
  }, [])

  return (
    <View style={sectionWrapper}>
      <Text style={[textStyles.h2, positioningStyles.alignCenter]}>
        Interstitial
      </Text>
      <View style={containerStyles.horizontalSpaceBetween}>
        <HighlightButton onPress={loadIS} buttonText="Load Interstitial" />
        <HighlightButton
          onPress={showIS}
          buttonText="Show Interstitial"
          isDisabled={!isISAvailable}
        />
      </View>
    </View>
  )
}

export default InterstitialSection
