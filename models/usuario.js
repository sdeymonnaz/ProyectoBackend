import mongoose from 'mongoose';

//Modelo de usuario para manejar en Mongo Atlas
const usuariosCollection = 'usuarios';

const usuariosSchema = new mongoose.Schema({
  username: String,
  password: String,
  email: String,
  nombre: String,
  direccion: String,
  edad: Number,
  telefono: String,
  foto: String,
  cart: Array,
});

const User = mongoose.model(usuariosCollection, usuariosSchema);

export default User;