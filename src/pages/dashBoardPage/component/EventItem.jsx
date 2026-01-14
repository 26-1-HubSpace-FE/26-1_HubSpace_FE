import './EventItem.css'

export default function EventItem() {
  return (
    <div>
      <div className='event-header'>
        <div className='event-title'>
          <div className='event-title__title'>이벤트 제목</div>
          <div className='event-title__status'>활성</div>
          <div className='event-title__format'>폼</div>
        </div>
        <div className='event-info'>
          <div className='event-info__createAt'>
            <div className='event-info__createAt--icon'></div>
            2026.01.10
          </div>
          <div className='event-info__views'>
            <div className='event-info__views--icon'></div>
            127 조회
          </div>
        </div>
        <div className='event-item__more'>ㅁ</div>
      </div>
      <div className='event-links'>
        <div className='event-search'>
          <div className='event-search__info'>
            <div className='event-search__title'>조회용 링크</div>
            <div className='event-search__link'>https://formsite.google.com/1234</div>
          </div>
          <div className='event-search__copy'>ㅁ</div>
        </div>
        <div className='event-apply'>
          <div className='event-apply__info'>
            <div className='event-apply__title'>신청용 링크</div>
            <div className='event-apply__link'>https://formsgoogle.com</div>
          </div>
          <div className='event-apply__copy'>ㅁ</div>
        </div>
      </div>
    </div>
  )
}
