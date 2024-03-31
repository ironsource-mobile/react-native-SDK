import * as t from 'io-ts';
/**
 * Used for Event Listeners
 *
 * Not exposed as part of the modules.
 */
export declare const availabilityCodec: t.TypeC<{
    isAvailable: t.BooleanC;
}>;
export type Availability = t.TypeOf<typeof availabilityCodec>;
//# sourceMappingURL=Availability.d.ts.map