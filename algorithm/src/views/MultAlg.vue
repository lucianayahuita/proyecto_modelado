<template>
  <div class="page-container">
    
    <!-- Contenido Principal -->
    <div class="main-content">
      <div class="hero">
        <h3>Generador de números aleatorios con congruencia multiplicativa</h3>
      </div>

      <div class="explanation">
        <p>Algoritmo que produce una secuencia de números pseudoaleatorios calculados mediante una ctte multiplicativa</p>
      </div>

      <div class="div-n">
        <div class="datos">
          <div class="d1">
            <h3>X₀</h3>
            <input ref="x0" type="number" autocomplete="off" placeholder="Valor inicial">
          </div>
          <div class="d2">
            <h3>Ki</h3>
            <input ref="Ki" type="number" autocomplete="off" placeholder="Multiplicador">
          </div>
          <div class="d3">
            <h3>P</h3>
            <input ref="P" type="number" autocomplete="off" placeholder="Módulo">
          </div>
          <div class="d5">
            <h3>Cantidad de decimales</h3>
            <input ref="n" type="number" autocomplete="off" placeholder="Cantidad" min="1" max="100">
          </div>
          <div class="d6">
            <h3>Escoge cómo deseas calcular "a"</h3>
            <select v-model="opcionSeleccionada">
                <option disabled value="">Selecciona una opción</option>
                <option value="opcion1">a=3+8k</option>
                <option value="opcion2">a=5+8k</option>
            </select>

            <p>Seleccionaste: {{ opcionSeleccionada }}</p>
        </div>
          <div class="button-send">
            <button type="button" @click="generarSecuencia">Generar Secuencia</button>
          </div>
        </div>

        <div class="m-1">
          <div class="table">
            <h4>Secuencia Generada</h4>
            <div class="table-responsive">
              <table id="results-table">
                <thead>
                  <tr>
                    <th>i</th>
                    <th>X₀</th>
                    <th>Nuevo Número</th>
                    <th>r₀</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-if="results.length === 0">
                    <td colspan="4" class="empty-state">
                      <div class="icon"></div>
                      <p>Ingresa los parámetros y genera tu secuencia</p>
                    </td>
                  </tr>
                  <tr v-for="result in results" :key="result.iteracion">
                    <td>{{ result.iteracion }}</td>
                    <td>{{ result.x0_valor }}</td>
                    <td>{{ result.xi_valor }}</td>
                    <td>{{ result.ri_valor }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          
          <div class="buttons">
            <div class="button-clean">
              <button type="button" @click="limpiarTabla">Limpiar</button>
            </div>
            <div class="button-menu">
              <button type="button" @click="$router.push('/')">Volver al menú</button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Alert Component -->
    <div v-if="alert.show" :class="['custom-alert', alert.type]" class="alert-component">
      <div class="alert-content">
        <span class="alert-icon">{{ getAlertIcon(alert.type) }}</span>
        <span class="alert-message">{{ alert.message }}</span>
        <button class="alert-close" @click="closeAlert">×</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LinearAlg',
  data() {
    return {
      isMenuOpen: false,
      results: [],
      opcionSeleccionada: '', // Inicializar vacío para forzar selección
      alert: {
        show: false,
        message: '',
        type: 'info'
      }
    }
  },
  methods: {
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen;
    },
    closeMenu() {
      this.isMenuOpen = false;
    },
    
    showAlert(message, type = 'info') {
      this.alert = {
        show: true,
        message,
        type
      };
      
      setTimeout(() => {
        this.closeAlert();
      }, 3000);
    },
    
    closeAlert() {
      this.alert.show = false;
    },
    
    getAlertIcon(type) {
      const icons = {
        success: '✓',
        error: '⚠',
        info: 'ℹ'
      };
      return icons[type] || icons.info;
    },
    
    verificarCamposVacios() {
      const x0 = this.$refs.x0.value.trim();
      const Ki = this.$refs.Ki.value.trim();
      const P = this.$refs.P.value.trim();
      const n = this.$refs.n.value.trim();

      if (!x0 || !Ki || !P || !n || !this.opcionSeleccionada) {
        this.showAlert('No puede haber campos vacíos o sin seleccionar', 'error');
        return false;
      }
      return true;
    },
    
    verificarXoImpar () {
      const x0 = parseFloat(this.$refs.x0.value);
      if (x0 % 2 === 0) {
        this.showAlert('X₀ debe ser un número impar', 'error');
        return false;
      }
      return true;
    },
    
    verificarNegativos() {
      const x0 = parseFloat(this.$refs.x0.value);
      const Ki = parseFloat(this.$refs.Ki.value);
      const P = parseFloat(this.$refs.P.value);
      const n = parseFloat(this.$refs.n.value);
      
      if (x0 <= 0 || Ki <= 0 || P <= 0 || n <= 0) {
        this.showAlert('No puede enviarse números negativos o cero', 'error');
        return false;
      }
      return true;
    },
    
    verificarEnteros() {
      const x0 = parseFloat(this.$refs.x0.value);
      const Ki = parseFloat(this.$refs.Ki.value);
      const P = parseFloat(this.$refs.P.value);
      const n = parseFloat(this.$refs.n.value);

      if (
          !Number.isInteger(x0) ||
          !Number.isInteger(Ki) ||
          !Number.isInteger(P) ||
          !Number.isInteger(n)
      ) {
          this.showAlert('Solo se permiten números enteros', 'error');
          return false;
      }
      return true;
    },
    
    generarSecuencia() {
      this.results = [];
      
      if (this.verificarCamposVacios() && this.verificarNegativos() && this.verificarEnteros() && this.verificarXoImpar()) {
        const x0 = parseFloat(this.$refs.x0.value);
        const Ki = parseFloat(this.$refs.Ki.value);
        const P = parseFloat(this.$refs.P.value);
        const n = parseFloat(this.$refs.n.value);
        
        // Calcular valores
        const g = (Math.log(P) / Math.log(2)) + 2;
        const m = Math.pow(2, g);
        
        // Calcular 'a' según la opción seleccionada
        let a;
        if (this.opcionSeleccionada === 'opcion1') {
          a = 3 + (8 * Ki);
        } else if (this.opcionSeleccionada === 'opcion2') {
          a = 5 + (8 * Ki);
        }
        
        let anterior = x0;
        let l = P;

        console.log(`Parámetros: Xo=${x0}, Ki=${Ki}, P=${P}`);
        console.log(`Valores calculados: a=${a}, g=${g}, m=${m}`);

        for (let i = 1; i <= l + 1; i++) {
          let xi = (a * anterior) % m;
          let ri = (xi / (m - 1)).toFixed(n);
          
          this.results.push({
            iteracion: i,
            x0_valor: anterior,
            xi_valor: xi,
            ri_valor: ri
          });
          
          anterior = xi;
          console.log(`Iteración ${i}: Xi = ${xi} | Ri = ${ri}`);
        }
        
        this.showAlert('Números enviados exitosamente. Se ha generado la secuencia', 'success');
      }
    },
    
    limpiarTabla() {
      this.$refs.x0.value = '';
      this.$refs.Ki.value = '';
      this.$refs.P.value = '';
      this.$refs.n.value = '';
      this.opcionSeleccionada = '';
      this.results = [];
      
      this.showAlert('Campos y tabla limpiados correctamente', 'success');
    }
  }
}
</script>

