import express from 'express';
const {Router} = express;
const router = new Router();


//Load class Contenedor from bookstore.js
import {carritoDao as newCart } from '../Daos/DAOs.js';
import {productosDao as newProd } from '../Daos/DAOs.js';
import {persistencia as persist} from '../Daos/DAOs.js';


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
    res.json(data)
    })
})

//Post new products in cart
router.post("/:id/productos", async (req, res) => {
    const cart = await newCart.getCartById(req.params.id)
    const product = await newProd.getById(req.body.id)
    cart.productos.push(product)
    await newCart.updateCart(cart)
    res.json(cart)
})


//Delete individual products from cart
router.delete("/:id/productos/:idProd", async (req, res) => {
    const cart = await newCart.getCartById(req.params.id);
    if (persist === 'MongoDB') {
        var index = await cart.productos.findIndex(prod => prod._id == req.params.idProd);
    } else {
        var index = await cart.productos.findIndex(prod => prod.id == req.params.idProd);
    }
    if (index > -1) {
        cart.productos.splice(index, 1);
        await newCart.updateCart(cart);
    } else {
        res.status(404).send("Producto no encontrado")
    }
    res.json(cart);
})
    



//export default cartRoute = router;
export default router;
//module.exports = router;