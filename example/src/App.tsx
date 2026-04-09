import React, { useCallback, useEffect, useRef, useState } from 'react'
import {
  type GestureResponderEvent,
  Image,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native'
import {
  type LevelPlayImpressionData,
  ATTrackingManager,
  ATTStatus,
  type LevelPlayImpressionDataListener,
  LevelPlay,
  LevelPlayInitRequest,
  type LevelPlayInitListener,
  type LevelPlayInitError,
  type LevelPlayConfiguration,
  LevelPlayInterstitialAd,
  type LevelPlayInterstitialAdListener,
  type LevelPlayAdInfo,
  type LevelPlayAdError,
  type LevelPlayBannerAdViewListener,
  LevelPlayAdSize,
  LevelPlayBannerAdView,
  type LevelPlayBannerAdViewMethods,
  LevelPlayRewardedAd,
  type LevelPlayRewardedAdListener,
  type LevelPlayReward,
} from 'unity-levelplay-mediation'

// --- Constants and Helpers ---
const APP_USER_ID = '[YOUR_UNIQUE_APP_USER_ID]'; // Make sure to replace this
const TAG = 'LevelPlayReactNativeDemo';

// App Keys (UnityAds)
const APP_KEY_ANDROID = '25b63cf85';
const APP_KEY_IOS = '25c43a4a5';

// Rewarded video ad unit IDs
const REWARDED_AD_UNIT_ID_ANDROID = 'syz3d8ekts22q0or';
const REWARDED_AD_UNIT_ID_IOS = 'l1quzz1xmmdhw5er';

// Interstitial ad unit IDs
const INTERSTITIAL_AD_UNIT_ID_ANDROID = 'h3xw38h9214adgxo';
const INTERSTITIAL_AD_UNIT_ID_IOS = 'obg6ohwts3y690ks';

// Banner ad unit IDs
const BANNER_AD_UNIT_ID_ANDROID = '4fpetq4lhe5lsw3e';
const BANNER_AD_UNIT_ID_IOS = 'xc2bsuntn9ea734t';


// Helper methods to get platform-specific appkeys and ad unit IDs.
const getAppKey = () => Platform.select({ android: APP_KEY_ANDROID, ios: APP_KEY_IOS, default: '' });
const getRewardedAdUnitId = () => Platform.select({ android: REWARDED_AD_UNIT_ID_ANDROID, ios: REWARDED_AD_UNIT_ID_IOS, default: '' });
const getInterstitialAdUnitId = () => Platform.select({ android: INTERSTITIAL_AD_UNIT_ID_ANDROID, ios: INTERSTITIAL_AD_UNIT_ID_IOS, default: '' });
const getBannerAdUnitId = () => Platform.select({ android: BANNER_AD_UNIT_ID_ANDROID, ios: BANNER_AD_UNIT_ID_IOS, default: '' });


// --- End Constants and Helpers ---

/**
 * ARM ImpressionDataListener event
 * The ARM SDK Postbacks flag must be enabled to receive data
 * https://developers.is.com/ironsource-mobile/react-native/impression-level-revenue-integration-react-native/#step-1
 */
function setImpressionDataListener() {
  const impressionListener: LevelPlayImpressionDataListener = {
    onImpressionSuccess: (data: LevelPlayImpressionData) => {
      logMethodName('LevelPlayImpressionData', 'onImpressionSuccess:', data)
    },
  }

  LevelPlay.addImpressionDataListener(impressionListener)
}

/**
 * Check iOS14 ATT status
 * Not part of the ironSource SDK API.
 */
async function checkATT() {
  if (Platform.OS !== 'ios') return

  let currentStatus = await ATTrackingManager.getTrackingAuthorizationStatus()
  logMethodName('getTrackingAuthorizationStatus', 'ATTStatus:', currentStatus)

  if (currentStatus === ATTStatus.NotDetermined) {
    currentStatus = await ATTrackingManager.requestTrackingAuthorization()
    logMethodName('requestTrackingAuthorizationATTStatus', 'ATTStatus returned:', currentStatus)
  }
}

/**
 * Awaited function calls must be done BEFORE init()
 */
async function initSDK() {
  try {
    // This API can be called in parallel
    LevelPlay.validateIntegration().catch((e: any) => console.error(e))

    // ARM ImpressionData
    setImpressionDataListener()

    // Set adapters and network SDKs to debug
    await LevelPlay.setAdaptersDebug(true)

    // Request ATT for iOS
    if (Platform.OS === 'ios') {
      await checkATT()
    }
    // Initialize the LevelPlay SDK
    let initRequest: LevelPlayInitRequest = LevelPlayInitRequest.builder(getAppKey())
      .withUserId(APP_USER_ID)
      .build()
    const initListener: LevelPlayInitListener = {
      onInitFailed: (error: LevelPlayInitError) => {
        logMethodName('InitListener', 'onInitFailed:', error)
      },
      onInitSuccess: (configuration: LevelPlayConfiguration) => {
        logMethodName('InitListener', 'onInitSuccess:', configuration)
      },
    }
    await LevelPlay.init(initRequest, initListener)
  } catch (e) {
    logMethodName('LevelPlayInit', 'Error during initialization:', e)
  }
}

export default function App() {
  const adSize = LevelPlayAdSize.BANNER
  const bannerAdRef = useRef<LevelPlayBannerAdViewMethods>(null)
  const [bannerKey, setBannerKey] = useState<number>(0)
  const listener: LevelPlayBannerAdViewListener = {
    onAdLoaded: (adInfo: LevelPlayAdInfo) => {
      logMethodName('Banner Ad', 'onAdLoaded:', adInfo)
    },
    onAdLoadFailed: (error: LevelPlayAdError) => {
      logMethodName('Banner Ad', 'onAdLoadFailed:', error)
    },
    onAdDisplayed: (adInfo: LevelPlayAdInfo) => {
      logMethodName('Banner Ad', 'onAdDisplayed:', adInfo)
    },
    onAdDisplayFailed: (adInfo: LevelPlayAdInfo, error: LevelPlayAdError) => {
      logMethodName('Banner Ad', 'onAdDisplayFailed:', {
        adInfo,
        error,
      })
    },
    onAdClicked: (adInfo: LevelPlayAdInfo) => {
      logMethodName('Banner Ad', 'onAdClicked:', adInfo)
    },
    onAdExpanded: (adInfo: LevelPlayAdInfo) => {
      logMethodName('Banner Ad', 'onAdExpanded:', adInfo)
    },
    onAdCollapsed: (adInfo: LevelPlayAdInfo) => {
      logMethodName('Banner Ad', 'onAdCollapsed:', adInfo)
    },
    onAdLeftApplication: (adInfo: LevelPlayAdInfo) => {
      logMethodName('Banner Ad', 'onAdLeftApplication:', adInfo)
    },
  }

  useEffect(() => {
    initSDK()
  }, [])

  const loadBannerAd = useCallback(() => {
    bannerAdRef.current?.loadAd()
  }, [])

  const destroyBannerAd = useCallback(() => {
    bannerAdRef.current?.destroy()
    setBannerKey(prevKey => prevKey + 1)
  }, [])

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.mainContainer}>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}
          contentContainerStyle={styles.scrollViewContent}
          scrollEnabled={true}
        >
          <View style={[styles.container]}>
            <View style={styles.wrapper}>
              <Image
                source={require('./assets/images/logo_small.png')}
                style={styles.image}
              />
              <Text style={styles.text}>for ReactNative</Text>
            </View>
            <LevelPlayRewardedAdSection />
            <LevelPlayInterstitialAdSection />
            <LevelPlayBannerAdSection
              onLoadBanner={loadBannerAd}
              onDestroyBanner={destroyBannerAd}
            />
          </View>
        </ScrollView>

        {/* Position banner on bottom of the screen */}
        <LevelPlayBannerAdView
          key={bannerKey}
          ref={bannerAdRef}
          adUnitId={
            getBannerAdUnitId()
          }
          adSize={adSize}
          placementName="DefaultBanner"
          listener={listener}
          style={styles.bannerAd}
        />
      </View>
    </SafeAreaView>
  )
}

