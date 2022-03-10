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
    console.log("req.user en auth: ", req.user);
    console.log("req.isAuthenticated() en auth: ", req.isAuthenticated());
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/api/login");
};

//Rutas de la API ////////////////////////////////////////////////////////////////////////////////////////////////
// Register a new user ////////////////////////////////////////////////////////////////////////////////////////////
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
// router.get("/home", auth, (req, res) => {
//     console.log("req.isAuthenticated en home:", req.isAuthenticated());
//     console.log("Home req.user", req.user);
//     const user = req.user;
//     const allProducts = newProd.getAll()
//     .then(allProducts => {
//         res.render(path.join(process.cwd(), "public/views/home.ejs"), {user, products});
//     })
//     .catch(err => {
//         res.send(err);
//     });
// })

router.get("/home", auth, (req, res) => {
    console.log("req.isAuthenticated en home:", req.isAuthenticated());
    const user = req.user;
    const allProducts = newProd.getAll()
    .then(allProducts => {
        console.log("Home user", user);
        console.log("Home allProducts: ", allProducts);
        res.send({user, allProducts});
        //res.sendFile(path.join(process.cwd(), "public/views/home.html"), {user, products});
    })
    .catch(err => {
        res.send(err);
    });
})





export default router;