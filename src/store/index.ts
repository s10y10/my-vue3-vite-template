import useMainStore from './main'
import useCounterStore from './counter'

export default function useStore() {
  return {
    main: useMainStore(),
    counter: useCounterStore()
  }
}
