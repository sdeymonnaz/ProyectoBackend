import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import bcrypt from "bcrypt";
import User from "../models/usuario.js";
import {carritoDao as newCart } from '../Daos/DAOs.js';
import { SendEmail } from '../utils/sendEmail.js';
const sendEmailToAdmin = new SendEmail();



//Encripcion de contraseña ////////////////////////////////////////////////////////////////////////////////////////////////
//Funcion para encriptar contraseña
const hashPassword = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};

//Funcion para desencriptar contraseña
const isValidPassword = (user, password) => {
    return bcrypt.compareSync(password, user.password);
};

//Estrategia de passport-local para autenticacion de usuarios
//Sign-in de usuarios existentes //////////////////////////////////////////////////////////////////////////////////////////////
passport.use("local-login", new LocalStrategy(async (username, password, done) => {
    let user = await User.findOne({
        username: username,
        password: password
    });

    console.log('user encontrado en MongoDB:', user);

    if (user) {
        return done(null, user);
    }

    return done(null, false, {message: "Usuario o contraseña incorrectos"});

    // if(!user) {
    //     return done(null, false, { message: "Usuario no existente" });
    // }

    // if (!isValidPassword(user, password)) {
    //     return done(null, false, { message: "Usuario o contraseña incorrectos" });
    // }

    // return done(null, 
    //     {
    //         username: user.username,
    //         nombre: user.nombre,
    //         direccion: user.direccion,
    //         edad: user.edad,
    //         telefono: user.telefono,
    //         foto: user.foto,
    //         cart: user.cart
    //     },    
    //     { message: "Login exitoso" }
    // );
}));

//Sign-up de usuarios nuevos /////////////////////////////////////////////////////////////////////////////////////////////////
passport.use("local-signup", new LocalStrategy(
    {   
        usernameField: "username",
        passwordField: "password",
        passReqToCallback: true
    },
    async (req, username, password, done) => {
        console.log('req.body:', req.body);
        let user = await User.findOne({
            username: username
        })

        console.log('user encontrado en MongoDB:', user);

    if (!user) {
        let userNew = await User({
            username,
            password,
            //password: hashPassword(password),
            nombre: req.body.nombre,
            direccion: req.body.direccion,
            edad: req.body.edad,
            telefono: req.body.telefono,
            foto: req.file.,
            cart: await newCart.saveCart()
        });
            const AvatarFoto = req.body.foto;
            await userNew.save({returnNewDocument: true});
            console.log('userNew guardado en MongoDB:', userNew);
            sendEmailToAdmin.sendEmail(process.env.ADMIN_EMAIL, "Nuevo registro", `El usuario ${userNew.username} se ha registrado con estos detalles: \n Nombre: ${userNew.nombre} \n Dirección: ${userNew.direccion} \n Edad: ${userNew.edad} \n Telefono: ${userNew.telefono}`);
        return done(null, userNew);
    } else {
        return done(null, false, user, { message: "Usuario ya existe" });
    }
}));


// Serializacion //////////////////////////////////////////////////////////////////////////////////////////////////////////
//Serializacion de usuarios
passport.serializeUser((user, done) => {
    done(null, user);
});

//Deserializacion de usuarios
passport.deserializeUser(async (id, done) => {
    let user = await User.findOne(
        id
    );
    done(null, user);
});

export default passport;