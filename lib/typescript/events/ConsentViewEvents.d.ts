import { ConsentViewError } from '../models';
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