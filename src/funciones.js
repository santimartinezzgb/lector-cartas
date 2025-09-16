// Importaciones
const Heroe = require(`./clases.js`);
const fs = require(`fs`)
const prompt = require(`prompt-sync`)()
const { crearHeroeMongo } = require(`./api-mongo.js`)

// Lecturas de bases de datos JSON y txt
let datosJSON = JSON.parse(fs.readFileSync(`./databases/datos.json`));
let datosTxt = fs.readFileSync(`./databases/datos.txt`, `utf8`).split(`\n`).filter(line => line.trim());

// Métodos auxiliares
let limpiar = () => { console.clear() }

let atributo = (atr) => {
    let puntuacion = Number(prompt(`Indroduce su ${atr} (1-99): `))
    while (puntuacion > 99 || puntuacion < 1 || isNaN(puntuacion) == true) {
        puntuacion = Number(prompt(`Indroduce puntuación válida (1-99): `))
    }
    return puntuacion
}


// MÉTODOS PRINCIPALES
const addHeroe = () => { // Tiene elección de formato (JSON/txt)

    limpiar()
    let nombre = prompt('Introduce el nombre del héroe: ').toUpperCase();

    for (let i = 0; i < datosJSON.length; i++) {
        while (datosJSON[i].nombre === nombre) {
            limpiar()
            console.log("Nombre ocupado")
            nombre = prompt('Introduce el nombre del héroe: ').toUpperCase();
        }
    }

    const superpoder = prompt(`Introduce el superpoder de ${nombre}: `)
    const planeta = prompt(`De que planeta viene ${nombre}: `)

    const fuerza = atributo(`fuerza`);
    const vida = atributo(`vida`);
    const defensa = atributo(`defensa`);

    let nuevoHeroe = new Heroe(nombre, superpoder, planeta, fuerza, vida, defensa);

    limpiar()
    crearHeroeMongo(nombre, superpoder, planeta, fuerza, vida, defensa)

    let guardadoAdicional = prompt(`Guardar adicionalmente en otro formato? (s/n): `);

    if (guardadoAdicional == "s") {
        limpiar()
        console.log(`
        GUARDADO ADICIONAL:
        1. JSON
        2. TXT
            `)
        let formatoIntroduccionDeDatos = Number(prompt(`Formato a guardar: `));
        if (formatoIntroduccionDeDatos == 1) { // Formato JSON
            datosJSON.push(nuevoHeroe);

            fs.writeFileSync(`./databases/datos.json`, JSON.stringify(datosJSON, null, 2));

            limpiar()

            console.log(`${nuevoHeroe.nombre} añadido a la DB en JSON`)

        } else { // Formato txt
            const nuevoHeroeFormateadoTxt = [
                `Héroe: ` + nuevoHeroe.nombre,
                `\nSuperpoder: ` + nuevoHeroe.superpoder,
                `\nPlaneta: ` + nuevoHeroe.planeta,
                `\nFuerza: ` + nuevoHeroe.fuerza,
                `\nVida: ` + nuevoHeroe.vida,
                `\nDefensa: ` + nuevoHeroe.defensa,
                `\n-------------------------------------------`
            ]
            datosTxt.push(nuevoHeroeFormateadoTxt);

            fs.writeFileSync(`./databases/datos.txt`, datosTxt.join(`\n`));

            limpiar()

            console.log(`${nuevoHeroe.nombre} añadido a la DB en txt`)
        }
    } else {
        limpiar()
        console.log(`Sin guardado adicional`)
    }



}

