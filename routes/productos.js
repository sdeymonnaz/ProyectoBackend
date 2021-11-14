const express = require('express');
const {Router} = express;
const router = new Router();

//Load class Contenedor from bookstore.js
const Contenedor = require('../bookstore')

//Create a new instance of Contenedor with name "book"
let book = new Contenedor('./productos.txt')

//Create boolean variable admin for restricted access and reply an auth error message
const administrador = true;

//Setup the path to list all products in the file productos.txt
router.get('/productos', (req, res) => {
    book.getAll().then(data => {
    res.send(data)
    })
})

//Load product by id
router.get('/productos/:id', (req, res) => {
    book.getById(parseInt(req.params.id)).then(data => {
    res.json(data)
    })
})

//Post new products in the file productos.txt
    router.post("/productos", (req, res) => {
        (administrador) ? (
            book.save(req.body).then(data => {
                res.json('/productos')
            })
        ) : (res.send({error: -1, descripcion: "ruta '/productos' método 'post' no autorizada"}))
    })

//Update product by id
router.put('/productos/:id', (req, res) => {
    (administrador) ? (
        book.updateById(parseInt(req.params.id), req.body).then(data => {
        res.json(data)
        })
    ) : (res.send({error: -1, descripcion: "ruta '/productos/:id' método 'put' no autorizada"}))
})

//Delete product by id
router.delete('/productos/:id', (req, res) => {
    (administrador) ? (
        book.deleteById(parseInt(req.params.id)).then(data => {
        res.json(data)
        })
    ) : (res.send({error: -1, descripcion: "ruta '/productos/:id' método 'delete' no autorizada"}))
})


// router.get("/form", (req, res) => {
//     res.sendFile(__dirname + '/public/form.html') 
// })


// router.post('/', (req, res) => {
//     book.save(req.body).then(data => {
//     res.send(data)
//     })
// })




module.exports = router;