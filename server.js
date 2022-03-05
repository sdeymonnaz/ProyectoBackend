import express from 'express';
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
const app = express();
const port = 8080;


//Archivo con las rutas a ejecutar
import productsRoutes from './routes/productsRoute.js'
import carritoRoutes from './routes/cartRoute.js'
import userRoutes from './routes/userRoute.js'

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