<script setup lang="ts">
import useStore from "@/store";

defineProps<{ msg: string }>();

const { counter } = useStore();
const { count, getterCount } = storeToRefs(counter);

const handleClick = () => {
  counter.addCountAsync();
};
</script>

<template>
  <h1>{{ msg }}</h1>
  <el-button @click="handleClick">
    count is: {{ count }}, getter is: {{ getterCount }}
  </el-button>
</template>

<style scoped>
a {
  color: #42b983;
}
</style>
