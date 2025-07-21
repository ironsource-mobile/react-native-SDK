/**
 * LevelPlaySegment model represents a segment in LevelPlay.
 */
export type LevelPlaySegment = {
    segmentName?: string;
    isPaying?: boolean;
    level?: number;
    userCreationDate?: number;
    iapTotal?: number;
    customParameters?: {
        [key: string]: string;
    };
};
//# sourceMappingURL=LevelPlaySegment.d.ts.map