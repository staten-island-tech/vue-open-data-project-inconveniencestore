import { createRouter, createWebHistory } from 'vue-router'
import BoroughView from '@/views/BoroughView.vue'
import AnimalPieChart from '@/components/AnimalPieChart.vue'

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
      component: AnimalPieChart,
    },

    /* {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      // basically, doesn't load it until it's needed
      component: () => import('../views/AboutView.vue'),
    }, */
  ],
})

export default router
