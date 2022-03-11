import mongoose from 'mongoose';

//Configuracion de Logger
import log4js from '.././utils/logger.js';
const logger = log4js.getLogger();
const loggerApi = log4js.getLogger('apisError');

// PRODUCTOS ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export class ProductoMongo {
    constructor(coleccion) { 
        this.modelo = mongoose.model(coleccion, {
            nombre: String,
            descripcion: String,
            codigo: String,
            foto: String,
            precio: Number,
            stock: Number,
            timestamp: String
        });
    }

    async getAll() {
        try {
            const productos = await this.modelo.find();
            return productos;
        }
        catch (err) {
            loggerApi.error(`Error en metodo getAll: ${err}`);
        }
    }

    async save(producto) {
        try {
            const productoGuardado = await this.modelo.create({...producto, timestamp: new Date().toLocaleString()});
            return productoGuardado;
        }
        catch (err) {
            loggerApi.error(`Error en metodo save: ${err}`);
        }
    }

    async getById(id) {
        try {
            const producto = await this.modelo.findById(id);
            return producto;
        }
        catch (err) {
            loggerApi.error(`Error en metodo getById: ${err}`);
        }
    }

    async deleteById(id) {
        try {
            const producto = await this.modelo.findByIdAndDelete(id);
            return producto;
        }
        catch (err) {
            loggerApi.error(`Error en metodo deleteById: ${err}`);
        }
    }

    async updateById(id, producto) {
        try {
            const productoActualizado = await this.modelo.findByIdAndUpdate(id, producto);
            return productoActualizado;
        }
        catch (err) {
            loggerApi.error(`Error en metodo updateById: ${err}`);
        }
    }

    async deleteAll() {
        try {
            const productos = await this.modelo.deleteMany();
            return productos;
        }
        catch (err) {
            loggerApi.error(`Error en metodo deleteAll: ${err}`);
        }
    }

}


// CARRITO ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export class CarritoMongo {
    constructor(coleccion) { 
        this.modelo = mongoose.model(coleccion, {
            timestamp: String,
            checkout: Boolean,
            productos: Array
        });
    }

    async saveCart() {
        try {
            const cartDB = await this.modelo.create({timestamp: new Date().toLocaleString(), checkout: false ,productos: []});
            return cartDB;
        }
        catch (err) {
            loggerApi.error(`Error en metodo saveCart: ${err}`);
        }
    }

    async deleteCartById(cartId) {
        try {
            const cartDB = await this.modelo.deleteMany({_id: cartId});
            return cartDB;
        }
        catch (err) {
            loggerApi.error(`Error en metodo deleteCartById: ${err}`);
        }
    }

    async getCartById(cartId) {
        try {
            const data = await this.modelo.find({_id: cartId});
            return data[0];
        }
        catch (err) {
            loggerApi.error(`Error en metodo getCartById: ${err}`);
        }
    }

    async updateCart(nuevoElem) {
        try {
            const data = await this.modelo.replaceOne({'_id': nuevoElem._id}, nuevoElem);
            return data;
        }
        catch (err) {
            loggerApi.error(`Error en metodo updateCart: ${err}`);
        }
    }

}

// USUARIOS ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// export class UsuarioMongo {
//     constructor(coleccion) { 
//         this.modelo = mongoose.model(coleccion, {
//             username: String,
//             password: String,
//             nombre: String,
//             direccion: String,
//             edad: Number,
//             telefono: String,
//             foto: String,
//             cart: Array,
//         });
//     }

    // async findUserByCartId(cartId) {
    //     try {
    //         const data = await this.modelo.find({cart: cartId});
    //         return data[0];
    //     }
    //     catch (err) {
    //         loggerApi.error(`Error en metodo findUserByCartId: ${err}`);
    //     }
    // }

// }