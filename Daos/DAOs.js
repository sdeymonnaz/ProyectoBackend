let productosDao;
let carritoDao;

const persistencia = 'MongoDB';

switch (persistencia) {
    case 'file':
        const {ProductoFile} = await import('../Contenedores/ContainerFiles.js');
        const {CarritoFile} = await import('../Contenedores/ContainerFiles.js');

        productosDao = new ProductoFile('./db/productos.json');
        carritoDao = new CarritoFile('./db/carrito.json');
        console.log('Persistencia: File');
        break;

    case 'MongoDB':
        const {ProductoMongo} = await import('../Contenedores/ContainerMongo.js');
        const {CarritoMongo} = await import('../Contenedores/ContainerMongo.js');

        productosDao = new ProductoMongo('productos');
        carritoDao = new CarritoMongo('carritos');
        console.log('Persistencia: MongoDB');
        break;

    case 'firebase':
        const {ProductoFirebase} = await import('../Contenedores/ContainerFirebase.js');
        const {CarritoFirebase} = await import('../Contenedores/ContainerFirebase.js');

        productosDao = new ProductoFirebase('productos');
        carritoDao = new CarritoFirebase('carrito');
        console.log('Persistencia: Firebase');
        break;
}

export { productosDao, carritoDao, persistencia };
