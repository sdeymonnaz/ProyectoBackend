import mongoose from 'mongoose';


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
            productos: Array
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

    async deleteCartById(cartId) {
        try {
            const cartDB = await this.modelo.deleteMany({_id: cartId});
            //await cartDB.save();
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

export default CarritoMongo;

