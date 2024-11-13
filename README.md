# ironSource React-Native Plugin

A bridge for ironSource SDK

- [ironSource Knowledge Center](https://developers.is.com/)
- [Android SDK](https://developers.ironsrc.com/ironsource-mobile/android/android-sdk/)
- [iOS SDK](https://developers.ironsrc.com/ironsource-mobile/ios/ios-sdk/)
- [React-Native Plugin](https://developers.is.com/ironsource-mobile/react-native/react-native-plugin-integration/)

# Getting Started

## Prerequisites

Please refer to the [ReactNative official page](https://reactnative.dev/docs/environment-setup) for environment setup.

## Installation

```shell
npm install ironsource-mediation
# or
yarn add ironsource-mediation
```

## Platform Setup

### Android

- Follow [ironSource Knowledge Center](https://developers.ironsrc.com/ironsource-mobile/android/android-sdk/) Android integration guide for required settings.

### Gradle Dependencies Included

- ironSource SDK

### Gradle Dependencies Required

- Play Services dependencies must be added to PROJECT_ROOT/android/app/build.gradle.

```groovy
// PROJECT_ROOT/android/app/build.gradle
dependencies {
  implementation 'com.google.android.gms:play-services-appset:16.0.2'
  implementation 'com.google.android.gms:play-services-ads-identifier:18.0.1'
  implementation 'com.google.android.gms:play-services-basement:18.3.0'
}
```

### iOS

- Follow [ironSource Knowledge Center](https://developers.ironsrc.com/ironsource-mobile/ios/ios-sdk/) iOS integration guide for required settings.

### Pods Included

- ironSource SDK

### Additional Requirements

#### <ins>SKAdNetwork Support</ins>

- Add the SKAN IDs of your ad networks on your PROJECT_ROOT/ios/PROJECT_NAME/info.plist
- Get the list of IDs using our [SKAdNetwork IDs Manager](https://developers.is.com/ironsource-mobile/ios/managing-skadnetwork-ids/)

```xml
<key>SKAdNetworkItems</key>
<array>
  <dict>
    <key>SKAdNetworkIdentifier</key>
    <string>su67r6k2v3.skadnetwork</string>
  </dict>
  ...
</array>
```

#### <ins>App Transport Security Settings</ins>

Set [NSAllowsArbitraryLoads](https://developer.apple.com/documentation/bundleresources/information_property_list/nsapptransportsecurity/nsallowsarbitraryloads): `true` on info.plist to allow http as some mediated networks require http calls. (Note: ironSource Network calls are all encrypted.)

Note:

- Make sure that your info.plist does not contain other ATS exceptions such as [NSAllowsArbitraryLoadsInWebContent](https://developer.apple.com/documentation/bundleresources/information_property_list/nsapptransportsecurity/nsallowsarbitraryloadsinwebcontent).

```xml
<key>NSAppTransportSecurity</key>
<dict>
  <key>NSAllowsArbitraryLoads</key>
  <true/>
</dict>
```

#### <ins>App Tracking Transparency (ATT) Prompt</ins>

Implement the ATT prompt to request user authorization for app-related data.

Note:

- This is not part of ironSource SDK but a bridge for `AppTrackingTransparency ATTrackingManager`.
- You have to add `NSUserTrackingUsageDescription` to your info.plist if you intend to call this API.

```typescript
async function checkATT() {
  if (Platform.OS !== 'ios') return

  const currentStatus = await ATTrackingManager.getTrackingAuthorizationStatus()
  console.log(`ATTStatus: ${currentStatus}`)

  if (currentStatus === ATTStatus.NotDetermined) {
    const returnedStatus =
      await ATTrackingManager.requestTrackingAuthorization()
    console.log(`ATTStatus returned: ${returnedStatus}`)
  }
}
```

Read more about Apple's ATT and user privacy guideline [here](https://developer.apple.com/app-store/user-privacy-and-data-use/).

## General Usage

### Implement Listeners

Note:

- Only one listener can be registered. When `setListener` is called, the listener previously registered to the event will be removed.

#### LevelPlayRewardedVideoListener
```typescript
import { IronSource } from 'ironsource-mediation'

function SomeComponent() {
  useEffect(() => {
    const listener: LevelPlayRewardedVideoListener = {
      onAdAvailable: (adInfo: IronSourceAdInfo) => {},
      onAdUnavailable: () => {},
      onAdOpened: (adInfo: IronSourceAdInfo) => {},
      onAdClosed: (adInfo: IronSourceAdInfo) => {},
      onAdRewarded: (placement: IronSourceRVPlacement, adInfo: IronSourceAdInfo) => {},
      onAdShowFailed: (error: IronSourceError, adInfo: IronSourceAdInfo) => {},
      onAdClicked: (placement: IronSourceRVPlacement, adInfo: IronSourceAdInfo) => {},
    };
    IronSource.setLevelPlayRewardedVideoListener(listener);
  }, [])

  // return some view
}
```

#### LevelPlayInterstitialAdListener
```typescript
function SomeComponent() {
  useEffect(() => {
    const listener: LevelPlayInterstitialAdListener = {
      onAdLoaded: (adInfo: LevelPlayAdInfo) => {},
      onAdLoadFailed: (error: LevelPlayAdError) => {},
      onAdInfoChanged: (adInfo: LevelPlayAdInfo) => {},
      onAdDisplayed: (adInfo: LevelPlayAdInfo) => {},
      onAdDisplayFailed: (error: LevelPlayAdError, adInfo: LevelPlayAdInfo) => {},
      onAdClicked: (adInfo: LevelPlayAdInfo) => {},
      onAdClosed: (adInfo: LevelPlayAdInfo) => {}
    }
    // Use listener ...
  }, [])

  // return some view
}
```

#### LevelPlayBannerAdViewListener
```typescript
function SomeComponent() {
  useEffect(() => {
    const listener: LevelPlayBannerAdViewListener = {
        onAdLoaded: (adInfo: LevelPlayAdInfo) => {},
        onAdLoadFailed: (error: LevelPlayAdError) => {},
        onAdDisplayed: (adInfo: LevelPlayAdInfo) => {},
        onAdDisplayFailed: (adInfo: LevelPlayAdInfo, error: LevelPlayAdError) => {},
        onAdClicked: (adInfo: LevelPlayAdInfo) => {},
        onAdExpanded: (adInfo: LevelPlayAdInfo) => {},
        onAdCollapsed: (adInfo: LevelPlayAdInfo) => {},
        onAdLeftApplication: (adInfo: LevelPlayAdInfo) => {},
      };
    // Use listener ...  
  }, [])

  // return some view
}
```

#### LevelPlayNativeAdListener
```typescript
import { IronSource } from 'ironsource-mediation'

function SomeComponent() {
  useEffect(() => {
    const listener: LevelPlayNativeAdListener = {
      onAdLoaded: (nativeAd: LevelPlayNativeAd, adInfo: IronSourceAdInfo) => {},
      onAdLoadFailed: (nativeAd: LevelPlayNativeAd, error: IronSourceError) => {},
      onAdClicked: (nativeAd: LevelPlayNativeAd, adInfo: IronSourceAdInfo) => {},
      onAdImpression: (nativeAd: LevelPlayNativeAd, adInfo: IronSourceAdInfo) => {},
    };
    // Add the listener to the LevelPlayNativeAd instance...
  }, [])

  // return some view
}
```

### Initialize the plugin

```typescript
async function initLevelPlay() {
  let initRequest: LevelPlayInitRequest = LevelPlayInitRequest.builder(APP_KEY)
      .withLegacyAdFormats([AdFormat.BANNER, AdFormat.INTERSTITIAL, AdFormat.REWARDED, AdFormat.NATIVE_AD])
      .build();
    const initListener: LevelPlayInitListener = {
      onInitFailed: (error: LevelPlayInitError) => {},
      onInitSuccess: (configuration: LevelPlayConfiguration) => {}
    }
    await LevelPlay.init(initRequest, initListener)
}
```

### Show Ads Example

#### LevelPlayRewardedVideo
```typescript
const showRewardedVideo = async () => {
  if (await IronSource.isRewardedVideoAvailable()) {
    IronSource.showRewardedVideo();
  }
}
```

#### LevelPlayInterstitial

```typescript
const SomeComponent: React.FC = () => {
  const [interstitialAd, setInterstitialAd] = useState<LevelPlayInterstitialAd | null>()

  useEffect(() => {
    const levelPlayInterstitialAd = new LevelPlayInterstitialAd([YOUR_AD_UNIT]);
    levelPlayInterstitialAd.setListener([YOUR_LISTENER]);
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
        await interstitialAd!.showAd([YOUR_PLACEMENT]);
    }
  };

  /// Rest of component, return some view ...
```

#### LevelPlayBanner

```typescript
const SomeComponent: React.FC = () => {
  // State to manage the reference to the banner ad view
  const bannerAdViewRef = useRef<LevelPlayBannerAdViewMethods>(null);

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
        adUnitId={[YOUR_AD_UNIT]}
        adSize={[YOUR_LEVEL_PLAY_AD_SIZE]}
        placementName={[YOUR_PLACEMENT]}
        listener={[YOUR_LISTENER]}
        style={{width: adSize.width, height: adSize.height, alignSelf: 'center'}} // Use the values from the LevelPlayAdSize instance
      />
    </View>
  );
};
```

#### LevelPlayNativeAd
```typescript
export const LevelPlayNativeAdSection = () => {
  const [nativeAd, setNativeAd] = useState<LevelPlayNativeAd | null>()
  const [adKey, setAdKey] = useState<number>(0);

  // LevelPlay NativeAd listener
  const listener: LevelPlayNativeAdListener = {
    onAdLoaded: (nativeAd: LevelPlayNativeAd, adInfo: IronSourceAdInfo) => {
      setNativeAd(nativeAd);
    },
    onAdLoadFailed: (nativeAd: LevelPlayNativeAd, error: IronSourceError) => {},
    onAdClicked: (nativeAd: LevelPlayNativeAd, adInfo: IronSourceAdInfo) => {},
    onAdImpression: (nativeAd: LevelPlayNativeAd, adInfo: IronSourceAdInfo) => {},
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

  // Rest of the class
```

Refer to the [example app](./example) for the more detailed implementation sample.

Note:

- Make sure to read the official documents at [ironSource Knowledge Center](https://developers.ironsrc.com/ironsource-mobile/android/android-sdk/) for proper usage.
- Some config functions must be called before `IronSource.init`.
- LevelPlayBannerListener is deprecated - Please use LevelPlayBannerAdViewListener with LevelPlayBannerAdView instead.

### Manual Load RV

- On ironSource Mediation, Rewarded Video Load is automatically requested upon `init`
- To enable Rewarded Video Manual Load, call `IronSource.setLevelPlayRewardedManualVideo([YOUR_LISTENER])` <ins>before init</ins>
- Set the manual load rewarded video event listeners before calling `IronSource.loadRewardedVideo()`

```typescript
const listener: LevelPlayRewardedVideoManualListener = {
  onAdOpened: (adInfo: IronSourceAdInfo) => {},
  onAdClosed: (adInfo: IronSourceAdInfo) => {},
  onAdRewarded: (placement: IronSourceRVPlacement, adInfo: IronSourceAdInfo) => {},
  onAdShowFailed: (error: IronSourceError, adInfo: IronSourceAdInfo) => {},
  onAdClicked: (placement: IronSourceRVPlacement, adInfo: IronSourceAdInfo) => {},
  onAdReady: (adInfo: IronSourceAdInfo) => {},
  onAdLoadFailed: () => {},
};
IronSource.setLevelPlayRewardedVideoManualListener(listener);
```

```typescript
const loadRewardedVideo = async () => {
  try {
    await IronSource.loadRewardedVideo()
  } catch (e) {
    console.error(e)
  }
}
```

## Functions Not Supported

Some functions are not supported.

- `initISDemandOnly`
- `setLanguage`
- `SegmentListener: onSegmentReceived`
- `showISDemandOnlyRewardedVideo`
- `loadISDemandOnlyRewardedVideo`
- `isISDemandOnlyRewardedVideoAvailable`
- `loadISDemandOnlyInterstitial`
- `showISDemandOnlyInterstitial`
- `isISDemandOnlyInterstitialReady`

# Mediation

- Many networks require certain additional configuration.
- Make sure to use compatible Adapter versions.

## Android

Make sure to follow [ironSource Knowledge Center](https://developers.ironsrc.com/ironsource-mobile/android/mediation-networks-android/) document for additional setup.

- Add adapter/sdk dependencies to `PROJECT_ROOT/android/app/build.gradle`
- Add required settings to `PROJECT_ROOT/android/app/src/main/AndroidManifest.xml`

## iOS

Make sure to follow [ironSource Knowledge Center](https://developers.ironsrc.com/ironsource-mobile/ios/mediation-networks-ios/) document for additional setup.

- Add adapter/sdk pod dependencies to `PROJECT_ROOT/ios/Podfile`
- Add required settings to `PROJECT_ROOT/ios/APP_NAME/info.plist`

# Example App

Almost all the features are implemented on the [example app](./example). We recommend running it first to see how it works.

```shell
# The plugin project root
cd ironsource-mediation

# Install dependencies
npm install
# or
yarn install

# The example project
cd example

npm install
# or
yarn install

# Run the Android app
npm run android
# or
yarn run android

# Run the iOS app
npm run ios
# or
yarn run ios
```

## Version history 
You can find a summary of the ironSouce SDK version history [here](https://developers.is.com/ironsource-mobile/react-native/sdk-change-log/).

## Contact US 
For any question please contact us [here](https://ironsrc.formtitan.com/knowledge-center#/). 

## License 
https://developers.is.com/ironsource-mobile/general/ironsource-platform-online-terms-conditions/
