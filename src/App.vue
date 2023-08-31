<script setup lang="ts">
import useLocale from './hooks/useLocale'
import { getWeather } from './api'

const { locale } = useLocale()

//test
onMounted(async () => {
  const res = await getWeather({
    type: 1,
    msg: '北京'
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
