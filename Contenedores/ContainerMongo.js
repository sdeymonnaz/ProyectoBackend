import mongoose from 'mongoose';


mongoose.connect('mongodb+srv://seba:Freak123.@ecommerce.sfwbj.mongodb.net/ecomm?retryWrites=true&w=majority');

mongoose.connection.on('open', () => {
    console.log('connected to mongoDB Atlas');
});

mongoose.connection.on('error', (err) => {
    console.log('error connection to mongoDB Atlas', err);
});

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


export class CarritoMongo {
    constructor(coleccion) { 
        this.modelo = mongoose.model(coleccion, {
            timestamp: String,
            productos: Array
        });
    }

    async saveCart() {
        try {
            const cartDB = await this.modelo.create({timestamp: new Date().toLocaleString(), productos: []});
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