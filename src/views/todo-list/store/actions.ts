import {
  REMOVE_TODO,
  SET_DOING,
  SET_STATUS,
  SET_TODO,
  SET_TODO_LIST
} from './actionTypes'
import { Commit } from 'vuex'
import { ITodo, IState } from '../typings'

interface I_Ctx {
  commit: Commit
  state: IState
}

export default {
  [SET_TODO]({ commit }: I_Ctx, todo: ITodo): void {
    commit(SET_TODO, todo)
  },
  [SET_TODO_LIST]({ commit }: I_Ctx, todoList: ITodo[]): void {
    commit(SET_TODO_LIST, todoList)
  },
  [REMOVE_TODO]({ commit }: I_Ctx, id: number): void {
    commit(REMOVE_TODO, id)
  },
  [SET_STATUS]({ commit }: I_Ctx, id: number): void {
    commit(SET_STATUS, id)
  },
  [SET_DOING]({ commit }: I_Ctx, id: number): void {
    commit(SET_DOING, id)
  }
}
