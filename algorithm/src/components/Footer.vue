<template>
  <footer class="footer">
    <div class="footer-container">
      <div class="footer-content">
        <h4 class="footer-title">Proyecto de Modelado y Simulación</h4>
        <p class="footer-author">LUCIANA CECILIA YAHUITA LAZARTE</p>
        
        <div class="footer-divider"></div>

        <div class="footer-bottom">
          <p class="footer-copyright">© 2024 AstroLou - Simulaciones Espaciales</p>
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  background: linear-gradient(145deg, rgba(22, 33, 62, 0.9), rgba(15, 52, 96, 0.9));
  border-top: 2px solid #64ffda;
  box-shadow: 
    0 -8px 32px rgba(100, 255, 218, 0.2),
    inset 0 -1px 0 rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  margin-top: 0; 
  position: relative;
}

.footer-container {
  max-width: 1000px;
  margin: 0 auto;
  padding: 0.8rem 1rem 0.3rem;
}

.footer-content {
  text-align: center;
}

.footer-title {
  font-family: 'Orbitron', sans-serif;
  font-size: 1.3em;
  color: #64ffda;
  margin-bottom: 10px;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-weight: 600;
}

.footer-author {
  font-family: 'Rajdhani', sans-serif;
  font-size: 1.1em;
  color: #e0e6ed;
  margin-bottom: 20px;
  font-weight: 500;
  letter-spacing: 0.5px;
}

.footer-divider {
  width: 100px;
  height: 2px;
  background: linear-gradient(90deg, transparent, #64ffda, transparent);
  margin: 20px auto;
  border-radius: 2px;
}

.footer-bottom {
  border-top: 1px solid rgba(100, 255, 218, 0.2);
  padding-top: 15px;
  margin-top: 15px;
}

.footer-copyright {
  font-family: 'Rajdhani', sans-serif;
  font-size: 0.9rem;
  color: #b8c6db;
  margin: 0;
  font-weight: 400;
}

/* Mobile */
@media (max-width: 768px) {
  .footer-container {
    padding: 1.5rem 1rem 1rem;
  }
  
  .footer-title {
    font-size: 1.1em;
  }
  
  .footer-author {
    font-size: 1em;
  }
  
  .footer-links {
    flex-direction: column;
    gap: 0.5rem;
    align-items: center;
  }
  
  .footer-link {
    display: inline-block;
    width: fit-content;
  }
}
</style>