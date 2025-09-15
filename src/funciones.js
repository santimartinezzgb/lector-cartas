const Heroe = require("./clases.js");
const fs = require('fs')
const prompt = require('prompt-sync')()
let datos = JSON.parse(fs.readFileSync('./databases/datos.json'));


function addHeroe() {
    console.log(datos[0])
    const nombre = prompt("Introduce el nombre del héroe: ");
    const superpoder = prompt(`Introduce el superpoder de ${nombre}: `)
    const planeta = prompt(`De que planeta viene ${nombre}: `)
    const fuerza = Number(prompt(`Indroduce su fuerza (1-99): `))
    while (isNaN == true || (fuerza > 99 && fuerza < 1)) {
        fuerza = Number(prompt(`Indroduce su fuerza (1-99): `))
    }
    const vida = Number(prompt(`Indroduce su vida (1-99): `))
    while (isNaN == true || (vida > 99 && vida < 1)) {
        vida = Number(prompt(`Indroduce su vida (1-99): `))
    }
    const defensa = Number(prompt(`Indroduce su defensa (1-99): `))
    while (isNaN == true || (defensa > 99 && defensa < 1)) {
        defensa = Number(prompt(`Indroduce su defensa (1-99): `))
    }
    let nuevoHeroe = new Heroe(nombre, superpoder, planeta, fuerza, vida, defensa)

    datos.push(nuevoHeroe);

    fs.writeFileSync('./databases/datos.json', JSON.stringify(datos, null, 2));
    console.clear()
    console.log(`${nuevoHeroe.nombre} añadido a la lista`)
}

const editarHeroe = () => {
    console.log("HÉROES")
    datos.forEach((element, index) => {
        console.log(`${index + 1}. ${element.nombre}`)
    });
    const seleccion = Number(prompt("Selecciona un héroe para editar: "));
    const elegido = datos[seleccion - 1].nombre
    console.log(elegido)
}

const borrarHeroe = () => {

}


const salir = () => {
    process.exit()
}

module.exports = { addHeroe, editarHeroe, borrarHeroe, salir }