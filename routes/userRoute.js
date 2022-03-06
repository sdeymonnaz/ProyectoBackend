import express from 'express';
import path from 'path';
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
import passportTwitter from '../utils/passport-twitter.js';

//Configuracion de Logger
import log4js from '.././utils/logger.js';
const logger = log4js.getLogger();
const loggerApi = log4js.getLogger('apisError');

const auth = (req, res, next) => {
    if (req.isAuthenticated()) return next();
    res.redirect("/api/login");
};

//Rutas de la API ////////////////////////////////////////////////////////////////////////////////////////////////
router.get('/', (req, res) => {
    res.redirect('/api/auth/twitter');
});

router.get('/register', (req, res) => {
    console.log("Req.body: " + JSON.stringify(req.body));
    res.sendFile(path.join(process.cwd(), '/public/views/register.html'));
});

router.post('/register', (req, res) => {
    console.log("Register req.body: ", req.body);
    User.findOne({username: req.body.username}).then(data => {
        User.updateOne(
            {$set:
                {email: req.body.email,
                nombre: req.body.nombre,
                direccion: req.body.direccion,
                edad: req.body.edad,
                telefono: req.body.telefono,
                cart: newCart.saveCart()
            }
        }).then(data => {
            console.log('Usuario registrado:', data);
            res.redirect('/api/home');
        }).catch(err => {
            console.log('Error al registrar usuario:', err);
            res.redirect('/api/register');
        });
    }).catch(err => {
        console.log('Error al registrar usuario:', err);
        res.redirect('/api/register');
    })

});

router.get("/failedRegister", (req, res) => {
    res.send("Usuario ya registrado");
});

router.get("/login", (req, res) => {
    console.log("Login req.user.username", req.user.username);
    console.log("Login req.user.email", req.user.email);
    const userUsername = req.user.username;
    const userEmail = User.findOne({email: req.user.email}).then(registeredEmail => {
        if(registeredEmail.length > 0) {
            res.redirect('/api/home');
        } else {
            res.redirect('api/register', {userUsername});
        }
    });
});

router.post("/login",
    passport.authenticate("local-login", {
        successRedirect: "/api/home",
        failureRedirect: "/api/failedLogin"
    })
);

router.get("/failedLogin", (req, res) => {
    res.send("Usuario o contraseña incorrectos");
})

router.get("/logout", (req, res) => {
    req.logout();
    res.send("Logout exitoso");
});

router.get("/home", auth, (req, res) => {
    const User = req.user;
    const allProducts = newProd.getAll()
    .then(allProducts => {
        res.send({allProducts, User});
    })
    .catch(err => {
        res.send(err);
    });
    //res.json({username: req.user.username});
})

// Twitter strategy ////////////////////////////////////////////////////////////////////////////////////////////////
router.get('/auth/twitter', passport.authenticate('twitter'));

router.get('/auth/twitter/callback',
    passport.authenticate('twitter',
        {successRedirect: '/api/register',
        failureRedirect: '/api/failedLogin'}
    ));






export default router;