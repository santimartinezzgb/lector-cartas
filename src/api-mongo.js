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

const crearHeroeMongo = (a, b, c, d, e, f,) => {

    let coleccion = `superheroes`
    const heroeSchema = new mongoose.Schema(
        {
            nombre: String, superpoder: String, planeta: String,
            fuerza: Number, vida: Number, defensa: Number
        },
        { versionKey: false });

    const heroeModelo = mongoose.model(coleccion, heroeSchema);

    try {
        const nuevoHeroe = heroeModelo({
            nombre: a,
            superpoder: b,
            planeta: c,
            fuerza: d,
            vida: e,
            defensa: f
        });
        nuevoHeroe.save();
        console.log(`Héroe añadido en mongo`)

    } catch (err) {
        console.log(`No se a podido añadir el nuevo héroe a mongo: ${err}`)
    }
}
module.exports = { conexionMongo, crearHeroeMongo }