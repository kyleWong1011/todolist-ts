export interface ITodo {
  id: number
  content: string
  complated: boolean
}

export enum EVENT_TYPES {
  ADD = 'add',
  REMOVE = 'remove',
  TOGGLE = 'toggle'
}

// type EVENTS = 'add' | 'remove' | 'toggle'
// interface EVENTS {
//   ADD: string
//   REMOVE: string
//   TOGGLE: string
// }

import TodoEvent from './TodoEvent'
import TodoDom from './TodoDom'
export default class TodoList {
  private wrapperEl: HTMLElement
  private static instance: TodoList
  private todoEvent: TodoEvent
  private todoDom: TodoDom
  private addHandlers: any[] = []
  private removeHandlers: any[] = []
  private toggleHandlers: any[] = []

  constructor(wrapperEl: HTMLElement) {
    this.wrapperEl = wrapperEl
    this.init()
  }

  public static create(wrapperEl: HTMLElement) {
    if (!TodoList.instance) {
      TodoList.instance = new TodoList(wrapperEl)
    }
    return TodoList.instance
  }

  private init() {
    this.todoEvent = TodoEvent.create()
    this.todoDom = TodoDom.create(this.wrapperEl)

    for (const key in EVENT_TYPES) {
      this.initHandlers(EVENT_TYPES[key as never] )
    }
  }

  public initHandlers(type: EVENT_TYPES) {
    switch (type) {
      case EVENT_TYPES.ADD:
        this.addHandlers.push(this.todoEvent.addTodo.bind(this.todoEvent))
        this.addHandlers.push(this.todoDom.addItem.bind(this.todoDom))
        break
      case EVENT_TYPES.REMOVE:
        this.removeHandlers.push(this.todoEvent.removeTodo.bind(this.todoEvent))
        this.removeHandlers.push(this.todoDom.removeItem.bind(this.todoDom))
        break
      case EVENT_TYPES.TOGGLE:
        this.toggleHandlers.push(this.todoEvent.toggleTodo.bind(this.todoEvent))
        this.toggleHandlers.push(this.todoDom.toggleItem.bind(this.todoDom))
        break
      default:
        break
    }
  }

  public notify<T>(type: EVENT_TYPES, param: T) {
    let i = 0
    let handlers: any[] = []
    let result: Promise<any>

    switch (type) {
      case EVENT_TYPES.ADD:
        handlers = this.addHandlers
        break
      case EVENT_TYPES.REMOVE:
        handlers = this.removeHandlers
        break
      case EVENT_TYPES.TOGGLE:
        handlers = this.toggleHandlers
        break
    }
    result = handlers[i](param)

    while (i < handlers.length - 1) {
      result = result.then(param =>
        setTimeout(() => {
          return handlers[i](param)
        }, 10)
      )
      i++
    }
  }
}
