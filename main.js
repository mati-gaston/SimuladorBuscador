const propiedades = [
  { tipo: 'casa', ambientes: 2, zona: 'Buenos Aires', venta: true },
  { tipo: 'departamento', ambientes: 3, zona: 'Tucumán', venta: false },
  { tipo: 'ph', ambientes: 1, zona: 'Córdoba', venta: true },
];

function buscarPropiedades() {
  let continuarBusqueda = true; 

  while (continuarBusqueda) {
      const tipoSeleccionado = prompt("Ingrese el tipo de propiedad ('casa', 'departamento', 'ph') o escriba 'Todos' para ver todas las propiedades:");
      if (!tipoSeleccionado) return; 

      const ambientesSeleccionados = prompt("Ingrese la cantidad de ambientes ('1', '2', '3', '4') o escriba 'Todos' para ver todas las propiedades:");
      if (!ambientesSeleccionados) return; 

      const zonaSeleccionada = prompt("Ingrese la zona ('Buenos Aires', 'Tucumán', 'Córdoba') o escriba 'Todas' para ver todas las propiedades:");
      if (!zonaSeleccionada) return;    

      const esVenta = prompt("Ingrese 'Venta', 'Alquiler' o 'Ambos' para ver todas las propiedades:");
      if (!esVenta) return;  

      const propiedadesFiltradas = propiedades.filter(propiedad => {
          switch (tipoSeleccionado.toLowerCase()) {
              case 'todos':
                  break;
              case propiedad.tipo.toLowerCase():
                  break;
              default:
                  return false;
          }

          switch (ambientesSeleccionados.toLowerCase()) {
              case 'todos':
                  break;
              case propiedad.ambientes.toString():
                  break;
              default:
                  return false;
          }

          switch (zonaSeleccionada.toLowerCase()) {
              case 'todas':
                  break;
              case propiedad.zona.toLowerCase():
                  break;
              default:
                  return false;
          }

          switch (esVenta.toLowerCase()) {
              case 'ambos':
                  break;
              case 'venta':
                  if (!propiedad.venta) return false;
                  break;
              case 'alquiler':
                  if (propiedad.venta) return false;
                  break;
              default:
                  return false;
          }

          return true;
      });

      alert(`Se encontraron ${propiedadesFiltradas.length} propiedades que coinciden con los criterios de búsqueda.`);
      if (propiedadesFiltradas.length > 0) {
          console.log(propiedadesFiltradas);
      }

      const seguirBuscando = confirm("¿Desea realizar otra búsqueda?"); 
      if (!seguirBuscando) continuarBusqueda = false;
  }
}

buscarPropiedades();
