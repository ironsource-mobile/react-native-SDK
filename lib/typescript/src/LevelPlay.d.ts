import type { LevelPlayInitListener, LevelPlayInitRequest } from './models';
/**
 * Defines the methods for LevelPlay.
 */
type LevelPlayType = {
    /**
     * Initializes the LevelPlay SDK with the given request and listener.
     * @param initRequest - The initialization request object.
     * @param initListener - The listener to handle initialization events.
     * @returns A Promise that resolves when initialization is complete.
     */
    init(initRequest: LevelPlayInitRequest, initListener: LevelPlayInitListener): Promise<void>;
};
export declare const LevelPlay: LevelPlayType;
export {};
//# sourceMappingURL=LevelPlay.d.ts.map