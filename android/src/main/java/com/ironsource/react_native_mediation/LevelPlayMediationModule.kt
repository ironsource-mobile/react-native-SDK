package com.ironsource.react_native_mediation

import com.facebook.react.bridge.*
import com.ironsource.react_native_mediation.IronConstants.E_ILLEGAL_ARGUMENT
import com.ironsource.react_native_mediation.IronConstants.ON_INIT_FAILED
import com.ironsource.react_native_mediation.IronConstants.ON_INIT_SUCCESS
import com.ironsource.react_native_mediation.LevelPlayUtils.Companion.sendEvent
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

class LevelPlayMediationModule(reactContext: ReactApplicationContext) :
  ReactContextBaseJavaModule(reactContext),
  LevelPlayImpressionDataListener,
  LevelPlayInitListener {
  // LevelPlay Ad Instance Manager
  private val levelPlayAdObjectManager: LevelPlayAdObjectManager = LevelPlayAdObjectManager(reactContext)

  override fun getName(): String {
    return "LevelPlayMediation"
  }

  /** LevelPlayImpressionData Listener =================================================================**/
  override fun onImpressionSuccess(impressionData: LevelPlayImpressionData) {
    sendEvent(
      reactApplicationContext,
      IronConstants.ON_LEVEL_PLAY_IMPRESSION_SUCCESS,
      impressionData.toReadableMap()
    )
  }

  /** LevelPlayInitListener ==================================================================**/
  override fun onInitFailed(error: LevelPlayInitError) {
    sendEvent(reactApplicationContext, ON_INIT_FAILED, error.toReadableMap())
  }

  override fun onInitSuccess(configuration: LevelPlayConfiguration) {
    sendEvent(reactApplicationContext, ON_INIT_SUCCESS, configuration.toReadableMap())
  }


  /** Base API  ============================================================================== **/

  /**
   * Validates the integration of the LevelPlay SDK.
   */
  @ReactMethod
  fun validateIntegration(promise: Promise) {
    LevelPlay.validateIntegration(reactApplicationContext)
    promise.resolve(null)
  }

  /**
   * Sets a dynamic user ID for tracking purposes.
   */
  @ReactMethod
  fun setDynamicUserId(userId: String, promise: Promise) {
    LevelPlay.setDynamicUserId(userId)
    promise.resolve(null)
  }

  /**
   * Enables or disables debug mode for LevelPlay adapters.
   */
  @ReactMethod
  fun setAdaptersDebug(isEnabled: Boolean, promise: Promise) {
    LevelPlay.setAdaptersDebug(isEnabled)
    promise.resolve(null)
  }

  /**
   * Sets the user's consent status for data collection.
   */
  @ReactMethod
  fun setConsent(isConsent: Boolean, promise: Promise) {
    LevelPlay.setConsent(isConsent)
    promise.resolve(null)
  }

  /**
   * Configures a user segment with specific attributes for targeting purposes.
   */
  @ReactMethod
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
  @ReactMethod
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
  @ReactMethod
  fun launchTestSuite(promise: Promise) {
    LevelPlay.launchTestSuite(reactApplicationContext)
    promise.resolve(null)
  }

  /**
   * Adds a listener for receiving impression data events.
   */
  @ReactMethod
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
  @ReactMethod
  fun initLevelPlay(map: ReadableMap, promise: Promise) {
    val appKey = map.getString("appKey")!!
    val userId: String? = map.getString("userId")
    val legacyAdFormats = map.getArray("adFormats")!!.toArrayList().map {
      when (it) {
        "REWARDED" -> LevelPlay.AdFormat.REWARDED
        "INTERSTITIAL" -> LevelPlay.AdFormat.INTERSTITIAL
        "BANNER" -> LevelPlay.AdFormat.BANNER
        "NATIVE_AD" -> LevelPlay.AdFormat.NATIVE_AD
        else -> return@initLevelPlay promise.reject(E_ILLEGAL_ARGUMENT, "Unsupported ad format: $it")
      }
    }.toList()
    val requestBuilder = LevelPlayInitRequest.Builder(appKey)
    requestBuilder.withLegacyAdFormats(legacyAdFormats)
    if (userId != null)
      requestBuilder.withUserId(userId)
    val initRequest = requestBuilder.build()
    LevelPlay.init(reactApplicationContext, initRequest, this)
    promise.resolve(null)
  }

  /** LevelPlay Interstitial Ad ============================================================== **/

  /**
   * Creates an interstitial ad and returns its unique ad ID.
   */
  @ReactMethod
  fun createInterstitialAd(map: ReadableMap, promise: Promise) {
    val adUnitId = map.getString("adUnitId")!!
    val bidFloor: Double? = if (map.hasKey("bidFloor")) map.getDouble("bidFloor") else null
    // Create interstitial ad through the manager and get its unique adId
    val adId = levelPlayAdObjectManager.createInterstitialAd(adUnitId, bidFloor)
    // Return the adId
    promise.resolve(adId)
  }

  /**
   * Loads an interstitial ad using its ad ID.
   */
  @ReactMethod
  fun loadInterstitialAd(map: ReadableMap, promise: Promise) {
    val adId = map.getString("adId")
    if (adId != null) {
      levelPlayAdObjectManager.loadInterstitialAd(adId)
    }
    promise.resolve(null)
  }

  /**
   * Displays an interstitial ad using its ad ID and optional placement name.
   */
  @ReactMethod
  fun showInterstitialAd(map: ReadableMap, promise: Promise) {
    val adId = map.getString("adId")
    val placementName: String? = map.getString("placementName")
    if (adId != null) {
      levelPlayAdObjectManager.showInterstitialAd(adId, placementName)
    }
    promise.resolve(null)
  }

  /**
   * Checks if an interstitial ad is ready to be displayed.
   */
  @ReactMethod
  fun isInterstitialAdReady(map: ReadableMap, promise: Promise) {
    val adId = map.getString("adId")
    promise.resolve(adId?.let { levelPlayAdObjectManager.isInterstitialAdReady(it) })
  }

  /**
   * Checks if an interstitial ad placement is capped.
   */
  @ReactMethod
  fun isInterstitialAdPlacementCapped(map: ReadableMap, promise: Promise) {
    val placementName = map.getString("placementName")!!
    promise.resolve(LevelPlayInterstitialAd.isPlacementCapped(placementName))
  }

  /**
   * Removes a specific ad using its ad ID.
   */
  @ReactMethod
  fun removeAd(map: ReadableMap, promise: Promise) {
    val adId = map.getString("adId")
    if (adId != null) {
      levelPlayAdObjectManager.removeAd(adId)
    }
    promise.resolve(null)
  }

  /**
   * Removes all ads.
   */
  @ReactMethod
  fun removeAllAds(promise: Promise) {
    levelPlayAdObjectManager.removeAllAds()
     promise.resolve(null)
  }
  /** LevelPlayAdSize API ==================================================================== **/

  /**
   * Creates an adaptive ad size based on the specified width.
   */
  @ReactMethod
  fun createAdaptiveAdSizeWithWidth(width: Int, promise: Promise) {
    val size = LevelPlayAdSize.createAdaptiveAdSize(reactApplicationContext, width)
    promise.resolve(size.toReadableMap())
  }

  /**
   * Creates a default adaptive ad size.
   */
  @ReactMethod
  fun createAdaptiveAdSize(promise: Promise) {
    val size = LevelPlayAdSize.createAdaptiveAdSize(reactApplicationContext)
    promise.resolve(size.toReadableMap())
  }

  /** LevelPlay Rewarded Ad ============================================================== **/

  /**
   * Creates a rewarded ad and returns its unique ad ID.
   */
  @ReactMethod
  fun createRewardedAd(map: ReadableMap, promise: Promise) {
    val adUnitId = map.getString("adUnitId")!!
    val bidFloor: Double? = if (map.hasKey("bidFloor")) map.getDouble("bidFloor") else null
    // Create interstitial ad through the manager and get its unique adId
    val adId = levelPlayAdObjectManager.createRewardedAd(adUnitId, bidFloor)
    // Return the adId
    promise.resolve(adId)
  }

  /**
   * Loads a rewarded ad using its ad ID.
   */
  @ReactMethod
  fun loadRewardedAd(map: ReadableMap, promise: Promise) {
    val adId = map.getString("adId")
    if (adId != null) {
      levelPlayAdObjectManager.loadRewardedAd(adId)
    }
    promise.resolve(null)
  }

  /**
   * Displays a rewarded ad using its ad ID and optional placement name.
   */
  @ReactMethod
  fun showRewardedAd(map: ReadableMap, promise: Promise) {
    val adId = map.getString("adId")
    val placementName: String? = map.getString("placementName")
    if (adId != null) {
      levelPlayAdObjectManager.showRewardedAd(adId, placementName)
    }
    promise.resolve(null)
  }

  /**
   * Checks if a rewarded ad is ready to be displayed.
   */
  @ReactMethod
  fun isRewardedAdReady(map: ReadableMap, promise: Promise) {
    val adId = map.getString("adId")
    promise.resolve(adId?.let { levelPlayAdObjectManager.isRewardedAdReady(it) })
  }

  /**
   * Checks if a rewarded ad placement is capped.
   */
  @ReactMethod
  fun isRewardedAdPlacementCapped(map: ReadableMap, promise: Promise) {
    val placementName = map.getString("placementName")!!
    promise.resolve(LevelPlayRewardedAd.isPlacementCapped(placementName))
  }

  /** Event Emitter Constants ================================================================ **/
  override fun getConstants(): MutableMap<String, Any> {
    return IronConstants.getEventConstants()
  }

  /** Event Emitter Stubs ==================================================================== **/
  /**
   * This functions are necessary, don't delete them.
   *
   * These functions are required to suppress warnings:
   * `new NativeEventEmitter()` was called with a non-null argument without the required `removeListeners` method.
   *
   * Inspired by https://github.com/react-native-netinfo/react-native-netinfo/issues/486
   *             https://github.com/react-native-netinfo/react-native-netinfo/pull/487
   */
  @ReactMethod
  fun addListener(eventName: String) {
    // Keep: Required for RN built in Event Emitter Calls.
  }

  @ReactMethod
  fun removeListeners(count: Int) {
    // Keep: Required for RN built in Event Emitter Calls.
  }
}
