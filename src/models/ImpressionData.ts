import type { AdFormat } from "./AdFormat";

/**
 * ARM ImpressionData
 * @see https://developers.is.com/ironsource-mobile/general/ad-revenue-measurement-postbacks/#step-2
 * 
 * Represents the data collected for an ad impression.
 */
export type ImpressionData = {
  /**
   * The unique identifier for the auction in which the ad was won.
   */
  auctionId: string | null;

  /**
   * @deprecated This parameter will be removed in native SDK version 9.0.0.
   * Please use [adFormat] instead.
   * 
   * The ad unit type (e.g., banner, interstitial) that displayed the ad.
   */
  adUnit: string | null;
  
  /**
   * The name of the ad unit.
   */
  adUnitName: string | null;

  /**
   * The unique identifier of the ad unit.
   */
  adUnitId: string | null;

  /**
   * The format of the ad.
   */
  adFormat: AdFormat | null;

  /**
   * The country where the ad was displayed.
   */
  country: string | null;

  /**
   * A/B testing group identifier.
   */
  ab: string | null;

  /**
   * The name of the segment in which the user falls.
   */
  segmentName: string | null;

  /**
   * The name of the placement where the ad was shown.
   */
  placement: string | null;

  /**
   * The name of the ad network that served the ad.
   */
  adNetwork: string | null;

  /**
   * The name of the ad instance.
   */
  instanceName: string | null;

  /**
   * The identifier of the ad instance.
   */
  instanceId: string | null;

  /**
   * The revenue earned from the ad impression.
   */
  revenue: number | null; // Double

  /**
   * The precision of the revenue amount.
   */
  precision: string | null;

  /**
   * @deprecated This parameter will be removed in native SDK version 9.0.0.
   * The lifetime revenue earned from this ad unit.
   */
  lifetimeRevenue: number | null; // Double

  /**
   * The encrypted cost per thousand impressions (CPM).
   */
  encryptedCPM: string | null;

  /**
   * The conversion value attributed to this impression, used for SKAdNetwork.
   */
  conversionValue: number | null; // Double
}