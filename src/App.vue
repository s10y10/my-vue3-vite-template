<script setup lang="ts">
import useLocale from './hooks/useLocale'
import { getWeather } from './api'

const { locale } = useLocale()

//test
onMounted(async () => {
  const res = await getWeather({
    apiKey: '',
    area: '北京市'
  })
  console.log(res)
})
</script>

<template>
  <ElConfigProvider :locale="locale">
    <router-view></router-view>
  </ElConfigProvider>
</template>

<style>
#app {
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}
</style>
