const express = require('express')
const handlebars = require('express-handlebars')
const app = express()
const Contenedor = require('./bookstore')

let book = new Contenedor('./productos.txt')


//Archivos estaticos
app.use("/static", express.static(__dirname + "/public"));

//Configuracion de plantillas
app.set('views', './views')
app.set('view engine', 'hbs')
app.engine('hbs', 
    handlebars(
        {extname: 'hbs',
         layoutsDir: __dirname + '/views/layouts',
          defaultLayout: 'index'
        }
    )
)

//Server
const http = require("http");
const port = process.env.PORT || 8080;
const server = http.createServer(app);

//Data
const msn = [];

//Socket
const { Server } = require("socket.io");
const io = new Server(server);

    

io.on("connection", (socket) => {
    console.log("User connected");
  
    //Emitir un mensaje al cliente
    socket.emit("mensage_back", msn);
    //Escuchar
    socket.on("message_client", (data) => {
      console.log(data);
    });
  
    //Escuchar chat cliente
    socket.on("dataMsn", (data) => {
      msn.push(data);
      console.log(msn);
      // socket.emit("mensage_back", msn);
      io.sockets.emit("mensage_back", msn)
    });

    

    //Escuchar lista de productos
      book.getAll().then((dataObj) => {
        socket.emit("lista_productos", dataObj);
      });


  });




//Archivo con las rutas a ejecutar
const productsRoutes = require('./routes/productos')
const { hasSubscribers } = require('diagnostics_channel')

//Lectura de archivos JSON y envio de datos
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

//Middleware for all routes
app.use("/productos" , productsRoutes)



app.listen(port, () =>{
    console.log(`Servidor http escuchando en el puerto ${port}`)
})

app.on("error", error => console.log(`Error en servidor ${error}`))

