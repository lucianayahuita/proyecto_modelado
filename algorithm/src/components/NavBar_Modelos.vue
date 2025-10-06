<template>
  <nav class="navbar">
    <div class="nav-container">
      <div class="nav-brand">
        <router-link to="/" class="brand-link">
          AstroLou
        </router-link>
      </div>

      <div class="nav-menu" :class="{ 'active': isMenuExOpen }">

        <router-link to="/Eplazofijo" class="nav-link" @click="closeMenu">
          <span class="material-icons nav-icon">star</span>
          <span class="nav-text">1. Plazo Fijo</span>
        </router-link>

        <router-link to="/Emaximización" class="nav-link" @click="closeMenu">
          <span class="material-icons nav-icon">rocket_launch</span>
          <span class="nav-text">2. Maximización</span>
        </router-link>

        <router-link to="/Ejuegodados" class="nav-link" @click="closeMenu">
          <span class="material-icons nav-icon">casino</span>
          <span class="nav-text">3. Juego de dados</span>
        </router-link>

        <router-link to="/Ellegadasclientes" class="nav-link" @click="closeMenu">
          <span class="material-icons nav-icon">groups</span>
          <span class="nav-text">4. Llegada de clientes</span>
        </router-link>

        <router-link to="/Egranja" class="nav-link" @click="closeMenu">
          <span class="material-icons nav-icon">eco</span>
          <span class="nav-text">5. Granja</span>
        </router-link>

        <router-link to="/Etienda" class="nav-link" @click="closeMenu">
          <span class="material-icons nav-icon">store</span>
          <span class="nav-text">6. Tienda</span>
        </router-link>

        <router-link to="/" class="nav-link" @click="closeMenu">
          <span class="material-icons nav-icon">store</span>
          <span class="nav-text">Home</span>
        </router-link>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'NavBarModelos',
  data() {
    return {
      isMenuExOpen: false
    }
  },
  methods: {
    toggleMenu() {
      this.isMenuExOpen = !this.isMenuExOpen;
    },
    closeMenu() {
      this.isMenuExOpen = false;
    }
  }
}
</script>

<style scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  width: 240px; 
  height: 100vh; 
  background: linear-gradient(180deg, rgba(22,33,62,0.95), rgba(15,52,96,0.95));
  border-right: 2px solid #64ffda;
  box-shadow: 4px 0 25px rgba(100,255,218,0.15);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 2rem;
  z-index: 1000;
}

/* Contenedor general */
.nav-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  width: 100%;
}

/* Marca */
.nav-brand .brand-link {
  font-size: 1.8rem;
  font-weight: bold;
  color: #64ffda;
  text-decoration: none;
  margin-bottom: 2rem;
  font-family: 'Space Grotesk', sans-serif;
  transition: all 0.3s ease;
}

.brand-link:hover {
  color: #ffffff;
  text-shadow: 0 0 15px rgba(100,255,218,0.6);
}

/* Menú */
.nav-menu {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 90%;
  margin-top: 50px;
  align-items: center;
}

/* Links */
.nav-link {
  color: #e0e6ed;
  text-decoration: none;
  padding: 0.8rem 1rem;
  width: 90%;
  border-radius: 10px;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-weight: 500;
  font-family: 'Rajdhani', sans-serif;
  transition: all 0.3s ease;
  border: 2px solid transparent;
  justify-content: flex-start;
}

.nav-link:hover {
  background: rgba(100,255,218,0.1);
  border-color: rgba(100,255,218,0.4);
  color: #64ffda;
  box-shadow: 0 0 15px rgba(100,255,218,0.3);
  transform: translateX(3px);
}

.nav-link.router-link-active {
  background: linear-gradient(45deg, rgba(100,255,218,0.3), rgba(79,195,247,0.3));
  border-color: #64ffda;
  color: #64ffda;
  box-shadow: 0 0 20px rgba(100,255,218,0.4);
}

.nav-icon {
  font-size: 1.4rem;
}

.nav-text {
  font-size: 1rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
}

/* 📱 Responsive: menú ocultable en móviles */
@media (max-width: 768px) {
  .navbar {
    width: 200px;
    left: -200px;
    transition: 0.3s ease;
  }

  .navbar.active {
    left: 0;
  }

  .hamburger {
    position: absolute;
    top: 20px;
    right: -45px;
    display: flex;
    flex-direction: column;
    cursor: pointer;
    padding: 0.5rem;
    background: rgba(22,33,62,0.9);
    border-radius: 8px;
  }

  .hamburger span {
    width: 25px;
    height: 3px;
    background: #64ffda;
    margin: 3px 0;
    transition: 0.3s;
    border-radius: 2px;
  }
}
</style>