import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import bcrypt from "bcrypt";
import User from "../models/usuario.js";
//import {carritoDao as newCart } from '../Daos/DAOs.js';
//import { SendEmail } from '../notifications/email.js';
//const sendEmailToAdmin = new SendEmail();
//import upload from '../multer.js';


//Encripcion de contraseña ////////////////////////////////////////////////////////////////////////////////////////////////
//Funcion para encriptar contraseña
/* const hashPassword = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};

//Funcion para desencriptar contraseña
const isValidPassword = (user, password) => {
    return bcrypt.compareSync(password, user.password);
}; */

//Estrategia de passport-local para autenticacion de usuarios
//Sign-in de usuarios existentes //////////////////////////////////////////////////////////////////////////////////////////////
passport.use("local-login", new LocalStrategy(async (username, password, done) => {
    let user = await User.findOne({
        username: username,
        password: password
    });

    console.log('user encontrado en MongoDB:', user);

    if (user) {
        done(null, user);
        return;
    }

    done(null, user);
}));

//Sign-up de usuarios nuevos /////////////////////////////////////////////////////////////////////////////////////////////////
passport.use("local-signup", new LocalStrategy(
    {   
        usernameField: "username",
        passwordField: "password",
        passReqToCallback: true
    },
    async (req, username, password, done) => {
        let user = await User.findOne({
            username: username
        });

        console.log('user encontrado en MongoDB:', user);

    if (!user) {
        let userNew = await User({
            username,
            password,
        })
        await userNew.save({returnNewDocument: true});
        console.log('userNew:', userNew);
        return done(null, userNew);
        }
        return done(null, false, { message: "Usuario ya existe" });
    }
));

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