const editarHeroe = () => {

    limpiar()

    console.log(`HÉROES`)

    datosJSON.forEach((heroe, index) => {
        console.log(`${index + 1}. ${heroe.nombre}`)
    });

    const seleccionHeroe = Number(prompt(`Selecciona un héroe para editar: `));
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

    const seleccionAtributo = Number(prompt(`Selecciona atributo a editar: `))

    switch (seleccionAtributo) {

        case 1: elegido.nombre = prompt(`Nuevo nombre: `); break;
        case 2: elegido.superpoder = prompt(`Nuevo superpoder: `); break;
        case 3: elegido.planeta = prompt(`Nuevo planeta: `); break;
        case 4: elegido.fuerza = Number(prompt(`Nueva estadística de fuerza: `)); break;
        case 5: elegido.vida = Number(prompt(`Nuevo estadística de vida: `)); break;
        case 6: elegido.defensa = Number(prompt(`Nuevo estadística de defensa: `)); break;
    }

    limpiar()

    console.log(`Héroe actualizado con éxito`)

}

const listarHeroes = () => { // Tiene elección de formato (JSON/txt)

    limpiar()

    let formatoIntroduccionDeDatos = Number(prompt(`Seleccion de formato: JSON(1) o txt(0): `));

    if (formatoIntroduccionDeDatos == 1) {

        console.log(`
        ╔═════════════════════════════════╗
        ║   1. nombre                     ║
        ║   2. superpoder                 ║            
        ║   3. planeta                    ║
        ║   4. fuerza                     ║
        ║   5. vida                       ║
        ║   6. defensa                    ║
        ╚═════════════════════════════════╝
        `)

        let seleccionAtributo = Number(prompt("Seleciona atributo por el que"))
        limpiar()

        switch (seleccionAtributo) {
            case 1: datosJSON.forEach((heroe, index) => { console.log(`${index + 1}. ${heroe.nombre}`) }); break;
            case 2: datosJSON.forEach((heroe, index) => { console.log(`${index + 1}. Superpoder de ${heroe.nombre}: ${heroe.superpoder}`) }); break;
            case 3: datosJSON.forEach((heroe, index) => { console.log(`${index + 1}. Planeta de ${heroe.nombre}: ${heroe.planeta}`) }); break;
            case 4: datosJSON.forEach((heroe, index) => { console.log(`${index + 1}. Fuerza de ${heroe.nombre}: ${heroe.fuerza}`) }); break;
            case 5: datosJSON.forEach((heroe, index) => { console.log(`${index + 1}. Vida de ${heroe.nombre}: ${heroe.vida}`) }); break;
            case 6: datosJSON.forEach((heroe, index) => { console.log(`${index + 1}. Defensa de ${heroe.nombre}: ${heroe.defensa}`) }); break;
        }


    } else {

        limpiar()

        console.log(`HÉROES`)
        console.log(datosTxt)
    }

}
const borrarHeroe = () => {

    limpiar();

    if (datosJSON.length > 0) {

        console.log(`HÉROES`)

        datosJSON.forEach((heroe, index) => {
            console.log(`${index + 1}. ${heroe.nombre}`)
        });

        const seleccionHeroe = Number(prompt(`Selecciona un héroe para eliminar: `));
        const heroeEliminar = datosJSON[seleccionHeroe - 1]
        const nombreDelEliminado = heroeEliminar.nombre

        datosJSON = datosJSON.filter(heroe => heroe.nombre !== heroeEliminar.nombre)

        fs.writeFileSync(`./databases/datos.json`, JSON.stringify(datosJSON, null, 2));

        console.log(`${nombreDelEliminado} ha sido eliminado`)

    } else {

        console.log(`No hay héroes en la lista`)

    }

}


const salir = async () => {

    limpiar()
    console.log(`Saliendo del programa en...`)

    setTimeout(() => {
        console.log(`... 3`)
    }, 1000)

    setTimeout(() => {
        console.log(`... 2`)
    }, 2000)

    setTimeout(() => {
        console.log(`... 1`)
    }, 3000)

    setTimeout(() => {

        process.exit()
    }, 4000)
}

module.exports = { addHeroe, editarHeroe, listarHeroes, borrarHeroe, salir, limpiar }