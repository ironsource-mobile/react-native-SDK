import type { LevelPlayImpressionDataListener, LevelPlayInitListener, LevelPlayInitRequest } from './models';
import type { LevelPlaySegment } from './models/LevelPlaySegment';
/**
 * Defines the methods for LevelPlay.
 */
type LevelPlayType = {
    /**
     * Validates the integration of the LevelPlay SDK.
     *
     * Android: validateIntegration
     *     iOS: validateIntegration
     */
    validateIntegration(): Promise<void>;
    /**
     * Sets a dynamic user ID for tracking purposes.
     *
     * Android: setDynamicUserId
     *     iOS: setDynamicUserId
     */
    setDynamicUserId(userId: string): Promise<void>;
    /**
     * Enables or disables debug mode for LevelPlay adapters.
     *
     * Android: setAdaptersDebug
     *     iOS: setAdaptersDebug
     */
    setAdaptersDebug(isEnabled: boolean): Promise<void>;
    /**
     * Sets the user's consent status for data collection.
     *
     * Android: setConsent
     *     iOS: setConsent
     */
    setConsent(isConsent: boolean): Promise<void>;
    /**
     * Sets metadata with key-value pairs for custom configurations.
     *
     * Android: setMetaData
     *     iOS: setMetaDataWithKey
     */
    setMetaData(key: string, values: Array<string>): Promise<void>;
    /**
     * Configures a user segment with specific attributes for targeting purposes.
     *
     * Android: setSegment
     *     iOS: setSegment
     */
    setSegment(segment: LevelPlaySegment): Promise<void>;
    /**
     * Launches the LevelPlay Test Suite for debugging and validation.
     *
     * Android: launchTestSuite
     *     iOS: launchTestSuite
     */
    launchTestSuite(): Promise<void>;
    /**
     * Initializes the LevelPlay SDK with the given request and listener.
     * @param initRequest - The initialization request object.
     * @param initListener - The listener to handle initialization events.
     * @returns A Promise that resolves when initialization is complete.
     */
    init(initRequest: LevelPlayInitRequest, initListener: LevelPlayInitListener): Promise<void>;
    /**
     * Adds a listener for receiving impression data events.
     * @param listener - The listener to handle impression data events.
     */
    addImpressionDataListener: (listener: LevelPlayImpressionDataListener) => Promise<void>;
    /**
     * @returns The version of the LevelPlay plugin.
     */
    getPluginVersion: () => string;
    /**
     * @returns The native SDK version of LevelPlay.
     */
    getNativeSDKVersion: () => string;
};
export declare const LevelPlay: LevelPlayType;
export {};
//# sourceMappingURL=LevelPlay.d.ts.map