import dotenv from 'dotenv';
dotenv.config();
import mongoose from 'mongoose';


export default class MongoDB {
    constructor() {
        this.mongoose = mongoose;
        this.mongoose.Promise = global.Promise;
        this.mongoose.connect(process.env.MONGODB_URI);
        this.db = this.mongoose.connection;
        this.db.on('error', console.error.bind(console, 'Mongo connection error:'));
        this.db.once('open', () => {
        console.log('MongoDB connected');
        });
    }
}