"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ConsentViewEvents = void 0;
var _reactNative = require("react-native");
var _models = require("../models");
var _ConsentViewInfo = require("../models/ConsentViewInfo");
var _utils = require("../models/utils");
// The Main Module
const {
  IronSourceMediation
} = _reactNative.NativeModules;
// Event Name Constants defined on iOS platform
// These would be undefined on Android.
const {
  CONSENT_VIEW_DID_LOAD_SUCCESS,
  CONSENT_VIEW_DID_FAIL_TO_LOAD,
  CONSENT_VIEW_DID_SHOW_SUCCESS,
  CONSENT_VIEW_DID_FAIL_TO_SHOW,
  CONSENT_VIEW_DID_ACCEPT
} = IronSourceMediation.getConstants();

// Create an EventEmitter to subscribe to ConsentView delegate callbacks
const eventEmitter = new _reactNative.NativeEventEmitter(IronSourceMediation);

// Stub out for Android
const NotIOS = _reactNative.Platform.OS !== 'ios';
const NonIOSStub = {
  setListener: _ => console.error('Only supported for iOS.'),
  removeListener: () => console.error('Only supported for iOS.')
};

/**
 * iOS 14 ConsentView events API
 * Only fired on iOS
 */

/**
 * Android: n/a
 *     iOS: consentViewDidLoadSuccess
 */
const consentViewDidLoadSuccess = NotIOS ? NonIOSStub : {
  setListener: listener => {
    eventEmitter.removeAllListeners(CONSENT_VIEW_DID_LOAD_SUCCESS);
    eventEmitter.addListener(CONSENT_VIEW_DID_LOAD_SUCCESS, consentViewInfoObj => {
      const {
        consentViewType
      } = (0, _utils.decode)(_ConsentViewInfo.consentViewInfoCodec, consentViewInfoObj);
      listener(consentViewType);
    });
  },
  removeListener: () => eventEmitter.removeAllListeners(CONSENT_VIEW_DID_LOAD_SUCCESS)
};

/**
 * Android: n/a
 *     iOS: consentViewDidFailToLoadWithError
 */
const consentViewDidFailToLoad = NotIOS ? NonIOSStub : {
  setListener: listener => {
    eventEmitter.removeAllListeners(CONSENT_VIEW_DID_FAIL_TO_LOAD);
    eventEmitter.addListener(CONSENT_VIEW_DID_FAIL_TO_LOAD, errorObj => listener((0, _utils.decode)(_models.consentViewErrorCodec, errorObj)));
  },
  removeListener: () => eventEmitter.removeAllListeners(CONSENT_VIEW_DID_FAIL_TO_LOAD)
};

/**
 * Android: n/a
 *     iOS: consentViewDidShowSuccess
 */
const consentViewDidShowSuccess = NotIOS ? NonIOSStub : {
  setListener: listener => {
    eventEmitter.removeAllListeners(CONSENT_VIEW_DID_SHOW_SUCCESS);
    eventEmitter.addListener(CONSENT_VIEW_DID_SHOW_SUCCESS, consentViewInfoObj => {
      const {
        consentViewType
      } = (0, _utils.decode)(_ConsentViewInfo.consentViewInfoCodec, consentViewInfoObj);
      listener(consentViewType);
    });
  },
  removeListener: () => eventEmitter.removeAllListeners(CONSENT_VIEW_DID_SHOW_SUCCESS)
};

/**
 * Android: n/a
 *     iOS: consentViewDidFailToShowWithError
 */
const consentViewDidFailToShow = NotIOS ? NonIOSStub : {
  setListener: listener => {
    eventEmitter.removeAllListeners(CONSENT_VIEW_DID_FAIL_TO_SHOW);
    eventEmitter.addListener(CONSENT_VIEW_DID_FAIL_TO_SHOW, errorObj => listener((0, _utils.decode)(_models.consentViewErrorCodec, errorObj)));
  },
  removeListener: () => eventEmitter.removeAllListeners(CONSENT_VIEW_DID_FAIL_TO_SHOW)
};

/**
 * Android: n/a
 *     iOS: consentViewDidAccept
 */
const consentViewDidAccept = NotIOS ? NonIOSStub : {
  setListener: listener => {
    eventEmitter.removeAllListeners(CONSENT_VIEW_DID_ACCEPT);
    eventEmitter.addListener(CONSENT_VIEW_DID_ACCEPT, ({
      consentViewType
    }) => listener(consentViewType));
  },
  removeListener: () => eventEmitter.removeAllListeners(CONSENT_VIEW_DID_ACCEPT)
};
const removeAllListeners = () => {
  consentViewDidLoadSuccess.removeListener();
  consentViewDidFailToLoad.removeListener();
  consentViewDidShowSuccess.removeListener();
  consentViewDidFailToShow.removeListener();
  consentViewDidAccept.removeListener();
};

/**
 * @deprecated This module [ConsentViewEvents] is deprecated and will be removed in future releases.
 * Use IronSource.setConsentViewListener instead.
 * 
 * Migration example:
 * 
 * Before:
 * 
 * import { ConsentViewEvents } from 'ironsource-mediation';
 * 
 * ConsentViewEvents.onConsentViewDidLoadSuccess.setListener(yourListener);
 * // Rest of listeners...
 * 
 * After:
 * 
 * import { IronSource } from 'ironsource-mediation';
 * 
 * const listener: ConsentViewListener = {
 *   onConsentViewDidLoadSuccess: (consentViewType: string) => {},
 *   onConsentViewDidFailToLoad: (error: ConsentViewError) => {},
 *   onConsentViewDidShowSuccess: (consentViewType: string) => {},
 *   onConsentViewDidFailToShow: (error: ConsentViewError) => {},
 *   onConsentViewDidAccept: (consentViewType: string) => {},
 * }
 * IronSource.setConsentViewListener(listener);
 */
const ConsentViewEvents = exports.ConsentViewEvents = {
  consentViewDidLoadSuccess,
  consentViewDidFailToLoad,
  consentViewDidShowSuccess,
  consentViewDidFailToShow,
  consentViewDidAccept,
  removeAllListeners
};
//# sourceMappingURL=ConsentViewEvents.js.map