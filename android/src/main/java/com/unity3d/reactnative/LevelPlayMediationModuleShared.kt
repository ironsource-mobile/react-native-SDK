package com.unity3d.reactnative

import com.facebook.react.bridge.*
import com.unity3d.reactnative.LevelPlayConstants.E_ILLEGAL_ARGUMENT
import com.unity3d.reactnative.LevelPlayConstants.ON_INIT_FAILED
import com.unity3d.reactnative.LevelPlayConstants.ON_INIT_SUCCESS
import com.unity3d.reactnative.LevelPlayUtils.Companion.sendEvent
import com.unity3d.mediation.LevelPlay
import com.unity3d.mediation.LevelPlayAdSize
import com.unity3d.mediation.LevelPlayConfiguration
import com.unity3d.mediation.LevelPlayInitError
import com.unity3d.mediation.LevelPlayInitListener
import com.unity3d.mediation.LevelPlayInitRequest
import com.unity3d.mediation.impression.LevelPlayImpressionData
import com.unity3d.mediation.impression.LevelPlayImpressionDataListener
import com.unity3d.mediation.interstitial.LevelPlayInterstitialAd
import com.unity3d.mediation.rewarded.LevelPlayRewardedAd
import com.unity3d.mediation.segment.LevelPlaySegment

/**
 * Shared implementation for LevelPlayMediation module.
 * Contains all business logic that is architecture-agnostic.
 * Both old and new architecture modules delegate to this class.
 */
