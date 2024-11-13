import type { AdFormat } from './AdFormat'

/**
 * Represents an initialization request for LevelPlay.
 */
export class LevelPlayInitRequest {
  appKey: string
  userId: string | null
  legacyAdFormats: AdFormat[]

  constructor(
    appKey: string,
    userId: string | null,
    legacyAdFormats: AdFormat[]
  ) {
    this.appKey = appKey
    this.userId = userId ?? ''
    this.legacyAdFormats = legacyAdFormats
  }

  toMap(): any {
    return {
      appKey: this.appKey,
      userId: this.userId,
      adFormats: this.legacyAdFormats.map(adFormat => adFormat.toString()),
    }
  }

  toString(): string {
    return `LevelPlayNativeAd {
          appKey: ${this.appKey},
          userId: ${this.userId},
          legacyAdFormats: ${this.legacyAdFormats},
        }`
  }

  static builder(appKey: string): LevelPlayInitRequestBuilder {
    return new LevelPlayInitRequestBuilder(appKey)
  }
}

export class LevelPlayInitRequestBuilder {
  private instance: LevelPlayInitRequest

  constructor(appKey: string) {
    this.instance = new LevelPlayInitRequest(appKey, '', [])
  }

  withUserId(userId: string) {
    this.instance.userId = userId
    return this
  }

  withLegacyAdFormats(legacyAdFormats: AdFormat[]) {
    this.instance.legacyAdFormats = legacyAdFormats
    return this
  }

  build(): LevelPlayInitRequest {
    return this.instance
  }
}
