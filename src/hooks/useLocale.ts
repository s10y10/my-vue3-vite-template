//修改element-plus一些默认的文案
import zhLocale from 'element-plus/lib/locale/lang/zh-cn'

export default () => {
  const locale = ref(zhLocale)
  locale.value.el.pagination.goto = '跳至'
  return {
    locale
  }
}
