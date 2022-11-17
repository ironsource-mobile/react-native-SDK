# ironsource-mediation

ReactNative Bridge for ironSource SDK

- [Android SDK](https://developers.ironsrc.com/ironsource-mobile/android/android-sdk/)
- [iOS SDK](https://developers.ironsrc.com/ironsource-mobile/ios/ios-sdk/)

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
  implementation 'com.google.android.gms:play-services-ads-identifier:18.0.1'
  implementation 'com.google.android.gms:play-services-basement:18.1.0'
  implementation 'com.google.android.gms:play-services-appset:16.0.2'
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

### Implement Event Listeners

Listener/Delegate functions are accessible through the Events modules.

- RewardedVideoEvents
- InterstitialEvents
- BannerEvents
- OfferwallEvents
- ImpressionDataEvents
- ConsentViewEvents

Note:

- Only one listener can be registered. When `setListener` is called, the listener previously registered to the event will be removed.

```typescript
import { RewardedVideoEvents as RV } from 'ironsource-mediation'

function SomeComponent() {
  useEffect(() => {
    // Set RV Event listeners
    RV.onRewardedVideoAvailabilityChanged.setListener((isAvailable: boolean) =>
      console.log(
        `onRewardedVideoAvailabilityChanged isAvailable:${isAvailable}`
      )
    )
    RV.onRewardedVideoAdRewarded.setListener(
      (placement: IronSourceRVPlacement) =>
        console.log(
          `onRewardedVideoAdRewarded placement:${JSON.stringify(placement)}`
        )
    )
    RV.onRewardedVideoAdOpened.setListener(() =>
      console.log('onRewardedVideoAdOpened')
    )
    RV.onRewardedVideoAdClosed.setListener(() =>
      console.log('onRewardedVideoAdClosed')
    )
    RV.onRewardedVideoAdStarted.setListener(() =>
      console.log('onRewardedVideoAdStarted')
    )
    RV.onRewardedVideoAdEnded.setListener(() =>
      console.log('onRewardedVideoAdEnded')
    )
    RV.onRewardedVideoAdShowFailed.setListener((error: IronSourceError) =>
      console.error(
        `onRewardedVideoAdShowFailed error:${JSON.stringify(error)}`
      )
    )
    RV.onRewardedVideoAdClicked.setListener(
      (placement: IronSourceRVPlacement) =>
        console.log(
          `onRewardedVideoAdClicked placement:${JSON.stringify(placement)}`
        )
    )

    return () => RV.removeAllListeners()
  }, [])

  // return some view
}
```

### Initialize the SDK

```typescript
async function initIronSource() {
  try {
    // This API can be called in parallel
    IronSource.validateIntegration().catch(e => console.error(e))

    // Set adapters and network SDKs to debug
    await IronSource.setAdaptersDebug(true)

    // This should be enabled to detect network condition errors
    await IronSource.shouldTrackNetworkState(true)

    // GDPR Consent
    await IronSource.setConsent(true)

    // COPPA
    await IronSource.setMetaData('is_child_directed', ['false'])

    // Do not use advertiserId for this.
    // Use an application user id.
    await IronSource.setUserId(APP_USER_ID)

    // To init with all ad units
    // await IronSource.init(APP_KEY);

    // Or only specific ones
    await IronSource.initWithAdUnits(APP_KEY, ['REWARDED_VIDEO'])
  } catch (e) {
    console.error(e)
  }
}
```

### Show Ads

```typescript
const showRV = async () => {
  if (await IronSource.isRewardedVideoAvailable()) {
    // Show
    // IronSource.showRewardedVideo();

    // Show by placement
    const isCapped = await IronSource.isRewardedVideoPlacementCapped(
      RV_PLACEMENT
    )
    if (!isCapped) {
      IronSource.showRewardedVideo(RV_PLACEMENT)
    } else {
      console.log('RV Placement', [`${RV_PLACEMENT} is capped`])
    }
  } else {
    console.error('RV is not available')
  }
}
```

Refer to the [example app](./example) for the more detailed implementation sample.

Note:

- Make sure to read the official documents at [ironSource Knowledge Center](https://developers.ironsrc.com/ironsource-mobile/android/android-sdk/) for proper usage.
- Some config functions must be called before `IronSource.init`.

### Manual Load RV

- On ironSource Mediation, RV load is automatically requested upon `init`
- To enable RV manual load, call `IronSource.setManualLoadRewardedVideo()` <ins>before init</ins>
- Set the manual load RV event listeners before calling `IronSource.loadRewardedVideo()`

```typescript
RewardedVideoEvents.onRewardedVideoAdReady.setListener(() => {
  setIsRVAvailable(true)
  console.log('onRewardedVideoAdReady')
})
RewardedVideoEvents.onRewardedVideoAdLoadFailed.setListener(
  (error: IronSourceError) => {
    console.log(`onRewardedVideoAdLoadFailed error:${JSON.stringify(error)}`)
  }
)
```

```typescript
const loadRV = async () => {
  try {
    await IronSource.loadRewardedVideo()
  } catch (e) {
    console.error(e)
  }
}
```

Note:

- `onRewardedVideoAvailabilityChanged` with `false` availability won't be called upon calling show. The availability state must be updated accordingly

### Banner Size

As you can see the definitions on [ironSource KC](https://developers.is.com/ironsource-mobile/android/banner-integration-android/#step-1), a Banner size can be set in two ways:

- Size Description
- Custom

```typescript
type IronSourceBannerSize = 'BANNER' | 'LARGE' | 'RECTANGLE' | 'SMART'
type IronSourceBannerSizeOption = {
  sizeDescription: IronSourceBannerSize
}
// or
type IronSourceBannerSizeOption = {
  width: number
  height: number
}
```

Note:

- If you set both a size description and width/height on your JS app, the size description will be used.

### Banner Positioning

For the native SDKs, a banner view must be implemented directly to the UI component.
This bridge takes care of native level view implementation. Therefore, positioning parameters are provided as below:

#### Position

```typescript
type IronSourceBannerPositionOption = {
  position: 'TOP' | 'BOTTOM' | 'CENTER'
}
```

#### Offset

This parameter represents the vertical offset of the banner:

- Negative values: Upward offset
- Positive values: Downward offset

Unit:

- Android: dp
- iOS: point

Note:

- Offset in the same direction of the position will be ignored. e.g. Bottom & 50, Top & -50
- However, the offsets in the opposite direction or both directions on the Center position can go beyond the screen boundaries. e.g. Bottom & -10000
- Make sure that a banner presented will be visible

```typescript
type IronSourceBannerOffsetOption = {
  verticalOffset?: number
}
```

<ins>Load Example</ins>

```typescript
const loadBanner = async () => {
  const bannerOptions: IronSourceBannerOptions = {
    position: 'BOTTOM',
    sizeDescription: 'BANNER',
    isAdaptive: true, // Optional
    verticalOffset: -30, // Optional - add 30dp/point margin bottom
    placementName: BANNER_PLACEMENT, // Optional
  }

  const isCapped = await IronSource.isBannerPlacementCapped(BANNER_PLACEMENT)
  if (!isCapped) {
    IronSource.loadBanner(bannerOptions)
  } else {
    console.log(`Banner Placement${BANNER_PLACEMENT} is capped`)
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
# the plugin project root
cd ironsource-mediation

# install dependencies
yarn

yarn example android
# or
yarn example ios
```
