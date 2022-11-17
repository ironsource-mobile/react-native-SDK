import * as t from 'io-ts'

/**
 * Used for Event Listeners
 *
 * Not exposed as part of the module.
 */

export const consentViewInfoCodec = t.type({
  consentViewType: t.string,
})

export type ConsentViewInfo = t.TypeOf<typeof consentViewInfoCodec>
