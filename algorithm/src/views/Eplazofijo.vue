<template>
  <div class="page-wrapper">
    <!-- Importar el NavBar_Modelos (el lateral) -->
    <NavBarModelos />
    
    <div class="page-container">
      <!-- Contenido Principal -->
      <div class="main-content">
        <div class="hero">
          <h3>Ejercicio de plazo fijo</h3>
        </div>

        <div class="explanation">
          <p>Desarrollar el modelo de simulación para un depósito a plazo fijo</p>
        </div>

        <div class="div-n">
          <div class="datos">
            <div class="d1">
              <h3>Tiempo de depósito (años)</h3>
              <input ref="T" type="number" autocomplete="off" placeholder="Años">
            </div>
            <div class="d2">
              <h3>Capital inicial</h3>
              <input ref="K" type="number" autocomplete="off" placeholder="Capital inicial">
            </div>
            <div class="d3">
              <h3>Tasa de interés (%)</h3>
              <input ref="i" type="number" autocomplete="off" placeholder="Tasa %">
            </div>
            <div class="button-send">
              <button type="button" @click="calcular">Calcular</button>
            </div>
          </div>

          <div class="m-1">
            <div class="table">
              <h4>Resultados del Depósito</h4>
              <div class="table-responsive">
                <table id="results-table">
                  <thead>
                    <tr>
                      <th>Año</th>
                      <th>Interés Ganado</th>
                      <th>Capital Acumulado</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-if="results.length === 0">
                      <td colspan="3" class="empty-state">
                        <div class="icon"></div>
                        <p>Ingresa los datos para calcular tu depósito a plazo fijo</p>
                      </td>
                    </tr>
                    <tr v-for="result in results" :key="result.anio">
                      <td>{{ result.anio }}</td>
                      <td>{{ result.interes }}</td>
                      <td>{{ result.capital }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            
            <div v-if="capitalFinal" class="resultado-final">
              <h3>Capital Final Total: {{ capitalFinal }}</h3>
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
  </div>
</template>

<script>
import NavBarModelos from '../components/NavBar_Modelos.vue';

export default {
  name: 'Eplazofijo',
  components: {
    NavBarModelos
  },
  data() {
    return {
      results: [],
      capitalFinal: null,
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
      const T = this.$refs.T.value.trim();
      const K = this.$refs.K.value.trim();
      const i = this.$refs.i.value.trim();

      if (!T || !K || !i) {
        this.showAlert('No puede haber campos vacíos', 'error');
        return false;
      }
      return true;
    },
    
    verificarNegativos() {
      const T = parseFloat(this.$refs.T.value);
      const K = parseFloat(this.$refs.K.value);
      const i = parseFloat(this.$refs.i.value);
      
      if (T <= 0 || K <= 0 || i <= 0) {
        this.showAlert('No puede enviarse números negativos o cero', 'error');
        return false;
      }
      return true;
    },
    
    calcular() {
      this.results = [];
      this.capitalFinal = null;
      
      if (this.verificarCamposVacios() && this.verificarNegativos()) {
        const T = parseFloat(this.$refs.T.value);
        let K = parseFloat(this.$refs.K.value);
        const i = parseFloat(this.$refs.i.value);
        
        // Calcular año por año
        for (let c = 1; c <= T; c++) {
          const I = K * (i / 100);
          K = K + I;
          
          this.results.push({
            anio: c,
            interes: I.toFixed(2),
            capital: K.toFixed(2)
          });
        }
        
        this.capitalFinal = K.toFixed(2);
        console.log("El monto total es de:", K.toFixed(2));
        
        this.showAlert('Cálculo completado exitosamente', 'success');
      }
    },
    
    limpiarTabla() {
      this.$refs.T.value = '';
      this.$refs.K.value = '';
      this.$refs.i.value = '';
      this.results = [];
      this.capitalFinal = null;
      
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

.resultado-final {
  background: linear-gradient(45deg, rgba(100, 255, 218, 0.2), rgba(79, 195, 247, 0.2));
  padding: 20px;
  border-radius: 15px;
  border: 2px solid #64ffda;
  text-align: center;
}

.resultado-final h3 {
  color: #64ffda;
  font-family: 'Orbitron', sans-serif;
  font-size: 1.5em;
  margin: 0;
  text-transform: uppercase;
  letter-spacing: 2px;
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
  
  .buttons {
    flex-direction: column;
  }
}
</style>