import type { AdFormat } from "./AdFormat";

/**
 * Represents the data collected for an ad impression.
 */
export type LevelPlayImpressionData = {
  /**
   * The unique identifier for the auction in which the ad was won.
   */
  auctionId: string | null;

  /**
   * The name of the ad unit.
   */
  mediationAdUnitName: string | null;

  /**
   * The unique identifier of the ad unit.
   */
  mediationAdUnitId: string | null;

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
   * The encrypted cost per thousand impressions (CPM).
   */
  encryptedCPM: string | null;

  /**
   * The conversion value attributed to this impression, used for SKAdNetwork.
   */
  conversionValue: number | null; // Double

  /**
   * The unique identifier of the creative that was displayed.
   */
  creativeId: string | null;
}
