<script setup lang="ts">
import { ROUTE_NAME_CONFIG } from '@/const'
const router = useRouter()
const handleToMainView = () => {
  router.push(ROUTE_NAME_CONFIG.Main)
}
</script>

<template>
  <div class="view-login">
    <el-button @click="handleToMainView">跳转到主页</el-button>
  </div>
</template>

<style lang="scss" scoped></style>
