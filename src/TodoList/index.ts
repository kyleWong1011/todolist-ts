import { renderTodoItem } from './template'

export interface ITodo {
  id: number
  content: string
  complated: boolean
}

class TodoList {
  private oTodoList: HTMLElement
  private static instance: TodoList

  constructor(oTodoList: HTMLElement) {
    this.oTodoList = oTodoList
  }

  public static create(oTodoList: HTMLElement): TodoList {
    // 创建单例模式
    if (!TodoList.instance) {
      TodoList.instance = new TodoList(oTodoList)
    }
    return TodoList.instance
  }

  public addItem(todo: ITodo): void {
    const oItem: HTMLElement = document.createElement('div')
    oItem.className = 'todo-item'
    oItem.innerHTML = renderTodoItem(todo)
    this.oTodoList.appendChild(oItem)
  }

  public removeItem(id: number): void {
    // const oItems:HTMLCollection = this.oTodoList.querySelectorAll('.todo-item')
    const oItems: HTMLCollection = document.getElementsByClassName('todo-item')
    Array.from(oItems).forEach(item => {
      const _id = +(item.querySelector('.remove-btn') as HTMLButtonElement)
        .dataset.id
      if (id === _id) {
        item.remove()
      }
    })
  }

  public toggleItem(id: number): void {
    console.log({ id })
  }
}

export default TodoList
