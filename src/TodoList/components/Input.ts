import List from './List'
import Template from './template'

export type InputOption = {
  wrapperEl: HTMLElement
  placeholderText: string
  buttonText: string
}

export default class Input extends Template {
  private options: InputOption

  constructor(options: InputOption) {
    super()
    this.options = options
    this.render()
    setTimeout(() => {
      this.bindEvent()
    }, 0)
  }

  private render(): void {
    const { placeholderText, buttonText } = this.options
    this.options.wrapperEl.innerHTML += Template.inputView(placeholderText, buttonText)
  }

  private bindEvent():void {
    const oAddBtn: HTMLElement = document.querySelector('.add-btn')
    const oInput: HTMLInputElement = document.querySelector('.input')
    if (oAddBtn) {
      oAddBtn.addEventListener('click', this.handleAddBtnClick.bind(this, oInput), false)
    }
  }

  private handleAddBtnClick(inputEl: HTMLInputElement): void {
    const value: string = inputEl.value.trim()
    if (!value) {
      alert('输入不能为空')
      return
    }
    List.addItem(value)
    inputEl.value = ''
  }
}
