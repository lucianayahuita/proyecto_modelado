<template>
  <div class="page-wrapper">
    <NavBarModelos />
    
    <div class="page-container">
      <div class="main-content">
        <div class="hero">
          <h3>Llegada de clientes a una Tienda</h3>
        </div>

        <div class="explanation">
          <p>Simular las llegadas de los clientes a una tienda, sigue una distribución
            uniforme: 2 ± 2, por hora y cada cliente compra artículos de acuerdo
            con la siguiente función de probabilidad:
            Artículos: 0 1 2 3
            Probabilidad: 0.2 0.3 0.4 0.1
            Mediante el desarrollo de un modelo de simulación, determine la
            ganancia neta del dueño y la cantidad de artículos vendidos de ese
            día si sus costos por día asciende a 300 Bs y el costo del articulo es igual
            A 50 Bs y el precio de venta es igual a 75 Bs.
        </p>
        </div>

        <div class="div-n">
          <div class="datos">
            <div class="param-section">
              <h3>Parámetros de la Tienda</h3>
              
              <label>Número de horas del día</label>
              <input ref="numHoras" type="number" placeholder="Ej: 8">
              
              <label>Costo fijo del día (Bs)</label>
              <input ref="costoFijo" type="number" step="0.01" placeholder="300" value="300">
              
              <label>Costo por artículo (Bs)</label>
              <input ref="costoArticulo" type="number" step="0.01" placeholder="50" value="50">
              
              <label>Precio de venta (Bs)</label>
              <input ref="precioVenta" type="number" step="0.01" placeholder="75" value="75">
            </div>

            <div class="button-send">
              <button type="button" @click="simular">Simular Tienda</button>
            </div>
          </div>

          <div class="m-1">
            <div class="table">
              <h4>Resultados por Hora</h4>
              <div class="table-responsive">
                <table id="results-table">
                  <thead>
                    <tr>
                      <th>Hora</th>
                      <th>Clientes</th>
                      <th>Artículos Vendidos</th>
                      <th>Ingreso (Bs)</th>
                      <th>Costo Artículos (Bs)</th>
                      <th>Ganancia Bruta (Bs)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-if="results.length === 0">
                      <td colspan="6" class="empty-state">
                        <div class="icon">🏪</div>
                        <p>Ingresa los parámetros para simular la tienda</p>
                      </td>
                    </tr>
                    <tr v-for="result in results" :key="result.hora">
                      <td>{{ result.hora }}</td>
                      <td>{{ result.clientes }}</td>
                      <td>{{ result.articulos }}</td>
                      <td>{{ result.ingreso }}</td>
                      <td>{{ result.costo }}</td>
                      <td :class="parseFloat(result.ganancia) > 0 ? 'positivo' : 'negativo'">
                        {{ result.ganancia }}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            
            <div v-if="estadisticas" class="resultado-final">
              <h3>Resumen del Día</h3>
              <div class="solucion-grid">
                <div class="sol-item">
                  <span class="label">Total de clientes:</span>
                  <span class="value">{{ estadisticas.totalClientes }}</span>
                </div>
                <div class="sol-item">
                  <span class="label">Artículos vendidos:</span>
                  <span class="value">{{ estadisticas.totalArticulos }}</span>
                </div>
                <div class="sol-item">
                  <span class="label">Ingreso total:</span>
                  <span class="value">{{ estadisticas.ingresoTotal }} Bs</span>
                </div>
                <div class="sol-item">
                  <span class="label">Costo artículos:</span>
                  <span class="value">{{ estadisticas.costoArticulos }} Bs</span>
                </div>
                <div class="sol-item">
                  <span class="label">Costo fijo:</span>
                  <span class="value">{{ estadisticas.costoFijo }} Bs</span>
                </div>
                <div class="sol-item">
                  <span class="label">Costo total:</span>
                  <span class="value">{{ estadisticas.costoTotal }} Bs</span>
                </div>
                <div class="sol-item">
                  <span class="label">Ganancia bruta:</span>
                  <span class="value">{{ estadisticas.gananciaBruta }} Bs</span>
                </div>
                <div class="sol-item destacado">
                  <span class="label">Ganancia neta del dueño:</span>
                  <span class="value" :class="parseFloat(estadisticas.gananciaNeta) > 0 ? 'positivo' : 'negativo'">
                    {{ estadisticas.gananciaNeta }} Bs
                  </span>
                </div>
                <div class="sol-item">
                  <span class="label">Promedio clientes/hora:</span>
                  <span class="value">{{ estadisticas.promedioClientes }}</span>
                </div>
                <div class="sol-item">
                  <span class="label">Promedio artículos/cliente:</span>
                  <span class="value">{{ estadisticas.promedioArticulos }}</span>
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
  name: 'Ellegadasclientes',
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
      const numHoras = this.$refs.numHoras.value.trim();
      const costoFijo = this.$refs.costoFijo.value.trim();
      const costoArticulo = this.$refs.costoArticulo.value.trim();
      const precioVenta = this.$refs.precioVenta.value.trim();

      if (!numHoras || !costoFijo || !costoArticulo || !precioVenta) {
        this.showAlert('No puede haber campos vacíos', 'error');
        return false;
      }
      return true;
    },
    
    verificarNegativos() {
      const numHoras = parseFloat(this.$refs.numHoras.value);
      const costoFijo = parseFloat(this.$refs.costoFijo.value);
      const costoArticulo = parseFloat(this.$refs.costoArticulo.value);
      const precioVenta = parseFloat(this.$refs.precioVenta.value);
      
      if (numHoras <= 0 || costoFijo < 0 || costoArticulo < 0 || precioVenta <= 0) {
        this.showAlert('Los valores deben ser positivos', 'error');
        return false;
      }
      return true;
    },
    
    generarClientesPorHora() {
      // Distribución uniforme: 2 ± 2 = entre 0 y 4 clientes
      return Math.floor(Math.random() * 5); // 0, 1, 2, 3, o 4
    },
    
    generarArticulosComprados() {
      // Función de probabilidad acumulada
      // 0: 20%, 1: 30%, 2: 40%, 3: 10%
      const random = Math.random();
      
      if (random < 0.2) return 0;      // 20%
      if (random < 0.5) return 1;      // 30% (0.2 + 0.3)
      if (random < 0.9) return 2;      // 40% (0.5 + 0.4)
      return 3;                         // 10%
    },
    
    simular() {
      this.results = [];
      this.estadisticas = null;
      
      if (!this.verificarCamposVacios() || !this.verificarNegativos()) return;
      
      const horas = parseInt(this.$refs.numHoras.value);
      const costoFijo = parseFloat(this.$refs.costoFijo.value);
      const costoArticulo = parseFloat(this.$refs.costoArticulo.value);
      const precioVenta = parseFloat(this.$refs.precioVenta.value);
      
      let totalClientes = 0;
      let totalArticulos = 0;
      let ingresoTotal = 0;
      let costoArticulosTotal = 0;
      
      // Simular cada hora
      for (let hora = 1; hora <= horas; hora++) {
        const clientesHora = this.generarClientesPorHora();
        let articulosHora = 0;
        
        // Cada cliente compra artículos según la distribución de probabilidad
        for (let cliente = 1; cliente <= clientesHora; cliente++) {
          const articulos = this.generarArticulosComprados();
          articulosHora += articulos;
        }
        
        totalClientes += clientesHora;
        totalArticulos += articulosHora;
        
        const ingresoHora = articulosHora * precioVenta;
        const costoHora = articulosHora * costoArticulo;
        const gananciaHora = ingresoHora - costoHora;
        
        ingresoTotal += ingresoHora;
        costoArticulosTotal += costoHora;
        
        this.results.push({
          hora: hora,
          clientes: clientesHora,
          articulos: articulosHora,
          ingreso: ingresoHora.toFixed(2),
          costo: costoHora.toFixed(2),
          ganancia: gananciaHora.toFixed(2)
        });
      }
      
      // Calcular estadísticas finales
      const gananciaBruta = ingresoTotal - costoArticulosTotal;
      const gananciaNeta = gananciaBruta - costoFijo;
      const costoTotal = costoArticulosTotal + costoFijo;
      
      this.estadisticas = {
        totalClientes: totalClientes,
        totalArticulos: totalArticulos,
        ingresoTotal: ingresoTotal.toFixed(2),
        costoArticulos: costoArticulosTotal.toFixed(2),
        costoFijo: costoFijo.toFixed(2),
        costoTotal: costoTotal.toFixed(2),
        gananciaBruta: gananciaBruta.toFixed(2),
        gananciaNeta: gananciaNeta.toFixed(2),
        promedioClientes: (totalClientes / horas).toFixed(2),
        promedioArticulos: totalClientes > 0 ? (totalArticulos / totalClientes).toFixed(2) : '0.00'
      };
      
      console.log('=== SIMULACIÓN DE TIENDA ===');
      console.log(`Total de clientes: ${totalClientes}`);
      console.log(`Total de artículos vendidos: ${totalArticulos}`);
      console.log(`Ingreso total: ${ingresoTotal.toFixed(2)} Bs`);
      console.log(`Costo de artículos: ${costoArticulosTotal.toFixed(2)} Bs`);
      console.log(`Costo fijo: ${costoFijo.toFixed(2)} Bs`);
      console.log(`Ganancia bruta: ${gananciaBruta.toFixed(2)} Bs`);
      console.log(`GANANCIA NETA: ${gananciaNeta.toFixed(2)} Bs`);
      
      this.showAlert('Simulación completada exitosamente', 'success');
    },
    
    limpiarTabla() {
      this.$refs.numHoras.value = '';
      this.$refs.costoFijo.value = '300';
      this.$refs.costoArticulo.value = '50';
      this.$refs.precioVenta.value = '75';
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
  border-bottom: 1px solid rgba(100, 255, 218, 0.2);
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
  font-size: 0.95em;
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

#results-table td.positivo {
  color: #4fc3f7;
  font-weight: 700;
}

#results-table td.negativo {
  color: #ff6b6b;
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