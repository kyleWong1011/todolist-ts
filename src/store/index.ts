import { createStore } from 'vuex'
import todomvc from '../views/todo-list/store'

export interface State {
  year: number
}

export default createStore<State>({
  state: {
    year: 1970
  },
  mutations: {
    SET_YEAR(state: State, year: number) {
      state.year += year
    }
  },
  actions: {
    onSetYear: ({ commit }, year: number) => {
      commit('SET_YEAR', year)
    }
  },
  modules: {
    todomvc
  }
})
