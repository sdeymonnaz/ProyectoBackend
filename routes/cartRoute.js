const express = require('express');
const {Router} = express;
const router = new Router();


//Load class Contenedor from bookstore.js
const ShoppingCart = require('../Containers/cartContainer')

//Create a new instance of Contenedor with name "book"
let newCart = new ShoppingCart('./db/carrito.txt')

//Create a new instance of Contenedor with name "carrito"
router.post('/', (req, res) => {
    newCart.saveCart().then(data => {
        res.json('/carrito')
    })
})

//Delete cart by id
router.delete('/:id', (req, res) => {
    newCart.deleteCartAll(req.params.id).then(data => {
    res.json(data)
    })
})

//Setup the path to list all products in the file carrito.txt
router.get('/:id/productos', (req, res) => {
    newCart.getCartAll(req.params.id).then(data => {
    res.send(data)
    })
})

//Post new products in the file carrito.txt
router.post("/:id/productos", (req, res) => {
    newCart.addItemToCart(req.params.id, req.body.id).then(data => {
        console.log(req.body.id)
        res.json('/carrito')
    })
})

//Delete individual products from carrito.txt
router.delete("/:id/productos/:idProd", (req, res) => {
    newCart.deleteItemFromCart(req.params.id, req.params.idProd).then(data => {
        res.json(data)
    })
})



module.exports = router;