/**
 * Represents an error object returned by the IronSource SDK.
 */
export type IronSourceError = {
    /**
     * The error code associated with the IronSource error.
     * This code can be used to identify the type of error that occurred.
     */
    errorCode: number;
    /**
     * A descriptive message providing more details about the error.
     * This can be `null` if no additional information is available.
     */
    message: string | null;
};
/**
 * Represents an initialization error specific to LevelPlay.
 */
export type LevelPlayInitError = {
    /**
     * The error code associated with the initialization error.
     * This code can be used to identify what went wrong during initialization.
     */
    errorCode: number;
    /**
     * A detailed message providing more details about the initialization error.
     */
    errorMessage: string;
};
/**
 * Represents an error related to the consent view process, extending the IronSourceError.
 */
export type ConsentViewError = IronSourceError & {
    /**
     * The type of the consent view that encountered the error.
     * This can be used to identify which consent view (e.g., GDPR, CCPA) the error is associated with.
     */
    consentViewType: string;
};
//# sourceMappingURL=errors.d.ts.map