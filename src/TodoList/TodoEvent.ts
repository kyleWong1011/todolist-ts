import { ITodo } from '.'
import TodoDom from './TodoDom'

export default class TodoEvent extends TodoDom {
  private todoData: ITodo[]

  constructor(todoData: ITodo[], wrapperEl: HTMLElement) {
    super(wrapperEl) // 将容器传给TodoDom去操作
    this.todoData = todoData
    this.init(todoData)
  }

  public addTodo(todo: ITodo): void {
    const _todo: ITodo | null = this.todoData.find(
      item => item.content === todo.content
    )

    if (!_todo) {
      this.todoData.push(todo)
      this.addItem(todo)
      return
    }

    return alert('项目已存在')
  }

  public removeTodo(target: HTMLElement, id: number): void {
    this.todoData = this.todoData.filter(item => item.id !== id)
    this.removeItem(target)
  }

  public toggleTodo(target: HTMLElement, id: number): void {
    this.todoData = this.todoData.map(item => {
      if (item.id === id) {
        item.complated = !item.complated
        this.toggleItem(target, item.complated)
      }
      return item
    })
  }
}
