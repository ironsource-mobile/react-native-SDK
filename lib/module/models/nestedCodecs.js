import * as t from 'io-ts';
import { ironSourceErrorCodec } from './errors';
import { ironSourceAdInfoCodec } from './IronSourceAdInfo';
import { ironSourceRVPlacementCodec } from './IronSourceRVPlacement';

/**
 * Used for Event Listeners
 * AdInfo params:
 * https://developers.is.com/ironsource-mobile/android/levelplay-listener-adinfo-integration/#step-3
 */

export const placementAdInfoCodec = t.type({
  placement: ironSourceRVPlacementCodec,
  adInfo: ironSourceAdInfoCodec
});
export const errorAdInfoCodec = t.type({
  error: ironSourceErrorCodec,
  adInfo: ironSourceAdInfoCodec
});
//# sourceMappingURL=nestedCodecs.js.map