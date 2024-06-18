import type { ImpressionData } from '../models';
/**
 * @deprecated This module [ImpressionDataEvents] is deprecated and will be removed in future releases.
 * Use IronSource.setImpressionDataListener instead.
 *
 * Migration example:
 *
 * Before:
 *
 * import { ImpressionDataEvents } from 'ironsource-mediation';
 *
 * ImpressionDataEvents.onImpressionSuccess.setListener(yourListener);
 *
 * After:
 *
 * import { IronSource } from 'ironsource-mediation';
 *
 * const listener: ImpressionDataListener = {
 *   onImpressionSuccess: (data?: ImpressionData) => {},
 * }
 * IronSource.setImpressionDataListener(listener);
 */
export declare const ImpressionDataEvents: {
    onImpressionSuccess: {
        setListener: (listener: (data?: ImpressionData) => void) => void;
        removeListener: () => void;
    };
    removeAllListeners: () => void;
};
//# sourceMappingURL=ImpressionDataEvents.d.ts.map