import { apiGetPublic } from '../../../utils/ApiUtil'

export const fetchUserSearch = async (eventId, userSearchData) => {
  const query = new URLSearchParams()

  Object.entries(userSearchData || {}).forEach(([key, value]) => {
    const trimmedValue = typeof value === 'string' ? value.trim() : value
    if (trimmedValue !== '' && trimmedValue !== undefined && trimmedValue !== null) {
      query.append(key, trimmedValue)
    }
  })

  const res = await apiGetPublic(`/v1/events/${eventId}/search?${query.toString()}`)
  return res?.data ?? res
}
