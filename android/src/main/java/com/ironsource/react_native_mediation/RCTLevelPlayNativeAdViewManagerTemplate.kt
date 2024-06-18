package com.ironsource.react_native_mediation

import android.widget.Button
import android.widget.ImageView
import android.widget.TextView
import com.facebook.react.bridge.ReactApplicationContext
import com.ironsource.mediationsdk.ads.nativead.LevelPlayMediaView
import com.ironsource.mediationsdk.ads.nativead.LevelPlayNativeAd
import com.ironsource.mediationsdk.ads.nativead.NativeAdLayout

/**
 * Manager class for creating instances of RCTLevelPlayNativeAdView with build-in templates.
 * This manager is responsible for creating instances of RCTLevelPlayNativeAdView and bind their views
 * to the native ad created. The class extend RCTLevelPlayNativeAdViewManager which handles the native ad logic
 * and expose only the method bindNativeAdToView for controlling the view.
 */
class RCTLevelPlayNativeAdViewManagerTemplate(reactApplicationContext: ReactApplicationContext): RCTLevelPlayNativeAdViewManager(reactApplicationContext) {
  override fun bindNativeAdToView(nativeAd: LevelPlayNativeAd?, nativeAdLayout: NativeAdLayout) {
    // Extract views
    val titleView = nativeAdLayout.findViewById<TextView>(R.id.adTitle)
    val bodyView = nativeAdLayout.findViewById<TextView>(R.id.adBody)
    val advertiserView = nativeAdLayout.findViewById<TextView>(R.id.adAdvertiser)
    val callToActionView = nativeAdLayout.findViewById<Button>(R.id.adCallToAction)
    val iconView = nativeAdLayout.findViewById<ImageView>(R.id.adAppIcon)
    val mediaView: LevelPlayMediaView? = nativeAdLayout.findViewById(R.id.adMedia)

    // Bind native ad to view
    if (nativeAd != null) {
      if (nativeAd.title != null) {
        titleView.text = nativeAd.title
        nativeAdLayout.setTitleView(titleView)
      }

      if (nativeAd.body != null) {
        bodyView.text = nativeAd.body
        nativeAdLayout.setBodyView(bodyView)
      }

      if (nativeAd.advertiser != null) {
        advertiserView.text = nativeAd.advertiser
        nativeAdLayout.setAdvertiserView(advertiserView)
      }

      if (nativeAd.callToAction != null) {
        callToActionView.text = nativeAd.callToAction
        nativeAdLayout.setCallToActionView(callToActionView)
      }

      if (nativeAd.icon != null) {
        iconView!!.setImageDrawable(nativeAd.icon!!.drawable)
        nativeAdLayout.setIconView(iconView)
      }

      if (mediaView != null) {
        nativeAdLayout.setMediaView(mediaView)
      }

      nativeAdLayout.registerNativeAdViews(nativeAd)
    }
  }
}