const LevelPlayRewardedAdSection: React.FC = () => {
  const [rewardedAd] = useState<LevelPlayRewardedAd>(
    new LevelPlayRewardedAd(getRewardedAdUnitId())
  )
  const [isRewardedAvailable, setIsRewardedAvailable] = useState<boolean>(false)
  const listener: LevelPlayRewardedAdListener = {
    onAdLoaded: (adInfo: LevelPlayAdInfo) => {
      logMethodName('Rewarded Ad', 'onAdLoaded:', adInfo)
      setIsRewardedAvailable(true)
    },
    onAdLoadFailed: (error: LevelPlayAdError) => {
      logMethodName('Rewarded Ad', 'onAdLoadFailed:', error)
      setIsRewardedAvailable(false)
    },
    onAdInfoChanged: (adInfo: LevelPlayAdInfo) => {
      logMethodName('Rewarded Ad', 'onAdInfoChanged:', adInfo)
    },
    onAdDisplayed: (adInfo: LevelPlayAdInfo) => {
      logMethodName('Rewarded Ad', 'onAdDisplayed:', adInfo)
    },
    onAdDisplayFailed: (error: LevelPlayAdError, adInfo: LevelPlayAdInfo) => {
      logMethodName('Rewarded Ad', 'onAdDisplayFailed:', {
        error,
        adInfo,
      })
    },
    onAdClicked: (adInfo: LevelPlayAdInfo) => {
      logMethodName('Rewarded Ad', 'onAdClicked:', adInfo)
    },
    onAdClosed: (adInfo: LevelPlayAdInfo) => {
      logMethodName('Rewarded Ad', 'onAdClosed:', adInfo)
      setIsRewardedAvailable(false)
    },
    onAdRewarded: (reward: LevelPlayReward, adInfo: LevelPlayAdInfo) => {
      logMethodName('Rewarded Ad', 'onAdRewarded:', {
        reward,
        adInfo,
      })
      // Handle the reward here, e.g., update user balance or give in-game items
      // Example: console.log(`User rewarded with ${reward.amount} ${reward.name}`);
    },
  }

  useEffect(() => {
    rewardedAd.setListener(listener)
  }, [rewardedAd])

  const loadAd = async () => {
    await rewardedAd.loadAd()
  }

  const showAd = async () => {
    if (await rewardedAd.isAdReady()) {
      await rewardedAd.showAd('Default')
    }
  }

  return (
    <View>
      <Text style={[styles.title]}>Rewarded Ad</Text>
      <View style={styles.horizontalSpaceBetween}>
        <HighlightButton onPress={loadAd} buttonText="Load Rewarded" />
        <HighlightButton
          onPress={showAd}
          buttonText="Show Rewarded"
          isDisabled={!isRewardedAvailable}
        />
      </View>
    </View>
  )
}

