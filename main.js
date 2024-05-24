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
    const tipoSeleccionado = document.getElementById('tipoPropiedad').value.toLowerCase();
    const ambientesSeleccionados = document.getElementById('ambientes').value;
    const zonaSeleccionada = document.getElementById('zona').value.toLowerCase();
    const esVenta = document.getElementById('tipoVenta').value.toLowerCase();

    const propiedadesFiltradas = propiedades.filter(propiedad => {
        if (tipoSeleccionado !== 'todos' && propiedad.tipo.toLowerCase() !== tipoSeleccionado) {
            return false;
        }
        if (ambientesSeleccionados && propiedad.ambientes !== parseInt(ambientesSeleccionados)) {
            return false;
        }
        if (zonaSeleccionada !== 'todas' && propiedad.zona.toLowerCase() !== zonaSeleccionada) {
            return false;
        }
        if (esVenta !== 'ambos') {
            const esVentaBool = esVenta === 'venta';
            if (propiedad.venta !== esVentaBool) {
                return false;
            }
        }
        return true;
    });

    const resultadoDiv = document.getElementById('resultado');
    resultadoDiv.innerHTML = '';

    if (propiedadesFiltradas.length === 0) {
        resultadoDiv.textContent = "No se encontraron propiedades que coincidan con los criterios de búsqueda.";
    } else {
        propiedadesFiltradas.forEach(propiedad => {
            const propiedadDiv = document.createElement('div');
            propiedadDiv.className = 'propiedad';
            propiedadDiv.textContent = JSON.stringify(propiedad, null, 2);
            resultadoDiv.appendChild(propiedadDiv);
        });
    }
}

function limpiarBusqueda() {
    document.getElementById('tipoPropiedad').value = 'todos';
    document.getElementById('ambientes').value = '';
    document.getElementById('zona').value = 'todas';
    document.getElementById('tipoVenta').value = 'ambos';
    document.getElementById('resultado').innerHTML = '';
}

function buscarPropiedadPorId(id) {
    return propiedades.find(propiedad => propiedad.id === id);
}
