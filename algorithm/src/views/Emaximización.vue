<template>
  <div class="page-wrapper">
    <NavBarModelos />
    
    <div class="page-container">
      <div class="main-content">
        <div class="hero">
          <h3>Maximización de Función Objetivo</h3>
        </div>

        <div class="explanation">
          <p>Encontrar el máximo de: Z = 2x₁ + 3x₂ - x₃ | s.a: x₁+x₂ ≥ 2, 1≤ x₃ ≤ 2, x₂ ≥ 0, 0 ≤ x₁ ≤ 10</p>
        </div>

        <div class="div-n">
          <div class="datos">
            <div class="param-section">
              <h3>Coeficientes de la Función Objetivo</h3>
              <p class="subtitle">Z = c₁x₁ + c₂x₂ + c₃x₃</p>
              
              <label>c₁ (coef. de x₁)</label>
              <input ref="c1" type="number" step="0.1" placeholder="Ej: 2">
              
              <label>c₂ (coef. de x₂)</label>
              <input ref="c2" type="number" step="0.1" placeholder="Ej: 3">
              
              <label>c₃ (coef. de x₃)</label>
              <input ref="c3" type="number" step="0.1" placeholder="Ej: -1">
            </div>

            <div class="param-section">
              <h3>Número de Iteraciones</h3>
              <input ref="iteraciones" type="number" placeholder="Ej: 10000" min="100" max="100000">
            </div>

            <div class="button-send">
              <button type="button" @click="maximizar">Maximizar</button>
            </div>
          </div>

          <div class="m-1">
            <div class="table">
              <h4>Mejores Soluciones Encontradas</h4>
              <div class="table-responsive">
                <table id="results-table">
                  <thead>
                    <tr>
                      <th>Iteración</th>
                      <th>x₁</th>
                      <th>x₂</th>
                      <th>x₃</th>
                      <th>Z (Valor)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-if="results.length === 0">
                      <td colspan="5" class="empty-state">
                        <div class="icon"></div>
                        <p>Ingresa los parámetros y ejecuta la maximización</p>
                      </td>
                    </tr>
                    <tr v-for="result in results" :key="result.iter">
                      <td>{{ result.iter }}</td>
                      <td>{{ result.x1 }}</td>
                      <td>{{ result.x2 }}</td>
                      <td>{{ result.x3 }}</td>
                      <td class="z-value">{{ result.z }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            
            <div v-if="solucionOptima" class="resultado-final">
              <h3>Solución Óptima Encontrada</h3>
              <div class="solucion-grid">
                <div class="sol-item">
                  <span class="label">x₁ =</span>
                  <span class="value">{{ solucionOptima.x1 }}</span>
                </div>
                <div class="sol-item">
                  <span class="label">x₂ =</span>
                  <span class="value">{{ solucionOptima.x2 }}</span>
                </div>
                <div class="sol-item">
                  <span class="label">x₃ =</span>
                  <span class="value">{{ solucionOptima.x3 }}</span>
                </div>
                <div class="sol-item destacado">
                  <span class="label">Z máximo =</span>
                  <span class="value">{{ solucionOptima.z }}</span>
                </div>
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

      <div v-if="alert.show" :class="['custom-alert', alert.type]" class="alert-component">
        <div class="alert-content">
          <span class="alert-icon">{{ getAlertIcon(alert.type) }}</span>
          <span class="alert-message">{{ alert.message }}</span>
          <button class="alert-close" @click="closeAlert">×</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NavBarModelos from '../components/NavBar_Modelos.vue';

export default {
  name: 'Emaximizacion',
  components: {
    NavBarModelos
  },
  data() {
    return {
      results: [],
      solucionOptima: null,
      alert: {
        show: false,
        message: '',
        type: 'info'
      }
    }
  },
  methods: {
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
      const c1 = this.$refs.c1.value.trim();
      const c2 = this.$refs.c2.value.trim();
      const c3 = this.$refs.c3.value.trim();
      const iter = this.$refs.iteraciones.value.trim();

      if (!c1 || !c2 || !c3 || !iter) {
        this.showAlert('No puede haber campos vacíos', 'error');
        return false;
      }
      return true;
    },
    
    cumpleRestricciones(x1, x2, x3) {
      // x1 + x2 >= 2
      if (x1 + x2 < 2) return false;
      
      // 1 <= x3 <= 2
      if (x3 < 1 || x3 > 2) return false;
      
      // x2 >= 0 (entero)
      if (x2 < 0 || !Number.isInteger(x2)) return false;
      
      // 0 <= x1 <= 10
      if (x1 < 0 || x1 > 10) return false;
      
      return true;
    },
    
    calcularZ(x1, x2, x3, c1, c2, c3) {
      return c1 * x1 + c2 * x2 + c3 * x3;
    },
    
    maximizar() {
      this.results = [];
      this.solucionOptima = null;
      
      if (!this.verificarCamposVacios()) return;
      
      const c1 = parseFloat(this.$refs.c1.value);
      const c2 = parseFloat(this.$refs.c2.value);
      const c3 = parseFloat(this.$refs.c3.value);
      const maxIter = parseInt(this.$refs.iteraciones.value);
      
      if (maxIter < 100 || maxIter > 100000) {
        this.showAlert('Las iteraciones deben estar entre 100 y 100,000', 'error');
        return;
      }
      
      let mejorZ = -Infinity;
      let mejorSolucion = null;
      const mejoresSoluciones = [];
      
      // Algoritmo de búsqueda aleatoria con restricciones
      for (let i = 1; i <= maxIter; i++) {
        // Generar valores aleatorios dentro de las restricciones
        let x1 = Math.random() * 10; // 0 <= x1 <= 10
        let x2 = Math.floor(Math.random() * 20); // x2 entero >= 0
        let x3 = 1 + Math.random(); // 1 <= x3 <= 2
        
        // Ajustar para cumplir x1 + x2 >= 2
        if (x1 + x2 < 2) {
          const faltante = 2 - (x1 + x2);
          x1 += faltante;
          if (x1 > 10) {
            x2 = Math.ceil(2 - 10);
            x1 = 10;
          }
        }
        
        if (this.cumpleRestricciones(x1, x2, x3)) {
          const z = this.calcularZ(x1, x2, x3, c1, c2, c3);
          
          if (z > mejorZ) {
            mejorZ = z;
            mejorSolucion = {
              iter: i,
              x1: x1.toFixed(4),
              x2: x2,
              x3: x3.toFixed(4),
              z: z.toFixed(4)
            };
            
            // Guardar solo las mejores 10 soluciones
            mejoresSoluciones.push({...mejorSolucion});
            if (mejoresSoluciones.length > 10) {
              mejoresSoluciones.shift();
            }
          }
        }
      }
      
      if (mejorSolucion) {
        this.results = mejoresSoluciones.reverse();
        this.solucionOptima = mejorSolucion;
        
        console.log("Solución óptima:", mejorSolucion);
        this.showAlert(`Maximización completada. Z máximo = ${mejorZ.toFixed(4)}`, 'success');
      } else {
        this.showAlert('No se encontró solución factible', 'error');
      }
    },
    
    limpiarTabla() {
      this.$refs.c1.value = '';
      this.$refs.c2.value = '';
      this.$refs.c3.value = '';
      this.$refs.iteraciones.value = '';
      this.results = [];
      this.solucionOptima = null;
      
      this.showAlert('Campos y tabla limpiados correctamente', 'success');
    }
  }
}
</script>

