import * as t from 'io-ts';
export declare const ironSourceErrorCodec: t.TypeC<{
    errorCode: t.NumberC;
    message: t.UnionC<[t.Type<string, any, any>, t.UndefinedC]>;
}>;
export declare type IronSourceError = t.TypeOf<typeof ironSourceErrorCodec>;
export declare const consentViewErrorCodec: t.TypeC<{
    consentViewType: t.StringC;
    errorCode: t.NumberC;
    message: t.UnionC<[t.Type<string, any, any>, t.UndefinedC]>;
}>;
export declare type ConsentViewError = {
    consentViewType: string;
} & IronSourceError;
