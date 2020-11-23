<template>
  <div :class="$style.root">
    <a-checkbox
      :checked="item.status === FINISHED"
      @change="setStatus(item.id)"
    >
      <span :class="item.status === FINISHED && $style.active">{{
        item.content
      }}</span>
    </a-checkbox>

    <a-button-group>
      <a-button type="danger" @click="removeTodo(item.id)">
        <!-- <left-outlined /> -->
        删除
      </a-button>
      <a-button
        v-if="item.status !== FINISHED"
        :type="item.status === DOING ? 'primary' : 'dashed'"
        :class="item.status"
        @click="setDoing(item.id)"
      >
        {{ item.status === DOING ? '正在做...' : '马上做' }}
      </a-button>
    </a-button-group>
  </div>
</template>

<script lang="ts">
// import { LeftOutlined } from '@ant-design/icons-vue'

import { defineComponent, PropType } from 'vue'
import { ITodo, TODO_STATUS } from '../typings'

interface I_StatusState {
  DOING: TODO_STATUS.DOING
  WILLDO: TODO_STATUS.WILLDO
  FINISHED: TODO_STATUS.FINISHED
}

export default defineComponent({
  name: 'TodoItem',
  // components: {
  //   LeftOutlined
  // },
  props: {
    item: Object as PropType<ITodo>
  },
  setup(props, { emit }) {
    //Todo! 此处是静态的，没必要使用响应式
    //TODO 以下两种写法均可

    // const statusState: I_StatusState = {
    //   DOING: TODO_STATUS.DOING,
    //   WILLDO: TODO_STATUS.WILLDO,
    //   FINISHED: TODO_STATUS.FINISHED
    // }

    const statusState = <I_StatusState>{
      DOING: TODO_STATUS.DOING,
      WILLDO: TODO_STATUS.WILLDO,
      FINISHED: TODO_STATUS.FINISHED
    }
    const removeTodo = (id: number): void => {
      emit('remove-todo', id)
    }

    const setStatus = (id: number): void => {
      emit('set-status', id)
    }

    const setDoing = (id: number): void => {
      emit('set-doing', id)
    }

    return {
      removeTodo,
      setStatus,
      setDoing,
      ...statusState
    }
  }
})
</script>

<style module lang="stylus">
.root
  border-bottom 1px solid #f7f7f7
  line-height 40px
  display flex
  justify-content space-between
.active
 color red
.willdo
 background-color #cdcdcd
 color red
.doing
 background-color #cdcdcd
 color orange
.finished
 background-color #cdcdcd
 color green
</style>