<style scoped>
.page-wrapper {
  display: flex;
  min-height: 100vh;
}

.page-container {
  margin-left: 240px;
  flex: 1;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: linear-gradient(145deg, rgba(22, 33, 62, 0.9), rgba(15, 52, 96, 0.9));
}

.main-content {
  flex: 1;
}

.hero {
  background-image: url("/src/assets/space.jpg");
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
  align-items: flex-start;
  gap: 20px;
  margin-bottom: 2rem;
  padding: 0 20px;
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

.param-section {
  margin-bottom: 25px;
  padding-bottom: 20px;
  border-bottom: 1px solid rgba(100, 255, 218, 0.2);
}

.param-section:last-of-type {
  border-bottom: none;
}

.param-section h3 {
  font-family: 'Orbitron', monospace;
  font-size: 1.1em;
  color: #64ffda;
  margin-bottom: 10px;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.subtitle {
  font-family: 'Rajdhani', monospace;
  font-size: 1em;
  color: #4fc3f7;
  margin-bottom: 15px;
  font-style: italic;
}

.param-section label {
  display: block;
  font-family: 'Rajdhani', monospace;
  font-size: 0.95em;
  color: #b8c6db;
  margin-top: 12px;
  margin-bottom: 5px;
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
  margin-bottom: 8px;
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

.button-send {
  margin-top: 20px;
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

.resultado-final {
  background: linear-gradient(45deg, rgba(100, 255, 218, 0.2), rgba(79, 195, 247, 0.2));
  padding: 25px;
  border-radius: 15px;
  border: 2px solid #64ffda;
}

.resultado-final h3 {
  color: #64ffda;
  font-family: 'Orbitron', sans-serif;
  font-size: 1.3em;
  margin: 0 0 20px 0;
  text-align: center;
  text-transform: uppercase;
  letter-spacing: 2px;
}

.solucion-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 15px;
}

.sol-item {
  background: rgba(12, 12, 12, 0.6);
  padding: 15px;
  border-radius: 10px;
  border: 1px solid rgba(100, 255, 218, 0.3);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.sol-item.destacado {
  grid-column: 1 / -1;
  background: linear-gradient(45deg, rgba(100, 255, 218, 0.3), rgba(79, 195, 247, 0.3));
  border: 2px solid #64ffda;
}

.sol-item .label {
  color: #b8c6db;
  font-family: 'Rajdhani', sans-serif;
  font-size: 1.1em;
  font-weight: 600;
}

.sol-item .value {
  color: #64ffda;
  font-family: 'Orbitron', monospace;
  font-size: 1.3em;
  font-weight: 700;
}

.sol-item.destacado .value {
  font-size: 1.5em;
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
  font-size: 1em;
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
  font-size: 0.95em;
  font-weight: 500;
}

#results-table td.z-value {
  color: #64ffda;
  font-weight: 700;
  font-size: 1.1em;
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

@media (max-width: 768px) {
  .page-container {
    margin-left: 0;
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
  
  .solucion-grid {
    grid-template-columns: 1fr;
  }
  
  .buttons {
    flex-direction: column;
  }
}
</style>