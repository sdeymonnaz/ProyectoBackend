let productosDao;
let carritoDao;

const persistencia = 'file';

switch (persistencia) {
    case 'file':
        const {default: ProductosDaoFile} = await import('./Productos/productosDaoFile.js');
        const {default: CarritoDaoFile} = await import('./Carrito/carritoDaoFile.js');

        productosDao = new ProductosDaoFile();
        carritoDao = new CarritoDaoFile();
        console.log('Persistencia: File');
        break;
}

export { productosDao, carritoDao };
