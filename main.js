const propiedades = JSON.parse(localStorage.getItem('propiedades')) || [
    { id: 1, tipo: 'casa', ambientes: 2, zona: 'Buenos Aires', venta: true },
    { id: 2, tipo: 'departamento', ambientes: 3, zona: 'Tucumán', venta: false },
    { id: 3, tipo: 'ph', ambientes: 1, zona: 'Córdoba', venta: true },
];

function guardarPropiedadesEnLocalStorage() {
    localStorage.setItem('propiedades', JSON.stringify(propiedades));
}

function buscarPorId() {
    const id = prompt("Ingrese el ID de la propiedad que desea buscar:");
    if (id === null || id.trim() === '') {
        alert("Debe ingresar un ID válido.");
        return;
    }

    const propiedadEncontrada = buscarPropiedadPorId(Number(id));
    const resultadoIdDiv = document.getElementById('resultadoId');
    resultadoIdDiv.innerHTML = '';

    if (propiedadEncontrada) {
        const propiedadDiv = document.createElement('div');
        propiedadDiv.className = 'propiedad-card';
        propiedadDiv.innerHTML = `
            <h2>Propiedad ID: ${propiedadEncontrada.id}</h2>
            <p>Tipo: ${propiedadEncontrada.tipo}</p>
            <p>Ambientes: ${propiedadEncontrada.ambientes}</p>
            <p>Zona: ${propiedadEncontrada.zona}</p>
            <p>Venta: ${propiedadEncontrada.venta ? 'Sí' : 'No'}</p>
        `;
        resultadoIdDiv.appendChild(propiedadDiv);
    } else {
        resultadoIdDiv.textContent = 'No se encontró ninguna propiedad con ese ID.';
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
            propiedadDiv.className = 'propiedad-card';
            propiedadDiv.innerHTML = `
                <h2>Propiedad ID: ${propiedad.id}</h2>
                <p>Tipo: ${propiedad.tipo}</p>
                <p>Ambientes: ${propiedad.ambientes}</p>
                <p>Zona: ${propiedad.zona}</p>
                <p>Venta: ${propiedad.venta ? 'Sí' : 'No'}</p>
            `;
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
    document.getElementById('resultadoId').innerHTML = '';
}

function buscarPropiedadPorId(id) {
    return propiedades.find(propiedad => propiedad.id === id);
}

function agregarPropiedad() {
    const tipo = prompt("Ingrese el tipo de propiedad (casa, departamento, ph):").toLowerCase();
    const ambientes = prompt("Ingrese la cantidad de ambientes:");
    const zona = prompt("Ingrese la zona de la propiedad:").toLowerCase();
    const venta = prompt("¿Esta en venta? (si o no):").toLowerCase() === 'si';

    if (!tipo || !ambientes || !zona) {
        alert("Todos los campos son obligatorios.");
        return;
    }

    const nuevaPropiedad = {
        id: propiedades.length + 1,
        tipo,
        ambientes: parseInt(ambientes),
        zona,
        venta
    };

    const propiedadExistente = propiedades.find(propiedad => 
        propiedad.tipo === nuevaPropiedad.tipo &&
        propiedad.ambientes === nuevaPropiedad.ambientes &&
        propiedad.zona === nuevaPropiedad.zona &&
        propiedad.venta === nuevaPropiedad.venta
    );

    if (propiedadExistente) {
        alert("La propiedad ya existe.");
    } else {
        propiedades.push(nuevaPropiedad);
        guardarPropiedadesEnLocalStorage();
        alert("Propiedad agregada exitosamente.");
    }
}
