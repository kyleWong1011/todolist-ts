import { renderTodoItem } from './template'
import { addTodo, removeTodo, toggleTodo } from './decorators'

export interface ITodo {
  id: number
  content: string
  complated: boolean
}

const todoData: ITodo[] = []

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

  @addTodo(todoData)
  public addItem(todo: ITodo): void {
    const oItem: HTMLElement = document.createElement('div')
    oItem.className = 'todo-item'
    oItem.innerHTML = renderTodoItem(todo)
    this.oTodoList.appendChild(oItem)
  }

  @removeTodo(todoData)
  public removeItem(id: number): void {
    // const oItems:HTMLCollection = this.oTodoList.querySelectorAll('.todo-item')
    const oItems: HTMLCollection = document.getElementsByClassName('todo-item')
    Array.from(oItems).forEach(oItem => {
      const _id = +(oItem.querySelector('.remove-btn') as HTMLButtonElement)
        .dataset.id
      if (id === _id) {
        oItem.remove()
      }
    })
  }

  @toggleTodo(todoData)
  public toggleItem(id: number, complated?: boolean): void {
    const oItems: HTMLCollection = document.getElementsByClassName('todo-item')
    Array.from(oItems).forEach(oItem => {
      const _id = +(oItem.querySelector('.remove-btn') as HTMLButtonElement)
        .dataset.id
      if (id === _id) {
        const oContent: HTMLElement = oItem.querySelector('.todo-content')

        console.log({ oContent })
        oContent.style.textDecorationLine = complated ? 'line-through' : ''
      }
    })
  }
}

export default TodoList
