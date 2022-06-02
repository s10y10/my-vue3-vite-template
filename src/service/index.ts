import Request from './request'
import { AxiosResponse } from 'axios'

import type { RequestConfig } from './request/types'

export interface DataResponse<T> {
  statusCode: number
  desc: string
  result: T
}

interface DataRequestConfig<T, R> extends RequestConfig<DataResponse<R>> {
  data?: T
}

const request = new Request({
  baseURL: import.meta.env.BASE_URL,
  timeout: 1000 * 60 * 5,
  withCredentials: true,
  interceptors: {
    requestInterceptors: config => {
      console.log('实例请求拦截器')
      return config
    },
    responseInterceptors: (result: AxiosResponse) => {
      console.log('实例响应拦截器')
      return result
    }
  }
})

//取消请求
export const cancelRequest = (url: string | string[]) => {
  return request.cancelRequest(url)
}

//取消全部请求
export const cancelAllRequest = () => {
  return request.cancelAllRequest()
}

/**
 * @description 函数的描述
 * @interface D 请求参数的interface
 * @interface T 响应结构的interface
 * @param {DataRequestConfig} config
 * @returns {Promise}
 */
const dataRequest = <D = any, T = any>(config: DataRequestConfig<D, T>) => {
  const { method = 'GET' } = config
  if (method === 'get' || method === 'GET') {
    config.params = config.data
  }
  return request.request<DataResponse<T>>(config)
}

export default dataRequest
