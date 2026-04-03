export const getUserFieldPlaceholder = (columnName) => {
  return `${columnName}을(를) 입력해주세요.`
}

// 사용자 조회 결과 처리
export const processUserResult = (userApiResponse, eventDetail, userSearchData) => {
  const { searchColumns } = eventDetail
  const isSuccess = userApiResponse?.isSuccess ?? userApiResponse?.success ?? false
  console.debug('[UserSearch][Process]', {
    isSuccess,
    searchColumns,
    userApiResponse,
  })

  // 조회 실패
  if (!isSuccess) {
    return {
      userResultType: 'notFound',
      userResultMessage: userApiResponse?.message || '해당 정보로 조회된 기록이 없습니다.',
    }
  }

  // 조회 성공
  const answers = userApiResponse?.data?.answers || {}
  console.debug('[UserSearch][Answers]', answers)

  return {
    userResultType: 'detail',
    userDetailInfo: answers,
  }
}
