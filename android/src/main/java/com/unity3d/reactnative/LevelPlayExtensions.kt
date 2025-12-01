package com.unity3d.reactnative

import android.graphics.Bitmap
import android.graphics.Canvas
import android.graphics.drawable.BitmapDrawable
import android.graphics.drawable.Drawable
import android.util.Base64
import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.ReadableMap
import com.ironsource.mediationsdk.ads.nativead.LevelPlayNativeAd
import com.ironsource.mediationsdk.adunit.adapter.utility.AdInfo
import com.ironsource.mediationsdk.logger.IronSourceError
import com.unity3d.mediation.LevelPlayAdError
import com.unity3d.mediation.LevelPlayAdInfo
import com.unity3d.mediation.LevelPlayAdSize
import com.unity3d.mediation.LevelPlayConfiguration
import com.unity3d.mediation.LevelPlayInitError
import com.unity3d.mediation.impression.LevelPlayImpressionData
import com.unity3d.mediation.rewarded.LevelPlayReward
import java.io.ByteArrayOutputStream

/** Bundle error data into a readable map to send to the React Native layer. */
fun IronSourceError.toReadableMap(): ReadableMap {
    val map = Arguments.createMap()
    map.putInt("errorCode", this.errorCode)
    this.errorMessage?.let { map.putString("message", it) }
    return map
}

/**
 * If the AdInfo data is not available,
 *  the adInfo string params will return an empty string,
 *  and the numeric params will return 0 value.
 */
fun AdInfo.toReadableMap(): ReadableMap {
    val map = Arguments.createMap()
    map.putString("auctionId", this.auctionId)
    map.putString("adNetwork", this.adNetwork)
    map.putString("ab", this.ab)
    map.putString("country", this.country)
    map.putString("instanceId", this.instanceId)
    map.putString("instanceName", this.instanceName)
    map.putString("segmentName", this.segmentName)
    map.putDouble("revenue", this.revenue)
    map.putString("precision", this.precision)
    map.putString("encryptedCPM", this.encryptedCPM)
    return map
}

/**
 * Bundle the native ad into a readable map to send to the React Native layer.
 * If the native ad object is null ,all fields in the map will also be null
 */
fun LevelPlayNativeAd?.toReadableMap(): ReadableMap {
    val nativeAdMap = Arguments.createMap()
    nativeAdMap.putString("title", this?.title)
    nativeAdMap.putString("advertiser", this?.advertiser)
    nativeAdMap.putString("body", this?.body)
    nativeAdMap.putString("callToAction", this?.callToAction)

    val iconMap = Arguments.createMap()
    iconMap.putString("uri", if (this?.icon?.uri != null) this.icon?.uri.toString() else null)
    iconMap.putString("imageData", if (this?.icon?.drawable != null) this.icon!!.drawable?.toBase64() else null)
    nativeAdMap.putMap("icon", iconMap)

    return nativeAdMap
}

/** Turn  a drawable into a base64 string so that it can be passed to the React Native Layer*/
fun Drawable.toBase64(): String {
    val bitmap = this.toBitmap()
    val outputStream = ByteArrayOutputStream()
    bitmap.compress(Bitmap.CompressFormat.PNG, 100, outputStream)
    val byteArray = outputStream.toByteArray()
    return Base64.encodeToString(byteArray, Base64.DEFAULT)
}

/**
 * Convert a drawable to a bitmap to help with the base64 conversion
 *
 */
fun Drawable.toBitmap(): Bitmap {
    if (this is BitmapDrawable) {
        if (this.bitmap != null) {
            return this.bitmap
        }
    }

    val bitmap: Bitmap = if (this.intrinsicWidth <= 0 || this.intrinsicHeight <= 0) {
        Bitmap.createBitmap(1, 1, Bitmap.Config.ARGB_8888) // Single color bitmap will be created of 1x1 pixel
    } else {
        Bitmap.createBitmap(this.intrinsicWidth, this.intrinsicHeight, Bitmap.Config.ARGB_8888)
    }

    val canvas = Canvas(bitmap)
    this.setBounds(0, 0, canvas.width, canvas.height)
    this.draw(canvas)
    return bitmap
}

