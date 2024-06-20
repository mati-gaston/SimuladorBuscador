# Proyecto simulador de un buscador de Propiedades

Este proyecto permite buscar y filtrar propiedades usando un archivo JSON y almacenando los datos en el localStorage.
Está desarrollado en JavaScript y usa la biblioteca SweetAlert2 para mostrar alertas y diálogos.

# Funciones

cargarPropiedades(): Carga las propiedades desde el archivo propiedades.json y las guarda en el localStorage.
guardarPropiedadesEnLocalStorage(): Guarda las propiedades en el localStorage.
buscarPorId(): Muestra un cuadro de diálogo para buscar una propiedad por su ID.
buscarPropiedades(): Filtra las propiedades según el tipo, cantidad de ambientes, zona y tipo de venta.
limpiarBusqueda(): Limpia los criterios de búsqueda y los resultados.
buscarPropiedadPorId(id): Busca una propiedad por su ID.
mostrarPropiedad(propiedad, contenedor): Muestra la información de una propiedad en el contenedor especificado. 