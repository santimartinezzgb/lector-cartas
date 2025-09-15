// Importaciones
const Heroe = require("./clases.js");
const fs = require('fs')
const prompt = require('prompt-sync')()

// Lecturas de bases de datos JSON y txt
let datosJSON = JSON.parse(fs.readFileSync('./databases/datos.json'));
let datosTxt = fs.readFileSync('./databases/datos.txt', 'utf8').split('\n').filter(line => line.trim());

// Funciones auxiliares
let limpiar = () => { console.clear() }
let atributo = (atr) => {

    let puntuacion = Number(prompt(`Indroduce su ${atr} (1-99): `))
    while (puntuacion > 99 || puntuacion < 1 || isNaN(puntuacion) === true) {
        puntuacion = Number(prompt(`Indroduce puntuación válida (1-99): `))
        return puntuacion
    }
    return puntuacion
}


function addHeroe(bool) {

    /* Método para añadir nuevo héroe
    * bool: según sea true o false,
    * selecciona base de datos en:
    * - JSON
    * - txt
    */
    const nombre = prompt("Introduce el nombre del héroe: ").toUpperCase();
    const superpoder = prompt(`Introduce el superpoder de ${nombre}: `)
    const planeta = prompt(`De que planeta viene ${nombre}: `)

    const fuerza = atributo("fuerza")
    const vida = atributo("vida")
    const defensa = atributo("defensa")

    let nuevoHeroe = new Heroe(nombre, superpoder, planeta, fuerza, vida, defensa)

    if (bool == true) { // Formato JSON
        datosJSON.push(nuevoHeroe);

        fs.writeFileSync('./databases/datos.json', JSON.stringify(datosJSON, null, 2));

        limpiar()

        console.log(`${nuevoHeroe.nombre} añadido a la lista`)
    } else { // Formato txt
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

    limpiar()

    console.log("HÉROES")
    datosJSON.forEach((heroe, index) => {
        console.log(`${index + 1}. ${heroe.nombre}`)
    });
    const seleccionHeroe = Number(prompt("Selecciona un héroe para editar: "));
    const elegido = datos[seleccionHeroe - 1]

    limpiar()

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

    limpiar()

    console.log("Héroe actualizado con éxito")

}

const listarHeroes = (bool) => {

    limpiar()

    if (bool == true) {
        limpiar()
        console.log("HÉROES")
        datosJSON.forEach((heroe, index) => {
            console.log(`${index + 1}. ${heroe.nombre}`)
        });

    } else {

    }

}
const borrarHeroe = (bool) => {

    limpiar()

    if (bool == true) {

        limpiar()

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

    limpiar()

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

module.exports = { addHeroe, editarHeroe, listarHeroes, borrarHeroe, salir, limpiar }