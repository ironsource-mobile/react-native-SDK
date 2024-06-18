import React, {useEffect} from 'react'
import {
  AppState,
  type AppStateStatus,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import {
  IronSource,
  type IronSourceSegment,
  type ImpressionData,
  ATTrackingManager,
  ATTStatus,
  type ImpressionDataListener,
  type InitializationListener,
} from 'ironsource-mediation';
import LevelPlayBannerSection from './sections/LevelPlayBannerSection';
import LevelPlayInterstitialSection from './sections/LevelPlayInterstitialSection';
import LevelPlayRewardedVideoSection from './sections/LevelPlayRewardedVideoSection';
import LevelPlayNativeAdSection from "./sections/LevelPlayNativeAdSection";
import HeaderImage from './components/HeaderImage';
import { p, prettyJSON } from './util';
import IOSSection from './sections/IOSSection';
import LevelPlayRewardedVideoManualSection from './sections/LevelPlayRewardedVideoManualSection';

const APP_USER_ID = 'some-unique-application-user-id';
const APP_KEY = Platform.OS === 'android' ? '1dc3db545' : '1dc3deecd';

// Manual Load Rewarded Video
const IS_MANUAL_LOAD_REWARDED_VIDEO = false;

/**
 * Send Segment related info to the server by one of two methods:
 *   Method 1: Specify the segmentName if you know to which Segment the user belongs.
 *   Method 2: Send parameters to have the server find a matching Segment.
 *
 * When both name and params are sent, the server would first try to find by name,
 *   then try by params if there is no match by name.
 */
function createSegment(): IronSourceSegment {
  const segment: IronSourceSegment = {
    // Method 1: Specify by the name
    // segmentName: 'DemoSegment',
    // Method 2: Send parameters to have the server match a segment
    age: 20, // Int
    gender: 'female', // 'female' | 'male'
    level: 9, // Int
    isPaying: false,
    userCreationDateInMillis: 1632388612380, // Long
    iapTotal: 100.99, // Double
    // Up to 5 custom parameters are allowed.
    customParameters: {
      customKey1: 'customValue1',
      customKey2: 'customValue2',
      customKey3: 'customValue3',
      customKey4: 'customValue4',
      customKey5: 'customValue5',
    },
  }
  return segment
}

/**
 * ARM ImpressionDataListener event
 * The ARM SDK Postbacks flag must be enabled to receive data
 * https://developers.is.com/ironsource-mobile/general/ad-revenue-measurement-postbacks/#step-1
 */
function setImpressionDataListener() {
  const impressionListener: ImpressionDataListener = {
    onImpressionSuccess: (data?: ImpressionData) => {
      p(`ImpressionData: ${prettyJSON(data)}`);
    }
  };
  
  IronSource.setImpressionDataListener(impressionListener);
}

/**
 * Check iOS14 ATT status
 * Not part of the ironSource SDK API.
 */
async function checkATT() {
  if (Platform.OS !== 'ios') return

  let currentStatus = await ATTrackingManager.getTrackingAuthorizationStatus()
  p(`ATTStatus: ${currentStatus}`)

  if (currentStatus === ATTStatus.NotDetermined) {
    currentStatus = await ATTrackingManager.requestTrackingAuthorization()
    p(`ATTStatus returned: ${currentStatus}`)
  }
}

/**
 * Awaited function calls must be done BEFORE init()
 */
async function initIronSource() {
  try {
    // This API can be called in parallel
    IronSource.validateIntegration().catch(e => console.error(e))

    // ARM ImpressionData
    setImpressionDataListener()

    // Set adapters and network SDKs to debug
    await IronSource.setAdaptersDebug(true)

    // This should be enabled to detect network condition errors
    await IronSource.shouldTrackNetworkState(true)

    // GDPR Consent
    await IronSource.setConsent(true)

    // COPPA
    await IronSource.setMetaData('is_child_directed', ['false'])

    // Segment
    await IronSource.setSegment(createSegment())

    // GAID, IDFA
    const advertiserId = await IronSource.getAdvertiserId()
    p(`AdvertiserID: ${advertiserId}`)

    // Do not use advertiserId for this.
    // Use an application user id.
    await IronSource.setUserId(APP_USER_ID)

    // Request ATT for iOS
    if (Platform.OS === 'ios') {
      await checkATT()
    }

    // await IronSource.init(APP_KEY);
    await IronSource.init(APP_KEY)
  } catch (e) {
    console.error(e)
  }
}

/**
 * Component ==================================================================
 */
export default function App() {
  useEffect(() => {
    // InitializationListener
    const listener: InitializationListener = {
      onInitializationComplete: () =>  {
        console.log('onInitializationComplete')
      }
    }
    IronSource.setInitializationListener(listener);

    // init the SDK after all child components mounted
    //   and the app becomes active
    const subscription = AppState.addEventListener(
      'change',
      (state: AppStateStatus) => {
        if (state === 'active') {
          initIronSource()
          subscription.remove()
        }
      }
    )

    return () => {
      subscription.remove()
    }
  }, [])

  return (
    <SafeAreaView>
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <View style={[styles.body, styles.container]}>
          <HeaderImage />
          {IS_MANUAL_LOAD_REWARDED_VIDEO ? <LevelPlayRewardedVideoManualSection /> : <LevelPlayRewardedVideoSection />}
          <LevelPlayInterstitialSection />
          <LevelPlayBannerSection />
          <LevelPlayNativeAdSection />
          {Platform.OS === 'ios' && <IOSSection />}
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  body: {
    backgroundColor: 'white',
  },
  container: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'center',
    padding: 12,
  },
})
