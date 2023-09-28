import React, { useEffect, useState } from 'react'
import { Text, View } from 'react-native'
import {
  IronSource,
  BannerEvents as Banner,
  LevelPlayBannerEvents as LevelPlayBanner,
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

  const displayBanner = () => {
    p('Show Banner click')
    IronSource.displayBanner().catch(err => e(prettyJSON(err)))
  }

  const hideBanner = () => {
    p('Hide Banner click')
    IronSource.hideBanner().catch(err => e(prettyJSON(err)))
  }

  useEffect(() => {
    Banner.onBannerAdLoaded.setListener(() => {
      p('onBannerAdLoaded')
      setIsBannerLoaded(true)
    })
    Banner.onBannerAdLoadFailed.setListener((error: IronSourceError) => {
      showAlert('Banner Show Error', [prettyJSON(error)])
      e(`onBannerAdLoadFailed error:${prettyJSON(error)}`)
    })
    Banner.onBannerAdClicked.setListener(() => p('onBannerAdClicked'))
    Banner.onBannerAdScreenPresented.setListener(() =>
      p('onBannerAdScreenPresented')
    )
    Banner.onBannerAdScreenDismissed.setListener(() =>
      p('onBannerAdScreenDismissed')
    )
    Banner.onBannerAdLeftApplication.setListener(() =>
      p('onBannerAdLeftApplication')
    )

    // LevelPlayEvent Listeners
    const LEVELPLAY_TAG = 'LevelPlayBannerListener'
    LevelPlayBanner.onAdLoaded.setListener((adInfo: IronSourceAdInfo) => {
      p(`${LEVELPLAY_TAG} - onAdLoaded: ${prettyJSON(adInfo)}`)
    })
    LevelPlayBanner.onAdLoadFailed.setListener((error: IronSourceError) => {
      p(`${LEVELPLAY_TAG} - onAdLoadFailed: ${prettyJSON(error)}`)
    })
    LevelPlayBanner.onAdClicked.setListener((adInfo: IronSourceAdInfo) => {
      p(`${LEVELPLAY_TAG} - onAdClicked: ${prettyJSON(adInfo)}`)
    })
    LevelPlayBanner.onAdScreenPresented.setListener((adInfo: IronSourceAdInfo) => {
      p(`${LEVELPLAY_TAG} - onAdScreenPresented: ${prettyJSON(adInfo)}`)
    })
    LevelPlayBanner.onAdScreenDismissed.setListener((adInfo: IronSourceAdInfo) => {
      p(`${LEVELPLAY_TAG} - onAdScreenDismissed: ${prettyJSON(adInfo)}`)
    })
    LevelPlayBanner.onAdLeftApplication.setListener((adInfo: IronSourceAdInfo) => {
      p(`${LEVELPLAY_TAG} - onAdLeftApplication: ${prettyJSON(adInfo)}`)
    })

    return () => Banner.removeAllListeners()
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
        <HighlightButton onPress={displayBanner} buttonText="Display Banner" />
        <HighlightButton onPress={hideBanner} buttonText="Hide Banner" />
      </View>
    </View>
  )
}

export default BannerSection
