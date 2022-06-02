import type { AxiosRequestConfig, AxiosResponse } from 'axios'

export interface RequestInterceptors<T> {
  //请求拦截
  requestInterceptors?: (config: AxiosRequestConfig) => AxiosRequestConfig
  requestInterceptorsCatch?: (err: any) => any
  //响应拉结
  responseInterceptors?: (config: T) => T
  responseInterceptorsCatch?: (err: any) => any
}

export interface RequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
  interceptors?: RequestInterceptors<T>
}

export interface CancelRequestSource {
  [index: string]: () => void
}
