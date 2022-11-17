package com.ironsource.react_native_mediation

import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.ReadableMap
import com.ironsource.mediationsdk.adunit.adapter.utility.AdInfo
import com.ironsource.mediationsdk.impressionData.ImpressionData
import com.ironsource.mediationsdk.logger.IronSourceError
import com.ironsource.mediationsdk.model.Placement

fun Placement.toReadableMap(): ReadableMap {
    val map = Arguments.createMap()
    map.putString("placementName", this.placementName)
    map.putString("rewardName", this.rewardName)
    map.putInt("rewardAmount", this.rewardAmount)
    return map
}

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
    map.putString("adUnit", this.adUnit)
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

fun ImpressionData.toReadableMap(): ReadableMap {
    val map = Arguments.createMap()
    this.auctionId?.let { map.putString("auctionId", it) }
    this.adUnit?.let { map.putString("adUnit", it) }
    this.country?.let { map.putString("country", it) }
    this.ab?.let { map.putString("ab", it) }
    this.segmentName?.let { map.putString("segmentName", it) }
    this.placement?.let { map.putString("placement", it) }
    this.adNetwork?.let { map.putString("adNetwork", it) }
    this.instanceName?.let { map.putString("instanceName", it) }
    this.instanceId?.let { map.putString("instanceId", it) }
    this.revenue?.let { map.putDouble("revenue", it) }
    this.precision?.let { map.putString("precision", it) }
    this.lifetimeRevenue?.let { map.putDouble("lifetimeRevenue", it) }
    this.encryptedCPM?.let { map.putString("encryptedCPM", it) }
    return map
}
