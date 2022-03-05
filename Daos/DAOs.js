//Configuracion de Logger
import log4js from '.././utils/logger.js';
const logger = log4js.getLogger();
const loggerApi = log4js.getLogger('apisError');

let productosDao;
let carritoDao;
let usuarioDao;

const persistencia = 'MongoDB';

switch (persistencia) {
    case 'file':
        const {ProductoFile} = await import('../Contenedores/ContainerFiles.js');
        const {CarritoFile} = await import('../Contenedores/ContainerFiles.js');

        productosDao = new ProductoFile('./db/productos.json');
        carritoDao = new CarritoFile('./db/carrito.json');
        logger.info('Persistencia: File');
        break;

    case 'MongoDB':
        const {ProductoMongo} = await import('../Contenedores/ContainerMongo.js');
        const {CarritoMongo} = await import('../Contenedores/ContainerMongo.js');

        productosDao = new ProductoMongo('productos');
        carritoDao = new CarritoMongo('carritos');
        logger.info('Persistencia: MongoDB Atlas');
        break;

    case 'firebase':
        const {ProductoFirebase} = await import('../Contenedores/ContainerFirebase.js');
        const {CarritoFirebase} = await import('../Contenedores/ContainerFirebase.js');

        productosDao = new ProductoFirebase('productos');
        carritoDao = new CarritoFirebase('carrito');
        logger.info('Persistencia: Firebase');
        break;
}

export { productosDao, carritoDao, usuarioDao, persistencia };
