const Heroe = require("./clases.js");
const fs = require('fs')
const prompt = require('prompt-sync')()
let datosJSON = JSON.parse(fs.readFileSync('./databases/datos.json'));
let datosTxt = fs.readFileSync('./databases/datos.txt', 'utf8').split('\n').filter(line => line.trim());


function addHeroe(bool) {

    const nombre = prompt("Introduce el nombre del héroe: ").toUpperCase();
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

    if (bool == true) {
        datosJSON.push(nuevoHeroe);

        fs.writeFileSync('./databases/datos.json', JSON.stringify(datos, null, 2));
        console.clear()
        console.log(`${nuevoHeroe.nombre} añadido a la lista`)
    } else {
        const nuevoHeroeFormateadoTxt = [
            "Héroe: " + nuevoHeroe.nombre,
            "\nSuperpoder: " + nuevoHeroe.superpoder,
            "\nPlaneta: " + nuevoHeroe.planeta,
            "\nFuerza: " + nuevoHeroe.fuerza,
            "\nVida: " + nuevoHeroe.vida,
            "\nDefensa: " + nuevoHeroe.defensa,
            "\n-------------------------------------------"
        ]
        datosTxt.push(nuevoHeroeFormateadoTxt);

        fs.writeFileSync('./databases/datos.txt', datosTxt.join('\n'));
    }
}

const editarHeroe = (bool) => {

    console.log("HÉROES")
    datosJSON.forEach((heroe, index) => {
        console.log(`${index + 1}. ${heroe.nombre}`)
    });
    const seleccionHeroe = Number(prompt("Selecciona un héroe para editar: "));
    const elegido = datos[seleccionHeroe - 1]

    console.clear()
    console.log(`
        ╔═════════════════════════════════╗
        ║   Atributos de ${elegido.nombre}║
        ║   1. nombre                     ║
        ║   2. superpoder                 ║            
        ║   3. planeta                    ║
        ║   4. fuerza                     ║
        ║   5. vida                       ║
        ║   6. defensa                    ║
        ╚═════════════════════════════════╝
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
    console.clear()
    console.log("Héroe actualizado con éxito")

}

const listarHeroes = (bool) => {
    if (bool == true) {
        console.log("HÉROES")
        datosJSON.forEach((heroe, index) => {
            console.log(`${index + 1}. ${heroe.nombre}`)
        });

        console.log('HÉROES FUERTES: ')
        datosJSON.forEach((heroe, index) => {
            (heroe.fuerza > 50) ? console.log(`${index + 1}. ${heroe.nombre} tiene fuerza ${heroe.fuerza}`) : "";
        });
    } else {

    }

}
const borrarHeroe = (bool) => {

    if (bool == true) {
        console.log("HÉROES")
        datosJSON.forEach((heroe, index) => {
            console.log(`${index + 1}. ${heroe.nombre}`)
        });
        const seleccionHeroe = Number(prompt("Selecciona un héroe para eliminar: "));
        const heroeEliminar = datos[seleccionHeroe - 1]
        const nombreDelEliminado = heroeEliminar.nombre

        datos = datosJSON.filter(heroe => heroe.nombre !== heroeEliminar.nombre)

        fs.writeFileSync('./databases/datos.json', JSON.stringify(datos, null, 2));
        console.log(`${nombreDelEliminado} ha sido eliminado`)

    } else {

    }
}


const salir = async () => {
    console.clear()

    console.log("Saliendo del programa en...")
    setTimeout(() => {
        console.log('... 3')
    }, 1000)
    setTimeout(() => {
        console.log('... 2')
    }, 2000)
    setTimeout(() => {
        console.log('... 1')
    }, 3000)
    setTimeout(() => {

        process.exit()
    }, 4000)
}

module.exports = { addHeroe, editarHeroe, listarHeroes, borrarHeroe, salir }