const useCounterStore = defineStore('counter', {
  state: () => {
    return {
      count: 0
    }
  },
  actions: {
    addCountAsync() {
      setTimeout(() => {
        this.count++
      }, 500)
    }
  },
  getters: {
    getterCount(state) {
      return state.count
    }
  }
})

export default useCounterStore
