import express from 'express';
import path from 'path';
const {Router} = express;
const router = new Router();
import mongoose from 'mongoose';
import passport from 'passport';
import LocalStrategy from "passport-local";
LocalStrategy.Strategy = LocalStrategy;
import multer from 'multer';
import { productosDao as newProd } from '../Daos/DAOs.js';
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




router.post('/register',
    passport.authenticate('local-signup', {
        failureRedirect: '/api/failedRegister'
    }),
    (err, req, res, next) => {
        if (err) next(err);
        upload.single("foto");
        res.redirect('/api/login');
    }
);


// router.post("/register",
//     upload.single("foto"),
//     passport.authenticate("local-signup", {
//         successRedirect: "/api/login",
//         failureRedirect: "/api/failedRegister"
//     }),
//     // (req, res, next) => {
//     //     const file = req.file;
//     //     if (!file) {
//     //         const error = new Error("Please upload a file");
//     //         error.httpStatusCode = 400;
//     //         return next(error);
//     //     }
//     //     res.send("File uploaded");
//     // }
// );

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

router.get("/logout", (req, res) => {
    req.logout();
    res.sendFile(path.join(process.cwd(), "public/views/logout.html"));
});

router.get("/home", auth, (req, res) => {
    console.log('req.user: ', req.user);
    const user = req.user;
    //const userName = req.user.username;
    //const userNameName = req.user.nombre;
    //const userNameFoto = req.user.foto;
    //console.log('userNameFoto: ', userNameFoto);
    const allProducts = newProd.getAll().then(products => {
        //console.log('products: ', products);
        //res.render(path.join(process.cwd(), "public/home.ejs"), {userName, userNameName, userNameFoto, products});
        res.render(path.join(process.cwd(), "public/home.ejs"), {user, products});
    });
        
});



export default router;