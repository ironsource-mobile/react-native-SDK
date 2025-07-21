import type { ImpressionData } from "../ImpressionData";

/**
 * Interface for handling ImpressionData events
 * 
 * @deprecated This API will be removed in version 4.0.0.
 */
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
     * 
     * @deprecated This method is deprecated and will be removed in version 4.0.0.
     */
    onImpressionSuccess?: (data?: ImpressionData) => void;   
}