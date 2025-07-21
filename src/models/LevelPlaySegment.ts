/**
 * LevelPlaySegment model represents a segment in LevelPlay.
 */
export type LevelPlaySegment = {
  segmentName?: string
  isPaying?: boolean
  level?: number // Int
  userCreationDate?: number // Long
  iapTotal?: number // Double
  customParameters?: {
    [key: string]: string
  }
}
