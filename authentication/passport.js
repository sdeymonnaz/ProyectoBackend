import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import User from "../models/usuario.js";

//Estrategia de passport-local para autenticacion de usuarios
//Sign-in de usuarios existentes
passport.use("local-login", new LocalStrategy(async (username, password, done) => {
    let user = await User.findOne({
        username: username,
        password: password
    });

    console.log('user encontrado en MongoDB:', user);

    if (user) {
        return done(null, user);
    }   
    return done(null, false, { message: "Usuario o contraseña incorrectos" });
}));

//Sign-up de usuarios nuevos
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
        let userNew = User({username, password, nombre: req.body.nombre, direccion: req.body.direccion, edad: req.body.edad, telefono: req.body.telefono, foto: req.body.foto});
            await userNew.save({returnNewDocument: true});
            return done(null, userNew);
        }
        return done(null, false, { message: "Usuario ya existe" });
    }
));

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