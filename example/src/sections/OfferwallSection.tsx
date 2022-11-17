import React, { useEffect, useState } from 'react'
import { Text, View } from 'react-native'
import {
  IronSource,
  OfferwallEvents as OW,
  IronSourceError,
  IronSourceOWCreditInfo,
} from 'ironsource-mediation'
import HighlightButton from '../components/HighlightButton'
import { positioningStyles, textStyles } from '../styles'
import { e, p, prettyJSON, showAlert } from '../util'
import { sectionWrapper } from './section-styles'

const showOW = async () => {
  p('Show OW Click')
  if (await IronSource.isOfferwallAvailable()) {
    // Show OW
    // IronSource.showOfferwall();

    // Show by placement
    IronSource.showOfferwall('Game_Screen')
  }
}

const getOWCreditInfo = () => {
  p('Get OW Credit Info click')
  IronSource.getOfferwallCredits()
}

const setOWCustomParams = async () => {
  const params = { currentTime: Date.now().toString() }
  await IronSource.setOfferwallCustomParams(params)
  showAlert('Set OW Custom Params', [prettyJSON(params)])
}

function OfferwallSection() {
  const [isOWAvailable, setIsOWAvailable] = useState<boolean>(false)

  useEffect(() => {
    // This must be called before IronSource.init().
    // Credits would be notified via onOfferwallAdCredited without calling getOfferwallCredits.
    // However, it's recommended to add proactive polling also.
    // IronSource.setClientSideCallbacks(true);

    // initialize
    OW.removeAllListeners()

    // Set OW Event listeners
    OW.onOfferwallAvailabilityChanged.setListener((isAvailable: boolean) => {
      p(`onOfferwallAvailabilityChanged isAvailable: ${isAvailable}`)
      setIsOWAvailable(isAvailable)
    })
    OW.onOfferwallOpened.setListener(() => p('onOfferwallOpened'))
    OW.onOfferwallShowFailed.setListener((error: IronSourceError) => {
      showAlert('OW Show Error', [prettyJSON(error)])
      e(`onOfferwallShowFailed error:${prettyJSON(error)}`)
    })
    OW.onOfferwallAdCredited.setListener(
      (creditInfo: IronSourceOWCreditInfo) => {
        showAlert('OW Credit Info', [prettyJSON(creditInfo)])
        p(`onOfferwallAdCredited info:${prettyJSON(creditInfo)}`)
      }
    )
    OW.onGetOfferwallCreditsFailed.setListener((error: IronSourceError) => {
      showAlert('OW GetCredits Error', [prettyJSON(error)])
      e(`onGetOfferwallCreditsFailed error:${prettyJSON(error)}`)
    })
    OW.onOfferwallClosed.setListener(() => p('onOfferwallClosed'))

    return () => OW.removeAllListeners()
  }, [])

  return (
    <View style={sectionWrapper}>
      <Text style={[textStyles.h2, positioningStyles.alignCenter]}>
        Offerwall
      </Text>
      <HighlightButton
        onPress={showOW}
        buttonText="Show Offerwall"
        isDisabled={!isOWAvailable}
      />
      <HighlightButton
        onPress={getOWCreditInfo}
        buttonText="Get Offerwall Credits"
      />
      <HighlightButton
        onPress={setOWCustomParams}
        buttonText="setOfferwallCustomParams"
      />
    </View>
  )
}

export default OfferwallSection
