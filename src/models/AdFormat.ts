/**
 * Enumeration representing different ad formats in the LevelPlay mediation network.
 */
export enum AdFormat {
    /**
     * Banner ad format.
     * Typically a rectangular ad that spans the width of the screen or is fixed in a specific area of an app's layout.
     */
    BANNER = "BANNER",

    /**
     * Interstitial ad format.
     * Full-screen ads that cover the interface of their host app, typically displayed at natural transition points.
     */
    INTERSTITIAL = "INTERSTITIAL",

    /**
     * Rewarded ad format.
     * Users have the option to engage with a full-screen ad in exchange for a reward, such as in-game currency or extra lives.
     */
    REWARDED = "REWARDED",

    /**
     * Native ad format.
     * Ads that match the look, feel, and function of the media format in which they appear.
     */
    NATIVE_AD = "NATIVE_AD"
}