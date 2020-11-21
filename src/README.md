# 数据操作
  1. todoData[]
  2. 方法 -> 操作数据
     + 增加数据 => addTodo(todo) { id, content, completed}
     + 删除数据 => removeTodo(id) => todoData => { id }
     + 修改数据 => toggleTodo(id) => todoData => { completed }

# DOM 操作
  调用方法 => 操作DOM
   + 增加数据 => todoItem模版 =>todo =>todoItem => todoList
   + 删除项 = id => todoItems(id) => item => remove
   + 修改项 = id => todoItems(id) => item => toggle

# 设计方式
  1. DOM 操作 => 数据操作 => app.ts => 回调 => 实现
  2. 数据操作  => DOM 操作 => app.ts => 回调 => 实现
