<template>
  <div class="page-wrapper">
    <NavBarModelos />
    
    <div class="page-container">
      <div class="main-content">
        <div class="hero">
          <h3>El granjero y sus gallinas</h3>
        </div>

        <div class="explanation">
          <p>Un granjero tiene una gallina que pone huevos a razón de Poisson con media de 2 huevos/día. El 20% de los huevos se rompen, del 30% de ellos nacen pollos y el resto permanecen como huevos. De los pollos el 20% muere y el 80% sobrevive. 
            Simule este sistema para n días y determine el ingreso promedio del granjero si cada huevo lo vende en 1.5 bs y cada pollo en 5 bs.
          </p>
        </div>

        <div class="div-n">
          <div class="datos">
            <div class="param-section">
              <h3>Parámetros de Simulación</h3>
              
              <label>Número de días a simular</label>
              <input ref="numDias" type="number" placeholder="Ej: 30">
              
              <label>Precio de venta por huevo (Bs)</label>
              <input ref="precioHuevo" type="number" step="0.01" placeholder="Ej: 1.5">
              
              <label>Precio de venta por pollo (Bs)</label>
              <input ref="precioPollo" type="number" step="0.01" placeholder="Ej: 5">
            </div>

            <div class="button-send">
              <button type="button" @click="simular">Simular Granja</button>
            </div>
          </div>

          <div class="m-1">
            <div class="table">
              <h4>Resultados por Día</h4>
              <div class="table-responsive">
                <table id="results-table">
                  <thead>
                    <tr>
                      <th>Día</th>
                      <th>Huevos Puestos</th>
                      <th>Huevos Rotos</th>
                      <th>Nacen Pollos</th>
                      <th>Huevos Venta</th>
                      <th>Pollos Mueren</th>
                      <th>Pollos Venta</th>
                      <th>Ingreso Huevos (Bs)</th>
                      <th>Ingreso Pollos (Bs)</th>
                      <th>Ingreso Total Día (Bs)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-if="results.length === 0">
                      <td colspan="10" class="empty-state">
                        <div class="icon"></div>
                        <p>Ingresa los parámetros para simular la granja</p>
                      </td>
                    </tr>
                    <tr v-for="result in results" :key="result.dia">
                      <td>{{ result.dia }}</td>
                      <td>{{ result.huevosPuestos }}</td>
                      <td>{{ result.huevosRotos }}</td>
                      <td>{{ result.huevosPollos }}</td>
                      <td>{{ result.huevosVenta }}</td>
                      <td>{{ result.pollosMueren }}</td>
                      <td>{{ result.pollosSobreviven }}</td>
                      <td>{{ result.ingresoHuevos }}</td>
                      <td>{{ result.ingresoPollos }}</td>
                      <td class="destacado">{{ result.ingresoDia }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            
            <div v-if="estadisticas" class="resultado-final">
              <h3>Resumen de la Simulación</h3>
              <div class="solucion-grid">
                <div class="sol-item">
                  <span class="label">Total de días simulados:</span>
                  <span class="value">{{ estadisticas.totalDias }}</span>
                </div>
                <div class="sol-item">
                  <span class="label">Total de huevos vendidos:</span>
                  <span class="value">{{ estadisticas.totalHuevosVendidos }}</span>
                </div>
                <div class="sol-item">
                  <span class="label">Total de pollos vendidos:</span>
                  <span class="value">{{ estadisticas.totalPollosVendidos }}</span>
                </div>
                <div class="sol-item">
                  <span class="label">Ingreso total acumulado:</span>
                  <span class="value">{{ estadisticas.ingresoTotal }} Bs</span>
                </div>
                <div class="sol-item destacado">
                  <span class="label">Ingreso promedio por día:</span>
                  <span class="value positivo">{{ estadisticas.ingresoPromedio }} Bs</span>
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
  name: 'Egranja',
  components: {
    NavBarModelos
  },
  data() {
    return {
      results: [],
      estadisticas: null,
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
      const numDias = this.$refs.numDias.value.trim();
      const precioHuevo = this.$refs.precioHuevo.value.trim();
      const precioPollo = this.$refs.precioPollo.value.trim();

      if (!numDias || !precioHuevo || !precioPollo) {
        this.showAlert('No puede haber campos vacíos', 'error');
        return false;
      }
      return true;
    },
    
    verificarValores() {
      const numDias = parseFloat(this.$refs.numDias.value);
      const precioHuevo = parseFloat(this.$refs.precioHuevo.value);
      const precioPollo = parseFloat(this.$refs.precioPollo.value);
      
      if (numDias <= 0 || precioHuevo < 0 || precioPollo < 0) {
        this.showAlert('Los valores deben ser positivos', 'error');
        return false;
      }
      
      return true;
    },
    
    // Generar número de huevos según distribución de Poisson
    generarPoisson(media) {
      const L = Math.exp(-media);
      let p = 1.0;
      let k = 0;
      
      do {
        k++;
        p *= Math.random();
      } while (p > L);
      
      return k - 1;
    },
    
    simular() {
      this.results = [];
      this.estadisticas = null;
      
      if (!this.verificarCamposVacios() || !this.verificarValores()) return;
      
      const dias = parseInt(this.$refs.numDias.value);
      const precioH = parseFloat(this.$refs.precioHuevo.value);
      const precioP = parseFloat(this.$refs.precioPollo.value);
      
      // Parámetros fijos del problema
      const media = 2;
      const pRompe = 0.20;
      const pPollo = 0.30;
      const pMuere = 0.20;
      
      let totalHuevosVendidos = 0;
      let totalPollosVendidos = 0;
      let ingresoTotal = 0;
      
      // Simular cada día
      for (let dia = 1; dia <= dias; dia++) {
        // 1. Generar huevos puestos (Poisson con media = 2)
        const huevosPuestos = this.generarPoisson(media);
        
        // 2. Clasificar los huevos
        let huevosRotos = 0;
        let huevosPollos = 0;
        let huevosVenta = 0;
        
        for (let i = 0; i < huevosPuestos; i++) {
          const rand = Math.random();
          if (rand < pRompe) {
            huevosRotos++;
          } else if (rand < pRompe + pPollo) {
            huevosPollos++;
          } else {
            huevosVenta++;
          }
        }
        
        // 3. Determinar pollos que sobreviven
        let pollosSobreviven = 0;
        let pollosMueren = 0;
        
        for (let i = 0; i < huevosPollos; i++) {
          if (Math.random() < pMuere) {
            pollosMueren++;
          } else {
            pollosSobreviven++;
          }
        }
        
        // 4. Calcular ingresos del día
        const ingresoHuevos = huevosVenta * precioH;
        const ingresoPollos = pollosSobreviven * precioP;
        const ingresoDia = ingresoHuevos + ingresoPollos;
        
        totalHuevosVendidos += huevosVenta;
        totalPollosVendidos += pollosSobreviven;
        ingresoTotal += ingresoDia;
        
        this.results.push({
          dia: dia,
          huevosPuestos: huevosPuestos,
          huevosRotos: huevosRotos,
          huevosPollos: huevosPollos,
          huevosVenta: huevosVenta,
          pollosMueren: pollosMueren,
          pollosSobreviven: pollosSobreviven,
          ingresoHuevos: ingresoHuevos.toFixed(2),
          ingresoPollos: ingresoPollos.toFixed(2),
          ingresoDia: ingresoDia.toFixed(2)
        });
      }
      
      const ingresoPromedio = ingresoTotal / dias;
      
      this.estadisticas = {
        totalDias: dias,
        totalHuevosVendidos: totalHuevosVendidos,
        totalPollosVendidos: totalPollosVendidos,
        ingresoTotal: ingresoTotal.toFixed(2),
        ingresoPromedio: ingresoPromedio.toFixed(2)
      };
      
      console.log('=== SIMULACIÓN DE GRANJA ===');
      console.log(`Total de días: ${dias}`);
      console.log(`Total de huevos vendidos: ${totalHuevosVendidos}`);
      console.log(`Total de pollos vendidos: ${totalPollosVendidos}`);
      console.log(`Ingreso total: ${ingresoTotal.toFixed(2)} Bs`);
      console.log(`INGRESO PROMEDIO POR DÍA: ${ingresoPromedio.toFixed(2)} Bs`);
      
      this.showAlert('Simulación completada exitosamente', 'success');
    },
    
    limpiarTabla() {
      this.$refs.numDias.value = '';
      this.$refs.precioHuevo.value = '';
      this.$refs.precioPollo.value = '';
      this.results = [];
      this.estadisticas = null;
      
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
}

.param-section h3 {
  font-family: 'Orbitron', monospace;
  font-size: 1.1em;
  color: #64ffda;
  margin-bottom: 10px;
  text-transform: uppercase;
  letter-spacing: 1px;
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

.table-responsive {
  overflow-x: auto;
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

.value.positivo {
  color: #4fc3f7 !important;
}

.value.negativo {
  color: #ff6b6b !important;
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
  padding: 15px 8px;
  text-align: center;
  border: 1px solid rgba(100, 255, 218, 0.4);
  font-weight: 600;
  font-size: 0.9em;
  text-transform: uppercase;
  letter-spacing: 1px;
  position: sticky;
  top: 0;
  z-index: 10;
}

#results-table td {
  padding: 12px 8px;
  text-align: center;
  border: 1px solid rgba(100, 255, 218, 0.2);
  color: #e0e6ed;
  font-size: 0.95em;
  font-weight: 500;
}

#results-table td.destacado {
  color: #4fc3f7;
  font-weight: 700;
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