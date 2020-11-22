import Input, { InputOption } from './components/Input'
import List from './components/List'

export interface ITodo {
  id: number
  content: string
  complated: boolean
}

class TodoList {
  private el: HTMLElement
  private todoData: ITodo[]
  private input: Input
  private list: List
  private todoWrapper: HTMLElement

  constructor(el: HTMLElement, todoData: ITodo[]) {
    this.el = el
    this.todoData = todoData
    this.todoWrapper = document.createElement('div')
    this.todoWrapper.className = 'todo'
    this.init()
  }

  public init() {
    this.createComponents()
    this.render()
    this.bindEvent()
    console.log('init')
  }

  public createComponents() {
    this.input = new Input(<InputOption>{
      wrapperEl: this.todoWrapper,
      placeholderText: '请输入',
      buttonText: '新增'
    })
    this.list = new List({
      wrapperEl: this.todoWrapper,
      todoData: this.todoData
    })
  }

  public render() {
    this.el.appendChild(this.todoWrapper)
  }

  public bindEvent() {
    console.log('bindEvent')
  }
}

export default TodoList
