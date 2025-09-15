import { createRouter, createWebHistory } from 'vue-router'
import Home from './views/Home.vue'
import MultAlg from './views/MultAlg.vue'
import LinearAlg from './views/LinearAlg.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/multiplicativo', component: MultAlg },
  { path: '/lineal', component: LinearAlg }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
