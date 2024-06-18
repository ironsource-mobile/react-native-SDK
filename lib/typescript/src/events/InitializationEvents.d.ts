/**
 * @deprecated This module [InitializationEvents] is deprecated and will be removed in future releases.
 * Use IronSource.setInitializationListener instead.
 *
 * Migration example:
 *
 * Before:
 *
 * import { InitializationEvents } from 'ironsource-mediation';
 *
 * InitializationEvents.onInitializationComplete.setListener(yourListener);
 *
 * After:
 *
 * import { IronSource } from 'ironsource-mediation';
 *
 * const listener: InitializationListener = {
 *  onInitializationComplete: () => {},
 * };
 * IronSource.setInitializationListener(listener);
 */
export declare const InitializationEvents: {
    onInitializationComplete: {
        setListener: (listener: () => void) => void;
        removeListener: () => void;
    };
    removeAllListeners: () => void;
};
//# sourceMappingURL=InitializationEvents.d.ts.map