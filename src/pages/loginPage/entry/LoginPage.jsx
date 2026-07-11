import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import './LoginPage.css'
import GradientLayout from '../../../components/gradientLayout/GradientLayout'
import googleIcon from '../../../assets/auth/auth-google-logo.svg'
import authLogo from '../../../assets/auth/auth-logo.png'
import { hasValidSession } from '../../../utils/authStorage'

export default function LoginPage() {
  const navigate = useNavigate()
  const aboutRef = useRef(null)

  useEffect(() => {
    if (hasValidSession()) {
      navigate('/dashboard', { replace: true })
    }
  }, [navigate])

  const handleLogin = () => {
    window.location.href = `${import.meta.env.VITE_SERVER_DOMAIN}/oauth2/authorization/google`
  }

  const handleAboutScroll = () => {
    aboutRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <GradientLayout>
      <main className='login__scroll'>
        <section className='login__panel login__panel--hero'>
          <img src={authLogo} alt='HubSpace' className='login__logo' />

          <h2 className='login__title'>폼 신청 여부를 쉽게 확인할 수 있는 서비스</h2>
          <p className='login__description'>신청자는 자신의 신청 여부를 확인하고, 관리자는 문의를 줄일 수 있습니다.</p>

          <button onClick={handleLogin} className='login__button'>
            <img src={googleIcon} alt='Google 계정으로 계속하기' />
          </button>

          <button type='button' className='login__scroll-hint' onClick={handleAboutScroll}>
            <span>서비스 알아보기</span>
            <span className='login__scroll-arrow' aria-hidden='true' />
          </button>
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
