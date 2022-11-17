import React, { useEffect } from 'react'
import { Text, View } from 'react-native'
import {
  IronSource,
  ConsentViewEvents,
  ConsentViewError,
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
    ConsentViewEvents.consentViewDidLoadSuccess.setListener(
      (consentViewType: string) => {
        p(`consentViewDidLoadSuccess consentViewType:${consentViewType}`)
        IronSource.showConsentViewWithType(consentViewType)
      }
    )
    ConsentViewEvents.consentViewDidFailToLoad.setListener(
      (error: ConsentViewError) =>
        p(`consentViewDidFailToLoad error:${prettyJSON(error)}`)
    )
    ConsentViewEvents.consentViewDidShowSuccess.setListener(
      (consentViewType: string) =>
        p(`consentViewDidShowSuccess consentViewType:${consentViewType}`)
    )
    ConsentViewEvents.consentViewDidFailToShow.setListener(
      (error: ConsentViewError) =>
        p(`consentViewDidFailToShow error:${prettyJSON(error)}`)
    )
    ConsentViewEvents.consentViewDidAccept.setListener(
      (consentViewType: string) =>
        p(`consentViewDidAccept consentViewType:${consentViewType}`)
    )
    return () => ConsentViewEvents.removeAllListeners()
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
