let productosDao;
let carritoDao;

const persistencia = 'firebase';

switch (persistencia) {
    case 'file':
        const {default: ProductosDaoFile} = await import('../Contenedores/productsContainerFile.js');
        const {default: CarritoDaoFile} = await import('../Contenedores/cartContainerFile.js');

        productosDao = new ProductosDaoFile('./db/productos.json');
        carritoDao = new CarritoDaoFile('./db/carrito.json');
        console.log('Persistencia: File');
        break;

    case 'MongoDB':
        const {default: ProductosDaoMongo} = await import('../Contenedores/productsContainerMongo.js');
        const {default: CarritoDaoMongo} = await import('../Contenedores/cartContainerMongo.js');

        productosDao = new ProductosDaoMongo('productos');
        carritoDao = new CarritoDaoMongo('carritos');
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
