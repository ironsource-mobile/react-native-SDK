/**
 * Represents an initialization request for LevelPlay.
 */
export class LevelPlayInitRequest {
  appKey: string
  userId: string | null

  constructor(appKey: string, userId: string | null) {
    this.appKey = appKey
    this.userId = userId ?? ''
  }

  toMap(): any {
    return {
      appKey: this.appKey,
      userId: this.userId,
    }
  }

  toString(): string {
    return `LevelPlayInitRequest {
          appKey: ${this.appKey},
          userId: ${this.userId}
        }`
  }

  static builder(appKey: string): LevelPlayInitRequestBuilder {
    return new LevelPlayInitRequestBuilder(appKey)
  }
}

export class LevelPlayInitRequestBuilder {
  private instance: LevelPlayInitRequest

  constructor(appKey: string) {
    this.instance = new LevelPlayInitRequest(appKey, '')
  }

  withUserId(userId: string) {
    this.instance.userId = userId
    return this
  }

  build(): LevelPlayInitRequest {
    return this.instance
  }
}
