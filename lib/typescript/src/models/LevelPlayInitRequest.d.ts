import type { AdFormat } from './AdFormat';
/**
 * Represents an initialization request for LevelPlay.
 */
export declare class LevelPlayInitRequest {
    appKey: string;
    userId: string | null;
    legacyAdFormats: AdFormat[];
    constructor(appKey: string, userId: string | null, legacyAdFormats: AdFormat[]);
    toMap(): any;
    toString(): string;
    static builder(appKey: string): LevelPlayInitRequestBuilder;
}
export declare class LevelPlayInitRequestBuilder {
    private instance;
    constructor(appKey: string);
    withUserId(userId: string): this;
    withLegacyAdFormats(legacyAdFormats: AdFormat[]): this;
    build(): LevelPlayInitRequest;
}
//# sourceMappingURL=LevelPlayInitRequest.d.ts.map