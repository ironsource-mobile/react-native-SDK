import type { ImpressionData } from "../ImpressionData";
export interface ImpressionDataListener {
    /**
     * Invoked on impression data success
     * [data] includes information about the impression data
     *
     * ARM ImpressionDataListener event API
     * The ARM SDK Postbacks flag must be enabled to receive data
     * https://developers.is.com/ironsource-mobile/general/ad-revenue-measurement-postbacks/#step-1
     *
     * Android: onImpressionSuccess
     *     iOS: impressionDataDidSucceed
     */
    onImpressionSuccess?: (data?: ImpressionData) => void;
}
//# sourceMappingURL=ImpressionDataListener.d.ts.map