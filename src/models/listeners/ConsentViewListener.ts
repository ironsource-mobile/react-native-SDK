import type { ConsentViewError } from "../errors";

// Interface for handling ConsentView events
export interface ConsentViewListener {
  /**
   * iOS 14 ConsentView events API
   * Only fired on iOS
   */

  /**
   * Android: n/a
   *     iOS: consentViewDidLoadSuccess
   */
  onConsentViewDidLoadSuccess?: (consentViewType: string) => void;
  /**
   * Android: n/a
   *     iOS: consentViewDidFailToLoadWithError
   */
  onConsentViewDidFailToLoad?: (error: ConsentViewError) => void;
  /**
   * Android: n/a
   *     iOS: consentViewDidShowSuccess
   */
  onConsentViewDidShowSuccess?: (consentViewType: string) => void;
  /**
   * Android: n/a
   *     iOS: consentViewDidFailToShowWithError
   */
  onConsentViewDidFailToShow?: (error: ConsentViewError) => void;
  /**
   * Android: n/a
   *     iOS: consentViewDidAccept
   */
  onConsentViewDidAccept?: (consentViewType: string) => void;
}