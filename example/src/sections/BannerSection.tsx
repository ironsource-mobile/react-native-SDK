import React, { useEffect, useState } from 'react'
import { Text, View } from 'react-native'
import {
  IronSource,
  BannerEvents as BN,
  LevelPlayBannerEvents as LP_BN,
  IronSourceBannerOptions,
  IronSourceError,
  IronSourceAdInfo,
} from 'ironsource-mediation'
import HighlightButton from '../components/HighlightButton'
import { containerStyles, positioningStyles, textStyles } from '../styles'
import { e, p, prettyJSON, showAlert } from '../util'
import { sectionWrapper } from './section-styles'

const BANNER_PLACEMENT = 'Startup'

const loadBanner = async () => {
  p('Load Banner click')
  const bannerOptions: IronSourceBannerOptions = {
    position: 'BOTTOM',
    sizeDescription: 'BANNER',
    isAdaptive: true,
    verticalOffset: -30,
    placementName: BANNER_PLACEMENT, // optional
  }

  const isCapped = await IronSource.isBannerPlacementCapped(BANNER_PLACEMENT)
  if (!isCapped) {
    IronSource.loadBanner(bannerOptions)
  } else {
    showAlert('Banner Placement', [`${BANNER_PLACEMENT} is capped`])
  }
}

function BannerSection() {
  const [isBannerLoaded, setIsBannerLoaded] = useState(false)

  const destroyBanner = () => {
    p('Destroy Banner click')
    IronSource.destroyBanner()
      .then(() => {
        setIsBannerLoaded(false)
      })
      .catch(err => e(prettyJSON(err)))
  }

  const displayBN = () => {
    p('Show BN click')
    IronSource.displayBanner().catch(err => e(prettyJSON(err)))
  }

  const hideBN = () => {
    p('Hide BN click')
    IronSource.hideBanner().catch(err => e(prettyJSON(err)))
  }

  useEffect(() => {
    BN.onBannerAdLoaded.setListener(() => {
      p('onBannerAdLoaded')
      setIsBannerLoaded(true)
    })
    BN.onBannerAdLoadFailed.setListener((error: IronSourceError) => {
      showAlert('BN Show Error', [prettyJSON(error)])
      e(`onBannerAdLoadFailed error:${prettyJSON(error)}`)
    })
    BN.onBannerAdClicked.setListener(() => p('onBannerAdClicked'))
    BN.onBannerAdScreenPresented.setListener(() =>
      p('onBannerAdScreenPresented')
    )
    BN.onBannerAdScreenDismissed.setListener(() =>
      p('onBannerAdScreenDismissed')
    )
    BN.onBannerAdLeftApplication.setListener(() =>
      p('onBannerAdLeftApplication')
    )

    // LevelPlayEvent Listeners
    const LP_TAG = 'LevelPlayBNListener'
    LP_BN.onAdLoaded.setListener((adInfo: IronSourceAdInfo) => {
      p(`${LP_TAG} - onAdLoaded: ${prettyJSON(adInfo)}`)
    })
    LP_BN.onAdLoadFailed.setListener((error: IronSourceError) => {
      p(`${LP_TAG} - onAdLoadFailed: ${prettyJSON(error)}`)
    })
    LP_BN.onAdClicked.setListener((adInfo: IronSourceAdInfo) => {
      p(`${LP_TAG} - onAdClicked: ${prettyJSON(adInfo)}`)
    })
    LP_BN.onAdScreenPresented.setListener((adInfo: IronSourceAdInfo) => {
      p(`${LP_TAG} - onAdScreenPresented: ${prettyJSON(adInfo)}`)
    })
    LP_BN.onAdScreenDismissed.setListener((adInfo: IronSourceAdInfo) => {
      p(`${LP_TAG} - onAdScreenDismissed: ${prettyJSON(adInfo)}`)
    })
    LP_BN.onAdLeftApplication.setListener((adInfo: IronSourceAdInfo) => {
      p(`${LP_TAG} - onAdLeftApplication: ${prettyJSON(adInfo)}`)
    })

    return () => BN.removeAllListeners()
  }, [])

  return (
    <View style={sectionWrapper}>
      <Text style={[textStyles.h2, positioningStyles.alignCenter]}>Banner</Text>
      <HighlightButton
        onPress={loadBanner}
        buttonText="Load Banner"
        isDisabled={isBannerLoaded}
      />
      <HighlightButton
        onPress={destroyBanner}
        buttonText="Destroy Banner"
        isDisabled={!isBannerLoaded}
      />
      <View style={containerStyles.horizontalSpaceBetween}>
        <HighlightButton onPress={displayBN} buttonText="Display Banner" />
        <HighlightButton onPress={hideBN} buttonText="Hide Banner" />
      </View>
    </View>
  )
}

export default BannerSection
