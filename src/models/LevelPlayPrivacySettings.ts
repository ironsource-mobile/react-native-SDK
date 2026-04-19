import NativeLevelPlayMediation from '../specs/NativeLevelPlayMediation'

/**
 * LevelPlayPrivacySettings provides privacy APIs for the LevelPlay SDK.
 * Use these methods to set privacy flags for GDPR, CCPA, and COPPA compliance.
 */
type LevelPlayPrivacySettingsType = {
  /**
   * Sets the consent per network. A map of network keys to boolean values that indicates whether
   * the user has granted consent for each network to collect and share data. Consent is used for
   * GDPR compliance.
   *
   * @param networkConsents - A map where keys are network identifiers and values indicate consent
   *   status, true if the user has granted consent, false otherwise.
   *
   * @example
   * ```typescript
   * LevelPlayPrivacySettings.setGDPRConsents({
   *   'AdMob': true,
   *   'Facebook': false,
   *   'UnityAds': true
   * });
   * ```
   *
   * Android: LevelPlayPrivacySettings.setGDPRConsents
   *     iOS: LPMPrivacySettings.setGDPRConsents
   */
  setGDPRConsents(networkConsents: { [key: string]: boolean }): Promise<void>

  /**
   * Sets the CCPA (California Consumer Privacy Act) flag. This flag indicates whether the user has
   * opted out of the sale of their personal information.
   *
   * @param value - true if the user has opted out of the sale of their personal information, false
   *   otherwise.
   *
   * @example
   * ```typescript
   * LevelPlayPrivacySettings.setCCPA(true);
   * ```
   *
   * Android: LevelPlayPrivacySettings.setCCPA
   *     iOS: LPMPrivacySettings.setCCPA
   */
  setCCPA(value: boolean): Promise<void>

  /**
   * Sets the COPPA (Children's Online Privacy Protection Act) flag. This flag indicates whether the
   * user is a child under the age of 13. This will apply COPPA settings to all supported network
   * adapters.
   *
   * @param value - true if the user is a child under the age of 13, false otherwise.
   *
   * @example
   * ```typescript
   * LevelPlayPrivacySettings.setCOPPA(false);
   * ```
   *
   * Android: LevelPlayPrivacySettings.setCOPPA
   *     iOS: LPMPrivacySettings.setCOPPA
   */
  setCOPPA(value: boolean): Promise<void>
}

/**
 * LevelPlayPrivacySettings singleton instance.
 * Provides privacy compliance methods for GDPR, CCPA, and COPPA.
 */
export const LevelPlayPrivacySettings: LevelPlayPrivacySettingsType = {
  setGDPRConsents: async (
    networkConsents: { [key: string]: boolean }
  ): Promise<void> => {
    return await NativeLevelPlayMediation.setGDPRConsents(networkConsents)
  },

  setCCPA: async (value: boolean): Promise<void> => {
    return await NativeLevelPlayMediation.setCCPA(value)
  },

  setCOPPA: async (value: boolean): Promise<void> => {
    return await NativeLevelPlayMediation.setCOPPA(value)
  },
}
