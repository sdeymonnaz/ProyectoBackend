import dotenv from 'dotenv';
dotenv.config();
import mongoose from 'mongoose';

//Configuracion de Logger
import log4js from '.././utils/logger.js';
const logger = log4js.getLogger();
const loggerApi = log4js.getLogger('apisError');


export default class MongoDB {
    constructor() {
        this.mongoose = mongoose;
        this.mongoose.Promise = global.Promise;
        this.mongoose.connect(process.env.MONGODB_URI);
        this.db = this.mongoose.connection;
        this.db.on('error', loggerApi.error.bind(loggerApi, 'MongoDB connection error:'));
        //console.error.bind(console, 'Mongo connection error:'));
        this.db.once('open', () => {
            logger.info('MongoDB connected');
        });
    }
}