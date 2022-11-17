import * as t from 'io-ts';
/**
 * Used for Event Listeners
 *
 * Not exposed as part of the modules.
 */
export declare const availabilityCodec: t.TypeC<{
    isAvailable: t.BooleanC;
}>;
export declare type Availability = t.TypeOf<typeof availabilityCodec>;
