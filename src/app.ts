import TodoList, { EVENT_TYPES, ITodo } from './TodoList'
import { init } from 'snabbdom/build/package/init'
// import { classModule } from 'snabbdom/build/package/modules/class'
// import { propsModule } from 'snabbdom/build/package/modules/props'
// import { styleModule } from 'snabbdom/build/package/modules/style'
// import { eventListenersModule } from 'snabbdom/build/package/modules/eventlisteners'
import { h } from 'snabbdom/build/package/h'

export const patch = init([])
;(doc => {
  const patch = init([])

  let vnode = h('div#container.cls', [
    h('h1', 'Hello Sabbdom'),
    h('p', '这是一个p标签')
  ])

  let app = document.querySelector('#app')

  let oldVnode = patch(app, vnode)

  // 对比差异更新视图
  // 假设有个操作要更新DOM
  // 更新DOM子元素
  setTimeout(() => {
    const newVnode = h('div.todo', [
      h(
        'div.todo-input',
        h('input.input', {
          style: {
            backgroundColor: 'red'
          },
          placeholder:''
        })
      ),
      h('div.todo-list', h('div.todo-list'))
    ])
    vnode = patch(oldVnode, newVnode)

    // 删除DOM（官方示例是个错误示例，已经被删掉）
    // 报错：Cannot read property 'key' of null
    // patch(endVnode, null)

    // 通过创建注释节点来实现
    // vnode = patch(vnode, h('!'))

    // Vnode节点仍然存在
    // patch(vnode, h('div', '又在原位置出现'))
  }, 20)
})(document)
