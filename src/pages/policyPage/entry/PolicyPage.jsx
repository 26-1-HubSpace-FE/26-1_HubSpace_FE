import { Link } from 'react-router-dom'
import authLogo from '../../../assets/auth/auth-logo.png'
import { policyContent } from '../utils/policyContent'
import './PolicyPage.css'

const getLineClassName = (line) => {
  if (/^\d+\./.test(line)) return 'policy-page__line policy-page__line--numbered'
  if (/^[가-하]\./.test(line)) return 'policy-page__line policy-page__line--sub'
  if (/^\d+\)/.test(line)) return 'policy-page__line policy-page__line--detail'
  return 'policy-page__line'
}

export default function PolicyPage({ type }) {
  const content = policyContent[type]

  if (!content) return null

  return (
    <div className='policy-page'>
      <div className='policy-page__ambient policy-page__ambient--left' />
      <div className='policy-page__ambient policy-page__ambient--right' />

      <header className='policy-page__hero'>
        <Link to='/' className='policy-page__logoLink' aria-label='홈으로 이동'>
          <img src={authLogo} alt='HubSpace' className='policy-page__logo' />
        </Link>

        <div className='policy-page__heroContent'>
          <div className='policy-page__heroText'>
            <h1 className='policy-page__title'>{content.pageTitle}</h1>
          </div>

          <div className='policy-page__meta'>
            <span className='policy-page__metaChip'>{content.effectiveDate}</span>
            <Link to='/' className='policy-page__metaChip policy-page__metaChip--link'>
              홈으로
            </Link>
          </div>
        </div>
      </header>

      <main className='policy-page__body'>
        <aside className='policy-page__toc'>
          <div className='policy-page__tocCard'>
            <div className='policy-page__tocTitle'>목차</div>
            <nav className='policy-page__tocList'>
              {content.sections.map((section) => (
                <a key={section.id} href={`#${section.id}`} className='policy-page__tocLink'>
                  {section.title}
                </a>
              ))}
            </nav>
          </div>
        </aside>

        <section className='policy-page__content'>
          {content.sections.map((section) => (
            <article key={section.id} id={section.id} className='policy-page__section'>
              <div className='policy-page__sectionHeader'>
                <h2 className='policy-page__sectionTitle'>{section.title}</h2>
              </div>
              <div className='policy-page__sectionBody'>
                {section.lines.map((line, index) =>
                  line === '' ? (
                    <div key={`${section.id}-${index}`} className='policy-page__spacer' />
                  ) : (
                    <p key={`${section.id}-${index}`} className={getLineClassName(line)}>
                      {line}
                    </p>
                  ),
                )}
              </div>
            </article>
          ))}
        </section>
      </main>
    </div>
  )
}
