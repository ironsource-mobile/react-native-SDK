export interface InitializationListener {
    /**
     * InitializationListener Callback Events Handler APIs
     */
    /**
     * The listener will be called on the first SDK init completion.
     * Android: onInitializationComplete
     *     iOS: initializationDidComplete
     */
    onInitializationComplete?: () => void;
}
//# sourceMappingURL=InitializationListener.d.ts.map