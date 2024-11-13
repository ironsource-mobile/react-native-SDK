import React, {useCallback, useEffect, useRef, useState} from 'react'
import {
  Alert,
  AppState,
  type AppStateStatus,
  Image,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
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
  type IronSourceRVPlacement,
  type LevelPlayRewardedVideoListener,
  type ConsentViewListener,
  type ConsentViewError,
  type LevelPlayBannerAdViewListener,
  LevelPlayAdSize,
  LevelPlayBannerAdView,
  type LevelPlayBannerAdViewMethods,
} from 'ironsource-mediation';
import { e, p, prettyJSON, showAlert } from './util';
import HighlightButton from './HighlightButton';

const APP_USER_ID = 'some-unique-application-user-id';
const APP_KEY = Platform.OS === 'android' ? '1dc3db545' : '1dc3deecd';
const INTERSTITIAL_AD_UNIT_ID = Platform.OS === 'android' ? '71tj8zbmfozim5nd' : 'v3fn8t0yhk0awqsm';
const BANNER_AD_UNIT_ID = Platform.OS === 'android' ? 'iq2gxli4u8n10jrp' : 'pfhu8mrg1arqwlo8';

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

    let initRequest: LevelPlayInitRequest = LevelPlayInitRequest.builder(APP_KEY)
      .withLegacyAdFormats([AdFormat.BANNER, AdFormat.INTERSTITIAL, AdFormat.REWARDED, AdFormat.NATIVE_AD])
      .build();
    const initListener: LevelPlayInitListener = {
      onInitFailed: (error: LevelPlayInitError) => {
        p(`onInitFailed: ${prettyJSON(error)}`);
      },
      onInitSuccess: (configuration: LevelPlayConfiguration) => {
        p(`onInitSuccess: ${prettyJSON(configuration)}`);
      }
    }
    await LevelPlay.init(initRequest, initListener)
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
          <View style={styles.wrapper}>
            <Image
              source={require('./assets/images/iron_logo.png')}
              style={styles.image}
            />
            <Text style={styles.text}>for ReactNative</Text>
          </View>
          <LevelPlayRewardedVideoSection />
          <LevelPlayInterstitialAdSection />
          <LevelPlayBannerAdViewSection />
          <LevelPlayNativeAdViewSection />
          {Platform.OS === 'ios' && <IOSSection />}
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

//////////////////// LevelPlay Rewarded Video Setion ////////////////////
const REWARDED_VIDEO_PLACEMENT = 'YOUR_PLACEMENT'

