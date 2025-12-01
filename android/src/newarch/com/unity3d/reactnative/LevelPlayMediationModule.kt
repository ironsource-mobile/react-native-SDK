package com.unity3d.reactnative

import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReadableArray
import com.facebook.react.bridge.ReadableMap
import com.facebook.react.module.annotations.ReactModule

/**
 * New Architecture wrapper for LevelPlayMediation module.
 * Extends the generated NativeLevelPlayMediationSpec from Codegen.
 * Delegates all business logic to LevelPlayMediationModuleShared.
 */
@ReactModule(name = LevelPlayMediationModuleShared.NAME)
class LevelPlayMediationModule(reactContext: ReactApplicationContext) :
  NativeLevelPlayMediationSpec(reactContext) {
  
  private val shared: LevelPlayMediationModuleShared = LevelPlayMediationModuleShared(reactContext)

  override fun getName(): String {
    return LevelPlayMediationModuleShared.NAME
  }

  /** Base API  ============================================================================== **/

  override fun validateIntegration(promise: Promise) {
    shared.validateIntegration(promise)
  }

  override fun setDynamicUserId(userId: String, promise: Promise) {
    shared.setDynamicUserId(userId, promise)
  }

  override fun setAdaptersDebug(isEnabled: Boolean, promise: Promise) {
    shared.setAdaptersDebug(isEnabled, promise)
  }

  override fun setConsent(isConsent: Boolean, promise: Promise) {
    shared.setConsent(isConsent, promise)
  }

  override fun setSegment(segment: ReadableMap, promise: Promise) {
    shared.setSegment(segment, promise)
  }

  override fun setMetaData(key: String, values: ReadableArray, promise: Promise) {
    shared.setMetaData(key, values, promise)
  }

  override fun launchTestSuite(promise: Promise) {
    shared.launchTestSuite(promise)
  }

  override fun addImpressionDataListener(promise: Promise) {
    shared.addImpressionDataListener(promise)
  }

  /** LevelPlay Init ========================================================================= **/

  override fun init(appKey: String, userId: String?, promise: Promise) {
    shared.init(appKey, userId, promise)
  }

  /** LevelPlay Interstitial Ad ============================================================== **/

  override fun createInterstitialAd(adUnitId: String, bidFloor: Double?, promise: Promise) {
    shared.createInterstitialAd(adUnitId, bidFloor, promise)
  }

  override fun loadInterstitialAd(adId: String, promise: Promise) {
    shared.loadInterstitialAd(adId, promise)
  }

  override fun showInterstitialAd(adId: String, placementName: String?, promise: Promise) {
    shared.showInterstitialAd(adId, placementName, promise)
  }

  override fun isInterstitialAdReady(adId: String, promise: Promise) {
    shared.isInterstitialAdReady(adId, promise)
  }

  override fun isInterstitialAdPlacementCapped(adId: String, promise: Promise) {
    shared.isInterstitialAdPlacementCapped(adId, promise)
  }

  override fun removeAd(adId: String, promise: Promise) {
    shared.removeAd(adId, promise)
  }

  override fun removeAllAds(promise: Promise) {
    shared.removeAllAds(promise)
  }

  /** LevelPlayAdSize API ==================================================================== **/

  override fun createAdaptiveAdSizeWithWidth(width: Double, promise: Promise) {
    shared.createAdaptiveAdSizeWithWidth(width.toInt(), promise)
  }

  override fun createAdaptiveAdSize(promise: Promise) {
    shared.createAdaptiveAdSize(promise)
  }

  /** LevelPlay Rewarded Ad ============================================================== **/

  override fun createRewardedAd(adUnitId: String, bidFloor: Double?, promise: Promise) {
    shared.createRewardedAd(adUnitId, bidFloor, promise)
  }

  override fun loadRewardedAd(adId: String, promise: Promise) {
    shared.loadRewardedAd(adId, promise)
  }

  override fun showRewardedAd(adId: String, placementName: String?, promise: Promise) {
    shared.showRewardedAd(adId, placementName, promise)
  }

  override fun isRewardedAdReady(adId: String, promise: Promise) {
    shared.isRewardedAdReady(adId, promise)
  }

  override fun isRewardedAdPlacementCapped(adId: String, promise: Promise) {
    shared.isRewardedAdPlacementCapped(adId, promise)
  }

  /** Event Emitter Constants ================================================================ **/
  override fun getTypedExportedConstants(): MutableMap<String, Any> {
    return shared.getConstants()
  }

  /** Event Emitter Stubs ==================================================================== **/
  override fun addListener(eventName: String) {
    // Keep: Required for RN built in Event Emitter Calls.
  }

  override fun removeListeners(count: Double) {
    // Keep: Required for RN built in Event Emitter Calls.
  }
}

