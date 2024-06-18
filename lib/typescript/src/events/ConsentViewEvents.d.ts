import type { ConsentViewError } from '../models';
/**
 * @deprecated This module [ConsentViewEvents] is deprecated and will be removed in future releases.
 * Use IronSource.setConsentViewListener instead.
 *
 * Migration example:
 *
 * Before:
 *
 * import { ConsentViewEvents } from 'ironsource-mediation';
 *
 * ConsentViewEvents.onConsentViewDidLoadSuccess.setListener(yourListener);
 * // Rest of listeners...
 *
 * After:
 *
 * import { IronSource } from 'ironsource-mediation';
 *
 * const listener: ConsentViewListener = {
 *   onConsentViewDidLoadSuccess: (consentViewType: string) => {},
 *   onConsentViewDidFailToLoad: (error: ConsentViewError) => {},
 *   onConsentViewDidShowSuccess: (consentViewType: string) => {},
 *   onConsentViewDidFailToShow: (error: ConsentViewError) => {},
 *   onConsentViewDidAccept: (consentViewType: string) => {},
 * }
 * IronSource.setConsentViewListener(listener);
 */
export declare const ConsentViewEvents: {
    consentViewDidLoadSuccess: {
        setListener: (listener: (consentViewType: string) => void) => void;
        removeListener: () => void;
    };
    consentViewDidFailToLoad: {
        setListener: (listener: (error: ConsentViewError) => void) => void;
        removeListener: () => void;
    };
    consentViewDidShowSuccess: {
        setListener: (listener: (consentViewType: string) => void) => void;
        removeListener: () => void;
    };
    consentViewDidFailToShow: {
        setListener: (listener: (error: ConsentViewError) => void) => void;
        removeListener: () => void;
    };
    consentViewDidAccept: {
        setListener: (listener: (consentViewType: string) => void) => void;
        removeListener: () => void;
    };
    removeAllListeners: () => void;
};
//# sourceMappingURL=ConsentViewEvents.d.ts.map