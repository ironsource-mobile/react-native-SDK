import { IronSourceError, IronSourceOWCreditInfo } from '../models';
export declare const OfferwallEvents: {
    onOfferwallAvailabilityChanged: {
        setListener: (listener: (isAvailable: boolean) => void) => void;
        removeListener: () => void;
    };
    onOfferwallOpened: {
        setListener: (listener: () => void) => void;
        removeListener: () => void;
    };
    onOfferwallShowFailed: {
        setListener: (listener: (error: IronSourceError) => void) => void;
        removeListener: () => void;
    };
    onOfferwallAdCredited: {
        setListener: (listener: (creditInfo: IronSourceOWCreditInfo) => void) => void;
        removeListener: () => void;
    };
    onGetOfferwallCreditsFailed: {
        setListener: (listener: (error: IronSourceError) => void) => void;
        removeListener: () => void;
    };
    onOfferwallClosed: {
        setListener: (listener: () => void) => void;
        removeListener: () => void;
    };
    removeAllListeners: () => void;
};
