import mongoose from 'mongoose';

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
            console.log(err);
        }
    }

    async save(producto) {
        try {
            const productoGuardado = await this.modelo.create({...producto, timestamp: new Date().toLocaleString()});
            return productoGuardado;
        }
        catch (err) {
            console.log(err);
        }
    }

    async getById(id) {
        try {
            const producto = await this.modelo.findById(id);
            return producto;
        }
        catch (err) {
            console.log(err);
        }
    }

    async deleteById(id) {
        try {
            const producto = await this.modelo.findByIdAndDelete(id);
            return producto;
        }
        catch (err) {
            console.log(err);
        }
    }

    async updateById(id, producto) {
        try {
            const productoActualizado = await this.modelo.findByIdAndUpdate(id, producto);
            return productoActualizado;
        }
        catch (err) {
            console.log(err);
        }
    }

    async deleteAll() {
        try {
            const productos = await this.modelo.deleteMany();
            return productos;
        }
        catch (err) {
            console.log(err);
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
            console.log('Error', err);
        }
    }

    async deleteCartById(cartId) {
        try {
            const cartDB = await this.modelo.deleteMany({_id: cartId});
            return cartDB;
        }
        catch (err) {
            console.log('Error', err);
        }
    }

    async getCartById(cartId) {
        try {
            const data = await this.modelo.find({_id: cartId});
            return data[0];
        }
        catch (err) {
            console.log('Error', err);
        }
    }

    async updateCart(nuevoElem) {
        try {
            const data = await this.modelo.replaceOne({'_id': nuevoElem._id}, nuevoElem);
            return data;
        }
        catch (err) {
            console.log('Error', err);
        }
    }

}

// USUARIOS ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export class UsuarioMongo {
    constructor(coleccion) { 
        this.modelo = mongoose.model(coleccion, {
            username: String,
            password: String,
            nombre: String,
            direccion: String,
            edad: Number,
            telefono: String,
            foto: String,
            cart: Array,
        });
    }

    async findUserByCartId(cartId) {
        try {
            const data = await this.modelo.find({cart: cartId});
            return data[0];
        }
        catch (err) {
            console.log('Error en findUserById', err);
        }
    }

}