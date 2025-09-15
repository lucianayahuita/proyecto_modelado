<template>
  <div class="home-section">
    <h1 class="title">Generación de Números Pseudoaleatorios</h1>
    
    <div class="button-group">
      <router-link to="/multiplicativo" class="algo-button">
        <span class="button-text">Algoritmo Multiplicativo</span>
      </router-link>
      
      <router-link to="/lineal" class="algo-button">
        <span class="button-text">Algoritmo Congruencial Lineal</span>
      </router-link>
    </div>
  </div>
</template>

<style scoped>
.home-wrapper {
  margin: 0;
  padding: 0;
  display: block;
}

.home-section {
  background-image: url('src/assets/ast.jpg'); 
  background-size: cover;
   background-position: center top; 
  background-repeat: no-repeat;
  background-color: #1a1a2e; 
  padding: 4rem 2rem;
  text-align: center;
  position: relative;
  margin: 0;
  margin-bottom: 0 !important;
  min-height: 70vh; 
  width: 100%;
  box-sizing: border-box;
}

.home-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(4, 4, 48, 0.6);
  z-index: 1;
}

.title {
  position: relative;
  z-index: 2;
  font-family: 'Space Grotesk', sans-serif;
  font-size: 2.5em;
  color: #64ffda;
  font-weight: 700;
  margin-top: 110px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8);
  margin-bottom: 3rem;
  text-transform: uppercase;
  letter-spacing: 2px;
}

.button-group {
  position: relative;
  z-index: 2;
  display: flex;
  margin-top: 50px;
  gap: 2rem;
  justify-content: center;
  flex-wrap: wrap;
}

.algo-button {
  background: linear-gradient(45deg, #64ffda, #4fc3f7);
  border: none;
  border-radius: 10px;
  color: #0c0c0c;
  font-size: 1.1em;
  font-family: 'Orbitron', sans-serif;
  font-weight: 600;
  cursor: pointer;
  text-transform: uppercase;
  letter-spacing: 1px;
  text-decoration: none;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(100, 255, 218, 0.3);
  padding: 1rem 2rem;
  display: inline-block;
}

.algo-button:hover {
  background: linear-gradient(45deg, #4fc3f7, #64ffda);
  transform: translateY(-2px);
  box-shadow: 0 6px 25px rgba(100, 255, 218, 0.5);
}

.button-text {
  font-size: 1rem;
}

/* Mobile */
@media (max-width: 768px) {
  .home-section {
    padding: 3rem 1rem;
  }
  
  .title {
    font-size: 2em;
  }
  
  .button-group {
    flex-direction: column;
    align-items: center;
    gap: 1rem;
  }
  
  .algo-button {
    width: 100%;
    max-width: 300px;
  }
}
</style>