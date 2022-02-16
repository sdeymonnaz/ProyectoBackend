//const express = require('express')
import express from 'express';
import session from 'express-session';
import mongoose from 'mongoose';
import passport from 'passport';
const app = express();
const port = 8080;



//Archivo con las rutas a ejecutar
import productsRoutes from './routes/productsRoute.js'
import carritoRoutes from './routes/cartRoute.js'
import userRoutes from './routes/userRoute.js'


//Lectura de archivos JSON y envio de datos
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

//Session
app.use(session({
    secret: 'secreto',
    resave: false,
    saveUninitialized: false
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

