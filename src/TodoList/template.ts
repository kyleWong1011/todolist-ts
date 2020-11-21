import { ITodo } from '.'

export function renderTodoItem({ id, content, complated }: ITodo) {
  return `
    <input type="checkbox" data-id=${id}
     ${complated ? 'checked' : ''}
      class="checkbox" />
    <span style="text-decoration:${
      complated ? 'line-through' : ''
    }" class="todo-content">${content}</span>
    <button data-id=${id} class="remove-btn">删除</button>
  `
}
