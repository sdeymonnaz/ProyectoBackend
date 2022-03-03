import express from 'express';
import path from 'path';
const {Router} = express;
const router = new Router();
import MongoDB from '../db/MongoDB.js';
const mongo = new MongoDB();
//import mongoose from 'mongoose';
import passport from 'passport';
import LocalStrategy from "passport-local";
LocalStrategy.Strategy = LocalStrategy;
import passportConfig from '../config/passport.js';



const auth = (req, res, next) => {
    if (req.isAuthenticated()) return next();
    res.redirect("/api/login");
};

//Rutas de la API ////////////////////////////////////////////////////////////////////////////////////////////////
router.get('/register', (req, res) => {
    res.send('Registrar nuevo usuario');
});

router.post('/register',
    passport.authenticate("local-signup", {
        successRedirect: "/api/login",
        failureRedirect: "/api/failedRegister"
    })
);

router.get("/failedRegister", (req, res) => {
    res.send("Usuario ya registrado");
});

router.get("/login", (req, res) => {
    res.send('Loguear usuario existente');
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

router.get("/home", auth, (req, res) => {
    res.json({username: req.user.username});
})




export default router;