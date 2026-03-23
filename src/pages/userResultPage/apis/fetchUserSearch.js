import { apiGetPublic } from '../../../utils/ApiUtil'

export const fetchUserSearch = async (eventId, userSearchData) => {
  const query = new URLSearchParams()

  Object.entries(userSearchData || {}).forEach(([key, value]) => {
    const trimmedValue = typeof value === 'string' ? value.trim() : value
    if (trimmedValue !== '' && trimmedValue !== undefined && trimmedValue !== null) {
      query.append(key, trimmedValue)
    }
  })

  const requestUrl = `/v1/events/${eventId}/search?${query.toString()}`
  console.debug('[UserSearch][Request]', {
    eventId,
    query: Object.fromEntries(query.entries()),
    requestUrl,
  })

  try {
    const res = await apiGetPublic(requestUrl)
    console.debug('[UserSearch][Response]', res)
    return res
  } catch (err) {
    // 백엔드에서 "응답 데이터 없음"을 404로 내려주는 경우
    // 결과 페이지에서는 조회 실패(notFound)로 처리할 수 있도록 표준 응답 형태로 변환한다.
    if (err?.response?.status === 404) {
      const message = err?.response?.data?.message || '해당 정보로 조회된 기록이 없습니다.'
      console.debug('[UserSearch][NotFound404]', { message })
      return { isSuccess: false, message }
    }

    throw err
  }
}
