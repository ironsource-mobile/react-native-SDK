/** Segment ===================================================================**/
export type IronSourceUserGender = 'female' | 'male';
/**
 * Send Segment related info to the server by one of two methods:
 *   Method 1: Specify the segmentName if you know to which Segment the user belongs.
 *   Method 2: Send parameters to have the server find a matching Segment.
 *
 * If both name and params are sent, the server would first try to find by name,
 *   then try by params if there is no match by name.
 *
 * Up to 5 custom parameters are allowed.
 */
export type IronSourceSegment = {
    segmentName?: string;
    gender?: IronSourceUserGender;
    age?: number;
    level?: number;
    isPaying?: boolean;
    userCreationDateInMillis?: number;
    iapTotal?: number;
    customParameters?: {
        [key: string]: string;
    };
};
//# sourceMappingURL=IronSourceSegment.d.ts.map