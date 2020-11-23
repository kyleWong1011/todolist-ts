<template>
  <div :class="$style.root">
    <todo-input class="mb15" />
    <todo-list :todo-list="todoList" />
  </div>
</template>

<script lang="ts">
import TodoInput from './components/TodoInput.vue'
import TodoList from './components/TodoList.vue'

import { useTodo, I_UseTodo } from './hooks'

import { computed, defineComponent, onMounted } from 'vue'
import { useStore } from 'vuex'

export default defineComponent({
  name: 'TodoMvc',
  components: {
    TodoInput,
    TodoList
  },
  setup() {
    const {
      setTodoList,
      removeTodo,
      setStatus,
      setDoing
    }: I_UseTodo = useTodo()

    const store = useStore()

    onMounted(() => {
      setTodoList()
    })

    const todoList = computed(() => store.state.todomvc.list)

    return {
      todoList,
      removeTodo,
      setStatus,
      setDoing
    }
  }
})
</script>
<style lang="stylus" module>
.root
  display flex
  flex-direction column
  padding 20px
</style>
