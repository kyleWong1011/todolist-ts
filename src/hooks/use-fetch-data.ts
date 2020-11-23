import { reactive, toRefs, computed, Ref, ComputedRef } from 'vue'
interface ReactivedData {
  text?: string
}
interface FetchState {
  loading: boolean
  error: boolean
  data: ReactivedData
}

// 返回对象
interface FetchDataVars {
  loading: Ref<boolean>
  error: Ref<boolean>
  data: Ref<object>
  fetchData: Function
  hasData: ComputedRef<boolean>
}

export default (): FetchDataVars => {
  const state = reactive<FetchState>({
    loading: true,
    error: false,
    data: {}
  })

  const fetchData = async () => {
    state.loading = true
    setTimeout(() => {
      state.data = { text: '2' }
      state.loading = false
    }, 600)
  }

  // const hasData = computed(() => state.data && !!state.data.text)
  const hasData = computed(() => state.data && !!state.data.text)

  return {
    ...toRefs(state),
    fetchData,
    hasData
  }
}
