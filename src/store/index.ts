import { defineStore } from "pinia";

export const mainStore = defineStore("mainStore", {
  state: () => {
    return { count: 0 };
  },
  getters: {},
  actions: {},
});