function LevelPlayRewardedVideoSection() {
  const [isRewardedVideoAvailable, setIsRewardedVideoAvailable] = useState<boolean>(false)
  const [isRewardedVideoVisible, setIsRewardedVideoVisible] = useState<boolean>(false)
  // [context, placement]
  const [reservedPlacement, setReservedPlacement] = useState<IronSourceRVPlacement | undefined>(undefined)

  // Rewarded Video Event listeners setup
  // depend on the placement state
  useEffect(() => {    
    const listener: LevelPlayRewardedVideoListener = {
        onAdAvailable: (adInfo: IronSourceAdInfo) => {
          p(`Rewarded Video Ad - onAdAvailable: ${prettyJSON(adInfo)}`)
          setIsRewardedVideoAvailable(true)
        },
        onAdUnavailable: () => {
          p(`Rewarded Video Ad - onAdUnavailable`)
          setIsRewardedVideoAvailable(false)
        },
        onAdOpened: (adInfo: IronSourceAdInfo) => {
          p(`Rewarded Video Ad - onAdOpened: ${prettyJSON(adInfo)}`)
          setIsRewardedVideoVisible(true)
          setIsRewardedVideoAvailable(false);
        },
        onAdClosed: (adInfo: IronSourceAdInfo) => {
          p(`Rewarded Video Ad - onAdClosed: ${prettyJSON(adInfo)}`)
          if (reservedPlacement !== undefined) {
            showAlert('Ad Rewarded', [
              `placement: ${prettyJSON(reservedPlacement)}`,
            ])
            setReservedPlacement(undefined)
          }
          setIsRewardedVideoVisible(false)
        },
        onAdRewarded: (placement: IronSourceRVPlacement, adInfo: IronSourceAdInfo) => {
          p(
            `Rewarded Video Ad - onAdRewarded\n` +
              ` placement: ${prettyJSON(placement)}\n` +
              ` adInfo: ${prettyJSON(adInfo)}`
          )
          if (!isRewardedVideoVisible) {
            showAlert('Ad Rewarded', [`placement: ${prettyJSON(placement)}`])
            setReservedPlacement(undefined)
          } else {
            setReservedPlacement(placement)
          }
        },
        onAdShowFailed: (error: IronSourceError, adInfo: IronSourceAdInfo) => {
          p(
            `Rewarded Video Ad - onAdShowFailed\n` +
              ` error: ${prettyJSON(error)}\n` +
              ` adInfo: ${prettyJSON(adInfo)}`
          )
          setIsRewardedVideoVisible(false)
        },
        onAdClicked: (placement: IronSourceRVPlacement, adInfo: IronSourceAdInfo) => {
          p(
            `Rewarded Video Ad - onAdClicked\n` +
              ` placement: ${prettyJSON(placement)}\n` +
              ` adInfo: ${prettyJSON(adInfo)}`
          )        
        }
    };
    IronSource.setLevelPlayRewardedVideoListener(listener);
  }, [isRewardedVideoVisible, reservedPlacement])

  const setServerParams = async () => {
    const params = { currentTime: Date.now().toString() }
    await IronSource.setRewardedVideoServerParams(params)
    showAlert('Set Rewarded Video Server Params', [prettyJSON(params)])
  }
  
  const clearServerParams = () => {
    IronSource.clearRewardedVideoServerParams()
  }
  
  const getPlacementInfo = async () => {
    const placement = await IronSource.getRewardedVideoPlacementInfo(REWARDED_VIDEO_PLACEMENT)
    p(`placement info: ${prettyJSON(placement)}`)
    showAlert('Placement Info', [prettyJSON(placement)])
  }
  
  const showRewardedVideo = async () => {
    p('Show Rewarded Video Click')
    if (await IronSource.isRewardedVideoAvailable()) {
      // Show by placement
      const isCapped = await IronSource.isRewardedVideoPlacementCapped(
        REWARDED_VIDEO_PLACEMENT
      )
      if (!isCapped) {
        IronSource.showRewardedVideo(REWARDED_VIDEO_PLACEMENT)
      } else {
        showAlert('Rewarded Video Placement', [`${REWARDED_VIDEO_PLACEMENT} is capped`])
      }
    } else {
      e('Rewarded Video is not available')
    }
  }

  return (
    <View>
      <Text style={[styles.h2, styles.alignCenter]}>
        Rewarded Video
      </Text>
      <HighlightButton
        onPress={showRewardedVideo}
        buttonText="Show Rewarded Video"
        isDisabled={!isRewardedVideoAvailable}
      />
      <HighlightButton
        onPress={getPlacementInfo}
        buttonText="Get Rewarded Video Placement Info"
      />
      <View style={styles.horizontalSpaceBetween}>
        <HighlightButton
          onPress={setServerParams}
          buttonText="Set Rewarded Video ServerParams"
        />
        <HighlightButton
          onPress={clearServerParams}
          buttonText="Clear Rewarded Video ServerParams"
        />
      </View>
    </View>
  )
}

