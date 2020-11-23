import { watch } from 'vue'
import { Store, useStore } from 'vuex'

import {
  SET_TODO,
  SET_TODO_LIST,
  REMOVE_TODO,
  SET_STATUS,
  SET_DOING
} from '../store/actionTypes'
import { ITodo, TODO_STATUS } from '../typings'

export interface I_UseTodo {
  setTodo: (value: string) => void
  setTodoList: () => void
  removeTodo: (id: number) => void
  setStatus: (id: number) => void
  setDoing: (id: number) => void
}

interface I_UseLocalStorage {
  getLocalList: () => ITodo[]
  setLocalList: (todolist: ITodo[]) => void
}

function useTodo(): I_UseTodo {
  const store: Store<any> = useStore()
  const { getLocalList, setLocalList }: I_UseLocalStorage = useLocalStorage()

  const todoList: ITodo[] = getLocalList()

  // 监听数组发生变化
  watch(
    () => store.state.todomvc.list,
    (todoList: ITodo[]) => {
      // TODO 待解决
      setLocalList(todoList)
    }
  )

  function setTodo(value: string): void {
    const todo: ITodo = {
      id: new Date().getTime(),
      content: value,
      status: TODO_STATUS.WILLDO
    }
    store.dispatch(SET_TODO, todo)
  }

  function setTodoList(): void {
    store.dispatch(SET_TODO_LIST, todoList)
  }

  function removeTodo(id: number): void {
    store.dispatch(REMOVE_TODO, id)
  }

  function setStatus(id: number): void {
    store.dispatch(SET_STATUS, id)
  }

  function setDoing(id: number): void {
    store.dispatch(SET_DOING, id)
  }

  return { setTodo, setTodoList, removeTodo, setStatus, setDoing }
}

function useLocalStorage(): I_UseLocalStorage {
  function getLocalList(): ITodo[] {
    return JSON.parse(localStorage.getItem('todolist') || '[]')
  }

  function setLocalList(todolist: ITodo[]): void {
    localStorage.setItem('todolist', JSON.stringify(todolist))
  }

  return {
    getLocalList,
    setLocalList
  }
}

export { useTodo }
