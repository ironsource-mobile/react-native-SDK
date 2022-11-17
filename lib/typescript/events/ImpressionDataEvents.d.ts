import { ImpressionData } from '../models';
export declare const ImpressionDataEvents: {
    onImpressionSuccess: {
        setListener: (listener: (data?: {
            auctionId: string | undefined;
            adUnit: string | undefined;
            country: string | undefined;
            ab: string | undefined;
            segmentName: string | undefined;
            placement: string | undefined;
            adNetwork: string | undefined;
            instanceName: string | undefined;
            instanceId: string | undefined;
            revenue: number | undefined;
            precision: string | undefined;
            lifetimeRevenue: number | undefined;
            encryptedCPM: string | undefined;
        } | undefined) => void) => void;
        removeListener: () => void;
    };
    removeAllListeners: () => void;
};