<style scoped>
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

.page-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: linear-gradient(145deg, rgba(22, 33, 62, 0.9), rgba(15, 52, 96, 0.9));
}

.main-content {
  flex: 1;
}

.hero {
  background-image: url("/src/assets/space2.jpg");
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  height: 230px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.hero h3 {
  color: #FFFFFF;
  text-shadow: 2px 2px 4px #000000;
  font-size: 2.5em;
  font-family: 'Orbitron', sans-serif;
  font-weight: 700;
  text-align: center;
  letter-spacing: 2px;
  position: relative;
  z-index: 3;
}

.explanation {
  padding: 30px 20px;
  text-align: center;
  background: none;
  margin: 20px auto;
  max-width: 1450px;
  max-height: 150px;
  border-radius: 16px;
  border: 1px solid #64ffda;
  box-shadow: 0 0 20px rgba(100, 255, 218, 0.3);
}

.explanation p {
  font-size: 1.2em;
  color: #b8c6db;
  font-family: 'Rajdhani', sans-serif;
  font-weight: 400;
  line-height: 1.6;
}

.div-n {
  display: flex;
  justify-content: space-around;
  align-items: center;
  gap: 20px;
  margin-bottom: 2rem;
}

.datos {
  flex: 0 0 350px;
  max-width: 350px;
  background: linear-gradient(145deg, rgba(22, 33, 62, 0.9), rgba(15, 52, 96, 0.9));
  padding: 25px;
  border-radius: 20px;
  border: 2px solid #64ffda;
  box-shadow: 
    0 8px 32px rgba(100, 255, 218, 0.2),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  height: fit-content;
}

.datos > div {
  margin-bottom: 20px;
}

.datos h3 {
  font-family: 'Orbitron', monospace;
  font-size: 1.2em;
  color: #64ffda;
  margin-bottom: 8px;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.datos input {
  width: 90%;
  padding: 12px;
  background: rgba(12, 12, 12, 0.8);
  border: 2px solid #333;
  border-radius: 10px;
  color: #64ffda;
  font-size: 1em;
  font-family: 'Rajdhani', monospace;
  transition: all 0.3s ease;
}
.datos select{
    width: 95%;
    padding: 12px;
    background: rgba(12, 12, 12, 0.8);
    border: 2px solid #333;
    border-radius: 10px;
    color: #64ffda;
    font-size: 1em;
    height:50px;
    font-family: 'Rajdhani', monospace;
    transition: all 0.3s ease;
}
.datos input:focus {
  outline: none;
  border-color: #64ffda;
  box-shadow: 0 0 15px rgba(100, 255, 218, 0.4);
  background: rgba(12, 12, 12, 0.95);
}

.datos input::placeholder {
  color: #666;
}

.button-send button {
  width: 100%;
  padding: 12px;
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
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(100, 255, 218, 0.3);
}

.button-send button:hover {
  background: linear-gradient(45deg, #4fc3f7, #64ffda);
  transform: translateY(-2px);
  box-shadow: 0 6px 25px rgba(100, 255, 218, 0.5);
}

.m-1 {
  flex: 1;
  min-width: 350px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.table {
  background: linear-gradient(145deg, rgba(22, 33, 62, 0.9), rgba(15, 52, 96, 0.9));
  padding: 20px;
  border-radius: 20px;
  border: 2px solid #64ffda;
  box-shadow: 
    0 8px 32px rgba(100, 255, 218, 0.2),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  flex: 1;
  min-height: 450px;
  overflow-y: auto;
}

.table h4 {
  color: #64ffda;
  font-family: 'Orbitron', sans-serif;
  text-align: center;
  margin-bottom: 20px;
  font-size: 1.3em;
  text-transform: uppercase;
  letter-spacing: 1px;
}

#results-table {
  width: 100%;
  border-collapse: collapse;
  font-family: 'Rajdhani', monospace;
  margin-top: 10px;
}

#results-table th {
  background: linear-gradient(45deg, rgba(100, 255, 218, 0.3), rgba(79, 195, 247, 0.3));
  color: #64ffda;
  padding: 15px 10px;
  text-align: center;
  border: 1px solid rgba(100, 255, 218, 0.4);
  font-weight: 600;
  font-size: 1.1em;
  text-transform: uppercase;
  letter-spacing: 1px;
  position: sticky;
  top: 0;
  z-index: 10;
}

#results-table td {
  padding: 12px 10px;
  text-align: center;
  border: 1px solid rgba(100, 255, 218, 0.2);
  color: #e0e6ed;
  font-size: 1em;
  font-weight: 500;
}

#results-table tbody tr:nth-child(even) {
  background: rgba(100, 255, 218, 0.05);
}

