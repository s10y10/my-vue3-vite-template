import { useRequest } from '@/hooks'

interface Req {
  type: number
  msg: string
}
interface Res {
  code: string
  data: {
    riqi: string
    pm: string
    fengdu: string
    tianqi: string
    wendu: string
  }[]
}

export const getWeather = (data: Req) => {
  return useRequest({
    url: '/proxy/api/api-tianqi-3/index.php',
    method: 'GET',
    data
  })
}
