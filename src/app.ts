import TodoList, { EVENT_TYPES, ITodo } from './TodoList'
;(doc => {
  const oInput: HTMLInputElement = doc.querySelector('.input')
  const oAddBtn: HTMLButtonElement = doc.querySelector('.add-btn')
  const oTodoList: HTMLElement = doc.querySelector('.todo-list')

  const todoData: ITodo[] = [{ id: 123, content: 'asd', complated: false }]

  const todoList = TodoList.create(oTodoList)

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

    todoList.notify<ITodo>(EVENT_TYPES.ADD, {
      id: new Date().getTime(),
      complated: false,
      content: value
    })

    oInput.value = ''
  }

  function handleListClick(ev: MouseEvent): void {
    const target = ev.target as HTMLElement
    const tagName = target.tagName.toLowerCase()
    const id = +target.dataset.id

    switch (tagName) {
      case 'input':
        todoList.notify<number>(EVENT_TYPES.TOGGLE, id)
        break
      case 'button':
        todoList.notify<number>(EVENT_TYPES.REMOVE, id)
        break
      default:
        break
    }
  }

  init()
})(document)
