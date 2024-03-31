import * as t from 'io-ts';
import { pipe } from 'fp-ts/function';
import { fold, left } from 'fp-ts/Either';
import prettyReporter from 'io-ts-reporters';

// failure handler
const onLeft = errors => {
  throw new Error(`DecodeError:\n${prettyReporter.report(left(errors)).join('\n')}`);
};

/**
 * Throws when decode fails
 */
export const decode = (codec, value) => {
  return pipe(codec.decode(value), fold(onLeft, decoded => decoded));
};

/**
 * for an optional field
 * T | undefined
 */
export const optional = codec => t.union([codec, t.undefined]);

/** Util Types ==================================================================**/
//# sourceMappingURL=utils.js.map