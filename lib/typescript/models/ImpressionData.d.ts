import * as t from 'io-ts';
/**
 * Used for Event Listeners
 */
/**
 * ARM ImpressionData
 * Parameter Details:
 * https://developers.is.com/ironsource-mobile/general/ad-revenue-measurement-postbacks/#step-2
 */
export declare const impressionDataCodec: t.TypeC<{
    auctionId: t.UnionC<[t.Type<string, any, any>, t.UndefinedC]>;
    adUnit: t.UnionC<[t.Type<string, any, any>, t.UndefinedC]>;
    country: t.UnionC<[t.Type<string, any, any>, t.UndefinedC]>;
    ab: t.UnionC<[t.Type<string, any, any>, t.UndefinedC]>;
    segmentName: t.UnionC<[t.Type<string, any, any>, t.UndefinedC]>;
    placement: t.UnionC<[t.Type<string, any, any>, t.UndefinedC]>;
    adNetwork: t.UnionC<[t.Type<string, any, any>, t.UndefinedC]>;
    instanceName: t.UnionC<[t.Type<string, any, any>, t.UndefinedC]>;
    instanceId: t.UnionC<[t.Type<string, any, any>, t.UndefinedC]>;
    revenue: t.UnionC<[t.Type<number, any, any>, t.UndefinedC]>;
    precision: t.UnionC<[t.Type<string, any, any>, t.UndefinedC]>;
    lifetimeRevenue: t.UnionC<[t.Type<number, any, any>, t.UndefinedC]>;
    encryptedCPM: t.UnionC<[t.Type<string, any, any>, t.UndefinedC]>;
}>;
export declare type ImpressionData = t.TypeOf<typeof impressionDataCodec>;
