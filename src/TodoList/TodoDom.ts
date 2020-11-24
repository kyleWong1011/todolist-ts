import { ITodo } from '.'

export function renderTodoItem({ id, content, complated }: ITodo) {
  return `
    <div class="todo-item">
        <input type="checkbox" data-id=${id} ${
    complated ? 'checked' : ''
  } class="checkbox" />
        <span style="text-decoration:${
          complated ? 'line-through' : ''
        }" class="todo-content">${content}</span>
        <button data-id=${id} class="remove-btn">删除</button>
    </div>
  `
}

// 获取父级节点
export function findParentNode(
  target: HTMLElement,
  className: string
): HTMLElement {
  while ((target = target.parentNode as HTMLElement)) {
    if (target.className === className) {
      return target
    }
  }
}

export default class TodoDom {
  private wrapperEl: HTMLElement
  private static instance: TodoDom

  constructor(wrapperEl: HTMLElement) {
    this.wrapperEl = wrapperEl
  }

  public static create(wrapperEl: HTMLElement) {
    if (!TodoDom.instance) {
      TodoDom.instance = new TodoDom(wrapperEl)
    }
    return TodoDom.instance
  }

  private init(todoData: ITodo[]) {
    if (todoData.length > 0) {
      this.wrapperEl.innerHTML = todoData
        .map((todo: ITodo) => renderTodoItem(todo))
        .join('')
    }
  }

  public addItem(todo: ITodo): Promise<void> {
    return new Promise((resolve, reject) => {
      this.wrapperEl.innerHTML += renderTodoItem(todo)
      resolve()
    })
  }

  // 此处唯一的id存在弊端, 只能传一个参数，因为要配合notify的自执行
  public removeItem(id: number): Promise<void> {
    return new Promise(resolve => {
      const _oItems: HTMLCollection = this.wrapperEl.getElementsByClassName(
        'todo-item'
      )
      Array.from(_oItems).forEach(item => {
        const _id: number = +(<HTMLElement>(
          item.getElementsByClassName('remove-btn')[0]
        )).dataset.id
        if (_id === id) {
          item.remove()
          resolve()
        }
      })
    })
  }

  public toggleItem(id: number): Promise<void> {
    return new Promise(resolve => {
      const _oItems: HTMLCollection = this.wrapperEl.getElementsByClassName(
        'todo-item'
      )
      Array.from(_oItems).forEach(item => {
        const _oCheckbox: HTMLInputElement = <HTMLInputElement>(
          item.getElementsByClassName('checkbox')[0]
        )
        const _id: number = +_oCheckbox.dataset.id

        if (_id === id) {
          const _oContent: HTMLElement = item.querySelector('.todo-content')
          _oContent.style.textDecorationLine = _oCheckbox.checked
            ? 'line-through'
            : 'none'
          resolve()
        }
      })
    })
  }
}
