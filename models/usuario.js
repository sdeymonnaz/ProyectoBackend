//const {MongoDB} = require('../db/MongoDB');
//import mongoose from '../db/MongoDB.js';
//const mongoose = require("mongoose");
import mongoose from 'mongoose';
//const MongoDB = require('../db/MongoDB.js');

//Modelo de usuario para manejar en Mongo Atlas
const usuariosCollection = 'usuarios';

const usuariosSchema = new mongoose.Schema({
  username: String,
  password: String,
  nombre: String,
  direccion: String,
  edad: Number,
  telefono: String,
  foto: String,
});

const User = mongoose.model(usuariosCollection, usuariosSchema);

export default User;