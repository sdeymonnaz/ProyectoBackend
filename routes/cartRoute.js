import express from 'express';
const {Router} = express;
const router = new Router();

//Send messages after checkout
import { SendEmail } from '../utils/sendEmail.js';
const sendEmailToAdmin = new SendEmail();
import sendSMS from '../utils/sendSMS.js';
const sendSMSToUser = new sendSMS(process.env.TWILIO_SMS_FROM_NUMBER);
import sendWA from '../utils/sendWA.js';
const sendWAtoUser = new sendWA(process.env.TWILIO_WA_FROM_NUMBER);

//Load class Contenedor
import User from "../models/usuario.js";
import {carritoDao as newCart } from '../Daos/DAOs.js';
import {productosDao as newProd } from '../Daos/DAOs.js';
import {persistencia as persist} from '../Daos/DAOs.js';


//Create a new instance of Contenedor with name "carrito"
router.post('/', (req, res) => {
    newCart.saveCart().then(data => {
        res.json(data);
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

//Checkout cart
router.post("/:id/checkout", async (req, res) => {
    const cart = await newCart.getCartById(req.params.id).then(data => {
        return data
    })
    cart.checkout = true;
    await newCart.updateCart(cart);
    const cartUser = await User.find({cart: cart._id.toString()}).then(data => {
        return data[0];
    })
    await sendEmailToAdmin.sendEmail(process.env.ADMIN_EMAIL, `Nuevo pedido de ${cartUser.username}`, `Usuario: ${cartUser.username} \n Nombre: ${cartUser.nombre} \n Dirección: ${cartUser.direccion} \n Telefono: ${cartUser.telefono} \n Productos: ${JSON.stringify(cart.productos, null, 2)}`);
    await sendSMSToUser.send(cartUser.telefono, `Nuevo pedido de ${cartUser.username} recibido y en proceso de preparacion`);
    await sendWAtoUser.send(cartUser.telefono, `Nuevo pedido de ${cartUser.username}`);
    res.json(cart);
})


export default router;