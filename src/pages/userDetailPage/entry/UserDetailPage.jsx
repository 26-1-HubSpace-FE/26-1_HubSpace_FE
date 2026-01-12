import './UserDetailPage.css'

// 사용자 이벤트 신청 조회 페이지
function UserDetailPage() {
  return (
    // 전체 페이지
    <div className='user-detail'>
      {/* 중앙 흰색 카드 */}
      <div className='user-detail__card'>
        <h1 className='user-detail__title'>이벤트 신청 조회</h1>
        <p className='user-detail__description'>이벤트 신청 여부를 정보 입력 후 확인 가능합니다</p>

        <form className='user-detail__form'>
          <div className='user-detail__field'>
            <label htmlFor='name' className='user-detail__label'>
              이름
            </label>
            <input
              type='text'
              id='name'
              className='user-detail__input'
              placeholder='이름을 입력해주세요.'
            />
          </div>

          <div className='user-detail__field'>
            <label htmlFor='studentId' className='user-detail__label'>
              학번
            </label>
            <input
              type='text'
              id='studentId'
              className='user-detail__input'
              placeholder='학번 10자리를 입력해주세요.'
            />
          </div>

          <div className='user-detail__field'>
            <label htmlFor='birth' className='user-detail__label'>
              생년월일
            </label>
            <input
              type='text'
              id='birth'
              className='user-detail__input'
              placeholder='생년월일 6자리를 입력해주세요.'
            />
          </div>

          <button type='submit' className='user-detail__button'>
            조회하기
          </button>
        </form>
      </div>
    </div>
  )
}

export default UserDetailPage
