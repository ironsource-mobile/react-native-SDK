/**
 * Used for Event Listeners
 * AdInfo params:
 * https://developers.is.com/ironsource-mobile/android/levelplay-listener-adinfo-integration/#step-3
 */
export type AdInfo = {
  auctionId: string | null,
  country: string | null,
  ab: string | null,
  segmentName: string | null,
  adNetwork: string | null,
  instanceName: string | null,
  instanceId: string | null,
  revenue: number | null, // Double
  precision: string | null,
  encryptedCPM: string | null,
  conversionValue: number | null, // Double
}

