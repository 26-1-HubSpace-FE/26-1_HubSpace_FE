import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import './LoginPage.css'
import GradientLayout from '../../../components/gradientLayout/GradientLayout'
import googleIcon from '../../../assets/auth/auth-google-logo.svg'
import authLogo from '../../../assets/auth/auth-logo.png'
import { hasValidSession } from '../../../utils/authStorage'

export default function LoginPage() {
  const navigate = useNavigate()
  const scrollRef = useRef(null)
  const aboutRef = useRef(null)
  const animateScrollRef = useRef(null)

  useEffect(() => {
    if (hasValidSession()) {
      navigate('/dashboard', { replace: true })
    }
  }, [navigate])

  useEffect(() => {
    const scroller = scrollRef.current
    if (!scroller) return
    const animationDuration = 650
    let animationFrameId = null
    let completionTimeoutId = null
    let activeTargetScrollTop = null
    let touchStartY = null

    const getLastPanelScrollTop = () => scroller.scrollHeight - scroller.clientHeight

    const finishScroll = (targetScrollTop) => {
      window.cancelAnimationFrame(animationFrameId)
      window.clearTimeout(completionTimeoutId)
      scroller.scrollTop = targetScrollTop
      activeTargetScrollTop = null
      scroller.classList.remove('login__scroll--snapping')
    }

    const animateScroll = (targetScrollTop) => {
      if (activeTargetScrollTop === targetScrollTop) return

      const startScrollTop = scroller.scrollTop
      const distance = targetScrollTop - startScrollTop
      const startTime = window.performance.now()

      window.cancelAnimationFrame(animationFrameId)
      window.clearTimeout(completionTimeoutId)
      activeTargetScrollTop = targetScrollTop
      scroller.classList.add('login__scroll--snapping')

      const step = (currentTime) => {
        const progress = Math.min((currentTime - startTime) / animationDuration, 1)
        const easedProgress = 1 - (1 - progress) ** 3
        scroller.scrollTop = startScrollTop + distance * easedProgress

        if (progress < 1) {
          animationFrameId = window.requestAnimationFrame(step)
          return
        }

        finishScroll(targetScrollTop)
      }

      animationFrameId = window.requestAnimationFrame(step)
      completionTimeoutId = window.setTimeout(() => {
        finishScroll(targetScrollTop)
      }, animationDuration + 100)
    }

    const handleWheel = (event) => {
      if (event.ctrlKey || Math.abs(event.deltaY) < 4) return

      const targetScrollTop = event.deltaY > 0 ? getLastPanelScrollTop() : 0
      if (Math.abs(scroller.scrollTop - targetScrollTop) < 1) return

      event.preventDefault()
      animateScroll(targetScrollTop)
    }

    const handleTouchStart = (event) => {
      touchStartY = event.touches[0]?.clientY ?? null
    }

    const handleTouchEnd = (event) => {
      if (touchStartY === null) return

      const touchEndY = event.changedTouches[0]?.clientY ?? touchStartY
      const deltaY = touchStartY - touchEndY
      touchStartY = null

      if (Math.abs(deltaY) < 24) return
      animateScroll(deltaY > 0 ? getLastPanelScrollTop() : 0)
    }

    animateScrollRef.current = () => animateScroll(getLastPanelScrollTop())
    scroller.addEventListener('wheel', handleWheel, { passive: false })
    scroller.addEventListener('touchstart', handleTouchStart, { passive: true })
    scroller.addEventListener('touchend', handleTouchEnd, { passive: true })

    return () => {
      animateScrollRef.current = null
      window.cancelAnimationFrame(animationFrameId)
      window.clearTimeout(completionTimeoutId)
      scroller.removeEventListener('wheel', handleWheel)
      scroller.removeEventListener('touchstart', handleTouchStart)
      scroller.removeEventListener('touchend', handleTouchEnd)
    }
  }, [])

  const handleLogin = () => {
    window.location.href = `${import.meta.env.VITE_SERVER_DOMAIN}/oauth2/authorization/google`
  }

  const handleAboutScroll = () => {
    if (animateScrollRef.current) {
      animateScrollRef.current()
      return
    }

    aboutRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <GradientLayout>
      <main ref={scrollRef} className='login__scroll'>
        <section className='login__panel login__panel--hero'>
          <div className='login__intro'>
            <img src={authLogo} alt='HubSpace' className='login__logo' />

            <h2 className='login__title'>폼 신청 여부를 쉽게 확인할 수 있는 서비스</h2>
            <p className='login__description'>신청자는 자신의 신청 여부를 확인하고, 관리자는 문의를 줄일 수 있습니다.</p>
          </div>

          <div className='login__actions'>
            <button onClick={handleLogin} className='login__button'>
              <img src={googleIcon} alt='Google 계정으로 계속하기' />
            </button>

            <button type='button' className='login__scroll-hint' onClick={handleAboutScroll}>
              <span>서비스 알아보기</span>
              <span className='login__scroll-arrow' aria-hidden='true' />
            </button>
          </div>
        </section>

        <section ref={aboutRef} className='login__panel login__panel--about'>
          <section className='login__about' aria-labelledby='login-about-title'>
            <div className='login__about-heading'>
              <span id='login-about-title' className='login__about-label'>HubSpace 안내</span>
            </div>

            <div className='login__about-features'>
              <p className='login__about-feature'>
                <span className='login__about-number' aria-hidden='true'>01</span>
                <span>
                  <strong>신청 확인 환경을 간편하게</strong>
                  Google Forms로 신청을 받거나 CSV·TSV 데이터를 업로드해 신청 내역 조회 페이지를 만들 수 있어요.
                </span>
              </p>
              <p className='login__about-feature'>
                <span className='login__about-number' aria-hidden='true'>02</span>
                <span>
                  <strong>신청 내역은 직접 확인</strong>
                  신청자는 관리자가 공유한 조회 URL에서 자신의 신청 내역을 바로 확인할 수 있어요.
                </span>
              </p>
            </div>

            <p className='login__permission-note'>
              <strong>Google Forms 권한</strong>
              이벤트 신청용 Google Form을 생성하고 관리하는 목적으로만 사용합니다.
            </p>
          </section>
        </section>
      </main>
    </GradientLayout>
  )
}