const LevelPlayInterstitialAdSection: React.FC = () => {
  const [interstitialAd] = useState<LevelPlayInterstitialAd>(
    new LevelPlayInterstitialAd(getInterstitialAdUnitId())
  )
  const [isInterstitialAvailable, setIsInterstitialAvailable] =
    useState<boolean>(false)
  const listener: LevelPlayInterstitialAdListener = {
    onAdLoaded: (adInfo: LevelPlayAdInfo) => {
      logMethodName('Interstitial Ad', 'onAdLoaded:', adInfo)
      setIsInterstitialAvailable(true)
    },
    onAdLoadFailed: (error: LevelPlayAdError) => {
      logMethodName('Interstitial Ad', 'onAdLoadFailed:', error)
      setIsInterstitialAvailable(false)
    },
    onAdInfoChanged: (adInfo: LevelPlayAdInfo) => {
      logMethodName('Interstitial Ad', 'onAdInfoChanged:', adInfo)
    },
    onAdDisplayed: (adInfo: LevelPlayAdInfo) => {
      logMethodName('Interstitial Ad', 'onAdDisplayed:', adInfo)
    },
    onAdDisplayFailed: (error: LevelPlayAdError, adInfo: LevelPlayAdInfo) => {
      logMethodName('Interstitial Ad', 'onAdDisplayFailed:', {
        error,
        adInfo,
      })
    },
    onAdClicked: (adInfo: LevelPlayAdInfo) => {
      logMethodName('Interstitial Ad', 'onAdClicked:', adInfo)
    },
    onAdClosed: (adInfo: LevelPlayAdInfo) => {
      logMethodName('Interstitial Ad', 'onAdClosed:', adInfo)
      setIsInterstitialAvailable(false)
    },
  }

  useEffect(() => {
    interstitialAd.setListener(listener)
  }, [interstitialAd])

  const loadAd = async () => {
    await interstitialAd.loadAd()
  }

  const showAd = async () => {
    if (await interstitialAd.isAdReady()) {
      await interstitialAd.showAd('Default')
    }
  }

  return (
    <View>
      <Text style={[styles.title]}>Interstitial Ad</Text>
      <View style={styles.horizontalSpaceBetween}>
        <HighlightButton onPress={loadAd} buttonText="Load Interstitial" />
        <HighlightButton
          onPress={showAd}
          buttonText="Show Interstitial"
          isDisabled={!isInterstitialAvailable}
        />
      </View>
    </View>
  )
}

