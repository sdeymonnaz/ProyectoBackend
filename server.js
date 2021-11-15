const express = require('express')
const app = express()
const port = 8080;


//Archivo con las rutas a ejecutar
const productsRoutes = require('./routes/productsRoute')
const carritoRoutes = require('./routes/cartRoute')

//Lectura de archivos JSON y envio de datos
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

//Middlewares for routes
app.use("/api/productos" , productsRoutes)
app.use("/api/carrito" , carritoRoutes)

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

