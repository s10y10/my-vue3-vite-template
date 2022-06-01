<script setup lang="ts">
import useLocale from './hooks/useLocale'

const { locale } = useLocale()
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
