const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');


mongoose.connect('mongodb+srv://seba:Freak123.@ecommerce.sfwbj.mongodb.net/ecomm?retryWrites=true&w=majority');

mongoose.connection.on('open', () => {
    console.log('connected to mongoDB Atlas');
});

mongoose.connection.on('error', (err) => {
    console.log('error connection to mongoDB Atlas', err);
});

class ProductoMongo {
    constructor(coleccion) { 
        this.modelo = mongoose.model(coleccion, {
            nombre: String,
            descripcion: String,
            codigo: String,
            foto: String,
            precio: Number,
            stock: Number,
            id: String,
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

    async saveCart(producto) {
        try {
            const productoGuardado = await this.modelo.create({...producto, id: uuidv4(), timestamp: new Date().toISOString()});
            return productoGuardado;
        }
        catch (err) {
            console.log(err);
        }
    }

    async geyById(id) {
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



module.exports = ContenedorMongo;

    