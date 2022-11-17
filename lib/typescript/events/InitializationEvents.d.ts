export declare const InitializationEvents: {
    onInitializationComplete: {
        setListener: (listener: () => void) => void;
        removeListener: () => void;
    };
    removeAllListeners: () => void;
};
