import React, { useEffect, useState } from 'react'
import { Text, View } from 'react-native'
import {
  IronSource,
  OfferwallEvents as Offerwall,
  IronSourceError,
  IronSourceOWCreditInfo,
} from 'ironsource-mediation'
import HighlightButton from '../components/HighlightButton'
import { positioningStyles, textStyles } from '../styles'
import { e, p, prettyJSON, showAlert } from '../util'
import { sectionWrapper } from './section-styles'

const showOfferwall = async () => {
  p('Show Offerwall Click')
  if (await IronSource.isOfferwallAvailable()) {

    // Show by placement
    IronSource.showOfferwall('Game_Screen')
  }
}

const getOfferwallCreditInfo = () => {
  p('Get Offerwall Credit Info click')
  IronSource.getOfferwallCredits()
}

const setOfferwallCustomParams = async () => {
  const params = { currentTime: Date.now().toString() }
  await IronSource.setOfferwallCustomParams(params)
  showAlert('Set Offerwall Custom Params', [prettyJSON(params)])
}

function OfferwallSection() {
  const [isOfferwallAvailable, setIsOfferwallAvailable] = useState<boolean>(false)

  useEffect(() => {
    // This must be called before IronSource.init().
    // Credits would be notified via onOfferwallAdCredited without calling getOfferwallCredits.
    // However, it's recommended to add proactive polling also.

    // initialize
    Offerwall.removeAllListeners()

    // Set Offerwall Event listeners
    Offerwall.onOfferwallAvailabilityChanged.setListener((isAvailable: boolean) => {
      p(`onOfferwallAvailabilityChanged isAvailable: ${isAvailable}`)
      setIsOfferwallAvailable(isAvailable)
    })
    Offerwall.onOfferwallOpened.setListener(() => p('onOfferwallOpened'))
    Offerwall.onOfferwallShowFailed.setListener((error: IronSourceError) => {
      showAlert('Offerwall Show Error', [prettyJSON(error)])
      e(`onOfferwallShowFailed error:${prettyJSON(error)}`)
    })
    Offerwall.onOfferwallAdCredited.setListener(
      (creditInfo: IronSourceOWCreditInfo) => {
        showAlert('Offerwall Credit Info', [prettyJSON(creditInfo)])
        p(`onOfferwallAdCredited info:${prettyJSON(creditInfo)}`)
      }
    )
    Offerwall.onGetOfferwallCreditsFailed.setListener((error: IronSourceError) => {
      showAlert('Offerwall GetCredits Error', [prettyJSON(error)])
      e(`onGetOfferwallCreditsFailed error:${prettyJSON(error)}`)
    })
    Offerwall.onOfferwallClosed.setListener(() => p('onOfferwallClosed'))

    return () => Offerwall.removeAllListeners()
  }, [])

  return (
    <View style={sectionWrapper}>
      <Text style={[textStyles.h2, positioningStyles.alignCenter]}>
        Offerwall
      </Text>
      <HighlightButton
        onPress={showOfferwall}
        buttonText="Show Offerwall"
        isDisabled={!isOfferwallAvailable}
      />
      <HighlightButton
        onPress={getOfferwallCreditInfo}
        buttonText="Get Offerwall Credits"
      />
      <HighlightButton
        onPress={setOfferwallCustomParams}
        buttonText="setOfferwallCustomParams"
      />
    </View>
  )
}

export default OfferwallSection
