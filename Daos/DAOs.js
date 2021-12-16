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
        const {default: ProductosDaoFirebase} = await import('../Contenedores/productsContainerFirebase.js');
        //const {default: CarritoDaoFirebase} = await import('../Contenedores/cartContainerFirebase.js');

        productosDao = new ProductosDaoFirebase('productos');
        //carritoDao = new CarritoDaoFirebase();
        console.log('Persistencia: Firebase');
        break;
}

export { productosDao, carritoDao, persistencia };
