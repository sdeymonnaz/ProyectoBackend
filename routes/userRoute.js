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
    const user = req.user;
    console.log("Req.user en get/register: " + JSON.stringify(user));
    res.sendFile(path.join(process.cwd(), '/public/views/register.html'), {user});
});

// router.post('/register', (req, res) => {
//     const user = req.user;
//     User.findOne({username: user.username}).then(data => {
//         console.log("User encontrado en findOne: ", data);
//         if (data) {
//             console.log("Email: ", req.body.email);
//             const updatedUser = User.findOneAndUpdate({_id: user._id},
//                 {$set: {email: req.body.email, nombre: req.body.nombre, direccion: req.body.direccion, edad: req.body.edad, telefono: req.body.telefono}},
//                 {upsert: true, new: true}
//             ).then(result => {
//                 console.log("Resultado de update: ", result);
//                 User.findOne({username: user.username}).then(data => {
//                     console.log("User encontrado en findOne despues de update: ", data);
//                 });
//                 res.redirect('/api/home');
//             }).catch(err => {
//                 console.log("Error en update: ", err);
//             });
//         }
//     });
// });


router.post('/register', (req, res) => {
    const user = req.user;
    const updatedUser = User.findOneAndUpdate(
        {_id: user._id},
        {$set: {
            email: req.body.email,
            nombre: req.body.nombre,
            direccion: req.body.direccion,
            edad: req.body.edad,
            telefono: req.body.telefono,
            cart: newCart.saveCart()}},
        {upsert: true, new: true}
    ).then(result => {
        console.log("Resultado de update: ", result);
        res.redirect('/api/login');
    }).catch(err => {
        console.log("Error en update profile: ", err);
    });
});

router.get("/failedRegister", (req, res) => {
    res.send("Usuario ya registrado");
});

router.get("/login", (req, res) => {
    console.log("Req.user en get/login: " + JSON.stringify(req.user));
    const user = req.user;
    User.find({_id: user._id, email:{$exists:true}}).then(data => {
        if(data.length > 0) {
        console.log("User encontrado en find: ", data);
        res.redirect('/api/home');
        } else {
            res.redirect('/api/register');
        }
    }).catch(err => {
        console.log("Error en find: ", err);
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
})

// Twitter strategy ////////////////////////////////////////////////////////////////////////////////////////////////
router.get('/auth/twitter', passport.authenticate('twitter'));

router.get('/auth/twitter/callback',
    passport.authenticate('twitter',
        {successRedirect: '/api/login',
        failureRedirect: '/api/failedLogin'}
    ));






export default router;