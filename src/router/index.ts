import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import { ROUTE_NAME_CONFIG } from '@/const'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/main'
  },
  {
    path: '/main',
    meta: { title: '主页' },
    component: () => import('../views/Main.vue'),
    name: ROUTE_NAME_CONFIG.Main
  },

  {
    path: '/login',
    meta: { title: '登录' },
    component: () => import('../views/Login.vue'),
    name: ROUTE_NAME_CONFIG.Login
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to: any) => {
  document.title = to.meta?.title || '模板'
})

export default router
