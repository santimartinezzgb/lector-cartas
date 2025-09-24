const mongoose = require('mongoose');
const schema = new mongoose.Schema(
    {
        nombre: String,
        tipo: String,
        fuerza: Number,
        vida: Number,
        defensa: Number
    },
    { versionKey: false }
)
const modelo = mongoose.model('Carta', schema);

async function addMongo(nombre: string, tipo: string, fuerza: number, vida: number, defensa: number) {

    const Monstruo = new modelo({
        nombre: nombre,
        tipo: tipo,
        fuerza: fuerza,
        vida: vida,
        defensa: defensa
    });

    Monstruo
        .save()
        .then(console.log(`${Monstruo.nombre} añadido a Mongo`));
}

async function listarMongo() {
    const cartas = await modelo.find()
    console.log(cartas)
}

module.exports = { addMongo, listarMongo }