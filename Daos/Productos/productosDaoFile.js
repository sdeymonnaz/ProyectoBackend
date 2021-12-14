import ContenedorFile from "../../Contenedores/ContenedorFile.js";


class ProductosDaoFile extends ContenedorFile {
    constructor() {
        super('db/productos.json');
    }
}

export default ProductosDaoFile;



