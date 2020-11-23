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
    console.log(target.className, className)
    if (target.className === className) {
      return target
    }
  }
}

export default class TodoDom {
  private wrapperEl: HTMLElement

  constructor(wrapperEl: HTMLElement) {
    this.wrapperEl = wrapperEl
  }

  protected init(todoData: ITodo[]) {
    if (todoData.length > 0) {
      this.wrapperEl.innerHTML = todoData
        .map((todo: ITodo) => renderTodoItem(todo))
        .join('')
    }
  }

  protected addItem(todo: ITodo) {
    this.wrapperEl.innerHTML += renderTodoItem(todo)
  }

  protected removeItem(target: HTMLElement) {
    const _oParent: HTMLElement = findParentNode(target, 'todo-item')
    _oParent.remove()
  }

  protected toggleItem(target: HTMLElement, complated: boolean) {
    const _oParent: HTMLElement = findParentNode(target, 'todo-item')
    const _oContent: HTMLElement = _oParent.querySelector('.todo-content')

    _oContent.style.textDecorationLine = complated ? 'line-through' : 'none'
  }
}
