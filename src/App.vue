<script setup lang="ts">
import HelloWorld from './components/HelloWorld.vue'
</script>

<template>
  <img class="inline" alt="Vue logo" src="./assets/logo.png" />
  <svg-icon name="pen" />
  <el-button>自动引入一个Elment-Button</el-button>
  <HelloWorld msg="Hello Vue 3 + TypeScript + Vite" />
</template>

<style lang="scss">
#app {
  position: relative;
  display: block;
  margin-top: 60px;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  color: black;
  text-align: center;
}
</style>
