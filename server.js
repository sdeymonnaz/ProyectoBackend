const express = require('express')
const app = express()
const port = 8080;



//Archivos estaticos
app.use("/static", express.static(__dirname + "/public"));

//Archivo con las rutas a ejecutar
const productsRoutes = require('./routes/productos')

//Lectura de archivos JSON y envio de datos
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

//Middleware for all routes
app.use("/api" , productsRoutes)


app.listen(port, () =>{
    console.log(`Servidor http escuchando en el puerto ${port}`)
})

app.on("error", error => console.log(`Error en servidor ${error}`))

