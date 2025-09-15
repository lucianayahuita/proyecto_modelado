<template>
  <nav class="navbar">
    <div class="nav-container">
      <div class="nav-brand">
        <router-link to="/" class="brand-link">
          AstroLou
        </router-link>
      </div>
      
      <div class="nav-menu" :class="{ 'active': isMenuOpen }">
        <router-link 
          to="/" 
          class="nav-link"
          @click="closeMenu"
        >
          <span class="material-icons nav-icon">home</span>
          <span class="nav-text">Home</span>
        </router-link>
        
        <router-link 
          to="/multiplicativo" 
          class="nav-link"
          @click="closeMenu"
        >
          <span class="material-icons nav-icon">star</span>
          <span class="nav-text">Multiplicativo</span>
        </router-link>
        
        <router-link 
          to="/lineal" 
          class="nav-link"
          @click="closeMenu"
        >
          <span class="material-icons nav-icon">rocket_launch</span>
          <span class="nav-text">Lineal</span>
        </router-link>
      </div>
      
      <div class="hamburger" @click="toggleMenu">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'Navbar',
  data() {
    return {
      isMenuOpen: false
    }
  },
  methods: {
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen;
    },
    closeMenu() {
      this.isMenuOpen = false;
    }
  }
}
</script>

<style scoped>
.navbar {
  background: linear-gradient(145deg, rgba(22, 33, 62, 0.9), rgba(15, 52, 96, 0.9));
  border-bottom: 2px solid #64ffda;
  box-shadow: 
    0 8px 32px rgba(100, 255, 218, 0.2),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  position: sticky;
  top: 0;
  z-index: 1000;
  height:100px;
}

.nav-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 10px 1rem; 
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 70px;
}


.nav-brand .brand-link {
  font-size: 2rem;
  font-weight: bold;
  font-family: 'Space Grotesk', sans-serif;
  color: #64ffda;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  transition: all 0.3s ease;
}

.brand-link:hover {
  color: #ffffff;
  text-shadow: 0 0 15px rgba(100, 255, 218, 0.6);
}

.nav-menu {
  display: flex;
  gap: 2rem;
  align-items: center;
}

.nav-link {
  color: #e0e6ed;
  text-decoration: none;
  padding: 0.75rem 1.5rem;
  border-radius: 10px;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 500;
  font-family: 'Rajdhani', sans-serif;
  transition: all 0.3s ease;
  border: 2px solid transparent;
}

.nav-link:hover {
  background: rgba(100, 255, 218, 0.1);
  border-color: rgba(100, 255, 218, 0.4);
  color: #64ffda;
  box-shadow: 0 0 15px rgba(100, 255, 218, 0.3);
  transform: translateY(-2px);
}

.nav-link.router-link-active {
  background: linear-gradient(45deg, rgba(100, 255, 218, 0.3), rgba(79, 195, 247, 0.3));
  border-color: #64ffda;
  color: #64ffda;
  box-shadow: 0 0 20px rgba(100, 255, 218, 0.4);
}

.nav-icon {
  font-size: 1.3rem;
}

.nav-text {
  font-size: 0.95rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.hamburger {
  display: none;
  flex-direction: column;
  cursor: pointer;
  padding: 0.5rem;
}

.hamburger span {
  width: 25px;
  height: 3px;
  background: #64ffda;
  margin: 3px 0;
  transition: 0.3s;
  border-radius: 2px;
}

.hamburger:hover span {
  background: #ffffff;
  box-shadow: 0 0 5px rgba(100, 255, 218, 0.5);
}

/* Mobile */
@media (max-width: 768px) {
  .hamburger {
    display: flex;
  }
  
  .nav-menu {
    position: fixed;
    left: -100%;
    top: 70px;
    flex-direction: column;
    background: linear-gradient(145deg, rgba(22, 33, 62, 0.95), rgba(15, 52, 96, 0.95));
    width: 100%;
    transition: 0.3s;
    border-top: 2px solid #64ffda;
    box-shadow: 0 8px 32px rgba(100, 255, 218, 0.2);
    backdrop-filter: blur(10px);
    padding: 2rem 0;
    gap: 1rem;
  }
  
  .nav-menu.active {
    left: 0;
  }
  
  .nav-link {
    padding: 1rem 2rem;
    margin: 0 1rem;
    justify-content: center;
  }
  
  .hamburger.active span:nth-child(2) {
    opacity: 0;
  }
  
  .hamburger.active span:nth-child(1) {
    transform: translateY(9px) rotate(45deg);
  }
  
  .hamburger.active span:nth-child(3) {
    transform: translateY(-9px) rotate(-45deg);
  }
}
</style>