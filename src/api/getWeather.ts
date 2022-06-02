import { useRequest } from '@/hooks'

interface Req {
  apiKey: string
  area?: string
}
// interface Res {
//   area: string
//   areaCode: string
//   areaid: string
//   dayList: any[]
// }

export const getWeather = (data: Req) => {
  return useRequest({
    url: '/api/common/weather/get15DaysWeatherByArea',
    method: 'GET',
    data
  })
}
