import NativeLevelPlayMediation from '../specs/NativeLevelPlayMediation';

/**
 * LevelPlayPrivacySettings provides privacy APIs for the LevelPlay SDK.
 * Use these methods to set privacy flags for GDPR, CCPA, and COPPA compliance.
 */

/**
 * LevelPlayPrivacySettings singleton instance.
 * Provides privacy compliance methods for GDPR, CCPA, and COPPA.
 */
export const LevelPlayPrivacySettings = {
  setGDPRConsents: async networkConsents => {
    return await NativeLevelPlayMediation.setGDPRConsents(networkConsents);
  },
  setCCPA: async value => {
    return await NativeLevelPlayMediation.setCCPA(value);
  },
  setCOPPA: async value => {
    return await NativeLevelPlayMediation.setCOPPA(value);
  }
};
//# sourceMappingURL=LevelPlayPrivacySettings.js.map