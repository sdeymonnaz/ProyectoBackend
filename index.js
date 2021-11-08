const express = require('express')
const handlebars = require('express-handlebars')

const app = express()

app.set('views', './views')
app.set('view engine', 'hbs')



//Configuracion de plantillas
app.engine('hbs', 
    handlebars(
        {extname: 'hbs',
         layoutsDir: __dirname + '/views/layouts',
          defaultLayout: 'index'
        }
    )
)

//Puerto
const port = 8080

const productsRoutes = require('./routes/productos')

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

//Static files
//app.use("/static", express.static(__dirname + "/public"));

//Middleware for all routes
app.use("/productos" , productsRoutes)



app.listen(port, () =>{
    console.log(`Servidor http escuchando en el puerto ${port}`)
})

app.on("error", error => console.log(`Error en servidor ${error}`))

