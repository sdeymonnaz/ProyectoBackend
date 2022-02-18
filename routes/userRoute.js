import express from 'express';
import path from 'path';
const {Router} = express;
const router = new Router();
import mongoose from 'mongoose';
import passport from 'passport';
import LocalStrategy from "passport-local";
LocalStrategy.Strategy = LocalStrategy;
import multer from 'multer';
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

//Funcion para cargar archivo de foto con Multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/images");
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

const upload = multer({storage})


//Rutas de la API
router.get('/register', (req, res) => {
    res.sendFile(path.join(process.cwd(), 'public/views/register.html'));
});

router.post("/register",
    passport.authenticate("local-signup", {
        successRedirect: "/api/login",
        failureRedirect: "/api/failedRegister"
    }),
    upload.single("foto"),
    (req, res, next) => {
        const file = req.file;
        if (!file) {
            const error = new Error("Please upload a file");
            error.httpStatusCode = 400;
            return next(error);
        }
        console.log("File uploaded");
        res.send(file);
    }
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