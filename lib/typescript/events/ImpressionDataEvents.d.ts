import { ImpressionData } from '../models';
export declare const ImpressionDataEvents: {
    onImpressionSuccess: {
        setListener: (listener: (data?: ImpressionData) => void) => void;
        removeListener: () => void;
    };
    removeAllListeners: () => void;
};
//# sourceMappingURL=ImpressionDataEvents.d.ts.map