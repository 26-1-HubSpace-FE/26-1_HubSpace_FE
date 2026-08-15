export const getUserFieldPlaceholder = (columnName) => {
  return `${columnName}을(를) 입력해주세요.`
}

export const isGoogleFormsEvent = (eventDetail) => eventDetail?.eventType === 'FORM'

// 사용자 조회 결과 처리
export const processUserResult = (userApiResponse, eventDetail) => {
  const { searchColumns } = eventDetail
  const isSuccess = userApiResponse?.isSuccess ?? userApiResponse?.success ?? false
  console.debug('[UserSearch][Process]', {
    isSuccess,
    searchColumns,
    userApiResponse,
  })

  // 조회 실패
  if (!isSuccess) {
    if (isGoogleFormsEvent(eventDetail)) {
      return {
        userResultType: 'notFound',
        userResultTitle: '신청 정보를 아직 찾지 못했어요.',
        userResultMessage:
          '방금 Google Form을 제출했다면 정보가 반영되기까지 약 1~2분 정도 걸릴 수 있어요. 잠시 후 다시 확인해 주세요.',
      }
    }

    return {
      userResultType: 'notFound',
      userResultTitle: '일치하는 정보가 없습니다.',
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
