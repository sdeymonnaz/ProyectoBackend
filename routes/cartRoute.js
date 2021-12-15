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
    newCart.deleteCartById(req.params.id).then(data => {
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
    const product = await newProd.getById(req.body.id)
    cart[0].productos.push(product)
    await newCart.updateCart(cart[0])
    res.json(cart)
})


//Delete individual products from carrito.txt
router.delete("/:id/productos/:idProd", async (req, res) => {
    const cart = await newCart.getCartById(req.params.id);
    console.log('cart', cart[0])
    const index = await cart[0].productos.findIndex(prod => prod._id == req.params.idProd);
    if (index > -1) {
        cart[0].productos.splice(index, 1);
        await newCart.updateCart(cart[0])
    } else {
        res.status(404).send("Producto no encontrado")
    }
    res.json(cart);
})
    



//export default cartRoute = router;
export default router;
//module.exports = router;