import type { LevelPlayConfiguration } from "../LevelPlayConfiguration";
import type { LevelPlayInitError } from "../errors";

/**
 * Interface for handling LevelPlay Init events
 */
export interface LevelPlayInitListener {
    /**
     * Called after init failed.
     * [error] includes information about the error
     * 
     * Android: onAdLoaded
     *     iOS: didLoad
     */
    onInitFailed: (error: LevelPlayInitError) => void;
    /**
     * Callback when init success.
     * [configuration] includes information the success
     * 
     * Android: onAdLoadFailed
     *     iOS: didFailToLoad
     */
    onInitSuccess: (configuration: LevelPlayConfiguration) => void;
  }