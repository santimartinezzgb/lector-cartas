const mongoose = require('mongoose');
require('dotenv').config();
const userMongo = process.env.MONGO_USER
const userPassword = process.env.MONGO_PASSWORD

console.clear()
async function run() {

    await mongoose.connect(`mongodb+srv://${userMongo}:${userPassword}@cluster0.fgumghx.mongodb.net/Monstruos`)
        .then(console.log('Conexión con MongoDB establecida con éxito!'))
        .catch((err: Error) => console.log('Se ha producido un error en el intento de conexión: ', err))


    const modelo = mongoose.model('Carta', {
        nombre: String,
        tipo: String,
        fuerza: Number,
        vida: Number,
        defensa: Number
    });

    const Monstruo = new modelo({
        nombre: 'casper',
        tipo: 'fantasma',
        fuerza: 50,
        vida: 40,
        defensa: 4
    })

    Monstruo
        .save()
        .then(console.log('Monstruo añadido a Mongo'));
}
run()