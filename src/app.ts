import { ITodo } from './TodoList'
import TodoEvent from './TodoList/TodoEvent'
;(doc => {
  const oInput: HTMLInputElement = doc.querySelector('.input')
  const oAddBtn: HTMLButtonElement = doc.querySelector('.add-btn')
  const oTodoList: HTMLElement = doc.querySelector('.todo-list')

  const todoData: ITodo[] = [{ id: 123, content: 'asd', complated: false }]

  const todoEvent: TodoEvent = new TodoEvent(todoData, oTodoList)

  function init(): void {
    bindEvent()
  }

  function bindEvent(): void {
    oAddBtn.addEventListener('click', handleAddBtnClick, false)
    oTodoList.addEventListener('click', handleListClick, false)
  }

  function handleAddBtnClick(): void {
    const value = oInput.value.trim()
    if (!value) return alert('输入不能为空')
    todoEvent.addTodo(<ITodo>{
      id: new Date().getTime(),
      content: value,
      complated: false
    })
    oInput.value = ''
  }

  function handleListClick(ev: MouseEvent): void {
    const target = ev.target as HTMLElement
    const tagName = target.tagName.toLowerCase()
    const id = +target.dataset.id

    switch (tagName) {
      case 'input':
        todoEvent.toggleTodo(target, id)
        break
      case 'button':
        todoEvent.removeTodo(target, id)
        break
      default:
        break
    }
  }

  init()
})(document)
