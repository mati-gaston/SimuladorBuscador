const propiedades = [
    { id: 1, tipo: 'casa', ambientes: 2, zona: 'Buenos Aires', venta: true },
    { id: 2, tipo: 'departamento', ambientes: 3, zona: 'Tucumán', venta: false },
    { id: 3, tipo: 'ph', ambientes: 1, zona: 'Córdoba', venta: true },
];

function buscarPorId() {
    const id = prompt("Ingrese el ID de la propiedad que desea buscar:");
    if (id === null || id.trim() === '') {
        alert("Debe ingresar un ID válido.");
        return;
    }

    const propiedadEncontrada = buscarPropiedadPorId(Number(id));
    if (propiedadEncontrada) {
        alert('Propiedad encontrada:\n' + JSON.stringify(propiedadEncontrada, null, 2));
    } else {
        alert('No se encontró ninguna propiedad con ese ID.');
    }
}

function buscarPropiedades() {
    let continuarBusqueda = true; 

    while (continuarBusqueda) {
        const tipoSeleccionado = prompt("Ingrese el tipo de propiedad ('casa', 'departamento', 'ph') o escriba 'Todos' para ver todas las propiedades o 'Cancelar' para salir:");
        if (tipoSeleccionado === null) return; 
        if (tipoSeleccionado.toLowerCase() === 'cancelar') continue;

        const ambientesSeleccionados = prompt("Ingrese la cantidad de ambientes ('1', '2', '3', '4') o escriba 'Todos' para ver todas las propiedades o 'Cancelar' para salir:");
        if (ambientesSeleccionados === null) return; 
        if (ambientesSeleccionados.toLowerCase() === 'cancelar') continue;

        const zonaSeleccionada = prompt("Ingrese la zona ('Buenos Aires', 'Tucumán', 'Córdoba') o escriba 'Todas' para ver todas las propiedades o 'Cancelar' para salir:");
        if (zonaSeleccionada === null) return; 
        if (zonaSeleccionada.toLowerCase() === 'cancelar') continue;

        const esVenta = prompt("Ingrese 'Venta', 'Alquiler' o 'Ambos' para ver todas las propiedades o 'Cancelar' para salir:");
        if (esVenta === null) return; 
        if (esVenta.toLowerCase() === 'cancelar') continue;

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

        if (propiedadesFiltradas.length === 0) {
            alert("No se encontraron propiedades que coincidan con los criterios de búsqueda. Por favor, intente con otros criterios.");
        } else {
            alert(`Se encontraron ${propiedadesFiltradas.length} propiedades que coinciden con los criterios de búsqueda.`);
            console.log(propiedadesFiltradas);
        }

        const seguirBuscando = confirm("¿Desea realizar otra búsqueda?"); 
        if (!seguirBuscando) continuarBusqueda = false;
    }
}

function buscarPropiedadPorId(id) {
    const propiedadEncontrada = propiedades.find(propiedad => propiedad.id === id);
    return propiedadEncontrada ? propiedadEncontrada : null;
}

buscarPropiedades();
