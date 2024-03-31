import * as t from 'io-ts';
/**
 * Throws when decode fails
 */
export declare const decode: <T>(codec: t.Decoder<unknown, T>, value: unknown) => T;
/**
 * for an optional field
 * T | undefined
 */
export declare const optional: <T>(codec: t.Type<T, any, any>) => t.UnionC<[t.Type<T, any, any>, t.UndefinedC]>;
/** Util Types ==================================================================**/
export type Without<T> = {
    [P in keyof T]?: undefined;
};
export type XOR<T, U> = (Without<T> & U) | (Without<U> & T);
//# sourceMappingURL=utils.d.ts.map