class LevelPlayMediationModuleShared(private val reactContext: ReactApplicationContext) :
  LevelPlayImpressionDataListener,
  LevelPlayInitListener {
  
  companion object {
    const val NAME = "LevelPlayMediation"
  }

  // LevelPlay Ad Instance Manager
  private val levelPlayAdObjectManager: LevelPlayAdObjectManager = LevelPlayAdObjectManager(reactContext)

  /** LevelPlayInitListener ==================================================================**/
  override fun onInitFailed(error: LevelPlayInitError) {
    sendEvent(reactContext, ON_INIT_FAILED, error.toReadableMap())
  }

  override fun onInitSuccess(configuration: LevelPlayConfiguration) {
    sendEvent(reactContext, ON_INIT_SUCCESS, configuration.toReadableMap())
  }

  /** LevelPlayImpressionData Listener =================================================================**/
  override fun onImpressionSuccess(impressionData: LevelPlayImpressionData) {
    sendEvent(
      reactContext,
      LevelPlayConstants.ON_IMPRESSION_SUCCESS,
      impressionData.toReadableMap()
    )
  }

  /** Base API  ============================================================================== **/

  /**
   * Validates the integration of the LevelPlay SDK.
   */
  fun validateIntegration(promise: Promise) {
    LevelPlay.validateIntegration(reactContext)
    promise.resolve(null)
  }

  /**
   * Sets a dynamic user ID for tracking purposes.
   */
  fun setDynamicUserId(userId: String, promise: Promise) {
    LevelPlay.setDynamicUserId(userId)
    promise.resolve(null)
  }

  /**
   * Enables or disables debug mode for LevelPlay adapters.
   */
  fun setAdaptersDebug(isEnabled: Boolean, promise: Promise) {
    LevelPlay.setAdaptersDebug(isEnabled)
    promise.resolve(null)
  }

  /**
   * Sets the user's consent status for data collection.
   */
  fun setConsent(isConsent: Boolean, promise: Promise) {
    LevelPlay.setConsent(isConsent)
    promise.resolve(null)
  }

  /**
   * Configures a user segment with specific attributes for targeting purposes.
   */
  fun setSegment(segment: ReadableMap, promise: Promise) {
    val levelPlaySegment = LevelPlaySegment()
    segment.entryIterator.forEach { entry ->
      when (entry.key) {
        "segmentName" -> entry.value?.let { levelPlaySegment.segmentName = it as String }
        "level" -> entry.value?.let { levelPlaySegment.level = (it as Double).toInt() }
        "isPaying" -> entry.value?.let { levelPlaySegment.isPaying = it as Boolean }
        "userCreationDate" -> entry.value?.let { levelPlaySegment.userCreationDate = (it as Double).toLong() }
        "iapTotal" -> entry.value?.let { levelPlaySegment.iapTotal = it as Double }
        "customParameters" -> entry.value?.let { params ->
          (params as ReadableMap).entryIterator.forEach { param ->
            levelPlaySegment.setCustom(param.key, param.value as String)
          }
        }
        else -> return promise.reject(
          E_ILLEGAL_ARGUMENT,
          "Invalid parameter. param: ${entry.key}"
        )
      }
    }

    LevelPlay.setSegment(levelPlaySegment)
    promise.resolve(null)
  }

  /**
   * Sets metadata with key-value pairs for custom configurations.
   */
  fun setMetaData(key: String, values: ReadableArray, promise: Promise) {
    val strValues = values.toArrayList().map { v ->
      if (v !is String) {
        return promise.reject(
          E_ILLEGAL_ARGUMENT,
          "The MetaData value must be string. Value: ${v}"
        )
      } else {
        v
      }
    }
    LevelPlay.setMetaData(key, strValues)
    promise.resolve(null)
  }

  /**
   * Launches the LevelPlay Test Suite for debugging and validation.
   */
  fun launchTestSuite(promise: Promise) {
    LevelPlay.launchTestSuite(reactContext)
    promise.resolve(null)
  }

  /**
   * Adds a listener for receiving impression data events.
   */
  fun addImpressionDataListener(promise: Promise) {
    LevelPlay.addImpressionDataListener(this)
    promise.resolve(null)
  }

  /** LevelPlay Init ========================================================================= **/

  /**
   * Initializes the LevelPlay SDK with the provided configuration.
   * This includes the app key, optional user ID, and supported ad formats.
   *
   * @param map A ReadableMap containing:
   *   - "appKey" (String): The application key for initializing LevelPlay.
   *   - "userId" (String, optional): The user ID for tracking.
   *   - "adFormats" (Array): List of ad formats to support (e.g., REWARDED, INTERSTITIAL, etc.).
   * @param promise A Promise to resolve when the initialization is complete or reject on error.
   */
  fun init(appKey: String, userId: String?, promise: Promise) {
    val requestBuilder = LevelPlayInitRequest.Builder(appKey)
    if (userId != null)
      requestBuilder.withUserId(userId)
    val initRequest = requestBuilder.build()
    LevelPlay.init(reactContext, initRequest, this)
    promise.resolve(null)
  }

  /** LevelPlay Interstitial Ad ============================================================== **/

  /**
   * Creates an interstitial ad and returns its unique ad ID.
   */
  fun createInterstitialAd(adUnitId: String, bidFloor: Double?, promise: Promise) {
    // Convert sentinel value -1 to null for optional bidFloor (matches iOS/TypeScript pattern)
    val actualBidFloor = if (bidFloor != null && bidFloor < 0) null else bidFloor
    // Create interstitial ad through the manager and get its unique adId
    val adId = levelPlayAdObjectManager.createInterstitialAd(adUnitId, actualBidFloor)
    // Return the adId
    promise.resolve(adId)
  }

  /**
   * Loads an interstitial ad using its ad ID.
   */
  fun loadInterstitialAd(adId: String, promise: Promise) {
    levelPlayAdObjectManager.loadInterstitialAd(adId)
    promise.resolve(null)
  }

  /**
   * Displays an interstitial ad using its ad ID and optional placement name.
   */
  fun showInterstitialAd(adId: String, placementName: String?, promise: Promise) {
    levelPlayAdObjectManager.showInterstitialAd(adId, placementName)
    promise.resolve(null)
  }

  /**
   * Checks if an interstitial ad is ready to be displayed.
   */
  fun isInterstitialAdReady(adId: String, promise: Promise) {
    promise.resolve(levelPlayAdObjectManager.isInterstitialAdReady(adId))
  }

  /**
   * Checks if an interstitial ad placement is capped.
   */
  fun isInterstitialAdPlacementCapped(placementName: String, promise: Promise) {
    promise.resolve(LevelPlayInterstitialAd.isPlacementCapped(placementName))
  }

  /**
   * Removes a specific ad using its ad ID.
   */
  fun removeAd(adId: String, promise: Promise) {
    levelPlayAdObjectManager.removeAd(adId)
    promise.resolve(null)
  }

  /**
   * Removes all ads.
   */
  fun removeAllAds(promise: Promise) {
    levelPlayAdObjectManager.removeAllAds()
    promise.resolve(null)
  }

  /** LevelPlayAdSize API ==================================================================== **/

  /**
   * Creates an adaptive ad size based on the specified width.
   */
  fun createAdaptiveAdSizeWithWidth(width: Int, promise: Promise) {
    val size = LevelPlayAdSize.createAdaptiveAdSize(reactContext, width)
    promise.resolve(size.toReadableMap())
  }

  /**
   * Creates a default adaptive ad size.
   */
  fun createAdaptiveAdSize(promise: Promise) {
    val size = LevelPlayAdSize.createAdaptiveAdSize(reactContext)
    promise.resolve(size.toReadableMap())
  }

  /** LevelPlay Rewarded Ad ============================================================== **/

  /**
   * Creates a rewarded ad and returns its unique ad ID.
   */
  fun createRewardedAd(adUnitId: String, bidFloor: Double?, promise: Promise) {
    // Convert sentinel value -1 to null for optional bidFloor (matches iOS/TypeScript pattern)
    val actualBidFloor = if (bidFloor != null && bidFloor < 0) null else bidFloor
    // Create rewarded ad through the manager and get its unique adId
    val adId = levelPlayAdObjectManager.createRewardedAd(adUnitId, actualBidFloor)
    // Return the adId
    promise.resolve(adId)
  }

  /**
   * Loads a rewarded ad using its ad ID.
   */
  fun loadRewardedAd(adId: String, promise: Promise) {
    levelPlayAdObjectManager.loadRewardedAd(adId)
    promise.resolve(null)
  }

  /**
   * Displays a rewarded ad using its ad ID and optional placement name.
   */
  fun showRewardedAd(adId: String, placementName: String?, promise: Promise) {
    levelPlayAdObjectManager.showRewardedAd(adId, placementName)
    promise.resolve(null)
  }

  /**
   * Checks if a rewarded ad is ready to be displayed.
   */
  fun isRewardedAdReady(adId: String, promise: Promise) {
    promise.resolve(levelPlayAdObjectManager.isRewardedAdReady(adId))
  }

  /**
   * Checks if a rewarded ad placement is capped.
   */
  fun isRewardedAdPlacementCapped(placementName: String, promise: Promise) {
    promise.resolve(LevelPlayRewardedAd.isPlacementCapped(placementName))
  }

  /** Event Emitter Constants ================================================================ **/
  fun getConstants(): MutableMap<String, Any> {
    return LevelPlayConstants.getEventConstants()
  }
}

