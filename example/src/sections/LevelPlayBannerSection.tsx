import React, { useEffect, useState } from 'react'
import { Text, View } from 'react-native'
import {
  IronSource,
  type IronSourceBannerOptions,
  type IronSourceError,
  type IronSourceAdInfo,
  type LevelPlayBannerListener,
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
    isAdaptive: false,
    verticalOffset: -30,
    placementName: BANNER_PLACEMENT, // optional
  };

  const isCapped = await IronSource.isBannerPlacementCapped(BANNER_PLACEMENT)
  if (!isCapped) {
    IronSource.loadBanner(bannerOptions)
  } else {
    showAlert('Banner Placement', [`${BANNER_PLACEMENT} is capped`])
  }
}

function LevelPlayBannerSection() {
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
    // LevelPlayEvent Listeners
    const LEVELPLAY_TAG = 'LevelPlayBannerListener'

    const listener: LevelPlayBannerListener = {
      onAdLoaded: (adInfo: IronSourceAdInfo) => { 
       setIsBannerLoaded(true)

       p(`${LEVELPLAY_TAG} - onAdLoaded: ${prettyJSON(adInfo)}`)
     },
     onAdLoadFailed: (error: IronSourceError) => { 
       showAlert('Banner Show Error', [prettyJSON(error)])

       p(`${LEVELPLAY_TAG} - onAdLoadFailed: ${prettyJSON(error)}`)  
     },
     onAdClicked: (adInfo: IronSourceAdInfo) => { 
       p(`${LEVELPLAY_TAG} - onAdClicked: ${prettyJSON(adInfo)}`)  
     },
     onAdScreenPresented: (adInfo: IronSourceAdInfo) => { 
       p(`${LEVELPLAY_TAG} - onAdScreenPresented: ${prettyJSON(adInfo)}`)  
     },
     onAdScreenDismissed: (adInfo: IronSourceAdInfo) => { 
       p(`${LEVELPLAY_TAG} - onAdScreenDismissed: ${prettyJSON(adInfo)}`)  
     },
     onAdLeftApplication: (adInfo: IronSourceAdInfo) => { 
       p(`${LEVELPLAY_TAG} - onAdLeftApplication: ${prettyJSON(adInfo)}`)  
     },
    }
    IronSource.setLevelPlayBannerListener(listener);
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

export default LevelPlayBannerSection;