/**
 * Convert LevelPlayInitError to readable map.
 */
fun LevelPlayInitError.toReadableMap(): ReadableMap {
  val map = Arguments.createMap()
  map.putString("errorMessage", this.errorMessage)
  map.putInt("errorCode", this.errorCode)
  return map
}

/**
 * Convert LevelPlayConfiguration to readable map.
 */
fun LevelPlayConfiguration.toReadableMap(): ReadableMap {
  val map = Arguments.createMap()
  map.putBoolean("isAdQualityEnabled", this.isAdQualityEnabled)
  map.putString("ab", this.ab)
  return map
}

/**
 * Convert LevelPlayAdInfo to readable map.
 */
fun LevelPlayAdInfo.toReadableMap(): ReadableMap {
  val map = Arguments.createMap()

  map.putString("adId", this.getAdId())
  map.putString("adUnitId", this.getAdUnitId())
  map.putString("adUnitName", this.getAdUnitName())
  map.putString("adFormat", this.getAdFormat())
  map.putMap("adSize", this.getAdSize().toReadableMap())
  map.putString("placementName", this.getPlacementName())
  map.putString("auctionId", this.getAuctionId())
  map.putString("country", this.getCountry())
  map.putString("ab", this.getAb())
  map.putString("segmentName", this.getSegmentName())
  map.putString("adNetwork", this.getAdNetwork())
  map.putString("instanceName", this.getInstanceName())
  map.putString("instanceId", this.getInstanceId())
  map.putDouble("revenue", this.getRevenue())
  map.putString("precision", this.getPrecision())
  map.putString("encryptedCPM", this.getEncryptedCPM())
  map.putString("creativeId", this.getCreativeId())

  return map
}

/**
 * Convert LevelPlayAdSize to readable map.
 */
fun LevelPlayAdSize?.toReadableMap(): ReadableMap? {
  if (this == null) return null

  val map = Arguments.createMap()
  map.putInt("width", this.getWidth())
  map.putInt("height", this.getHeight())
  map.putString("adLabel", this.getDescription())
  map.putBoolean("isAdaptive", this.isAdaptive)
  return map
}

/**
 * Convert LevelPlayAdError to readable map.
 */
fun LevelPlayAdError.toReadableMap(): ReadableMap {
  val map = Arguments.createMap()
  map.putString("adUnitId", this.adUnitId)
  map.putInt("errorCode", this.getErrorCode())
  map.putString("errorMessage", this.getErrorMessage())
  return map
}

/**
 * Convert LevelPlayReward to readable map.
 */
fun LevelPlayReward.toReadableMap(): ReadableMap {
  val map = Arguments.createMap()
  map.putString("name", this.name)
  map.putInt("amount", this.amount)
  return map
}

/** Bundle impression data into a readable map to send to the React Native layer. */
fun LevelPlayImpressionData.toReadableMap(): ReadableMap {
  val map = Arguments.createMap()
  this.auctionId?.let { map.putString("auctionId", it) }
  this.mediationAdUnitName?.let { map.putString("mediationAdUnitName", it) }
  this.mediationAdUnitId?.let { map.putString("mediationAdUnitId", it) }
  this.adFormat?.let { map.putString("adFormat", it) }
  this.country?.let { map.putString("country", it) }
  this.ab?.let { map.putString("ab", it) }
  this.segmentName?.let { map.putString("segmentName", it) }
  this.placement?.let { map.putString("placement", it) }
  this.adNetwork?.let { map.putString("adNetwork", it) }
  this.instanceName?.let { map.putString("instanceName", it) }
  this.instanceId?.let { map.putString("instanceId", it) }
  this.revenue?.let { map.putDouble("revenue", it) }
  this.precision?.let { map.putString("precision", it) }
  this.encryptedCPM?.let { map.putString("encryptedCPM", it) }
  this.creativeId?.let { map.putString("creativeId", it) }
  return map
}


