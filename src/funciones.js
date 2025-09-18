// Importaciones
const Monstruo = require(`./clases.js`);
const fs = require(`fs`)
const prompt = require(`prompt-sync`)()
const { crearMonstruoMongo } = require(`./api-mongo.js`);

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
const addMonstruo = () => { // Tiene elección de formato (JSON/txt)

    limpiar()
    let nombre = prompt('Introduce el nombre del mostruo: ').toUpperCase();

    // Control para hacer el nombre una primary key
    for (let i = 0; i < datosJSON.length; i++) {
        while (datosJSON[i].nombre === nombre) {
            limpiar()
            console.log("Nombre ocupado")
            nombre = prompt('Introduce el nombre del monstruo: ').toUpperCase();
        }
    }

    const tipo = prompt(`Introduce el tipo de ${nombre}: `)

    const fuerza = atributo(`fuerza`);
    const vida = atributo(`vida`);
    const defensa = atributo(`defensa`);

    let nuevoMostruo = new Monstruo(nombre, tipo, fuerza, vida, defensa);

    limpiar()
    crearMonstruoMongo(nombre, tipo, fuerza, vida, defensa)

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
            datosJSON.push(nuevoMostruo);

            fs.writeFileSync(`./databases/datos.json`, JSON.stringify(datosJSON, null, 2));

            limpiar()

            console.log(`${nuevoMostruo.nombre} añadido a la DB en JSON`)

        } else { // Formato txt
            const nuevoMonstruoFormateadoTxt = [
                `Héroe: ` + nuevoMostruo.nombre,
                `\ntipo: ` + nuevoMostruo.tipo,
                `\nFuerza: ` + nuevoMostruo.fuerza,
                `\nVida: ` + nuevoMostruo.vida,
                `\nDefensa: ` + nuevoMostruo.defensa,
                `\n-------------------------------------------`
            ]
            datosTxt.push(nuevoMonstruoFormateadoTxt);

            fs.writeFileSync(`./databases/datos.txt`, datosTxt.join(`\n`));

            limpiar()

            console.log(`${nuevoMostruo.nombre} añadido a la DB en txt`)
        }
    } else {
        limpiar()
        console.log(`Sin guardado adicional`)
    }

}

const editarMonstruo = () => {

    limpiar()

    console.log(`MONSTRUOS`)

    datosJSON.forEach((Monstruo, index) => {
        console.log(`${index + 1}. ${Monstruo.nombre}`)
    });

    const seleccionMonstruo = Number(prompt(`Selecciona un monstruo para editar: `));
    const elegido = datos[seleccionMonstruo - 1]

    limpiar()

    console.log(`
        ╔═════════════════════════════════╗
        ║   Atributos de ${elegido.nombre}║
        ║   1. nombre                     ║
        ║   2. tipo                       ║
        ║   3. fuerza                     ║
        ║   4. vida                       ║
        ║   5. defensa                    ║
        ╚═════════════════════════════════╝
        `)

    const seleccionAtributo = Number(prompt(`Selecciona atributo a editar: `))
    while (seleccionAtributo < 1 || seleccionAtributo > 5 || isNaN(seleccionAtributo) == true) {
        seleccionAtributo = Number(prompt(`Selecciona atributo válido a editar: `))
    }

    switch (seleccionAtributo) {

        case 1: elegido.nombre = prompt(`Nuevo nombre: `); break;
        case 2: elegido.tipo = prompt(`Nuevo tipo: `); break;
        case 3: elegido.fuerza = Number(prompt(`Nueva estadística de fuerza: `)); break;
        case 4: elegido.vida = Number(prompt(`Nuevo estadística de vida: `)); break;
        case 5: elegido.defensa = Number(prompt(`Nuevo estadística de defensa: `)); break;
    }

    limpiar()

    console.log(`Monstruo actualizado con éxito`)

}

const listarMonstruos = () => { // Tiene elección de formato (JSON/txt)

    limpiar()

    let formatoIntroduccionDeDatos = Number(prompt(`Seleccion de formato: JSON(1) o txt(0): `));

    if (formatoIntroduccionDeDatos == 1) {

        console.log(`
        ╔═════════════════════════════════╗
        ║   1. Nombre                     ║
        ║   2. tipo                       ║
        ║   3. Fuerza                     ║
        ║   4. Vida                       ║
        ║   5. Defensa                    ║
        ║   6. All                        ║
        ╚═════════════════════════════════╝
        `)

        let seleccionAtributo = Number(prompt("Seleciona atributo por el que listar: "))
        while (seleccionAtributo < 1 || seleccionAtributo > 7 || isNaN(seleccionAtributo) == true) {
            seleccionAtributo = Number(prompt(`Selecciona atributo válido por el que listar: `))
        }

        limpiar()

        switch (seleccionAtributo) {
            case 1: datosJSON.forEach((Monstruo, index) => { console.log(`${index + 1}. ${Monstruo.nombre}`) }); break;
            case 2: datosJSON.forEach((Monstruo, index) => { console.log(`${index + 1}. tipo de ${Monstruo.nombre}: ${Monstruo.tipo}`) }); break;
            case 3: datosJSON.forEach((Monstruo, index) => { console.log(`${index + 1}. Fuerza de ${Monstruo.nombre}: ${Monstruo.fuerza}`) }); break;
            case 4: datosJSON.forEach((Monstruo, index) => { console.log(`${index + 1}. Vida de ${Monstruo.nombre}: ${Monstruo.vida}`) }); break;
            case 5: datosJSON.forEach((Monstruo, index) => { console.log(`${index + 1}. Defensa de ${Monstruo.nombre}: ${Monstruo.defensa}`) }); break;
            case 6: datosJSON.forEach((Monstruo, index) => { console.log(`\n${index + 1}. ${Monstruo.nombre} tiene el tipo de ${Monstruo.tipo}.\nSus atributos son ${Monstruo.fuerza} de fuerza, ${Monstruo.vida} de vida y ${Monstruo.defensa} de defensa`) }); break;
        }


    } else {

        limpiar()

        console.log(`HÉROES`)
        console.log(datosTxt)
    }

}
const borrarMonstruo = () => {

    limpiar();

    if (datosJSON.length > 0) {

        console.log(`HÉROES`)

        datosJSON.forEach((Monstruo, index) => {
            console.log(`${index + 1}. ${Monstruo.nombre}`)
        });

        const seleccionMonstruo = Number(prompt(`Selecciona un héroe para eliminar: `));
        while (seleccionMonstruo < 1 || seleccionMonstruo > datosJSON.length || isNaN(seleccionMonstruo) == true) {
            seleccionMonstruo = Number(prompt(`Selecciona un héroe válido para eliminar: `))
        }

        limpiar()

        const MonstruoEliminar = datosJSON[seleccionMonstruo - 1]
        const nombreDelEliminado = MonstruoEliminar.nombre

        datosJSON = datosJSON.filter(Monstruo => Monstruo.nombre !== MonstruoEliminar.nombre)

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

module.exports = { addMonstruo, editarMonstruo, listarMonstruos, borrarMonstruo, salir, limpiar }