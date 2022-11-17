import * as t from 'io-ts';
/**
 * Used for Event Listeners
 *
 * Not exposed as part of the module.
 */
export declare const consentViewInfoCodec: t.TypeC<{
    consentViewType: t.StringC;
}>;
export declare type ConsentViewInfo = t.TypeOf<typeof consentViewInfoCodec>;
