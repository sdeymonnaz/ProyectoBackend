import express from 'express';
import path from 'path';
import upload from '../utils/uploadFiles.js';
const {Router} = express;
const router = new Router();
import MongoDB from '../db/MongoDB.js';
const mongo = new MongoDB();
import passport from 'passport';
import LocalStrategy from "passport-local";
LocalStrategy.Strategy = LocalStrategy;
import passportConfig from '../config/passport.js';
import { productosDao as newProd } from '../Daos/DAOs.js';
import { carritoDao as newCart } from '../Daos/DAOs.js';
import User from "../models/usuario.js";

//Configuracion de Logger
import log4js from '.././utils/logger.js';
const logger = log4js.getLogger();
const loggerApi = log4js.getLogger('apisError');

const auth = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/api/login");
};

//Rutas de la API ////////////////////////////////////////////////////////////////////////////////////////////////
// Register a new user ////////////////////////////////////////////////////////////////////////////////////////////
router.get('/', (req, res) => {
    res.redirect('/api/login');
});

router.get('/register', (req, res) => {
    res.sendFile(path.join(process.cwd(), 'public/views/register.html'));
});

router.post('/register',
    await upload.single('foto'),
    passport.authenticate("local-signup", {
        successRedirect: "/api/login",
        failureRedirect: "/api/failedRegister"
    })
);

router.get("/failedRegister", (req, res) => {
    res.sendFile(path.join(process.cwd(), "public/views/registerError.html"));
});


// Login ////////////////////////////////////////////////////////////////////////////////////////////////////////
router.get("/login", (req, res) => {
    res.sendFile(path.join(process.cwd(), "public/views/login.html"));
});

router.post("/login",
    passport.authenticate("local-login", {
        successRedirect: "/api/home",
        failureRedirect: "/api/failedLogin"
    })
);

router.get("/failedLogin", (req, res) => {
    res.sendFile(path.join(process.cwd(), "public/views/loginError.html"));
})

router.get("/logout", (req, res) => {
    req.logout();
    res.sendFile(path.join(process.cwd(), "public/views/logout.html"));
});

// Home ////////////////////////////////////////////////////////////////////////////////////////////////////////
router.get("/home", auth, (req, res) => {
    const user = req.user;
    const cartSel = newCart.getCartById(user.cart[0]._id).then(data => {
        const cartId = JSON.stringify(user.cart[0]._id);
        const allProducts = newProd.getAll()
        .then(allProducts => {
            res.render(path.join(process.cwd(), "public/views/home.ejs"), 
            {
                nombre: user.nombre,
                foto: user.foto,
                cartId: cartId,
                cart: data.productos,
                allProducts});
        })
        .catch(err => {
            res.send(err);
        });
    })
})





export default router;