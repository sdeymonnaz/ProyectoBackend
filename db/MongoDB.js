import mongoose from 'mongoose';

mongoose.connect('mongodb+srv://seba:Freak123.@ecommerce.sfwbj.mongodb.net/ecomm?retryWrites=true&w=majority');

mongoose.connection.on('open', () => {
    console.log('Succesfully connected to MongoDB Atlas archivo MongoDB');
});

mongoose.connection.on('error', (err) => {
    console.log('Error connecting to MongoDB Atlas archivo MongoDB', err);
});

