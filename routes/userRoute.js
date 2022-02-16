import express from 'express';
import path from 'path';
const {Router} = express;
const router = new Router();
import mongoose from 'mongoose';
import passport from 'passport';
import LocalStrategy from "passport-local";
LocalStrategy.Strategy = LocalStrategy;
import passportConfig from '../authentication/passport.js';


//Connect to MongoDB
mongoose.connect('mongodb+srv://seba:Freak123.@ecommerce.sfwbj.mongodb.net/ecomm?retryWrites=true&w=majority');

mongoose.connection.on('open', () => {
    console.log('Succesfully connected to MongoDB Atlas archivo MongoDB');
});

mongoose.connection.on('error', (err) => {
    console.log('Error connecting to MongoDB Atlas archivo MongoDB', err);
});

const auth = (req, res, next) => {
    if (req.isAuthenticated()) return next();
    res.redirect("/api/login");
};



router.get('/register', (req, res) => {
    res.sendFile(path.join(process.cwd(), 'public/views/register.html'));
});

router.post("/register",
    passport.authenticate("local-signup", {
        successRedirect: "/api/login",
        failureRedirect: "/api/failedRegister"
    })
);

router.get("/failedRegister", (req, res) => {
    res.sendFile(path.join(process.cwd(), "public/views/registerError.html"));    
});

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



export default router;