#results-table tbody tr:hover {
  background: rgba(100, 255, 218, 0.15);
  transform: scale(1.01);
  transition: all 0.2s ease;
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 350px;
  color: #b8c6db;
  font-size: 1.1em;
  font-family: 'Rajdhani', sans-serif;
  text-align: center;
}

.empty-state .icon {
  font-size: 3em;
  margin-bottom: 15px;
  color: #64ffda;
  opacity: 0.5;
}

.buttons {
  display: flex;
  gap: 15px;
}

.buttons > div {
  flex: 1;
}

.buttons button {
  width: 100%;
  padding: 12px;
  border: 2px solid #64ffda;
  border-radius: 10px;
  background: transparent;
  color: #64ffda;
  font-size: 1em;
  font-family: 'Orbitron', sans-serif;
  font-weight: 400;
  cursor: pointer;
  text-transform: uppercase;
  letter-spacing: 1px;
  transition: all 0.3s ease;
}

.buttons button:hover {
  background: rgba(100, 255, 218, 0.1);
  box-shadow: 0 0 15px rgba(100, 255, 218, 0.3);
  transform: translateY(-2px);
}

.button-clean button {
  border-color: #ff6b6b;
  color: #ff6b6b;
}

.button-clean button:hover {
  background: rgba(255, 107, 107, 0.1);
  box-shadow: 0 0 15px rgba(255, 107, 107, 0.3);
}

/* Alert Styles */
.alert-component {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 1100;
  max-width: 400px;
  padding: 15px 20px;
  border-radius: 10px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.3);
  font-family: 'Rajdhani', sans-serif;
  font-size: 1.1em;
  backdrop-filter: blur(10px);
}

.custom-alert.success {
  background: linear-gradient(45deg, rgba(76, 175, 80, 0.9), rgba(139, 195, 74, 0.9));
  color: white;
  border: 1px solid #4CAF50;
}

.custom-alert.error {
  background: linear-gradient(45deg, rgba(244, 67, 54, 0.9), rgba(255, 87, 34, 0.9));
  color: white;
  border: 1px solid #f44336;
}

.custom-alert.info {
  background: linear-gradient(45deg, rgba(100, 255, 218, 0.9), rgba(79, 195, 247, 0.9));
  color: #0c0c0c;
  border: 1px solid #64ffda;
}

.alert-content {
  display: flex;
  align-items: center;
  gap: 10px;
}

.alert-close {
  background: none;
  border: none;
  color: inherit;
  font-size: 1.2em;
  cursor: pointer;
  margin-left: auto;
  padding: 0 5px;
  border-radius: 3px;
  transition: background 0.2s;
}

.alert-close:hover {
  background: rgba(255,255,255,0.2);
}

/* Mobile Styles */
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

  .hero h3 {
    font-size: 2em;
    padding: 0 20px;
  }
  
  .div-n {
    flex-direction: column;
    padding: 20px;
  }
  
  .datos {
    max-width: 100%;
  }
  
  .buttons {
    flex-direction: column;
  }
}
</style>