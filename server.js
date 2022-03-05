import express from 'express';
const app = express();

//Modulos cluster
import cluster from 'cluster';
import {cpus} from 'os';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
import dotenv from 'dotenv';
dotenv.config();
import cookieParser from 'cookie-parser';
import session from 'express-session';
import MongoStore from 'connect-mongo';
const advancedOptions = {useNewUrlParser: true, useUnifiedTopology: true};
import passport from 'passport';

// Seteo de variables de entorno
const port = process.env.PORT || 8080;
const mode = process.argv.slice(2) || "FORK";
const numCPUs = cpus().length;


//Archivo con las rutas a ejecutar
import productsRoutes from './routes/productsRoute.js'
import carritoRoutes from './routes/cartRoute.js'
import userRoutes from './routes/userRoute.js'

//Configuracion de cluster
if(cluster.isPrimary && mode == "CLUSTER"){
  console.log(`Master ${process.pid} is running`);
  // Fork workers.
    for (let i = 0; i < numCPUs; i++) {
      cluster.fork();
    }
    cluster.on('exit', (worker, code, signal) => {
      console.log('worker %d died :(', worker.process.pid);
    });
}else{
  //Archivos estaticos
  app.use(express.static(path.join(__dirname, 'public')));
  app.use('public/images', express.static(path.join(__dirname, 'public/images')));

  //Lectura de archivos JSON y envio de datos
  app.use(express.json())
  app.use(express.urlencoded({ extended: false }))

  //Session
  app.use(cookieParser());
  app.use(session({
    store: MongoStore.create({
      mongoUrl: process.env.MONGODB_URI,
      mongoOptions: advancedOptions
    }),
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {maxAge: 600000},
  }))

  ///Passport
  app.use(passport.initialize());
  app.use(passport.session());

  //Middlewares for routes
  app.use("/api/productos" , productsRoutes)
  app.use("/api/carrito" , carritoRoutes)
  app.use("/api" , userRoutes)

  app.use((req, res) => {
      res.status(404).send({
        error : -2,
        descripcion: `ruta ${req.url} método ${req.method} no implementada`
      })
  })

  app.listen(port, () =>{
      console.log(`Servidor http escuchando en el puerto ${port}`)
  })

  app.on("error", error => console.log(`Error en servidor ${error}`))
}