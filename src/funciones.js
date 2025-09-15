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
    const seleccionHeroe = Number(prompt("Selecciona un héroe para editar: "));
    const elegido = datos[seleccionHeroe - 1]

    console.clear()
    console.log(`
        Atributos de ${elegido.nombre}:
        1. nombre
        2. superpoder
        3. planeta
        4. fuerza
        5. vida
        6. defensa
        `)

    const seleccionAtributo = Number(prompt("Selecciona atributo a editar: "))
    switch (seleccionAtributo) {
        case 1: elegido.nombre = prompt("Nuevo nombre: "); break;
        case 2: elegido.superpoder = prompt("Nuevo superpoder: "); break;
        case 3: elegido.planeta = prompt("Nuevo planeta: "); break;
        case 4: elegido.fuerza = prompt("Nueva estadística de fuerza: "); break;
        case 5: elegido.vida = prompt("Nuevo estadística de vida: "); break;
        case 6: elegido.defensa = prompt("Nuevo estadística de defensa: "); break;
    }
    console.log("Héroe actualizado con éxito")
}

const listarHeroes = () => {
    console.log("HÉROES")
    datos.forEach((element, index) => {
        console.log(`${index + 1}. ${element.nombre}`)
    });
}
const borrarHeroe = () => {

}


const salir = () => {
    process.exit()
}

module.exports = { addHeroe, editarHeroe, listarHeroes, borrarHeroe, salir }