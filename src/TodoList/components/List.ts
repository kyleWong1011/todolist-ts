import { ITodo } from '..'
import Template from './template'

export type ListOptions = {
  wrapperEl: HTMLElement
  todoData: ITodo[]
}

export default class List extends Template {
  private wrapperEl: HTMLElement
  private static todoData: ITodo[]
  private oTodoList: HTMLElement

  constructor({ wrapperEl, todoData }: ListOptions) {
    super()
    this.wrapperEl = wrapperEl
    List.todoData = todoData
    this._render()
    setTimeout(() => {
      this._bindEvent()
    }, 100)
  }

  private _render(): void {
    this.wrapperEl.innerHTML += Template.listView(List.todoData)
  }

  private _bindEvent(): void {
    const oTodoList: HTMLElement = document.querySelector('.todo-list')
    oTodoList.addEventListener('click', this._handleListClick.bind(this), false)
  }

  private _handleListClick(ev: MouseEvent): void {
    const target = ev.target as HTMLElement
    // const tagName = (ev.target as HTMLElement).tagName.toLowerCase()
    const tagName = target.tagName.toLowerCase()
    const id = +target.dataset.id

    const oTodoItems: HTMLCollection = document.getElementsByClassName('todo-item')

    if (tagName === 'input' || tagName === 'button') {
      switch (tagName) {
        case 'input':
          this._toggleTodo(id, oTodoItems)
          break
        case 'button':
          this._removeTodo(id, oTodoItems)
          break
        default:
          break
      }
    }
  }

  public static addItem(value: string): void {
    if (List.todoData.find(item => item.content === value)) return alert('存在重复项')

    const item: ITodo = {
      id: new Date().getTime(),
      complated: false,
      content: value
    }

    const oTodoList: HTMLElement = document.querySelector('.todo-list')
    const oNoData: HTMLElement = oTodoList.querySelector('.no-data')

    !List.todoData.length && (oNoData.style.display = 'none')

    List.todoData.push(item)

    oTodoList.innerHTML += Template.todoView(item)
  }

  // 切换状态
  private _toggleTodo(id: number, oTodoItems: HTMLCollection) {
    List.todoData = List.todoData.map((todo, index) => {
      if (todo.id === id) {
        todo.complated = !todo.complated
        console.log('oTodoItems[index]', oTodoItems[index])
        oTodoItems[index].querySelector('span').style.textDecorationLine = todo.complated
          ? 'line-through'
          : ''
      }
      return todo
    })
  }

  // 删除
  private _removeTodo(id: number, oTodoItems: HTMLCollection) {
    const oNoData: HTMLElement = oTodoItems[0].parentNode.querySelector('.no-data')
    List.todoData = List.todoData.filter((todo, index) => {
      if (todo.id === id) {
        oTodoItems[index].remove()
        if (!oTodoItems.length) {
          oNoData.style.display = 'block'
        }
      } else {
        return todo
      }
    })
  }
}
