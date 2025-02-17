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

/**
 * ARM ImpressionDataListener event
 * The ARM SDK Postbacks flag must be enabled to receive data
 * https://developers.is.com/ironsource-mobile/react-native/impression-level-revenue-integration-react-native/#step-1
 */
function setImpressionDataListener() {
  const impressionListener: ImpressionDataListener = {
    onImpressionSuccess: (data?: ImpressionData) => {
      console.log('ImpressionData: ', data)
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
  console.log('ATTStatus: ', currentStatus)

  if (currentStatus === ATTStatus.NotDetermined) {
    currentStatus = await ATTrackingManager.requestTrackingAuthorization()
    console.log('ATTStatus returned: ', currentStatus)
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

    // This should be enabled to detect network condition errors
    await IronSource.shouldTrackNetworkState(true)

    // Device Identifier
    const advertiserId = await IronSource.getAdvertiserId()
    console.log(`AdvertiserID: ${advertiserId}`)

    // Do not use advertiserId for this.
    // Use an application user id.
    await IronSource.setUserId('userID')

    // Request ATT for iOS
    if (Platform.OS === 'ios') {
      await checkATT()
    }

    let initRequest: LevelPlayInitRequest = LevelPlayInitRequest.builder(
      Platform.OS === 'android' ? '85460dcd' : '8545d445'
    )
      .withLegacyAdFormats([AdFormat.NATIVE_AD])
      .withUserId('userID')
      .build()
    const initListener: LevelPlayInitListener = {
      onInitFailed: (error: LevelPlayInitError) => {
        console.log('onInitFailed ', error)
      },
      onInitSuccess: (configuration: LevelPlayConfiguration) => {
        console.log('onInitSuccess ', configuration)
      },
    }
    await LevelPlay.init(initRequest, initListener)
  } catch (e) {
    console.error(e)
  }
}

export default function App() {
  const adSize = LevelPlayAdSize.BANNER
  const bannerAdViewRef = useRef<LevelPlayBannerAdViewMethods>(null)
  const listener: LevelPlayBannerAdViewListener = {
    onAdLoaded: (adInfo: LevelPlayAdInfo) => {
      console.log('Banner Ad View - onAdLoaded: ', adInfo)
    },
    onAdLoadFailed: (error: LevelPlayAdError) => {
      console.error('Banner Ad View - onAdLoadFailed: ', error)
    },
    onAdDisplayed: (adInfo: LevelPlayAdInfo) => {
      console.log('Banner Ad View - onAdDisplayed: ', adInfo)
    },
    onAdDisplayFailed: (adInfo: LevelPlayAdInfo, error: LevelPlayAdError) => {
      console.error('Banner Ad View - onAdDisplayFailed: ', {
        adInfo,
        error,
      })
    },
    onAdClicked: (adInfo: LevelPlayAdInfo) => {
      console.log('Banner Ad View - onAdClicked: ', adInfo)
    },
    onAdExpanded: (adInfo: LevelPlayAdInfo) => {
      console.log('Banner Ad View - onAdExpanded: ', adInfo)
    },
    onAdCollapsed: (adInfo: LevelPlayAdInfo) => {
      console.log('Banner Ad View - onAdCollapsed: ', adInfo)
    },
    onAdLeftApplication: (adInfo: LevelPlayAdInfo) => {
      console.log('Banner Ad View - onAdLeftApplication: ', adInfo)
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
    bannerAdViewRef.current?.loadAd()
  }, [])

  const destroyBannerAd = useCallback(() => {
    bannerAdViewRef.current?.destroy()
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
          <LevelPlayBannerAdViewSection
            onLoadBanner={loadBannerAd}
            onDestroyBanner={destroyBannerAd}
          />
          <LevelPlayNativeAdViewSection />
        </View>

        {/* Position banner on bottom of the screen */}
        <LevelPlayBannerAdView
          ref={bannerAdViewRef}
          adUnitId={
            Platform.OS === 'android' ? 'thnfvcsog13bhn08' : 'iep3rxsyp9na3rw8'
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
    new LevelPlayRewardedAd(
      Platform.OS === 'android' ? '76yy3nay3ceui2a3' : 'qwouvdrkuwivay5q'
    )
  )
  const [isRewardedAvailable, setIsRewardedAvailable] = useState<boolean>(false)
  const listener: LevelPlayRewardedAdListener = {
    onAdLoaded: (adInfo: LevelPlayAdInfo) => {
      console.log('Rewarded Ad - onAdLoaded:', adInfo)
      setIsRewardedAvailable(true)
    },
    onAdLoadFailed: (error: LevelPlayAdError) => {
      console.error('Rewarded Ad - onAdLoadFailed:', error)
      setIsRewardedAvailable(false)
    },
    onAdInfoChanged: (adInfo: LevelPlayAdInfo) => {
      console.log('Rewarded Ad - onAdInfoChanged:', adInfo)
    },
    onAdDisplayed: (adInfo: LevelPlayAdInfo) => {
      console.log('Rewarded Ad - onAdDisplayed:', adInfo)
    },
    onAdDisplayFailed: (error: LevelPlayAdError, adInfo: LevelPlayAdInfo) => {
      console.error('Rewarded Ad - onAdDisplayFailed:', {
        error,
        adInfo,
      })
    },
    onAdClicked: (adInfo: LevelPlayAdInfo) => {
      console.log('Rewarded Ad - onAdClicked:', adInfo)
    },
    onAdClosed: (adInfo: LevelPlayAdInfo) => {
      console.log('Rewarded Ad - onAdClosed:', adInfo)
      setIsRewardedAvailable(false)
    },
    onAdRewarded: (reward: LevelPlayReward, adInfo: LevelPlayAdInfo) => {
      console.log('Rewarded Ad - onAdRewarded:', {
        reward,
        adInfo,
      })
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
    new LevelPlayInterstitialAd(
      Platform.OS == 'android' ? 'aeyqi3vqlv6o8sh9' : 'wmgt0712uuux8ju4'
    )
  )
  const [isInterstitialAvailable, setIsInterstitialAvailable] =
    useState<boolean>(false)
  const listener: LevelPlayInterstitialAdListener = {
    onAdLoaded: (adInfo: LevelPlayAdInfo) => {
      console.log('Interstitial Ad - onAdLoaded:', adInfo)
      setIsInterstitialAvailable(true)
    },
    onAdLoadFailed: (error: LevelPlayAdError) => {
      console.error('Interstitial Ad - onAdLoadFailed:', error)
      setIsInterstitialAvailable(false)
    },
    onAdInfoChanged: (adInfo: LevelPlayAdInfo) => {
      console.log('Interstitial Ad - onAdInfoChanged:', adInfo)
    },
    onAdDisplayed: (adInfo: LevelPlayAdInfo) => {
      console.log('Interstitial Ad - onAdDisplayed:', adInfo)
    },
    onAdDisplayFailed: (error: LevelPlayAdError, adInfo: LevelPlayAdInfo) => {
      console.error('Interstitial Ad - onAdDisplayFailed:', {
        error,
        adInfo,
      })
    },
    onAdClicked: (adInfo: LevelPlayAdInfo) => {
      console.log('Interstitial Ad - onAdClicked:', adInfo)
    },
    onAdClosed: (adInfo: LevelPlayAdInfo) => {
      console.log('Interstitial Ad - onAdClosed:', adInfo)
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

interface LevelPlayBannerAdViewSectionProps {
  onLoadBanner: () => void
  onDestroyBanner: () => void
}

const LevelPlayBannerAdViewSection: React.FC<
  LevelPlayBannerAdViewSectionProps
> = ({ onLoadBanner, onDestroyBanner }) => {
  return (
    <View>
      <Text style={[styles.title]}>Banner Ad View</Text>
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

const LevelPlayNativeAdViewSection = () => {
  const [nativeAd, setNativeAd] = useState<LevelPlayNativeAd | null>()
  const [isAdLoaded, setIsAdLoaded] = useState<boolean>(false)
  const [adViewKey, setAdViewKey] = useState<number>(0); // Key for refreshing the component

  const createNewNativeAd = useCallback(() => {
    const listener: LevelPlayNativeAdListener = {
      onAdLoaded: (nativeAd: LevelPlayNativeAd, adInfo: IronSourceAdInfo) => {
        console.log('Native Ad View - onAdLoaded: ', { nativeAd, adInfo });
        setNativeAd(nativeAd);
        setIsAdLoaded(true);
      },
      onAdLoadFailed: (nativeAd: LevelPlayNativeAd, error: IronSourceError) => {
        console.error('Native Ad View - onAdLoadFailed:', { nativeAd, error });
      },
      onAdClicked: (nativeAd: LevelPlayNativeAd, adInfo: IronSourceAdInfo) => {
        console.log('Native Ad View - onAdClicked: ', { nativeAd, adInfo });
      },
      onAdImpression: (nativeAd: LevelPlayNativeAd, adInfo: IronSourceAdInfo) => {
        console.log('Native Ad View - onAdImpression: ', { nativeAd, adInfo });
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
    setAdViewKey(prevKey => prevKey + 1); // Increment the key to force remount of the view component
  }, [nativeAd])

  return (
    <View>
      <Text style={[styles.title]}>Native Ad View</Text>
      <View style={styles.horizontalSpaceBetween}>
        <HighlightButton buttonText={'Load Native Ad'} onPress={loadAd} />
        <HighlightButton buttonText={'Destroy Native Ad'} onPress={destroyAd} />
      </View>
      {nativeAd && (
        // Initialize native ad view widget with native ad
        <LevelPlayNativeAdView
        key={adViewKey}
          nativeAd={nativeAd} // Native ad object
          templateType={LevelPlayTemplateType.Medium} // Built-in native ad template(not required when implementing custom template)
          style={[styles.nativeAd, { display: isAdLoaded ? 'flex' : 'none' }]} // Ad styling
        />
      )}
    </View>
  )
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
