type ATTrackingManagerType = {
    getTrackingAuthorizationStatus(): Promise<number>;
    requestTrackingAuthorization(): Promise<number>;
};
export declare const ATTStatus: {
    NotDetermined: number;
    Restricted: number;
    Denied: number;
    Authorized: number;
    Not14: number;
};
export declare const ATTrackingManager: ATTrackingManagerType;
export {};
//# sourceMappingURL=ATTrackingManager.d.ts.map