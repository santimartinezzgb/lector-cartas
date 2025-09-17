const mongoose = require(`mongoose`)
require(`dotenv`).config();

// Variables de entorno para la autentificación de MONGODB desde .env
const usuarioMongo = process.env.MONGO_CLUSTER_NAME;
const password = process.env.MONGO_CLUSTER_PASSWORD;

// Conexión a MONGODB
const conexionMongo = () => {
    let database = "universo"
    try {
        mongoose.connect(`mongodb+srv://${usuarioMongo}:${password}@cluster0.fgumghx.mongodb.net/${database}`)
        console.log(`Conexión establecida con Mongo`)
    } catch (err) {
        console.log(`Error de conexión: ${err}`)
    }
}


let coleccion = 'monstruos'
const heroeSchema = new mongoose.Schema(
    {
        nombre: String, tipo: String, ataqueEspecial: String,
        fuerza: Number, vida: Number, defensa: Number
    },
    { versionKey: false });

let heroeModelo = mongoose.model(coleccion, heroeSchema);


const crearHeroeMongo = (a, b, c, d, e, f) => {
    heroeModelo.insertOne({
        nombre: a,
        tipo: b,
        ataqueEspecial: c,
        fuerza: d,
        vida: e,
        defensa: f
    });

    console.log(`${a} añadido a la base de datos de MONGO`);
    console.log(`----------------------------------------------`)
}
module.exports = { conexionMongo, crearHeroeMongo }