import * as t from 'io-ts'
import { pipe } from 'fp-ts/function'
import { fold, left } from 'fp-ts/Either'
import prettyReporter from 'io-ts-reporters'

// failure handler
const onLeft = (errors: t.Errors) => {
  throw new Error(
    `DecodeError:\n${prettyReporter.report(left(errors)).join('\n')}`
  )
}

/**
 * Throws when decode fails
 */
export const decode = <T>(codec: t.Decoder<unknown, T>, value: unknown): T => {
  return pipe(
    codec.decode(value),
    fold(onLeft, decoded => decoded)
  )
}

/**
 * for an optional field
 * T | undefined
 */
export const optional = <T>(codec: t.Type<T, any, any>) =>
  t.union([codec, t.undefined])

/** Util Types ==================================================================**/
export type Without<T> = { [P in keyof T]?: undefined }
export type XOR<T, U> = (Without<T> & U) | (Without<U> & T)
