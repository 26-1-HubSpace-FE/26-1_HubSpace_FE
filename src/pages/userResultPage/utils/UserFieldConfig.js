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
      userResultMessage: '입력한 정보에 오타가 있는지 확인하거나,\n운영자에게 문의하세요.',
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
