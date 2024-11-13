/**
 * Used for Event Listeners
 * AdInfo params:
 * https://developers.is.com/ironsource-mobile/android/levelplay-listener-adinfo-integration/#step-3
 */
export type IronSourceAdInfo = {
  auctionId: string | null,
  adUnit: string | null,
  country: string | null,
  ab: string | null,
  segmentName: string | null,
  adNetwork: string | null,
  instanceName: string | null,
  instanceId: string | null,
  revenue: number | null, // Double
  precision: string | null,
  lifetimeRevenue: number | null, // Double
  encryptedCPM: string | null,
  conversionValue: number | null, // Double
}