interface LevelPlayBannerAdSectionProps {
  onLoadBanner: () => void
  onDestroyBanner: () => void
}

const LevelPlayBannerAdSection: React.FC<
  LevelPlayBannerAdSectionProps
> = ({ onLoadBanner, onDestroyBanner }) => {
  return (
    <View>
      <Text style={[styles.title]}>Banner Ad</Text>
      <View style={styles.horizontalSpaceBetween}>
        <HighlightButton buttonText={'Load Banner'} onPress={onLoadBanner} />
        <HighlightButton
          buttonText={'Destroy Banner'}
          onPress={onDestroyBanner}
        />
      </View>
    </View>
  )
}

// Utils
/**
 * Log utility function to print ad format, method name and additional data.
 * @param {string} adFormat The ad format (e.g., "Banner", "Interstitial").
 * @param {string} methodName The name of the method being logged.
 * @param {any} [data] Additional data to log (can be any type, optional).
 */
export function logMethodName(
  adFormat: string,
  methodName: string,
  data?: any         // data is optional and can be any type
): void {
  if (data !== undefined) {
    console.log(`${TAG}: ${adFormat} - ${methodName}`, data);
  } else {
    console.log(`${TAG}: ${adFormat} - ${methodName}`);
  }
}

const disabledColors = {
  button: '#808080',
  text: '#fff',
}

// Components
interface HighlightButtonProps {
  onPress?: (event: GestureResponderEvent) => void
  buttonText: string
  buttonColor?: string
  textColor?: string
  isDisabled?: boolean
}

function HighlightButton({
  onPress,
  buttonText,
  buttonColor,
  textColor,
  isDisabled,
}: HighlightButtonProps) {
  const disabled = isDisabled === true // explicit true
  const styles = StyleSheet.create({
    touchableHighlightStyle: {
      flex: 1,
      borderColor: 'transparent',
      borderRadius: 10,
      margin: 5,
    },
    textWrapperStyle: {
      backgroundColor: disabled
        ? disabledColors.button
        : buttonColor || '#2196f3',
      borderWidth: 0,
      borderRadius: 3,
      padding: 10,
      flex: 1,
    },
    textStyle: {
      color: disabled ? disabledColors.text : textColor || 'white',
      fontWeight: 'bold',
      fontSize: 14,
      textAlign: 'center',
    },
  })

  return (
    <TouchableHighlight
      onPress={onPress}
      underlayColor="#fff"
      activeOpacity={0.5}
      disabled={disabled}
      style={styles.touchableHighlightStyle}
    >
      <View style={styles.textWrapperStyle}>
        <Text style={styles.textStyle}>{buttonText}</Text>
      </View>
    </TouchableHighlight>
  )
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: 'white',
  },
  mainContainer: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollViewContent: {
    flexGrow: 1,
    paddingBottom: 60, // Space for banner at bottom
  },
  container: {
    flex: 1,
    padding: 12,
    backgroundColor: 'white',
  },
  wrapper: {
    padding: 8,
  },
  image: {
    width: '100%',
    resizeMode: 'contain',
  },
  text: {
    position: 'absolute',
    bottom: 0,
    right: 8,
  },
  horizontalSpaceBetween: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
  },
  bannerAd: {
    width: 320,
    height: 50,
    alignSelf: 'center',
    position: 'absolute',
    zIndex: 10,
    bottom: 0,
  },
})
