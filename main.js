let propiedades = [];

async function cargarPropiedades() {
    try {
        const response = await fetch('propiedades.json');
        if (!response.ok) {
            throw new Error('Error al cargar el archivo JSON');
        }
        propiedades = await response.json();
        guardarPropiedadesEnLocalStorage();
    } catch (error) {
        console.error('Error:', error);
    }
}

function guardarPropiedadesEnLocalStorage() {
    localStorage.setItem('propiedades', JSON.stringify(propiedades));
}

function buscarPorId() {
    const id = prompt("Ingrese el ID de la propiedad que desea buscar:");
    if (!id?.trim()) {
        alert("Debe ingresar un ID válido.");
        return;
    }

    const propiedadEncontrada = buscarPropiedadPorId(Number(id));
    const resultadoIdDiv = document.getElementById('resultadoId');
    resultadoIdDiv.innerHTML = '';

    if (propiedadEncontrada) {
        resultadoIdDiv.innerHTML = `
            <div class="propiedad-card">
                <h2>Propiedad ID: ${propiedadEncontrada.id}</h2>
                <p>Tipo: ${propiedadEncontrada.tipo}</p>
                <p>Ambientes: ${propiedadEncontrada.ambientes}</p>
                <p>Zona: ${propiedadEncontrada.zona}</p>
                <p>Venta: ${propiedadEncontrada.venta ? 'Sí' : 'No'}</p>
            </div>
        `;
    } else {
        resultadoIdDiv.textContent = 'No se encontró ninguna propiedad con ese ID.';
    }
}

function buscarPropiedades() {
    const tipoSeleccionado = document.getElementById('tipoPropiedad').value.toLowerCase();
    const ambientesSeleccionados = document.getElementById('ambientes').value;
    const zonaSeleccionada = document.getElementById('zona').value.toLowerCase();
    const esVenta = document.getElementById('tipoVenta').value.toLowerCase();

    const propiedadesFiltradas = propiedades.filter(propiedad =>
        (tipoSeleccionado === 'todos' || propiedad.tipo.toLowerCase() === tipoSeleccionado) &&
        (!ambientesSeleccionados || propiedad.ambientes === parseInt(ambientesSeleccionados)) &&
        (zonaSeleccionada === 'todas' || propiedad.zona.toLowerCase() === zonaSeleccionada) &&
        (esVenta === 'ambos' || propiedad.venta === (esVenta === 'venta'))
    );

    const resultadoDiv = document.getElementById('resultado');
    resultadoDiv.innerHTML = '';

    if (propiedadesFiltradas.length === 0) {
        resultadoDiv.textContent = "No se encontraron propiedades que coincidan con los criterios de búsqueda.";
    } else {
        propiedadesFiltradas.forEach(propiedad => {
            resultadoDiv.innerHTML += `
                <div class="propiedad-card">
                    <h2>Propiedad ID: ${propiedad.id}</h2>
                    <p>Tipo: ${propiedad.tipo}</p>
                    <p>Ambientes: ${propiedad.ambientes}</p>
                    <p>Zona: ${propiedad.zona}</p>
                    <p>Venta: ${propiedad.venta ? 'Sí' : 'No'}</p>
                </div>
            `;
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

// Llamar a la función para cargar las propiedades al inicio
cargarPropiedades();
