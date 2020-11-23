import { Ref, ref, ComputedRef, computed } from 'vue'

interface StateData {
  loading: Ref<boolean>
  error: Ref<boolean>
  result: Ref<object | null>
  fetchData: Function
  hasData: ComputedRef<boolean>
}

export default (api: any): StateData => {
  const loading = ref(false)
  const result = ref(null)
  const error = ref(false)

  async function fetchData(params: object) {
    // 拼接查询参数
    loading.value = true
    try {
      result.value = await api(params)
    } catch (e) {
      error.value = e
    }
    loading.value = false
  }

  const hasData = computed(() => !!result.value)

  return {
    fetchData,
    hasData,
    error,
    result,
    loading
  }
}
