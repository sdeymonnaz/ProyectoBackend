import mongoose from 'mongoose';

//Modelo de usuario para manejar en Mongo Atlas
const usuariosCollection = 'usuarios';

const usuariosSchema = new mongoose.Schema({
  username: String,
  password: String
});

const User = mongoose.model(usuariosCollection, usuariosSchema);

export default User;