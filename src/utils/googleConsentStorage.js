const GOOGLE_CONSENT_DRAFT_KEY = 'googleConsentFormDraft'
const GOOGLE_CONSENT_RETURN_PATH_KEY = 'googleConsentReturnPath'

export const saveGoogleConsentRequest = (draft) => {
  sessionStorage.setItem(GOOGLE_CONSENT_DRAFT_KEY, JSON.stringify(draft))
  sessionStorage.setItem(GOOGLE_CONSENT_RETURN_PATH_KEY, '/newform')
}

export const consumeGoogleConsentDraft = () => {
  const storedDraft = sessionStorage.getItem(GOOGLE_CONSENT_DRAFT_KEY)
  sessionStorage.removeItem(GOOGLE_CONSENT_DRAFT_KEY)

  if (!storedDraft) return null

  try {
    return JSON.parse(storedDraft)
  } catch {
    return null
  }
}

export const consumeGoogleConsentReturnPath = () => {
  const returnPath = sessionStorage.getItem(GOOGLE_CONSENT_RETURN_PATH_KEY)
  sessionStorage.removeItem(GOOGLE_CONSENT_RETURN_PATH_KEY)
  return returnPath === '/newform' ? returnPath : null
}

export const hasPendingGoogleConsent = () =>
  sessionStorage.getItem(GOOGLE_CONSENT_RETURN_PATH_KEY) !== null
