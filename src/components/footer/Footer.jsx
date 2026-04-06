import { useEffect, useState } from 'react'
import './Footer.css'

export default function Footer() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const selectors = [
      '.gradient-layout',
      '.csvCreate-container',
      '.formCreate-container',
      '.dashBoard-eventList',
    ]

    const isNearBottom = (target) => {
      if (!target) return false

      const threshold = 12
      return target.scrollTop + target.clientHeight >= target.scrollHeight - threshold
    }

    const updateVisibility = () => {
      const scrollContainers = selectors
        .map((selector) => document.querySelector(selector))
        .filter(Boolean)

      if (scrollContainers.length === 0) {
        const doc = document.documentElement
        setIsVisible(window.innerHeight + window.scrollY >= doc.scrollHeight - 12)
        return
      }

      const hasScrollableContainer = scrollContainers.some(
        (container) => container.scrollHeight > container.clientHeight + 2,
      )

      if (!hasScrollableContainer) {
        setIsVisible(true)
        return
      }

      setIsVisible(scrollContainers.some((container) => isNearBottom(container)))
    }

    const scrollContainers = selectors
      .map((selector) => document.querySelector(selector))
      .filter(Boolean)

    scrollContainers.forEach((container) =>
      container.addEventListener('scroll', updateVisibility, { passive: true }),
    )
    window.addEventListener('scroll', updateVisibility, { passive: true })
    window.addEventListener('resize', updateVisibility)

    updateVisibility()

    return () => {
      scrollContainers.forEach((container) => container.removeEventListener('scroll', updateVisibility))
      window.removeEventListener('scroll', updateVisibility)
      window.removeEventListener('resize', updateVisibility)
    }
  }, [])

  return (
    <footer className={`footer ${isVisible ? 'footer--visible' : ''}`} aria-hidden={!isVisible}>
      <a
        href='https://sites.google.com/view/hubspace-privacy/%ED%99%88'
        target='_blank'
        rel='noreferrer'
        className='footer__link'
      >
        개인정보처리방침
      </a>
      <span className='footer__divider'>|</span>
      <a
        href='https://sites.google.com/view/hubspace-terms/%ED%99%88'
        target='_blank'
        rel='noreferrer'
        className='footer__link'
      >
        이용약관
      </a>
    </footer>
  )
}
