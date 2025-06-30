/**
 * Interface for handling Initialization events
 * @deprecated this interface is deprecated and will be removed in version 4.0.0.
 * Use the new `LevelPlayInitListener` interface instead.
 */
export interface InitializationListener {
    /**
     * InitializationListener Callback Events Handler APIs
     */

    /**
     * The listener will be called on the first SDK init completion.
     * Android: onInitializationComplete
     *     iOS: initializationDidComplete
     * *  @deprecated this method is deprecated and will be removed in version 4.0.0.
     */
    onInitializationComplete?: () => void;   
}