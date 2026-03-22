import { useState, useEffect } from 'react'
import { apiGetPublic } from '../../../utils/ApiUtil'

// 데이터만 담당
export const useFetchEventDetail = (eventId) => {
  // 현재 상태, 상태 변경 함수
  const [eventDetail, setEventDetail] = useState(null) // 서버에서 받은 실제 데이터 저장
  const [loading, setLoading] = useState(true) // 로딩 중인지
  const [error, setError] = useState(null) // 에러 발생 여부

  // eventID 변경될 때마다 실행
  useEffect(() => {
    if (!eventId) {
      setEventDetail(null)
      setLoading(false)
      setError('이벤트 ID가 없습니다')
      return
    }

    // 실제 데이터 가져옴
    const fetchEventDetail = async () => {
      setLoading(true)
      setError(null)
      try {
        const res = await apiGetPublic(`/v1/events/${eventId}/summary`)
        const payload = res?.data ?? res

        if (!payload || !Array.isArray(payload.searchColumns)) {
          throw new Error('이벤트 정보를 불러오지 못했습니다')
        }

        setEventDetail(payload)
      } catch (err) {
        setError(err?.response?.data?.message || err?.message || '이벤트 조회에 실패했습니다')
        setEventDetail(null)
      } finally {
        setLoading(false)
      }
    }

    fetchEventDetail()
  }, [eventId]) // eventID 변경될 때만 다시 실행

  return { eventDetail, loading, error }
}
