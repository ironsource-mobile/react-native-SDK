/**
 * Represents the size of an ad in LevelPlay.
 */
export declare class LevelPlayAdSize {
    width: number;
    height: number;
    adLabel: string | null;
    isAdaptive: boolean;
    private constructor();
    static BANNER: LevelPlayAdSize;
    static LARGE: LevelPlayAdSize;
    static MEDIUM_RECTANGLE: LevelPlayAdSize;
    /**
     * Creates a custom ad size.
     * @param width - The width of the custom ad.
     * @param height - The height of the custom ad.
     * @returns A new LevelPlayAdSize instance with the specified dimensions.
     */
    static createCustomSize(width: number, height: number): LevelPlayAdSize;
    /**
     * Creates an ad size based on the given ad size label.
     * @param adSize - The label of the desired ad size.
     * @returns The predefined LevelPlayAdSize instance matching the label.
     * @throws Error if the ad size label is not recognized.
     */
    static createAdSize(adSize: string): LevelPlayAdSize;
    /**
     * Creates an adaptive ad size with an optional fixed width.
     * @param width - The optional fixed width for the adaptive ad.
     * @returns A promise that resolves to a LevelPlayAdSize instance or null if the creation fails.
     */
    static createAdaptiveAdSize(width?: number | null): Promise<LevelPlayAdSize | null>;
    toMap(): {
        [key: string]: any;
    };
    static fromMap(map: {
        [key: string]: any;
    }): LevelPlayAdSize;
}
//# sourceMappingURL=LevelPlayAdSize.d.ts.map