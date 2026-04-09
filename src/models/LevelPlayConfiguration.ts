/**
 * Represents the configuration settings for LevelPlay.
 */
export type LevelPlayConfiguration = {
  /**
   * Indicates whether ad quality monitoring is enabled.
   * When true, ad quality features are active, providing insights and metrics about ad quality.
   */
  isAdQualityEnabled: boolean
  /**
   * AB testing identifier string.
   * Optional string value used to identify the AB testing group or variant.
   */
  ab?: string | null
}
