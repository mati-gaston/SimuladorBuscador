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
        console.error(error);
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Hubo un problema al cargar las propiedades.'
        });
    }
}

function guardarPropiedadesEnLocalStorage() {
    localStorage.setItem('propiedades', JSON.stringify(propiedades));
}

function buscarPorId() {
    Swal.fire({
        title: 'Buscar propiedad por ID',
        input: 'text',
        inputLabel: 'Ingrese el ID de la propiedad que desea buscar:',
        inputValidator: (value) => {
            if (!value || isNaN(value) || value <= 0) {
                return 'Debe ingresar un ID válido.';
            }
        }
    }).then((result) => {
        if (result.isConfirmed) {
            const id = Number(result.value);
            const propiedadEncontrada = buscarPropiedadPorId(id);
            const resultadoIdDiv = document.getElementById('resultadoId');
            resultadoIdDiv.innerHTML = '';

            if (propiedadEncontrada) {
                const propiedadDiv = document.createElement('div');
                propiedadDiv.className = 'propiedad-card';
                propiedadDiv.innerHTML = `
                    <img src="${propiedadEncontrada.imagen}" alt="Imagen de propiedad ${propiedadEncontrada.id}" class="propiedad-imagen">
                    <h2>Propiedad ID: ${propiedadEncontrada.id}</h2>
                    <p>Tipo: ${propiedadEncontrada.tipo}</p>
                    <p>Ambientes: ${propiedadEncontrada.ambientes}</p>
                    <p>Zona: ${propiedadEncontrada.zona}</p>
                    <p>Venta: ${propiedadEncontrada.venta ? 'Sí' : 'No'}</p>
                `;
                resultadoIdDiv.appendChild(propiedadDiv);
            } else {
                Swal.fire({
                    icon: 'warning',
                    title: 'No encontrado',
                    text: 'No se encontró ninguna propiedad con ese ID.'
                });
            }
        }
    });
}

function buscarPropiedades() {
    const tipoSeleccionado = document.getElementById('tipoPropiedad').value.toLowerCase();
    const ambientesSeleccionados = document.getElementById('ambientes').value;
    const zonaSeleccionada = document.getElementById('zona').value.toLowerCase();
    const esVenta = document.getElementById('tipoVenta').value.toLowerCase();

    const propiedadesFiltradas = propiedades.filter(propiedad => {
        return (tipoSeleccionado === 'todos' || propiedad.tipo.toLowerCase() === tipoSeleccionado) &&
            (!ambientesSeleccionados || propiedad.ambientes === parseInt(ambientesSeleccionados)) &&
            (zonaSeleccionada === 'todas' || propiedad.zona.toLowerCase() === zonaSeleccionada) &&
            (esVenta === 'ambos' || propiedad.venta === (esVenta === 'venta'));
    });

    const resultadoDiv = document.getElementById('resultado');
    resultadoDiv.innerHTML = '';
    resultadoDiv.className = 'propiedades-grid';

    if (propiedadesFiltradas.length === 0) {
        resultadoDiv.textContent = "No se encontraron propiedades que coincidan con los criterios de búsqueda.";
    } else {
        propiedadesFiltradas.forEach(propiedad => {
            const propiedadDiv = document.createElement('div');
            propiedadDiv.className = 'propiedad-card';
            propiedadDiv.innerHTML = `
                <img src="${propiedad.imagen}" alt="Imagen de propiedad ${propiedad.id}" class="propiedad-imagen">
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

document.addEventListener('DOMContentLoaded', cargarPropiedades);
