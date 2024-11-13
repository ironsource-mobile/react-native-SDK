/**
 * Represents an error related to the LevelPlay ad operations.
 */
export type LevelPlayAdError = {
    /**
     * A descriptive message providing details about the error.
     */
    errorMessage: string;
    /**
     * The error code associated with the ad error.
     * This code can be used to identify the type of error that occurred.
     */
    errorCode: number;
    /**
     * The unique identifier of the ad unit associated with the error.
     * This can be null if the error is not tied to a specific ad unit.
     */
    adUnitId: string | null;
};
//# sourceMappingURL=LevelPlayAdError.d.ts.map