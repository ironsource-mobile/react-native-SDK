/**
 * Represents an initialization request for LevelPlay.
 */
export declare class LevelPlayInitRequest {
    appKey: string;
    userId: string | null;
    constructor(appKey: string, userId: string | null);
    toMap(): any;
    toString(): string;
    static builder(appKey: string): LevelPlayInitRequestBuilder;
}
export declare class LevelPlayInitRequestBuilder {
    private instance;
    constructor(appKey: string);
    withUserId(userId: string): this;
    build(): LevelPlayInitRequest;
}
//# sourceMappingURL=LevelPlayInitRequest.d.ts.map