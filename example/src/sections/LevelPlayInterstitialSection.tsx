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
  LevelPlayInterstitialEvents as LP_IS,
  IronSource,
  IronSourceError,
  IronSourceAdInfo,
} from 'ironsource-mediation'

const IS_PLACEMENT = 'Main_Menu'

const loadIS = async () => {
  p('Load IS Click')
  await IronSource.loadInterstitial()
}

function LevelPlayInterstitialSection() {
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
    const TAG = 'LevelPlayISListener'
    // initialize
    LP_IS.removeAllListeners()
    // Set LevelPlay IS Events listeners
    LP_IS.onAdReady.setListener((adInfo: IronSourceAdInfo) => {
      p(`${TAG} - onAdReady: ${prettyJSON(adInfo)}`)
      setIsISAvailable(true)
    })
    LP_IS.onAdLoadFailed.setListener((error: IronSourceError) => {
      showAlert('Ad Load Error', [prettyJSON(error)])
      e(`${TAG} - onAdLoadFailed error: ${prettyJSON(error)}`)
    })
    LP_IS.onAdOpened.setListener((adInfo: IronSourceAdInfo) =>
      p(`${TAG} - onAdOpened: ${prettyJSON(adInfo)}`)
    )
    LP_IS.onAdClosed.setListener((adInfo: IronSourceAdInfo) =>
      p(`${TAG} - onAdClosed: ${prettyJSON(adInfo)}`)
    )
    LP_IS.onAdShowFailed.setListener(
      (error: IronSourceError, adInfo: IronSourceAdInfo) => {
        showAlert('Ad Show Error', [prettyJSON(error)])
        p(
          `${TAG} - onAdShowFailed\n` +
            ` error: ${prettyJSON(error)}\n` +
            ` adInfo: ${prettyJSON(adInfo)}`
        )
      }
    )
    LP_IS.onAdClicked.setListener((adInfo: IronSourceAdInfo) =>
      p(`${TAG} - onAdClicked: ${prettyJSON(adInfo)}`)
    )
    LP_IS.onAdShowSucceeded.setListener((adInfo: IronSourceAdInfo) =>
      p(`${TAG} - onAdShowSucceeded: ${prettyJSON(adInfo)}`)
    )

    return () => LP_IS.removeAllListeners()
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

export default LevelPlayInterstitialSection
