import mongoose from 'mongoose';
//import { productosDao as newProd } from '../Daos/DAOs.js';


mongoose.connect('mongodb+srv://seba:Freak123.@ecommerce.sfwbj.mongodb.net/ecomm?retryWrites=true&w=majority');

mongoose.connection.on('open', () => {
    console.log('connected to mongoDB Atlas');
});

mongoose.connection.on('error', (err) => {
    console.log('error connection to mongoDB Atlas', err);
});


class CarritoMongo {
    constructor(coleccion) { 
        this.modelo = mongoose.model(coleccion, {
            timestamp: String,
            productos: []
        });
    }

    async saveCart() {
        try {
            const cartDB = await this.modelo.create({timestamp: new Date().toLocaleString(), productos: []});
            //await cartDB.save();
        }
        catch (err) {
            console.log('Error', err);
        }
    }

    async deleteCartAll(cartId) {
        try {
            const cartDB = await this.modelo.deleteMany({_id: cartId});
            //await cartDB.save();
        }
        catch (err) {
            console.log('Error', err);
        }
    }

    async getCartAll(cartId) {
        try {
            const data = await this.modelo.find({_id: cartId});
            return data;
        }
        catch (err) {
            console.log('Error', err);
        }
    }

    async addItemToCart(cartId, itemId) {
        try {
            const cartDB = await this.modelo.findById(cartId);
            console.log('cartDB', cartDB);
            const itemDB = await newProd.getById(itemId);
            console.log('itemDB', itemDB);
            //cartDB.productos.push(producto);
            //console.log('cartDB.productos', cartDB.productos);
            //cartDB.productos.push(item);
            //await cartDB.saveCart();
            //return cartDB;

        }
        catch (err) {
            console.log('Error', err);
        }
    }




}


export default CarritoMongo;

