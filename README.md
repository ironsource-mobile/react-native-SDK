# Unity LevelPlay React-Native Plugin

A bridge for LevelPlay SDK

- [LevelPlay documentation](https://docs.unity.com/en-us/grow/levelplay)
- [Android SDK](https://docs.unity.com/en-us/grow/levelplay/sdk/android/sdk-integration)
- [iOS SDK](https://docs.unity.com/en-us/grow/levelplay/sdk/ios/sdk-integration)
- [React Native Plugin](https://docs.unity.com/en-us/grow/levelplay/sdk/react/plugin-integration)

# Getting Started

## Prerequisites

Please refer to the [ReactNative official page](https://reactnative.dev/docs/environment-setup) for environment setup.

Requirements:

- **Android**: build your app with Kotlin 2.0 or higher (the default from React Native 0.77). The LevelPlay Android SDK depends on `kotlin-stdlib` 2.1.x.
- **iOS**: build your app with Xcode 26 or higher, with a minimum deployment target of iOS 13.

## Installation

```shell
npm install unity-levelplay-mediation
# or
yarn add unity-levelplay-mediation
```

## Platform Setup

### Android

- Follow the [LevelPlay Android integration guide](https://docs.unity.com/en-us/grow/levelplay/sdk/android/sdk-integration) for required settings.

### Gradle Dependencies Included

- LevelPlay SDK

### Gradle Dependencies Required

- Play Services dependencies must be added to PROJECT_ROOT/android/app/build.gradle.

```groovy
// PROJECT_ROOT/android/app/build.gradle
dependencies {
  implementation 'com.google.android.gms:play-services-appset:16.0.2'
  implementation 'com.google.android.gms:play-services-ads-identifier:18.0.1'
}
```

### iOS

- Follow the [LevelPlay iOS integration guide](https://docs.unity.com/en-us/grow/levelplay/sdk/ios/sdk-integration) for required settings.

### Pods Included

- LevelPlay SDK

### Additional Requirements

#### <ins>SKAdNetwork Support</ins>

- Add the SKAN IDs of your ad networks on your PROJECT_ROOT/ios/PROJECT_NAME/info.plist
- Get the list of IDs using our [SKAdNetwork IDs Manager](https://docs.unity.com/en-us/grow/levelplay/sdk/react/skadnetwork-id-manager)

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

Set [NSAllowsArbitraryLoads](https://developer.apple.com/documentation/bundleresources/information_property_list/nsapptransportsecurity/nsallowsarbitraryloads): `true` on info.plist to allow http as some mediated networks require http calls. (Note: LevelPlay Network calls are all encrypted.)

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

- This is not part of LevelPlay SDK but a bridge for `AppTrackingTransparency ATTrackingManager`.
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

#### LevelPlayRewardedAdListener
```typescript
function SomeComponent() {
  useEffect(() => {
    const listener: LevelPlayRewardedAdListener = {
      onAdLoaded: (adInfo: LevelPlayAdInfo) => {},
      onAdLoadFailed: (error: LevelPlayAdError) => {},
      onAdInfoChanged: (adInfo: LevelPlayAdInfo) => {},
      onAdDisplayed: (adInfo: LevelPlayAdInfo) => {},
      onAdDisplayFailed: (error: LevelPlayAdError, adInfo: LevelPlayAdInfo) => {},
      onAdClicked: (adInfo: LevelPlayAdInfo) => {},
      onAdClosed: (adInfo: LevelPlayAdInfo) => {},
      onAdRewarded: (reward: LevelPlayReward, adInfo: LevelPlayAdInfo) => {}
    }
    // Use listener ...
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
function SomeComponent() {
  useEffect(() => {
    const listener: LevelPlayNativeAdListener = {
      onAdLoaded: (nativeAd: LevelPlayNativeAd, adInfo: AdInfo) => {},
      onAdLoadFailed: (nativeAd: LevelPlayNativeAd, error: IronSourceError) => {},
      onAdClicked: (nativeAd: LevelPlayNativeAd, adInfo: AdInfo) => {},
      onAdImpression: (nativeAd: LevelPlayNativeAd, adInfo: AdInfo) => {},
    };
    // Add the listener to the LevelPlayNativeAd instance...
  }, [])

  // return some view
}
```

### Initialize the plugin

```typescript
async function init() {
  const appKey = "[YOUR_APP_KEY]"
  const userId = "[YOUR_USER_ID]"
  let initRequest: LevelPlayInitRequest = LevelPlayInitRequest.builder(appKey)
      .withUserId(userId)
      .build();
  const initListener: LevelPlayInitListener = {
      onInitFailed: (error: LevelPlayInitError) => {},
      onInitSuccess: (configuration: LevelPlayConfiguration) => {}
  }
  await LevelPlay.init(initRequest, initListener)
}
```

### Privacy settings

Set the user's privacy choices with `LevelPlayPrivacySettings` before you initialize the SDK:

```typescript
await LevelPlayPrivacySettings.setGDPRConsent(true)
await LevelPlayPrivacySettings.setCCPA(false)
await LevelPlayPrivacySettings.setCOPPA(false)
```

For more information, refer to [Regulation advanced settings](https://docs.unity.com/en-us/grow/levelplay/sdk/react/regulation-advanced-settings).

### Impression data

Set an impression data listener on each ad to receive its impression-level revenue data. `LevelPlay.addImpressionDataListener` is deprecated.

```typescript
const impressionDataListener: LevelPlayImpressionDataListener = {
  onImpressionSuccess: (impressionData: LevelPlayImpressionData) => {},
}
interstitialAd.setImpressionDataListener(impressionDataListener)
rewardedAd.setImpressionDataListener(impressionDataListener)
// Banners: the impressionDataListener prop of LevelPlayBannerAdView
```

For more information, refer to [Impression-level revenue integration](https://docs.unity.com/en-us/grow/levelplay/sdk/react/impression-level-revenue-integration).

### Show Ads Example

#### LevelPlayRewardedVideo
```typescript
const SomeComponent: React.FC = () => {
  const [rewardedAd, setRewardedAd] = useState<LevelPlayRewardedAd>(new LevelPlayRewardedAd('YOUR_AD_UNIT_ID'));
  const listener: LevelPlayRewardedAdListener = {
    // Implement listener methods...
  }

  useEffect(() => {
    rewardedAd.setListener(listener);
  }, [rewardedAd]);

  const loadAd = async () => {
    await rewardedAd.loadAd();
  };

  const showAd = async () => {
    if (await rewardedAd.isAdReady()) {
      await rewardedAd.showAd('YOUR_PLACEMENT');
    }
  };

  /// Rest of component, return some view ...
```

#### LevelPlayInterstitial

```typescript
const SomeComponent: React.FC = () => {
  const [interstitialAd, setInterstitialAd] = useState<LevelPlayInterstitialAd>(new LevelPlayInterstitialAd('YOUR_AD_UNIT_ID'))
  const listener: LevelPlayInterstitialAdListener = {
    // Implement listener methods...
  }

  useEffect(() => {
    interstitialAd.setListener(listener);
  }, [interstitialAd]);

  const loadAd = async () => {
    await interstitialAd.loadAd();
  };

  const showAd = async () => {
    if (await interstitialAd.isAdReady()) {
      await interstitialAd.showAd('YOUR_PLACEMENT');
    }
  };

  /// Rest of component, return some view ...
```

#### LevelPlayBanner

```typescript
const SomeComponent: React.FC = () => {
  // State to manage the reference to the banner ad view
  const bannerAdViewRef = useRef<LevelPlayBannerAdViewMethods>(null);
  const adSize = LevelPlayAdSize.BANNER
  const adUnitId = 'YOUR_AD_UNIT_ID'
  const placement = 'YOUR_PLACEMENT'

  // LevelPlay Banner Ad View listener
  const listener: LevelPlayBannerAdViewListener = {
    // Implement listener methods...
  }

  // Load ad
  const loadAd = useCallback(() => {
    bannerAdViewRef.current?.loadAd();
  }, []);

return (
    <View>
      <LevelPlayBannerAdView 
        ref={bannerAdViewRef}
        adUnitId={adUnitId}
        adSize={adSize}
        placementName={placement}
        listener={listener}
        style={{width: adSize.width, height: adSize.height, alignSelf: 'center'}}
        onLayout={(_) => loadAd()}
      />
    </View>
  );
};
```

#### LevelPlayNativeAd
```typescript
export const LevelPlayNativeAdSection = () => {
  const [nativeAd, setNativeAd] = useState<LevelPlayNativeAd | null>()

  // LevelPlay NativeAd listener
  const listener: LevelPlayNativeAdListener = {
    // Implement listener methods...
  };

  useEffect(() => {
     const levelPlayNativeAd = LevelPlayNativeAd.builder()
      .withPlacement('DefaultNativeAd') // Your placement name string
      .withListener(listener) // Your level play native ad listener
      .build();
    setNativeAd(levelPlayNativeAd);
  }, []);

  // Load native ad
  const loadAd = useCallback(() => {
    nativeAd?.loadAd();
  }, [nativeAd]);

   return (
    <View>
      {nativeAd && 
        <LevelPlayNativeAdView
            nativeAd={nativeAd} 
            templateType={LevelPlayTemplateType.Medium} 
            style={{ width: 350, height: 300, alignSelf: 'center' }}
            onLayout={(_) => loadAd()}
          />
        }
    </View>
  );
}
```

Refer to the [example app](./example) for the more detailed implementation sample.

Note:

- Make sure to read the [LevelPlay React Native documentation](https://docs.unity.com/en-us/grow/levelplay/sdk/react/plugin-integration) for proper usage.
- Some config functions must be called before `LevelPlay.init`.

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

Make sure to follow the [Android mediation networks](https://docs.unity.com/en-us/grow/levelplay/sdk/android/mediation-networks) document for additional setup.

- Add adapter/sdk dependencies to `PROJECT_ROOT/android/app/build.gradle`
- Add required settings to `PROJECT_ROOT/android/app/src/main/AndroidManifest.xml`

## iOS

Make sure to follow the [iOS mediation networks](https://docs.unity.com/en-us/grow/levelplay/sdk/ios/mediation-networks) document for additional setup.

- Add adapter/sdk pod dependencies to `PROJECT_ROOT/ios/Podfile`
- Add required settings to `PROJECT_ROOT/ios/APP_NAME/info.plist`

# Example App

Almost all the features are implemented on the [example app](./example). We recommend running it first to see how it works.

```shell
# The plugin project root
cd unity-levelplay-mediation

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
You can find a summary of the LevelPlay SDK version history [here](https://docs.unity.com/en-us/grow/levelplay/sdk/react/changelog).

## Contact US 
For any question please contact us [here](https://ironsrc.formtitan.com/knowledge-center#/). 

## License 
The license can be viewed [here](https://github.com/ironsource-mobile/react-native-SDK/blob/master/LICENSE)