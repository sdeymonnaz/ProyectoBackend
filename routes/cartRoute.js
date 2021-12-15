import express from 'express';
//const express = require('express');
const {Router} = express;
const router = new Router();


//Load class Contenedor from bookstore.js
import {carritoDao as newCart } from '../Daos/DAOs.js';
import {productosDao as newProd } from '../Daos/DAOs.js';

//const ShoppingCart = require('../Containers/cartContainer')

//Create a new instance of Contenedor with name "book"
//let newCart = new ShoppingCart('./db/carrito.txt')

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

//Setup the path to list all products in a cart
router.get('/:id/productos', (req, res) => {
    newCart.getCartById(req.params.id).then(data => {
    res.send(data)
    })
})

//Post new products in cart
router.post("/:id/productos", async (req, res) => {
    const cart = await newCart.getCartById(req.params.id)
    console.log('cart', cart)
    console.log('cart.productos', cart.productos)
    const product = await newProd.getById(req.body.id)
    console.log('product', product)
    cart.productos.push(product)
    await newCart.updateCart(product)
    res.json(cart)
})

//Delete individual products from carrito.txt
router.delete("/:id/productos/:idProd", (req, res) => {
    newCart.deleteItemFromCart(req.params.id, req.params.idProd).then(data => {
        res.json(data)
    })
})


//export default cartRoute = router;
export default router;
//module.exports = router;