const mongoose = require('mongoose')
require('dotenv').config();


// Variables de entorno para la autentificación de MONGODB desde .env
const usuarioMongo = process.env.MONGO_CLUSTER_NAME;
const password = process.env.MONGO_CLUSTER_PASSWORD;


// Conexión a MONGODB
let database = "universo"

mongoose.connect(`mongodb+srv://${usuarioMongo}:${password}@cluster0.fgumghx.mongodb.net/${database}`)
    .then(console.log('Conexión con MONGODB establecida'))
    .catch((err) => console.log(`Error de conexión: ${err}`))


let coleccion = "superheroes"
const heroeSchema = new mongoose.Schema(
    {
        nombre: String, superpoder: String, planeta: String,
        fuerza: Number, vida: Number, defensa: Number
    },
    { versionKey: false });

const heroeModelo = mongoose.model(coleccion, heroeSchema);

module.exports = { heroeModelo }