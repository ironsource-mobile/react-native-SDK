import * as t from 'io-ts';
import { optional } from './utils';

/**
 * Used for Event Listeners
 * AdInfo params:
 * https://developers.is.com/ironsource-mobile/android/levelplay-listener-adinfo-integration/#step-3
 */

export const ironSourceAdInfoCodec = t.type({
  auctionId: optional(t.string),
  adUnit: optional(t.string),
  adNetwork: optional(t.string),
  instanceName: optional(t.string),
  instanceId: optional(t.string),
  country: optional(t.string),
  revenue: optional(t.number),
  // Double
  precision: optional(t.string),
  ab: optional(t.string),
  segmentName: optional(t.string),
  encryptedCPM: optional(t.string)
});
//# sourceMappingURL=IronSourceAdInfo.js.map