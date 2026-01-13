import './LoginPage.css'

export default function LoginPage() {
  return (
    <div className='login'>
      {/* HubSpace 로고 임시 */}
      <h1 className='login__logo'>HubSpace</h1>

      <h2 className='login__title'>관리자 로그인</h2>
      <p className='login__description'>이벤트 관리 시스템에 접속하세요</p>

      <div className='login__card'>
        <p className='login__guide'>Google 계정으로 간편하게 로그인하세요</p>

        {/* onClick={handleGoogleLogin */}
        {/* 구글 아이콘 임시 */}
        <button type='button' className='login__google-button'>
          Google 계정으로 로그인
        </button>
      </div>
    </div>
  )
}
