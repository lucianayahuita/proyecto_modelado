<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import Navbar from './components/Navbar.vue'
import Footer from './components/Footer.vue'

const route = useRoute()

// Rutas donde NO se muestran ni el Navbar ni el Footer
const hideNavbarRoutes = [
  '/Eplazofijo',
  '/Emaximización',
  '/Ejuegodados',
  '/Ellegadasclientes',
  '/Egranja',
  '/Etienda'
]

// Verifica si la ruta actual está en la lista
const shouldHideNavbar = computed(() => hideNavbarRoutes.includes(route.path))
</script>

<template>
  <div>
    <!-- Muestra el Navbar y el Footer solo si no es una ruta de ejercicios -->
    <Navbar v-if="!shouldHideNavbar" />
    <router-view />
    <Footer v-if="!shouldHideNavbar" />
  </div>
</template>

<style>
body {
  margin: 0;
  font-family: sans-serif;
}
</style>
