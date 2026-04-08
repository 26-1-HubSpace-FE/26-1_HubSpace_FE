import './Footer.css'

export default function Footer() {
  return (
    <footer className='footer'>
      <a
        href='https://privacy.hubspacekw.com/'
        target='_blank'
        rel='noreferrer'
        className='footer__link'
      >
        개인정보처리방침
      </a>
      <span className='footer__divider'>|</span>
      <a
        href='https://terms.hubspacekw.com/'
        target='_blank'
        rel='noreferrer'
        className='footer__link'
      >
        이용약관
      </a>
    </footer>
  )
}