//////////////////// LevelPlay Interstitial Ad Section ////////////////////
const LevelPlayInterstitialAdSection: React.FC = () => {
  const [interstitialAd, setInterstitialAd] = useState<LevelPlayInterstitialAd | null>()
  const [isInterstitialAvailable, setIsInterstitialAvailable] = useState<boolean>(false)
  const listener: LevelPlayInterstitialAdListener = {
    onAdLoaded: (adInfo: LevelPlayAdInfo) => {
      p('Interstitial Ad Ad loaded:', adInfo);
      setIsInterstitialAvailable(true);
    },
    onAdLoadFailed: (error: LevelPlayAdError) => {
      e('Interstitial Ad Ad load failed:', error);
      setIsInterstitialAvailable(false);
    },
    onAdInfoChanged: (adInfo: LevelPlayAdInfo) => {
      p('Interstitial Ad Ad info changed:', adInfo);
    },
    onAdDisplayed: (adInfo: LevelPlayAdInfo) => {
      p('Interstitial Ad Ad displayed:', adInfo);
    },
    onAdDisplayFailed: (error: LevelPlayAdError, adInfo: LevelPlayAdInfo) => {
      e('Interstitial Ad Ad display failed:', error, adInfo);
    },
    onAdClicked: (adInfo: LevelPlayAdInfo) => {
      p('Interstitial Ad Ad clicked:', adInfo);
    },
    onAdClosed: (adInfo: LevelPlayAdInfo) => {
      p('Interstitial Ad Ad closed:', adInfo);
    }
  };

  useEffect(() => {
    const levelPlayInterstitialAd = new LevelPlayInterstitialAd(INTERSTITIAL_AD_UNIT_ID);
    levelPlayInterstitialAd.setListener(listener);
    setInterstitialAd(levelPlayInterstitialAd);
  }, []);

  const loadAd = async () => {
    try {
      await interstitialAd?.loadAd();
    } catch (error) {
      console.error('Failed to load ad:', error);
    }
  };

  const showAd = async () => {
    if (await interstitialAd?.isAdReady()) {
      try {
        await interstitialAd!.showAd("");
      } catch (error) {
        console.error('Failed to show ad:', error);
      }
    } else {
      Alert.alert('Ad Status', 'Ad is not ready yet');
    }
  };

  return (
    <View>
      <Text style={[styles.h2, styles.alignCenter]}>
        Interstitial Ad
      </Text>
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

//////////////////// LevelPlay Banner Ad View Section ////////////////////
const LevelPlayBannerAdViewSection: React.FC = () => {
  // State to manage the reference to the banner ad view
  const bannerAdViewRef = useRef<LevelPlayBannerAdViewMethods>(null);
  const [adKey, setAdKey] = useState<number>(0);
  const adSize = LevelPlayAdSize.BANNER

  // LevelPlay Banner Ad View listener
  const listener: LevelPlayBannerAdViewListener = {
    onAdLoaded: (adInfo: LevelPlayAdInfo) => {
      p('Banner Ad View - Ad Loaded: ', adInfo);
    },
    onAdLoadFailed: (error: LevelPlayAdError) => {
      e('Banner Ad View - Ad Load Failed: ', error);
    },
    onAdDisplayed: (adInfo: LevelPlayAdInfo) => {
      p('Banner Ad View - Ad Displayed: ', adInfo);
    },
    onAdDisplayFailed: (adInfo: LevelPlayAdInfo, error: LevelPlayAdError) => {
      e('Banner Ad View - Ad Display Failed: ', adInfo, error);
    },
    onAdClicked: (adInfo: LevelPlayAdInfo) => {
      p('Banner Ad View - Ad Clicked: ', adInfo);
    },
    onAdExpanded: (adInfo: LevelPlayAdInfo) => {
      p('Banner Ad View - Ad Expanded: ', adInfo);
    },
    onAdCollapsed: (adInfo: LevelPlayAdInfo) => {
      p('Banner Ad View - Ad Collapsed: ', adInfo);
    },
    onAdLeftApplication: (adInfo: LevelPlayAdInfo) => {
      p('Banner Ad View - Ad Left Application: ', adInfo);
    },
  };

  // Load ad
  const loadAd = useCallback(() => {
    bannerAdViewRef.current?.loadAd();
  }, []);


  const destroyAdAndCreateNew = useCallback(() => {
    bannerAdViewRef.current?.destroy();
    setAdKey((prevKey) => prevKey + 1);
  }, []);

  const pauseAutoRefresh = useCallback(() => {
    bannerAdViewRef.current?.pauseAutoRefresh();
  }, []);

  const resumeAutoRefresh = useCallback(() => {
    bannerAdViewRef.current?.resumeAutoRefresh();
  }, []);

  return (
    <View>
      <Text style={[styles.h2, styles.alignCenter]}>
        Banner Ad View
      </Text>
      <View style={styles.horizontalSpaceBetween}>
        <HighlightButton buttonText={'Load Ad'} onPress={loadAd} />
        <HighlightButton buttonText={'Destroy Ad'} onPress={destroyAdAndCreateNew} />
      </View>
      <View style={styles.horizontalSpaceBetween}>
        <HighlightButton buttonText={'Pause Auto Refresh'} onPress={pauseAutoRefresh} />
        <HighlightButton buttonText={'Resume Auto Refresh'} onPress={resumeAutoRefresh} />
      </View>
      <LevelPlayBannerAdView 
        ref={bannerAdViewRef}
        key={adKey}
        adUnitId={BANNER_AD_UNIT_ID}
        adSize={adSize}
        placementName=''
        listener={listener}
        style={{width: adSize.width, height: adSize.height, alignSelf: 'center'}}
      />
    </View>
  );
};

//////////////////// LevelPlay Native Ad View Section ////////////////////
const LevelPlayNativeAdViewSection = () => {
  const [nativeAd, setNativeAd] = useState<LevelPlayNativeAd | null>()
  const [adKey, setAdKey] = useState<number>(0);

  // LevelPlay NativeAd listener
  const listener: LevelPlayNativeAdListener = {
    onAdLoaded: (nativeAd: LevelPlayNativeAd, adInfo: IronSourceAdInfo) => {
      p('Native Ad View - onAdLoaded: ', nativeAd);
      setNativeAd(nativeAd);
    },
    onAdLoadFailed: (nativeAd: LevelPlayNativeAd, error: IronSourceError) => {
      e('Native Ad View - onAdLoadFailed: ', error);
    },
    onAdClicked: (nativeAd: LevelPlayNativeAd, adInfo: IronSourceAdInfo) => {
      p('Native Ad View - onAdClicked: ', nativeAd);
    },
    onAdImpression: (nativeAd: LevelPlayNativeAd, adInfo: IronSourceAdInfo) => {
      p('Native Ad View - onAdImpression: ', nativeAd);
    },
  };

  useEffect(() => {
    createNativeAd();
  }, []);

  // Initialize native ad object
  const createNativeAd = useCallback(() => {
    const levelPlayNativeAd = LevelPlayNativeAd.builder()
      .withPlacement('DefaultNativeAd') // Your placement name string
      .withListener(listener) // Your level play native ad listener
      .build();
    setNativeAd(levelPlayNativeAd);
  }, [])

  // Load native ad
  const loadAd = useCallback(() => {
    nativeAd?.loadAd();
  }, [nativeAd]);


  // Destroy current native ad and create new instances of LevelPlayNativeAd and LevelPlayNativeAdView.
  const destroyAdAndCreateNew = useCallback(() => {
    if (nativeAd == null) return;

    nativeAd?.destroyAd();
    createNativeAd();
    setAdKey((prevKey) => prevKey + 1);
  }, [nativeAd]);

  return (
    <View>
      <Text style={[styles.h2, styles.alignCenter]}>
        Native Ad
      </Text>
      <HighlightButton buttonText={'Load Native Ad'} onPress={loadAd} />
      <HighlightButton buttonText={'Destroy Native Ad'} onPress={destroyAdAndCreateNew} />
      {nativeAd && 
        // Initialize native ad view widget with native ad
        <LevelPlayNativeAdView
            key={adKey} // Unique key to force recreation of component
            style={styles.native_ad} // Ad styling
            nativeAd={nativeAd} // Native ad object
            templateType={LevelPlayTemplateType.Medium} // Built-in native ad template(not required when implementing custom template)
          />
        }
    </View>
  );
};

//////////////////// IOS Section ////////////////////
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
    <View>
      <Text style={[styles.h2, styles.alignCenter]}>iOS 14</Text>
      <HighlightButton onPress={getCV} buttonText="Get Conversion Value" />
      <HighlightButton
        onPress={loadAndShowConsentView}
        buttonText="Show ConsentView"
      />
    </View>
  )
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: 'white',
  },
  body: {
    backgroundColor: 'white',
  },
  container: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'center',
    padding: 12,
  },
  wrapper: { padding: 8 },
  image: { width: '100%', resizeMode: 'contain' },
  text: { position: 'absolute', bottom: 0, right: 8 },
  horizontalSpaceBetween: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  alignCenter: {
    textAlign: 'center',
  },
  h2: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'black'
  },
  native_ad: {
    height: 350, // Your chosen height
    width: '100%', // Your chosen width
    // More styling ...
  }
})
