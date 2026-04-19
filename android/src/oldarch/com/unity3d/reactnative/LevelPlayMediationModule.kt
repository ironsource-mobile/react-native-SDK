package com.unity3d.reactnative

import com.facebook.react.bridge.*

/**
 * Old Architecture wrapper for LevelPlayMediation module.
 * Delegates all business logic to LevelPlayMediationModuleShared.
 */
class LevelPlayMediationModule(reactContext: ReactApplicationContext) :
  ReactContextBaseJavaModule(reactContext) {
  
  private val shared: LevelPlayMediationModuleShared = LevelPlayMediationModuleShared(reactContext)

  override fun getName(): String = LevelPlayMediationModuleShared.NAME

  /** Base API  ============================================================================== **/

  @ReactMethod
  fun validateIntegration(promise: Promise) {
    shared.validateIntegration(promise)
  }

  @ReactMethod
  fun setDynamicUserId(userId: String, promise: Promise) {
    shared.setDynamicUserId(userId, promise)
  }

  @ReactMethod
  fun setAdaptersDebug(isEnabled: Boolean, promise: Promise) {
    shared.setAdaptersDebug(isEnabled, promise)
  }

  @ReactMethod
  fun setConsent(isConsent: Boolean, promise: Promise) {
    shared.setConsent(isConsent, promise)
  }

  @ReactMethod
  fun setSegment(segment: ReadableMap, promise: Promise) {
    shared.setSegment(segment, promise)
  }

  @ReactMethod
  fun setMetaData(key: String, values: ReadableArray, promise: Promise) {
    shared.setMetaData(key, values, promise)
  }

  @ReactMethod
  fun launchTestSuite(promise: Promise) {
    shared.launchTestSuite(promise)
  }

  /** Privacy Settings API  ===================================================================== **/

  @ReactMethod
  fun setGDPRConsents(networkConsents: ReadableMap, promise: Promise) {
    shared.setGDPRConsents(networkConsents, promise)
  }

  @ReactMethod
  fun setCCPA(value: Boolean, promise: Promise) {
    shared.setCCPA(value, promise)
  }

  @ReactMethod
  fun setCOPPA(value: Boolean, promise: Promise) {
    shared.setCOPPA(value, promise)
  }

  @ReactMethod
  fun addImpressionDataListener(promise: Promise) {
    shared.addImpressionDataListener(promise)
  }

  /** LevelPlay Init ========================================================================= **/

  @ReactMethod
  fun init(appKey: String, userId: String?, promise: Promise) {
    shared.init(appKey, userId, promise)
  }

  /** LevelPlay Interstitial Ad ============================================================== **/

  @ReactMethod
  fun createInterstitialAd(adUnitId: String, bidFloor: Double, promise: Promise) {
    shared.createInterstitialAd(adUnitId, bidFloor, promise)
  }

  @ReactMethod
  fun loadInterstitialAd(adId: String, promise: Promise) {
    shared.loadInterstitialAd(adId, promise)
  }

  @ReactMethod
  fun showInterstitialAd(adId: String, placementName: String?, promise: Promise) {
    shared.showInterstitialAd(adId, placementName, promise)
  }

  @ReactMethod
  fun isInterstitialAdReady(adId: String, promise: Promise) {
    shared.isInterstitialAdReady(adId, promise)
  }

  @ReactMethod
  fun isInterstitialAdPlacementCapped(adId: String, promise: Promise) {
    shared.isInterstitialAdPlacementCapped(adId, promise)
  }

  @ReactMethod
  fun removeAd(adId: String, promise: Promise) {
    shared.removeAd(adId, promise)
  }

  @ReactMethod
  fun removeAllAds(promise: Promise) {
    shared.removeAllAds(promise)
  }

  /** LevelPlayAdSize API ==================================================================== **/

  @ReactMethod
  fun createAdaptiveAdSizeWithWidth(width: Double, promise: Promise) {
    shared.createAdaptiveAdSizeWithWidth(width.toInt(), promise)
  }

  @ReactMethod
  fun createAdaptiveAdSize(promise: Promise) {
    shared.createAdaptiveAdSize(promise)
  }

  /** LevelPlay Rewarded Ad ============================================================== **/

  @ReactMethod
  fun createRewardedAd(adUnitId: String, bidFloor: Double, promise: Promise) {
    shared.createRewardedAd(adUnitId, bidFloor, promise)
  }

  @ReactMethod
  fun loadRewardedAd(adId: String, promise: Promise) {
    shared.loadRewardedAd(adId, promise)
  }

  @ReactMethod
  fun showRewardedAd(adId: String, placementName: String?, promise: Promise) {
    shared.showRewardedAd(adId, placementName, promise)
  }

  @ReactMethod
  fun isRewardedAdReady(adId: String, promise: Promise) {
    shared.isRewardedAdReady(adId, promise)
  }

  @ReactMethod
  fun isRewardedAdPlacementCapped(adId: String, promise: Promise) {
    shared.isRewardedAdPlacementCapped(adId, promise)
  }

  /** Event Emitter Constants ================================================================ **/
  override fun getConstants(): MutableMap<String, Any> {
    return shared.getConstants()
  }

  /** Event Emitter Stubs ==================================================================== **/
  @ReactMethod
  fun addListener(eventName: String) {
    // Keep: Required for RN built in Event Emitter Calls.
  }

  @ReactMethod
  fun removeListeners(count: Double) {
    // Keep: Required for RN built in Event Emitter Calls.
  }
}

