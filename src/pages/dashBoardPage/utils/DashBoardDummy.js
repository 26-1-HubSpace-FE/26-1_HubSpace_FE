// events dummy data
export const events = {
  isSuccess: 'true',
  data: {
    count: 3,
    events: [
      {
        id: 123512412,
        count: 23,
        eventTitle: '이벤트 제목',
        isActive: true,
        eventType: 'FORM',
        searchColumns: ['컬럼1', '컬럼2', '컬럼3'],
        createdAt: '2024-11-07T12:36:22',
        formUrl: 'https://폼URL.com',
      },
      {
        id: 123512413,
        count: 15,
        eventTitle: '두 번째 이벤트',
        isActive: false,
        eventType: 'FORM',
        searchColumns: ['컬럼A', '컬럼B'],
        createdAt: '2024-11-08T09:20:10',
        formUrl: 'https://폼URL.com/2',
      },
      {
        id: 123512414,
        count: 42,
        eventTitle: '세 번째 이벤트',
        isActive: true,
        eventType: 'FORM',
        searchColumns: ['컬럼X', '컬럼Y', '컬럼Z'],
        createdAt: '2024-11-09T18:45:00',
        formUrl: 'https://폼URL.com/3',
      },
    ],
  },
}
