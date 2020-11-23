import { RouteRecordRaw, createRouter, createWebHistory } from 'vue-router'

export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/todo-list'
  },
  {
    path: '/todo-list',
    name: 'todoList',
    component: () => import('../views/todo-list/index.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
