import TodoList, { ITodo } from './TodoList'
;(doc => {
  const oApp: HTMLElement = document.querySelector('#app')

  const todoData: ITodo[] = []

  function init(): void {
    new TodoList(oApp, todoData)
  }

  init()
})(document)
