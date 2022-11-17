/**
 * Offerwall Credit
 */
export type IronSourceOWCreditInfo = {
  credits: number
  totalCredits: number
  // This should be always false since the OW listener bridge always return true for onOfferwallAdCredited.
  // However in some cases, we won’t be able to provide the exact amount of credits earned
  //   since the previous OW credited event (specifically when the user clears the app data).
  // In such cases 'credits' will also represent 'totalCredits', and this will be 'true'.
  totalCreditsFlag: boolean
}
