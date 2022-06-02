import axios from 'axios'
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import type {
  RequestConfig,
  RequestInterceptors,
  CancelRequestSource
} from './types'

class Request {
  // axios实例
  instance: AxiosInstance
  // 拦截器对象
  interceptorsObj?: RequestInterceptors<AxiosResponse>

  // 存放取消方法的集合
  // 创建请求后就将取消方法push到这里
  cancelRequestSourceList?: CancelRequestSource[]
  // 存放所有请求的url集合
  // 请求完毕后从集合中删除url
  requestUrlList?: string[]

  constructor(config: RequestConfig) {
    //数据初始化
    this.cancelRequestSourceList = []
    this.requestUrlList = []

    this.instance = axios.create(config)
    this.interceptorsObj = config.interceptors

    this.instance.interceptors.request.use(
      (res: AxiosRequestConfig) => {
        console.log('全局请求拦截器')
        return res
      },
      (err: any) => err
    )

    // 实例拦截器
    this.instance.interceptors.request.use(
      this.interceptorsObj?.requestInterceptors,
      this.interceptorsObj?.requestInterceptorsCatch
    )
    this.instance.interceptors.response.use(
      this.interceptorsObj?.responseInterceptors,
      this.interceptorsObj?.responseInterceptorsCatch
    )

    this.instance.interceptors.response.use(
      (res: AxiosResponse) => {
        console.log('全局响应拦截器')
        return res.data
      },
      (err: any) => err
    )
  }

  /**
   * @description 获取url对应在cancelRequestSourceList中的索引
   * @param {string} url
   * @returns {number} 索引位置
   */
  private getSourceIndex(url: string): number {
    return this.cancelRequestSourceList?.findIndex(
      (item: CancelRequestSource) => {
        return Object.keys(item)[0] === url
      }
    ) as number
  }

  /**
   * @description 删除保存的url和方法
   * @param url
   * @returns {*}
   */
  private delUrl(url: string) {
    const urlIndex = this.requestUrlList?.findIndex(u => u === url)
    const sourceIndex = this.getSourceIndex(url)
    //删除
    urlIndex !== -1 && this.requestUrlList?.splice(urlIndex as number, 1)
    sourceIndex !== -1 &&
      this.cancelRequestSourceList?.splice(sourceIndex as number, 1)
  }

  //取消全部请求
  cancelAllRequest() {
    this.cancelRequestSourceList?.forEach(source => {
      const key = Object.keys(source)[0]
      source[key]()
    })
  }

  //取消请求
  cancelRequest(url: string | string[]) {
    if (typeof url === 'string') {
      const sourceIndex = this.getSourceIndex(url)
      sourceIndex !== -1 && this.cancelRequestSourceList?.[sourceIndex][url]()
    } else {
      url.forEach(u => {
        const sourceIndex = this.getSourceIndex(u)
        sourceIndex !== -1 && this.cancelRequestSourceList?.[sourceIndex][u]()
      })
    }
  }

  request<T>(config: RequestConfig<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      if (config.interceptors?.requestInterceptors) {
        config = config.interceptors.requestInterceptors(config)
      }
      //保存取消请求方法
      const { url } = config
      if (url) {
        this.requestUrlList?.push(url)
        config.cancelToken = new axios.CancelToken(cancel => {
          this.cancelRequestSourceList?.push({
            [url]: cancel
          })
        })
      }
      this.instance
        .request<any, T>(config)
        .then(res => {
          if (config.interceptors?.responseInterceptors) {
            res = config.interceptors.responseInterceptors(res)
          }
          resolve(res)
        })
        .catch((err: any) => {
          reject(err)
        })
        .finally(() => {
          url && this.delUrl(url)
        })
    })
  }
}

export default Request
