let productosDao;
let carritoDao;

const persistencia = 'file';

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
}

export { productosDao, carritoDao, persistencia };
