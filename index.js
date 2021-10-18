const express = require('express')
const Contenedor = require('./bookstore')

const app = express()

const port = process.env.PORT || 8080

let book = new Contenedor('./productos.txt')




app.get('/', (req, res) => {
    res.send({message: 'hola mundo express'})
})

app.get('/productos', (req, res) => {
    book.getAll().then(data => {
    let productsList = JSON.stringify(data, null, 2)
    res.send(productsList)
    })
})

app.get('/productoRandom', (req, res) => {
    book.getAll().then(data => {
        const idsList = []
        //Create array of ids
        for (let product of data){
            idsList.push(product.id)
        }
        //Get maximun and minimum value from the array
        let top = Math.max.apply(Math, idsList)
        let bottom = Math.min.apply(Math, idsList)
        //Create a funtion to return a random id from the array
        function getRandomInt(min, max) {
            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max - min) + min);
          }
        //Get a random id and execute getById method
        let randomId = getRandomInt(bottom, top+1)
        book.getById(randomId).then(data => {
            res.send({data:data})
        })
    })
})



const server = app.listen(port, () =>{
    console.log(`Servidor http escuchando en el puerto ${port}`)
})

server.on("error", error => console.log(`Error en servidor ${error}`))

