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

async function addMonstruo_mongo(nombre: string, tipo: string, fuerza: number, vida: number, def: number) {


    const Monstruo = new modelo({
        nombre: nombre,
        tipo: tipo,
        fuerza: fuerza,
        vida: vida,
        defensa: def
    });


    try {
        await Monstruo.save()
        console.log(`${Monstruo.nombre} añadido a Mongo`);
    } catch (err) {
        console.log(`Error al añadir monstruo: ${err}`)
    }
}

async function listarMonstruo_mongo(bool: boolean) {
    const cartas = await modelo.find()

    if (bool) {
        for (let i = 0; i < cartas.length; i++) {
            console.log(`${cartas[i].nombre} es del tipo: ${cartas[i].tipo}`);
            console.log(`Fuerza: ${cartas[i].fuerza}`)
            console.log(`Vida: ${cartas[i].vida}`)
            console.log(`Defensa: ${cartas[i].defensa}`)
            console.log(`=================================`)
        }
    } else {
        for (let i = 0; i < cartas.length; i++) {
            console.log(`${i + 1}. ${cartas[i].nombre}`);
            console.log(`==============`)
        }
    }

}

async function borrarMonstruo_mongo(eliminado: string) {

    const cartas = await modelo.find();
    for (let i = 0; i < cartas.length; i++) {
        await modelo.deleteOne({ nombre: `${eliminado}` })
            .then(console.log(`${eliminado} ha sido eliminado`))
    }
}

module.exports = { addMonstruo_mongo, listarMonstruo_mongo, borrarMonstruo_mongo }