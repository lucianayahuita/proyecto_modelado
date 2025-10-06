import { createRouter, createWebHistory } from 'vue-router'
import Home from './views/Home.vue'
import MultAlg from './views/MultAlg.vue'
import LinearAlg from './views/LinearAlg.vue'
import Eplazofijo from './views/Eplazofijo.vue'
import Emaximización from './views/Emaximización.vue'
import Ejuegodados from './views/Ejuegodados.vue'
import Ellegadasclientes from './views/Ellegadasclientes.vue'
import Egranja from './views/Egranja.vue'
import Etienda from './views/Etienda.vue'
const routes = [
  { path: '/', component: Home },
  { path: '/multiplicativo', component: MultAlg },
  { path: '/lineal', component: LinearAlg },
  { path: '/Eplazofijo', component: Eplazofijo },
  { path: '/Emaximización', component: Emaximización },
  { path: '/Ejuegodados', component: Ejuegodados},
  { path: '/Ellegadasclientes', component: Ellegadasclientes},
  { path: '/Egranja', component: Egranja },
  { path: '/Etienda', component: Etienda }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
