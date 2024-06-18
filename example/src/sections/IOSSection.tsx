import React, { useEffect } from 'react'
import { Text, View } from 'react-native'
import {
  IronSource,
  type ConsentViewError,
  type ConsentViewListener,
} from 'ironsource-mediation'
import HighlightButton from '../components/HighlightButton'
import { positioningStyles, textStyles } from '../styles'
import { p, prettyJSON, showAlert } from '../util'
import { sectionWrapper } from './section-styles'

const CONSENT_VIEW_TYPE = 'pre'

const getCV = async () => {
  p('getConversionValue click')
  const cv = await IronSource.getConversionValue()
  showAlert('Get Conversion Value', [`CV: ${cv}`])
}

const loadAndShowConsentView = () => {
  IronSource.loadConsentViewWithType(CONSENT_VIEW_TYPE)
}

/**
 * This section should be mounted only for iOS
 */
function IOSSection() {
  useEffect(() => {
    const consentViewListener: ConsentViewListener = {
      onConsentViewDidLoadSuccess: (consentViewType: string) => {
        p(`consentViewDidLoadSuccess consentViewType:${consentViewType}`)
        IronSource.showConsentViewWithType(consentViewType)
      },
      onConsentViewDidFailToLoad: (error: ConsentViewError) => {
        p(`consentViewDidFailToLoad error:${prettyJSON(error)}`)      
      },
      onConsentViewDidShowSuccess: (consentViewType: string) => {
        p(`consentViewDidShowSuccess consentViewType:${consentViewType}`)
      },
      onConsentViewDidFailToShow: (error: ConsentViewError) => {
        p(`consentViewDidFailToShow error:${prettyJSON(error)}`)
      },
      onConsentViewDidAccept: (consentViewType: string) => {
        p(`consentViewDidAccept consentViewType:${consentViewType}`)
      }
    };
    
    IronSource.setConsentViewListener(consentViewListener);
  }, [])

  return (
    <View style={sectionWrapper}>
      <Text style={[textStyles.h2, positioningStyles.alignCenter]}>iOS 14</Text>
      <HighlightButton onPress={getCV} buttonText="Get Conversion Value" />
      <HighlightButton
        onPress={loadAndShowConsentView}
        buttonText="Show ConsentView"
      />
    </View>
  )
}

export default IOSSection
