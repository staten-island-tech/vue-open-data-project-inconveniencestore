import { createRouter, createWebHistory } from 'vue-router'
import BoroughView from '@/views/BoroughView.vue'
import TypeView from '@/views/TypeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'borough',
      component: BoroughView,
    },
    {
      path: '/animaltype',
      name: 'animal-pie-chart',
      component: TypeView,
    },
  ],
})

export default router
