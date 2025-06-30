import React, { useCallback, useEffect, useRef, useState } from 'react'
import {
  AppState,
  type AppStateStatus,
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
  IronSource,
  type ImpressionData,
  ATTrackingManager,
  ATTStatus,
  type ImpressionDataListener,
  LevelPlay,
  LevelPlayInitRequest,
  AdFormat,
  type LevelPlayInitListener,
  type LevelPlayInitError,
  type LevelPlayConfiguration,
  LevelPlayInterstitialAd,
  type LevelPlayInterstitialAdListener,
  type LevelPlayAdInfo,
  type LevelPlayAdError,
  LevelPlayNativeAd,
  type LevelPlayNativeAdListener,
  type IronSourceAdInfo,
  LevelPlayNativeAdView,
  LevelPlayTemplateType,
  type IronSourceError,
  type LevelPlayBannerAdViewListener,
  LevelPlayAdSize,
  LevelPlayBannerAdView,
  type LevelPlayBannerAdViewMethods,
  LevelPlayRewardedAd,
  type LevelPlayRewardedAdListener,
  type LevelPlayReward,
} from 'ironsource-mediation'

// --- Constants and Helpers ---
const APP_USER_ID = '[YOUR_UNIQUE_APP_USER_ID]'; // Make sure to replace this
const TAG = 'LevelPlayReactNativeDemo';

// App Keys
const APP_KEY_ANDROID = '85460dcd';
const APP_KEY_IOS = '8545d445';

// Rewarded video ad unit IDs
const REWARDED_AD_UNIT_ID_ANDROID = '76yy3nay3ceui2a3';
const REWARDED_AD_UNIT_ID_IOS = 'qwouvdrkuwivay5q';

// Interstitial ad unit IDs
const INTERSTITIAL_AD_UNIT_ID_ANDROID = 'aeyqi3vqlv6o8sh9';
const INTERSTITIAL_AD_UNIT_ID_IOS = 'wmgt0712uuux8ju4';

// Banner ad unit IDs
const BANNER_AD_UNIT_ID_ANDROID = 'thnfvcsog13bhn08';
const BANNER_AD_UNIT_ID_IOS = 'iep3rxsyp9na3rw8';


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
  const impressionListener: ImpressionDataListener = {
    onImpressionSuccess: (data?: ImpressionData) => {
      logMethodName('ImpressionData', 'onImpressionSuccess:', data)
    },
  }

  IronSource.setImpressionDataListener(impressionListener)
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
async function init() {
  try {
    // This API can be called in parallel
    IronSource.validateIntegration().catch(e => console.error(e))

    // ARM ImpressionData
    setImpressionDataListener()

    // Set adapters and network SDKs to debug
    await IronSource.setAdaptersDebug(true)

    // Request ATT for iOS
    if (Platform.OS === 'ios') {
      await checkATT()
    }
    // Initialize the LevelPlay SDK
    let initRequest: LevelPlayInitRequest = LevelPlayInitRequest.builder(getAppKey())
      .withLegacyAdFormats([AdFormat.NATIVE_AD])
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
    // init the SDK after all child components mounted
    //   and the app becomes active
    const subscription = AppState.addEventListener(
      'change',
      (state: AppStateStatus) => {
        if (state === 'active') {
          init()
          subscription.remove()
        }
      }
    )

    return () => {
      subscription.remove()
    }
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
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={styles.scrollView}
        contentContainerStyle={styles.scrollViewContent}
      >
        <View style={[styles.container]}>
          <View style={styles.wrapper}>
            <Image
              source={require('./assets/images/iron_logo.png')}
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
          <LevelPlayNativeAdSection />
        </View>

        {/* Position banner on bottom of the screen */}
        <LevelPlayBannerAdView
          key = {bannerKey}
          ref={bannerAdRef}
          adUnitId={
            getBannerAdUnitId()
          }
          adSize={adSize}
          placementName="DefaultBanner"
          listener={listener}
          style={styles.bannerAd}
        />
      </ScrollView>
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

const LevelPlayNativeAdSection = () => {
  const [nativeAd, setNativeAd] = useState<LevelPlayNativeAd | null>()
  const [isAdLoaded, setIsAdLoaded] = useState<boolean>(false)
  const [nativeAdKey, setnativeAdKey] = useState<number>(0); // Key for refreshing the component

  const createNewNativeAd = useCallback(() => { 
    const listener: LevelPlayNativeAdListener = {
      onAdLoaded: (nativeAd: LevelPlayNativeAd, adInfo: IronSourceAdInfo) => {
      logMethodName('Native Ad', 'onAdLoaded:', {
        adInfo,
        nativeAd: nativeAd.placement,
      })
        setNativeAd(nativeAd);
        setIsAdLoaded(true);
      },
      onAdLoadFailed: (nativeAd: LevelPlayNativeAd, error: IronSourceError) => {
        logMethodName('Native Ad', 'onAdLoadFailed:', {
          error,
          nativeAd: nativeAd.placement,
        });
      },
      onAdClicked: (nativeAd: LevelPlayNativeAd, adInfo: IronSourceAdInfo) => {
      logMethodName('Native Ad', 'onAdClicked:', {
        adInfo,
        nativeAd: nativeAd.placement,
      })
      },
      onAdImpression: (nativeAd: LevelPlayNativeAd, adInfo: IronSourceAdInfo) => {
      logMethodName('Native Ad', 'onAdImpression:', {
        adInfo,
        nativeAd: nativeAd.placement,
      })
      },
    };

    const levelPlayNativeAd = LevelPlayNativeAd.builder()
      .withPlacement('DefaultNativeAd') // Your placement name string
      .withListener(listener) // Your LevelPlayNativeAd listener
      .build();

    // Set the newly created native ad instance
    setNativeAd(levelPlayNativeAd);
  }, []);


  // Initialize the Native Ad on Component Mount
  useEffect(() => {
    createNewNativeAd();
  }, [createNewNativeAd]);

  // Load native ad
  const loadAd = useCallback(() => {
    nativeAd?.loadAd()
  }, [nativeAd])

  // Destroy native
  const destroyAd = useCallback(() => {
    nativeAd?.destroyAd();

    setIsAdLoaded(false); // Reset the `isAdLoaded` state
    createNewNativeAd(); // Create a new ad instance
    setnativeAdKey(prevKey => prevKey + 1); // Increment the key to force remount of the view component
  }, [nativeAd])

  return (
    <View>
      <Text style={[styles.title]}>Native Ad</Text>
      <View style={styles.horizontalSpaceBetween}>
        <HighlightButton buttonText={'Load Native Ad'} onPress={loadAd} />
        <HighlightButton buttonText={'Destroy Native Ad'} onPress={destroyAd} />
      </View>
      {nativeAd && (
        // Initialize native ad view widget with native ad
        <LevelPlayNativeAdView
        key={nativeAdKey}
          nativeAd={nativeAd} // Native ad object
          templateType={LevelPlayTemplateType.Medium} // Built-in native ad template(not required when implementing custom template)
          style={[styles.nativeAd, { display: isAdLoaded ? 'flex' : 'none' }]} // Ad styling
        />
      )}
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
  scrollView: {
    flex: 1,
  },
  scrollViewContent: {
    flexGrow: 1,
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
  nativeAd: {
    width: '100%',
    height: 350,
    alignSelf: 'center',
    marginBottom: 40
  },
})
