import type { ConsentViewError } from "../errors";
/**
 * Interface for handling ConsentView events
 * @deprecated this interface is deprecated and will be removed in version 4.0.0.
 */
export interface ConsentViewListener {
    /**
     * iOS 14 ConsentView events API
     * Only fired on iOS
     */
    /**
     * Android: n/a
     *     iOS: consentViewDidLoadSuccess
     * @deprecated this method is deprecated and will be removed in version 4.0.0.
     */
    onConsentViewDidLoadSuccess?: (consentViewType: string) => void;
    /**
     * Android: n/a
     *     iOS: consentViewDidFailToLoadWithError
     * @deprecated this method is deprecated and will be removed in version 4.0.0.
     */
    onConsentViewDidFailToLoad?: (error: ConsentViewError) => void;
    /**
     * Android: n/a
     *     iOS: consentViewDidShowSuccess
     * @deprecated this method is deprecated and will be removed in version 4.0.0.
     */
    onConsentViewDidShowSuccess?: (consentViewType: string) => void;
    /**
     * Android: n/a
     *     iOS: consentViewDidFailToShowWithError
     *  @deprecated this method is deprecated and will be removed in version 4.0.0.
     */
    onConsentViewDidFailToShow?: (error: ConsentViewError) => void;
    /**
     * Android: n/a
     *     iOS: consentViewDidAccept
     * @deprecated this method is deprecated and will be removed in version 4.0.0.
     */
    onConsentViewDidAccept?: (consentViewType: string) => void;
}
//# sourceMappingURL=ConsentViewListener.d.ts.map