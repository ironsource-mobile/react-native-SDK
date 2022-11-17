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
export declare type Without<T> = {
    [P in keyof T]?: undefined;
};
export declare type XOR<T, U> = (Without<T> & U) | (Without<U> & T);
