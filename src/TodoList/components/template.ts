import { ITodo } from '..'

export default abstract class Template {
  protected static inputView(placeholderText: string, buttonText: string): string {
    return `
    <div class="todo-input">
      <input type="text" placeholder="${placeholderText}" class="input" />
      <button class="add-btn">${buttonText}</button>
    </div>
    `
  }

  protected static todoView(todo: ITodo): string {
    const { id, complated, content } = todo
    return `
      <div class="todo-item">
          <input type="checkbox" data-id=${id} ${complated ? 'checked' : ''}  class="checkbox" />
          <span style="text-decoration:${
            complated ? 'line-through' : ''
          }" class="todo-content">${content}</span>
          <button data-id=${id} class="remove-btn">删除</button>
      </div>
    `
  }

  protected static listView(data: ITodo[]): string {
    return `
      <div class="todo-list">
        ${
          data.length
            ? data.map(todo => {
                return Template.todoView(todo)
              }).join('')
            : '<div class="no-data">当前没有数据<div>'
        }
      </div>
    `
  }
}
