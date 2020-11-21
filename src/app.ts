import TodoList, { ITodo } from './TodoList'
;(doc => {
  const oInput: HTMLInputElement = doc.querySelector('.input')
  const oAddBtn: HTMLButtonElement = doc.querySelector('.add-btn')
  const oTodoList: HTMLElement = doc.querySelector('.todo-list')

  const todoList = TodoList.create(oTodoList)

  function init(): void {
    bindEvent()
  }

  function bindEvent() {
    oAddBtn.addEventListener('click', handleAddItemClick, false)
    oTodoList.addEventListener('click', handleTodoClick, false)
  }

  function handleAddItemClick(): void {
    const value = oInput.value.trim()
    if (!value.length) return alert('不能为空')
    todoList.addItem(<ITodo>{
      id: new Date().getTime(),
      content: value,
      complated: false
    })
    oInput.value = ''
  }

  function handleTodoClick(e: MouseEvent): void {
    const target = <HTMLElement>e.target
    const tagName = target.tagName.toLowerCase()
    const id: number = +target.dataset.id
    if (tagName === 'input' || tagName === 'button') {
      switch (tagName) {
        case 'input':
          todoList.toggleItem(id)
          break
        case 'button':
          todoList.removeItem(id)
          break
        default:
          break
      }
    }
  }

  init()
})(document)
