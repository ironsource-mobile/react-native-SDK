import type { LevelPlayNativeAdListener } from './listeners/LevelPlayNativeAdListener';
/**
 * Class representing a level play native ad
 */
export declare class LevelPlayNativeAd {
    title: string | null | undefined;
    advertiser: string | null | undefined;
    body: string | null | undefined;
    callToAction: string | null | undefined;
    icon: LevelPlayNativeAdIcon | null | undefined;
    private loadAdCallback?;
    private destroyAdCallback?;
    listener?: LevelPlayNativeAdListener | null;
    placement?: string | null;
    constructor(title: string | null | undefined, advertiser: string | null | undefined, body: string | null | undefined, callToAction: string | null | undefined, icon: LevelPlayNativeAdIcon | null | undefined, listener: LevelPlayNativeAdListener | null | undefined, placement: string | null | undefined);
    setLoadAdCallback(callback: (() => void) | null): void;
    setDestroyAdCallback(callback: (() => void) | null): void;
    loadAd: () => void;
    destroyAd(): void;
    toString(): string;
    static builder(): LevelPlayNativeAdBuilder;
}
export declare class LevelPlayNativeAdBuilder {
    private instance;
    constructor();
    withListener(listener: LevelPlayNativeAdListener | null | undefined): LevelPlayNativeAdBuilder;
    withPlacement(placement: string | null | undefined): LevelPlayNativeAdBuilder;
    build(): LevelPlayNativeAd;
}
export type LevelPlayNativeAdIcon = {
    uri: string | null | undefined;
    imageData: string | null | undefined;
};
//# sourceMappingURL=LevelPlayNativeAd.d.ts.map