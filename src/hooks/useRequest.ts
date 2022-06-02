import { ref } from 'vue'
import request from '@/service'

export const useRequest = async (params: any) => {
  // 合并配置项
  const loading = ref(false)
  const data = ref()
  loading.value = true
  // 调用请求方法
  data.value = await request(params)
  loading.value = false
  return {
    loading,
    data
  }
}
