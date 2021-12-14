import express from 'express';
const {Router} = express;
const router = new Router();


//Load class Product from productContainer.js
//const Product = require('../Containers/productsContainer')
import { productosDao as newProd } from '../Daos/index.js';

//Create a new instance of Product with name "newProd"
//let newProd = new Product('./db/productos.txt')

//Create boolean variable admin for restricted access and reply an auth error message
const administrador = true;

//Setup the path to list all products in the file productos.txt
router.get('/', (req, res) => {
    newProd.getAll().then(data => {
    res.send(data)
    })
})

//Load product by id
router.get('/:id', (req, res) => {
    newProd.getById(parseInt(req.params.id)).then(data => {
    res.json(data)
    })
})

//Post new products in the file productos.txt
    router.post("/", (req, res) => {
        (administrador) ? (
            newProd.save(req.body).then(data => {
                res.json('/productos')
            })
        ) : (res.send({error: -1, descripcion: "ruta '/productos' método 'post' no autorizada"}))
    })

//Update product by id
router.put('/:id', (req, res) => {
    (administrador) ? (
        newProd.updateById(parseInt(req.params.id), req.body).then(data => {
        res.json(data)
        })
    ) : (res.send({error: -1, descripcion: "ruta '/productos/:id' método 'put' no autorizada"}))
})

//Delete product by id
router.delete('/:id', (req, res) => {
    (administrador) ? (
        newProd.deleteById(parseInt(req.params.id)).then(data => {
        res.json(data)
        })
    ) : (res.send({error: -1, descripcion: "ruta '/productos/:id' método 'delete' no autorizada"}))
})


export default router;