import privacyRaw from '../content/privacyPolicy.txt?raw'
import termsRaw from '../content/termsOfService.txt?raw'

const buildId = (text) =>
  text
    .replace(/[^\w가-힣]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .toLowerCase()

const parsePolicyText = (rawText) => {
  const normalized = rawText.replace(/\r\n/g, '\n').trim()
  const lines = normalized.split('\n')
  const pageTitle = lines.shift().replace(/^#\s*/, '').trim()
  const sections = []
  let currentSection = null

  const pushCurrentSection = () => {
    if (currentSection) {
      sections.push(currentSection)
    }
  }

  lines.forEach((line) => {
    const trimmed = line.trim()
    if (!trimmed) {
      if (currentSection && currentSection.lines.at(-1) !== '') {
        currentSection.lines.push('')
      }
      return
    }

    const isSectionTitle = /^제\d+조/.test(trimmed) || trimmed === '부칙'

    if (isSectionTitle) {
      pushCurrentSection()
      currentSection = {
        id: buildId(trimmed),
        title: trimmed,
        lines: [],
      }
      return
    }

    if (!currentSection) {
      currentSection = {
        id: buildId(pageTitle),
        title: pageTitle,
        lines: [],
      }
    }

    currentSection.lines.push(trimmed)
  })

  pushCurrentSection()

  return { pageTitle, sections }
}

export const policyContent = {
  privacy: {
    ...parsePolicyText(privacyRaw),
    key: 'privacy',
    effectiveDate: '2026.04.06 시행',
  },
  terms: {
    ...parsePolicyText(termsRaw),
    key: 'terms',
    effectiveDate: '2026.04.06 시행',
  },
}
