import { ITodo } from '.'
export default class TodoEvent {
  private todoData: ITodo[] = []
  private static instance: TodoEvent

  public static create(): TodoEvent {
    if (!TodoEvent.instance) {
      TodoEvent.instance = new TodoEvent()
    }
    return TodoEvent.instance
  }

  public addTodo(todo: ITodo): Promise<ITodo> {
    return new Promise((resolve, reject) => {
      const _todo: ITodo | null = this.todoData.find(
        ({ content }) => content === todo.content
      )
      if (_todo) {
        alert('项目已存在')
        return reject()
      }
      this.todoData.push(todo)
      resolve(todo)
    })
  }

  public removeTodo(id: number): Promise<number> {
    this.todoData = this.todoData.filter(item => item.id !== id)
    return Promise.resolve(id)
  }

  public toggleTodo(id: number): Promise<number> {
    return new Promise(resolve => {
      this.todoData = this.todoData.map(item => {
        if (item.id === id) {
          item.complated = !item.complated
          resolve(id)
        }
        return item
      })
    })
  }
}
