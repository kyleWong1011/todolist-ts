import { ITodo } from '.'

export function addTodo(todoData: ITodo[]): Function {
  return function (
    target: any,
    methodName: string,
    descriptor: PropertyDescriptor
  ) {
    // 暂存调用方法
    const _origin = descriptor.value // addItem()

    // 这里不能使用箭头函数
    descriptor.value = function (todo: ITodo): void {
      const _todo: ITodo | undefined = todoData.find(
        (item: ITodo) => item.content === todo.content
      )
      if (_todo) {
        alert('项目已存在')
        return
      }

      todoData.push(todo)
      _origin.call(this, todo)
    }
  }
}

export function removeTodo(todoData: ITodo[]): Function {
  return function (
    target: any,
    methodName: string,
    descriptor: PropertyDescriptor
  ) {
    // 暂存调用方法
    const _origin = descriptor.value // removeItem()

    descriptor.value = function (id): void {
      todoData = todoData.filter((item: ITodo) => item.id !== id)
      _origin.call(this, id)
    }
  }
}

export function toggleTodo(todoData: ITodo[]): Function {
  return function (
    target: any,
    methodName: string,
    descriptor: PropertyDescriptor
  ) {
    const _origin = descriptor.value // removeItem()
    descriptor.value = function (id): void {
      todoData = todoData.map((item: ITodo) => {
        if (item.id === id) {
          item.complated = !item.complated
          _origin.call(this, id, item.complated)
        }
        return item
      })
    }
  }
}
