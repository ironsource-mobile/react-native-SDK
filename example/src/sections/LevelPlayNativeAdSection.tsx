import React, { useState, useEffect, useCallback } from 'react';
import {StyleSheet, View} from 'react-native';
import { LevelPlayNativeAdView, LevelPlayTemplateType, LevelPlayNativeAd, type LevelPlayNativeAdListener, type IronSourceAdInfo, type IronSourceError } from 'ironsource-mediation';
import HighlightButton from '../components/HighlightButton';

/// LevelPlayNativeAd integration example
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


  // Destroy current native ad and create new instances of LevelPlayNativeAd and LevelPlayNativeAdView.
  const destroyAdAndCreateNew = useCallback(() => {
    if (nativeAd == null) return;

    nativeAd?.destroyAd();
    createNativeAd();
    setAdKey((prevKey) => prevKey + 1);
  }, [nativeAd]);

  return (
    <View>
      {nativeAd && 
        // Initialize native ad view widget with native ad
        <LevelPlayNativeAdView
            key={adKey} // Unique key to force recreation of component
            style={styles.native_ad} // Ad styling
            nativeAd={nativeAd} // Native ad object
            templateType={LevelPlayTemplateType.Medium} // Built-in native ad template(not required when implementing custom template)
          />
        }
      <HighlightButton buttonText={'Load Native Ad'} onPress={loadAd} />
      <HighlightButton buttonText={'Destroy Native Ad'} onPress={destroyAdAndCreateNew} />
    </View>
  );
};

const styles = StyleSheet.create({
  native_ad: {
    height: 350, // Your chosen height
    width: '100%', // Your chosen width
    // More styling ...
  }
});

export default LevelPlayNativeAdSection;
