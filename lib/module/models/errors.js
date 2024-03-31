import * as t from 'io-ts';
import { optional } from './utils';

/**
 * Used for Event Listeners
 */

// props
const ironSourceErrorProps = {
  errorCode: t.number,
  message: optional(t.string)
};

// codec
export const ironSourceErrorCodec = t.type(ironSourceErrorProps);

// type

/**
 * iOS 14 ConsentView =========================================================
 */

// props
const consentViewProps = {
  ...ironSourceErrorProps,
  consentViewType: t.string
};

// codec
export const consentViewErrorCodec = t.type(consentViewProps);

// type
//# sourceMappingURL=errors.js.map