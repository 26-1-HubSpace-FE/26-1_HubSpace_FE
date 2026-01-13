import './UserResultPage.css'

// 사용자 이벤트 신청 조회 결과 페이지
export default function UserResultPage() {
  // 더미 데이터
  const resultType = 'error'
  const userInfo = {
    name: '조성찬',
    studentId: '0000000000',
    birth: '000000',
    submissionStatus: '제출 완료',
  }

  let title2 = ''
  if (resultType === 'success') {
    title2 = '정보가 정상적으로 조회되었습니다.'
  } else if (resultType === 'detail') {
    title2 = '정보가 아래와 같이 조회되었습니다.'
  } else {
    title2 = '해당 정보로 조회된 기록이 없습니다.'
  }

  return (
    // 전체 페이지
    <div className='user-result'>
      {/* 중앙 흰색 결과 카드 */}
      <div className='user-result__card'>
        <h1 className='user-result__title__01'>{userInfo.name}님,</h1>
        <h2 className='user-result__title__02'>{title2}</h2>

        {/* 사용자 정보 */}
        {resultType === 'detail' && (
          <div className='user-result__box'>
            <div className='user-result__info'>이름: {userInfo.name}</div>
            <div className='user-result__info'>학번: {userInfo.studentId}</div>
            <div className='user-result__info'>생년월일: {userInfo.birth}</div>
            <div className='user-result__info'>제출 여부: {userInfo.submissionStatus}</div>
          </div>
        )}

        <button
          type='button'
          className={
            resultType === 'detail'
              ? 'user-result__button__01'
              : 'user-result__button__01 user-result__button__02'
          }
        >
          돌아가기
        </button>
      </div>
    </div>
  )
}
