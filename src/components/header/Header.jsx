export default function Header() {
  return (
    <div className='header'>
      <div className='header-title'>
        <div className='header-title__logo'>
          <div className='header-title__title'>HubSpace</div>
        </div>
      </div>
      <div className='header-account'>
        <div className='header-accout__profile'>
          <div className='header-account__info'>
            <div className='header-account__nickname'>홍길동님</div>
            <div className='header-account__email'>example@gmail.com</div>
          </div>
        </div>
      </div>
    </div>
  )
}
