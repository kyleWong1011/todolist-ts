<template>
  <div>
    <a-input-search
      v-model:value.trim="todoValue"
      placeholder="input search text"
      @keyup="setTodoValue"
      @search="setTodoValue"
    >
      <template v-slot:enterButton>
        <a-button> 提交 </a-button>
      </template>
    </a-input-search>
  </div>
</template>

<script lang="ts">
import { message } from 'ant-design-vue'
import { MessageType } from 'ant-design-vue/es/message'
import { defineComponent, ref } from 'vue'
import { I_UseTodo, useTodo } from '../hooks'
import { debounce } from 'lodash-es'

export default defineComponent({
  name: 'TodoInput',
  setup() {
    const todoValue = ref<string>('')
    const { setTodo }: I_UseTodo = useTodo()

    const setTodoValue = debounce(
      <Function>(e: KeyboardEvent | string): void | MessageType => {
        if (todoValue.value === '') {
          return message.warn({ content: '不得为空' })
        }
        //TODO! 参数条件断言
        if (
          ((<KeyboardEvent>e).keyCode === 13 &&
            todoValue.value.trim().length) ||
          <String>e === todoValue.value
        ) {
          setTodo(todoValue.value)
          todoValue.value = ''
        }
      },
      200
    )

    return {
      todoValue,
      setTodoValue
    }
  }
})
</script>
