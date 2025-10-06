<template>
  <div class="page-wrapper">
    <NavBarModelos />
    
    <div class="page-container">
      <div class="main-content">
        <div class="hero">
          <h3>Ejercicio de simulación de una tienda</h3>
        </div>

        <div class="explanation">
          <p> La demanda de azúcar en una tienda sigue una distribución exponencial con media de
            100 Kg/día. El dueño de la tienda revisa el inventario cada 7 días y hace un pedido a la
            planta igual a la capacidad de la bodega menos la cantidad de azúcar que tiene
            disponible en ese momento: la entrega no es inmediata y sigue una distribución
            uniforme entre 1 y 3 días. La demanda no surtida por falta de existencias representa
            ventas perdidas. La capacidad de almacenamiento de la bodega es de 700 Kgrs. El
            costo de ordenar es de 100 Bs./orden. El costo de llevar el inventario es igual a 0.1
            Bs./Kg, el costo de adquisición es igual a 3.5 Bs/Kgr y el precio de venta igual 5 Bs/Kgr.
            Determinar el comportamiento del inventario a lo largo del tiempo, el costo y la
            ganancia neta, la demanda insatisfecha para un horizonte de dos meses. ¿Será la
            capacidad del almacén suficiente? 
          </p>
        </div>

        <div class="div-n">
          <div class="datos">
            <div class="param-section">
              <h3>Parámetros de Simulación</h3>
              
              <label>Número de días a simular</label>
              <input v-model="numDias" type="number" placeholder="Ej: 60">
              
              <label>Capacidad de bodega (Kg)</label>
              <input v-model="capacidadBodega" type="number" placeholder="Ej: 700">
              
              <label>Inventario inicial (Kg)</label>
              <input v-model="inventarioInicial" type="number" placeholder="Ej: 700">
              
              <label>Demanda media (Kg/día)</label>
              <input v-model="demandaMedia" type="number" placeholder="Ej: 100">
              
              <label>Frecuencia de revisión (días)</label>
              <input v-model="frecuenciaRevision" type="number" placeholder="Ej: 7">
              
              <label>Tiempo entrega mín (días)</label>
              <input v-model="entregaMin" type="number" placeholder="Ej: 1">
              
              <label>Tiempo entrega máx (días)</label>
              <input v-model="entregaMax" type="number" placeholder="Ej: 3">
            </div>
            
            <div class="param-section">
              <h3>Costos y Precios</h3>
              
              <label>Costo de ordenar (Bs/orden)</label>
              <input v-model="costoOrden" type="number" step="0.01" placeholder="Ej: 100">
              
              <label>Costo de mantener inventario (Bs/Kg/día)</label>
              <input v-model="costoInventario" type="number" step="0.01" placeholder="Ej: 0.1">
              
              <label>Costo de adquisición (Bs/Kg)</label>
              <input v-model="costoAdquisicion" type="number" step="0.01" placeholder="Ej: 3.5">
              
              <label>Precio de venta (Bs/Kg)</label>
              <input v-model="precioVenta" type="number" step="0.01" placeholder="Ej: 5">
            </div>

            <div class="button-send">
              <button type="button" @click="simular">Simular Tienda</button>
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
                      <th>Inv. Inicial</th>
                      <th>Pedido Llega</th>
                      <th>Demanda</th>
                      <th>Ventas</th>
                      <th>Demanda Insatisfecha</th>
                      <th>Inv. Final</th>
                      <th>Se Ordena</th>
                      <th>Costo Día</th>
                      <th>Ingreso Día</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-if="results.length === 0">
                      <td colspan="10" class="empty-state">
                        <div class="icon"></div>
                        <p>Ingresa los parámetros para simular la tienda</p>
                      </td>
                    </tr>
                    <tr v-for="result in results" :key="result.dia">
                      <td>{{ result.dia }}</td>
                      <td>{{ result.invInicial }}</td>
                      <td>{{ result.pedidoLlega }}</td>
                      <td>{{ result.demanda }}</td>
                      <td>{{ result.ventas }}</td>
                      <td>{{ result.demandaInsatisfecha }}</td>
                      <td>{{ result.invFinal }}</td>
                      <td>{{ result.seOrdena }}</td>
                      <td>{{ result.costoDia }}</td>
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
                  <span class="label">Total Kg vendidos:</span>
                  <span class="value">{{ estadisticas.totalVentas }} Kg</span>
                </div>
                <div class="sol-item">
                  <span class="label">Demanda insatisfecha total:</span>
                  <span class="value negativo">{{ estadisticas.demandaInsatisfechaTotal }} Kg</span>
                </div>
                <div class="sol-item">
                  <span class="label">Número de órdenes:</span>
                  <span class="value">{{ estadisticas.numOrdenes }}</span>
                </div>
                <div class="sol-item">
                  <span class="label">Costo total de ordenar:</span>
                  <span class="value">{{ estadisticas.costoOrdenTotal }} Bs</span>
                </div>
                <div class="sol-item">
                  <span class="label">Costo total de inventario:</span>
                  <span class="value">{{ estadisticas.costoInventarioTotal }} Bs</span>
                </div>
                <div class="sol-item">
                  <span class="label">Costo total de adquisición:</span>
                  <span class="value">{{ estadisticas.costoAdquisicionTotal }} Bs</span>
                </div>
                <div class="sol-item">
                  <span class="label">Costo total:</span>
                  <span class="value negativo">{{ estadisticas.costoTotal }} Bs</span>
                </div>
                <div class="sol-item">
                  <span class="label">Ingreso total por ventas:</span>
                  <span class="value positivo">{{ estadisticas.ingresoTotal }} Bs</span>
                </div>
                <div class="sol-item destacado">
                  <span class="label">Ganancia neta total:</span>
                  <span :class="['value', parseFloat(estadisticas.gananciaNeta) >= 0 ? 'positivo' : 'negativo']">
                    {{ estadisticas.gananciaNeta }} Bs
                  </span>
                </div>
                <div class="sol-item">
                  <span class="label">Inventario final:</span>
                  <span class="value">{{ estadisticas.inventarioFinal }} Kg</span>
                </div>
                <div class="sol-item">
                  <span class="label">Capacidad suficiente:</span>
                  <span :class="['value', estadisticas.capacidadSuficiente ? 'positivo' : 'negativo']">
                    {{ estadisticas.capacidadSuficiente ? 'SÍ' : 'NO' }}
                  </span>
                </div>
              </div>
            </div>
            
            <div class="buttons">
              <div class="button-clean">
                <button type="button" @click="limpiarTabla">Limpiar</button>
              </div>
              <div class="button-menu">
                <button type="button" @click="volverMenu">Volver al menú</button>
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
  name: 'Etienda',
  components: {
    NavBarModelos
  },
  data() {
    return {
      numDias: '',
      capacidadBodega: '',
      inventarioInicial: '',
      demandaMedia: '',
      frecuenciaRevision: '',
      entregaMin: '',
      entregaMax: '',
      costoOrden: '',
      costoInventario: '',
      costoAdquisicion: '',
      precioVenta: '',
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
    showAlert(message, type) {
      this.alert = {
        show: true,
        message: message,
        type: type || 'info'
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
      const campos = {
        numDias: this.numDias,
        capacidadBodega: this.capacidadBodega,
        inventarioInicial: this.inventarioInicial,
        demandaMedia: this.demandaMedia,
        frecuenciaRevision: this.frecuenciaRevision,
        entregaMin: this.entregaMin,
        entregaMax: this.entregaMax,
        costoOrden: this.costoOrden,
        costoInventario: this.costoInventario,
        costoAdquisicion: this.costoAdquisicion,
        precioVenta: this.precioVenta
      };
      
      for (let campo in campos) {
        if (campos[campo] === '' || campos[campo] === null) {
          this.showAlert('No puede haber campos vacíos', 'error');
          return false;
        }
      }
      return true;
    },
    
    verificarValores() {
      const numDias = parseFloat(this.numDias);
      const capacidadBodega = parseFloat(this.capacidadBodega);
      const inventarioInicial = parseFloat(this.inventarioInicial);
      const demandaMedia = parseFloat(this.demandaMedia);
      const frecuenciaRevision = parseFloat(this.frecuenciaRevision);
      const entregaMin = parseFloat(this.entregaMin);
      const entregaMax = parseFloat(this.entregaMax);
      const costoOrden = parseFloat(this.costoOrden);
      const costoInventario = parseFloat(this.costoInventario);
      const costoAdquisicion = parseFloat(this.costoAdquisicion);
      const precioVenta = parseFloat(this.precioVenta);
      
      if (numDias <= 0 || capacidadBodega <= 0 || inventarioInicial < 0 || 
          demandaMedia <= 0 || frecuenciaRevision <= 0 || entregaMin < 0 || 
          entregaMax < entregaMin || costoOrden < 0 || costoInventario < 0 || 
          costoAdquisicion < 0 || precioVenta < 0) {
        this.showAlert('Los valores deben ser válidos y positivos', 'error');
        return false;
      }
      
      if (inventarioInicial > capacidadBodega) {
        this.showAlert('El inventario inicial no puede exceder la capacidad', 'error');
        return false;
      }
      
      return true;
    },
    
    generarExponencial(media) {
      const u = Math.random();
      return -media * Math.log(1 - u);
    },
    
    generarUniforme(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    
    simular() {
      this.results = [];
      this.estadisticas = null;
      
      if (!this.verificarCamposVacios() || !this.verificarValores()) return;
      
      const dias = parseInt(this.numDias);
      const capacidad = parseFloat(this.capacidadBodega);
      const invInicial = parseFloat(this.inventarioInicial);
      const mediaDemanda = parseFloat(this.demandaMedia);
      const freqRevision = parseInt(this.frecuenciaRevision);
      const entregaMin = parseInt(this.entregaMin);
      const entregaMax = parseInt(this.entregaMax);
      const costoOrden = parseFloat(this.costoOrden);
      const costoInv = parseFloat(this.costoInventario);
      const costoAdq = parseFloat(this.costoAdquisicion);
      const precioV = parseFloat(this.precioVenta);
      
      let inventario = invInicial;
      let totalVentas = 0;
      let demandaInsatisfechaTotal = 0;
      let costoOrdenTotal = 0;
      let costoInventarioTotal = 0;
      let costoAdquisicionTotal = 0;
      let ingresoTotal = 0;
      let numOrdenes = 0;
      let huboDemandaInsatisfecha = false;
      
      let pedidosPendientes = [];
      
      for (let dia = 1; dia <= dias; dia++) {
        let invInicialDia = inventario;
        let pedidoLlegaDia = 0;
        
        pedidosPendientes = pedidosPendientes.filter(pedido => {
          if (pedido.diaLlegada === dia) {
            pedidoLlegaDia += pedido.cantidad;
            inventario = Math.min(inventario + pedido.cantidad, capacidad);
            return false;
          }
          return true;
        });
        
        const demanda = this.generarExponencial(mediaDemanda);
        
        const ventas = Math.min(demanda, inventario);
        const demandaInsatisfecha = demanda - ventas;
        
        if (demandaInsatisfecha > 0) {
          huboDemandaInsatisfecha = true;
        }
        
        inventario -= ventas;
        
        const costoInvDia = inventario * costoInv;
        const costoAdqDia = ventas * costoAdq;
        const ingresoDia = ventas * precioV;
        
        totalVentas += ventas;
        demandaInsatisfechaTotal += demandaInsatisfecha;
        costoInventarioTotal += costoInvDia;
        costoAdquisicionTotal += costoAdqDia;
        ingresoTotal += ingresoDia;
        
        let seOrdena = 0;
        let costoOrdenDia = 0;
        
        if (dia % freqRevision === 0) {
          const cantidadOrdenar = capacidad - inventario;
          
          if (cantidadOrdenar > 0) {
            seOrdena = cantidadOrdenar;
            costoOrdenDia = costoOrden;
            costoOrdenTotal += costoOrden;
            numOrdenes++;
            
            const tiempoEntrega = this.generarUniforme(entregaMin, entregaMax);
            const diaLlegada = dia + tiempoEntrega;
            
            if (diaLlegada <= dias) {
              pedidosPendientes.push({
                cantidad: cantidadOrdenar,
                diaLlegada: diaLlegada
              });
            }
          }
        }
        
        const costoDia = costoInvDia + costoAdqDia + costoOrdenDia;
        
        this.results.push({
          dia: dia,
          invInicial: invInicialDia.toFixed(2),
          pedidoLlega: pedidoLlegaDia.toFixed(2),
          demanda: demanda.toFixed(2),
          ventas: ventas.toFixed(2),
          demandaInsatisfecha: demandaInsatisfecha.toFixed(2),
          invFinal: inventario.toFixed(2),
          seOrdena: seOrdena.toFixed(2),
          costoDia: costoDia.toFixed(2),
          ingresoDia: ingresoDia.toFixed(2)
        });
      }
      
      const costoTotal = costoOrdenTotal + costoInventarioTotal + costoAdquisicionTotal;
      const gananciaNeta = ingresoTotal - costoTotal;
      const capacidadSuficiente = !huboDemandaInsatisfecha;
      
      this.estadisticas = {
        totalDias: dias,
        totalVentas: totalVentas.toFixed(2),
        demandaInsatisfechaTotal: demandaInsatisfechaTotal.toFixed(2),
        numOrdenes: numOrdenes,
        costoOrdenTotal: costoOrdenTotal.toFixed(2),
        costoInventarioTotal: costoInventarioTotal.toFixed(2),
        costoAdquisicionTotal: costoAdquisicionTotal.toFixed(2),
        costoTotal: costoTotal.toFixed(2),
        ingresoTotal: ingresoTotal.toFixed(2),
        gananciaNeta: gananciaNeta.toFixed(2),
        inventarioFinal: inventario.toFixed(2),
        capacidadSuficiente: capacidadSuficiente
      };
      
      console.log('=== SIMULACIÓN TIENDA DE AZÚCAR ===');
      console.log('Total Kg vendidos: ' + totalVentas.toFixed(2));
      console.log('Demanda insatisfecha: ' + demandaInsatisfechaTotal.toFixed(2) + ' Kg');
      console.log('Número de órdenes: ' + numOrdenes);
      console.log('Costo total: ' + costoTotal.toFixed(2) + ' Bs');
      console.log('Ingreso total: ' + ingresoTotal.toFixed(2) + ' Bs');
      console.log('GANANCIA NETA: ' + gananciaNeta.toFixed(2) + ' Bs');
      console.log('Capacidad suficiente: ' + (capacidadSuficiente ? 'SÍ' : 'NO'));
      
      this.showAlert('Simulación completada exitosamente', 'success');
    },
    
    limpiarTabla() {
      this.numDias = '';
      this.capacidadBodega = '';
      this.inventarioInicial = '';
      this.demandaMedia = '';
      this.frecuenciaRevision = '';
      this.entregaMin = '';
      this.entregaMax = '';
      this.costoOrden = '';
      this.costoInventario = '';
      this.costoAdquisicion = '';
      this.precioVenta = '';
      
      this.results = [];
      this.estadisticas = null;
      
      this.showAlert('Campos y tabla limpiados correctamente', 'success');
    },
    
    volverMenu() {
      if (this.$router) {
        this.$router.push('/');
      }
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
  max-height: 400px;
  overflow-y: auto;
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
  color: #b8c6db;
  font-size: 0.95em;
}

#results-table tbody tr:hover {
  background: rgba(100, 255, 218, 0.1);
  transition: background 0.3s ease;
}

#results-table td.destacado {
  color: #4fc3f7;
  font-weight: 600;
}

.empty-state {
  text-align: center;
  padding: 60px 20px !important;
  color: #64ffda;
}

.empty-state .icon {
  font-size: 3em;
  margin-bottom: 15px;
}

.empty-state p {
  font-size: 1.1em;
  color: #b8c6db;
}

.buttons {
  display: flex;
  gap: 15px;
  justify-content: center;
  margin-top: 20px;
}

.button-clean button,
.button-menu button {
  padding: 12px 30px;
  border: none;
  border-radius: 10px;
  font-size: 1em;
  font-family: 'Orbitron', sans-serif;
  font-weight: 600;
  cursor: pointer;
  text-transform: uppercase;
  letter-spacing: 1px;
  transition: all 0.3s ease;
}

.button-clean button {
  background: linear-gradient(45deg, #ff6b6b, #ee5a6f);
  color: white;
  box-shadow: 0 4px 15px rgba(255, 107, 107, 0.3);
}

.button-clean button:hover {
  background: linear-gradient(45deg, #ee5a6f, #ff6b6b);
  transform: translateY(-2px);
  box-shadow: 0 6px 25px rgba(255, 107, 107, 0.5);
}

.button-menu button {
  background: linear-gradient(45deg, #9b59b6, #8e44ad);
  color: white;
  box-shadow: 0 4px 15px rgba(155, 89, 182, 0.3);
}

.button-menu button:hover {
  background: linear-gradient(45deg, #8e44ad, #9b59b6);
  transform: translateY(-2px);
  box-shadow: 0 6px 25px rgba(155, 89, 182, 0.5);
}

.alert-component {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 1000;
  min-width: 300px;
  max-width: 500px;
  animation: slideIn 0.3s ease-out;
}

@keyframes slideIn {
  from {
    transform: translateX(400px);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

.custom-alert {
  border-radius: 12px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(10px);
}

.custom-alert.success {
  background: linear-gradient(135deg, rgba(100, 255, 218, 0.2), rgba(79, 195, 247, 0.2));
  border: 2px solid #64ffda;
}

.custom-alert.error {
  background: linear-gradient(135deg, rgba(255, 107, 107, 0.2), rgba(238, 90, 111, 0.2));
  border: 2px solid #ff6b6b;
}

.custom-alert.info {
  background: linear-gradient(135deg, rgba(79, 195, 247, 0.2), rgba(100, 255, 218, 0.2));
  border: 2px solid #4fc3f7;
}

.alert-content {
  display: flex;
  align-items: center;
  padding: 15px 20px;
  gap: 15px;
}

.alert-icon {
  font-size: 1.5em;
  font-weight: bold;
}

.custom-alert.success .alert-icon {
  color: #64ffda;
}

.custom-alert.error .alert-icon {
  color: #ff6b6b;
}

.custom-alert.info .alert-icon {
  color: #4fc3f7;
}

.alert-message {
  flex: 1;
  color: #ffffff;
  font-family: 'Rajdhani', sans-serif;
  font-size: 1.1em;
  font-weight: 500;
}

.alert-close {
  background: none;
  border: none;
  color: #ffffff;
  font-size: 1.5em;
  cursor: pointer;
  padding: 0;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: all 0.3s ease;
}

.alert-close:hover {
  background: rgba(255, 255, 255, 0.1);
  transform: rotate(90deg);
}

@media (max-width: 1200px) {
  .div-n {
    flex-direction: column;
    align-items: center;
  }
  
  .datos {
    max-width: 100%;
    flex: 1 1 auto;
  }
  
  .m-1 {
    width: 100%;
  }
  
  .solucion-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .page-container {
    margin-left: 0;
  }
  
  .hero h3 {
    font-size: 1.8em;
  }
  
  .explanation p {
    font-size: 1em;
  }
  
  .table-responsive {
    font-size: 0.85em;
  }
  
  .buttons {
    flex-direction: column;
  }
  
  .button-clean button,
  .button-menu button {
    width: 100%;
  }
}
</style>