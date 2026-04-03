import { useState, useEffect } from 'react'
import GradientLayout from '../../../components/gradientLayout/GradientLayout'
import GradientButton from '../../../components/gradientButton/GradientButton'
import backIcon from '../../../assets/auth/auth-back-icon.svg'
import './UserResultPage.css'
import { useLocation, useNavigate } from 'react-router-dom'
import { processUserResult } from '../utils/UserFieldConfig'

import { fetchUserSearch } from '../apis/fetchUserSearch'
import LoadingSpinner from '../../../components/loadingSpinner/LoadingSpinner'

// 사용자 이벤트 신청 조회 결과 페이지
export default function UserResultPage() {
  const navigate = useNavigate()
  const location = useLocation() // state로 넘긴 data 받음

  const { eventId, eventDetail, userSearchData } = location.state || {}
  const [userSearchResult, setUserSearchResult] = useState(null)
  const [loading, setLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    console.debug('[UserResultPage][InitState]', {
      eventId,
      eventDetail,
      userSearchData,
    })

    if (!eventId || !eventDetail || !userSearchData) {
      setErrorMessage('잘못된 접근입니다. 조회 페이지에서 다시 시도해주세요.')
      setLoading(false)
      return
    }

    const fetchData = async () => {
      setLoading(true)
      try {
        const userApiResponse = await fetchUserSearch(eventId, userSearchData)
        const processResult = processUserResult(userApiResponse, eventDetail, userSearchData)
        console.debug('[UserResultPage][ProcessedResult]', processResult)
        setUserSearchResult(processResult)
        setErrorMessage('')
      } catch (err) {
        console.error('[UserResultPage][FetchError]', err)
        setErrorMessage(err?.response?.data?.message || err?.message || '조회 실패')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [eventId, eventDetail, userSearchData])

  // 로딩 중
  if (loading) {
    return (
      <GradientLayout>
        <div className='user-result__container'>
          <a href='/' className='user-result__logo' aria-label='홈으로 이동'></a>
          <div className='user-result__loading'>
            <LoadingSpinner
              className='user-result__loadingSpinner'
              size={48}
              cubeSize={16}
              color='#2d3b86'
            />
            <p className='user-result__loadingText'>조회 중입니다...</p>
          </div>
        </div>
      </GradientLayout>
    )
  }

  // 결과 없음
  if (!userSearchResult) {
    return (
      <GradientLayout>
        <div className='user-result__container'>
          <p>{errorMessage || '조회 결과를 불러올 수 없습니다'}</p>
        </div>
      </GradientLayout>
    )
  }
  const detailEntries =
    userSearchResult.userResultType === 'detail'
      ? Object.entries(userSearchResult.userDetailInfo || {})
      : []

  // 돌아가기 버튼 클릭 시 실행
  const handleGoBack = () => {
    navigate(-1) // 브라우저 히스토리 기준 이전 페이지
  }

  return (
    // 전체 페이지
    <GradientLayout>
      <div className='user-result__container'>
        {/* 로고 영역 */}
        <a href='/' className='user-result__logo' aria-label='홈으로 이동'></a>
        {/* 중앙 흰색 결과 카드 */}
        <div className="user-result__card">

          <h2 className="user-result__title__02">
            {userSearchResult.userResultType === 'detail'
              ? '정보가 확인되었습니다.'
              : '조회 결과가 없습니다.'}
          </h2>

          {/* 사용자 상세 정보 */}
          {userSearchResult.userResultType === 'detail' && (
            <div className="user-result__box">
              {detailEntries.map(([columnName, value]) => (
                <div key={columnName}>
                  <span className="user-result__label">{columnName}</span>
                  <span className="user-result__value">{value}</span>
                </div>
              ))}
            </div>
          )}
          {userSearchResult.userResultType === 'notFound' && (
            <p className="user-result__notice">{userSearchResult.userResultMessage}</p>
          )}
        </div>
        <div className="user-result__button">
          <GradientButton type="button" onClick={handleGoBack} className='user-result__backButton'>
            <img src={backIcon} className='user-result__button-icon' />
            <span>돌아가기</span>
          </GradientButton>
        </div>
      </div>
    </GradientLayout>
  )
}
