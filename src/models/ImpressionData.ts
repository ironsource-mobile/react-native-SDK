import * as t from 'io-ts'
import { optional } from './utils'

/**
 * Used for Event Listeners
 */

/**
 * ARM ImpressionData
 * Parameter Details:
 * https://developers.is.com/ironsource-mobile/general/ad-revenue-measurement-postbacks/#step-2
 */
export const impressionDataCodec = t.type({
  auctionId: optional(t.string),
  adUnit: optional(t.string),
  country: optional(t.string),
  ab: optional(t.string),
  segmentName: optional(t.string),
  placement: optional(t.string),
  adNetwork: optional(t.string),
  instanceName: optional(t.string),
  instanceId: optional(t.string),
  revenue: optional(t.number), // Double
  precision: optional(t.string),
  lifetimeRevenue: optional(t.number), // Double
  encryptedCPM: optional(t.string),
})

export type ImpressionData = t.TypeOf<typeof impressionDataCodec>
