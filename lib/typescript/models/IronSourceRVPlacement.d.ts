import * as t from 'io-ts';
/**
 * Used for Event Listeners
 */
export declare const ironSourceRVPlacementCodec: t.TypeC<{
    placementName: t.StringC;
    rewardName: t.StringC;
    rewardAmount: t.NumberC;
}>;
export type IronSourceRVPlacement = t.TypeOf<typeof ironSourceRVPlacementCodec>;
//# sourceMappingURL=IronSourceRVPlacement.d.ts.map