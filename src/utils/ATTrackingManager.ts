/**
 * This is an ATT bridge module.
 * Make sure to add NSUserTrackingUsageDescription to info.plist
 *   if you intend to show ATT request prompt.
 * https://developer.apple.com/documentation/apptrackingtransparency?language=objc
 */
import { NativeModules, Platform } from 'react-native'
const { ATTrackingManagerBridge } = NativeModules

type ATTrackingManagerType = {
  getTrackingAuthorizationStatus(): Promise<number>
  requestTrackingAuthorization(): Promise<number>
}

// For reference
export const ATTStatus = {
  NotDetermined: 0,
  Restricted: 1,
  Denied: 2,
  Authorized: 3,
  Not14: -1,
}

// No reject for non-iOS
const ATTrackingManagerStub = {
  getTrackingAuthorizationStatus: () => Promise.resolve(ATTStatus.Not14),
  requestTrackingAuthorization: () => Promise.resolve(ATTStatus.Not14),
}

export const ATTrackingManager: ATTrackingManagerType =
  Platform.OS === 'ios' ? ATTrackingManagerBridge : ATTrackingManagerStub
