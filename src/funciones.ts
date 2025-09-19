// Importaciones
const { Monstruo } = require('./clases.ts');
const fs = require('fs');
const promptsync = require('prompt-sync');
const prompt = promptsync();

// Lecturas de bases de datos JSON y txt
let datosJSON = JSON.parse(fs.readFileSync('./databases/datos.json', 'utf8'));
let datosTxt = fs.readFileSync(`./databases/datos.txt`, `utf8`).split(`\n`).filter((line: string) => line.trim());

// Métodos auxiliares
const limpiar = () => { console.clear() }

let atributo = (atr: string) => {
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
    console.log(`
        GUARDADO ADICIONAL:
        1. JSON
        2. TXT
            `);

    let formatoIntroduccionDeDatos = Number(prompt(`Formato a guardar: `));

    while (formatoIntroduccionDeDatos < 1 || formatoIntroduccionDeDatos > 2 || isNaN(formatoIntroduccionDeDatos) == true) {
        formatoIntroduccionDeDatos = Number(prompt(`Selecciona formato válido a guardar: `))
    }

    if (formatoIntroduccionDeDatos == 1) { // Formato JSON

        // Paso de datos a la base de datos JSON
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

        // Paso de datos a la base de datos txt
        datosTxt.push(nuevoMonstruoFormateadoTxt.join(''));
        fs.writeFileSync(`./databases/datos.txt`, datosTxt.join(`\n`));

        limpiar()

        console.log(`${nuevoMostruo.nombre} añadido a la DB en txt`)
    }

}

const editarMonstruo = () => {

    limpiar()

    console.log(`MONSTRUOS`)

    datosJSON.forEach((Monstruo: { nombre: string; }, index: number) => {
        console.log(`${index + 1}. ${Monstruo.nombre}`)
    });

    let seleccionMonstruo = Number(prompt(`Selecciona un monstruo para editar: `));

    while (seleccionMonstruo < 1 || seleccionMonstruo > datosJSON.length || isNaN(seleccionMonstruo) == true) {
        seleccionMonstruo = Number(prompt(`Selecciona un monstruo válido para editar: `))
    }
    const elegido = datosJSON[seleccionMonstruo - 1]

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

    let seleccionAtributo = Number(prompt(`Selecciona atributo a editar: `))

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

    while (formatoIntroduccionDeDatos < 0 || formatoIntroduccionDeDatos > 1 || isNaN(formatoIntroduccionDeDatos) == true) {
        formatoIntroduccionDeDatos = Number(prompt(`Selecciona formato válido: JSON(1) o txt(0): `))
    }

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

        let seleccionAtributo = Number(prompt("Seleciona atributo por el que listar: "));

        while (seleccionAtributo < 1 || seleccionAtributo > 6 || isNaN(seleccionAtributo) == true) {
            seleccionAtributo = Number(prompt(`Selecciona atributo válido por el que listar: `))
        }

        limpiar()

        switch (seleccionAtributo) {
            case 1:
                datosJSON.forEach((Monstruo: { nombre: string; }, index: number) => {
                    console.log(`${index + 1}. ${Monstruo.nombre}`)
                }); break;
            case 2:
                datosJSON.forEach((Monstruo: { nombre: string, tipo: string }, index: number) => {
                    console.log(`${index + 1}. Tipo: ${Monstruo.nombre}: ${Monstruo.tipo}`)
                }); break;
            case 3:
                datosJSON.forEach((Monstruo: { nombre: string, fuerza: number }, index: number) => {
                    console.log(`${index + 1}. Fuerza de ${Monstruo.nombre}: ${Monstruo.fuerza}`)
                }); break;
            case 4:
                datosJSON.forEach((Monstruo: { nombre: string, vida: number }, index: number) => {
                    console.log(`${index + 1}. Vida de ${Monstruo.nombre}: ${Monstruo.vida}`)
                }); break;
            case 5:
                datosJSON.forEach((Monstruo: { nombre: string, defensa: number }, index: number) => {
                    console.log(`${index + 1}. Defensa de ${Monstruo.nombre}: ${Monstruo.defensa}`)
                }); break;
            case 6:
                datosJSON.forEach((Monstruo: { nombre: string, tipo: string, fuerza: number, vida: number, defensa: number }, index: number) => {
                    console.log(`\n${index + 1}. ${Monstruo.nombre} tiene es tipo ${Monstruo.tipo}.\nSus atributos son ${Monstruo.fuerza} de fuerza, ${Monstruo.vida} de vida y ${Monstruo.defensa} de defensa`)
                }); break;
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

        datosJSON.forEach((Monstruo: { nombre: string }, index: number) => {
            console.log(`${index + 1}. ${Monstruo.nombre}`)
        });

        let seleccionMonstruo = Number(prompt(`Selecciona un héroe para eliminar: `));

        while (seleccionMonstruo < 1 || seleccionMonstruo > datosJSON.length || isNaN(seleccionMonstruo) == true) {
            seleccionMonstruo = Number(prompt(`Selecciona un héroe válido para eliminar: `))
        }

        limpiar()

        const MonstruoEliminar = datosJSON[seleccionMonstruo - 1]
        const nombreDelEliminado = MonstruoEliminar.nombre

        datosJSON = datosJSON.filter((Monstruo: { nombre: string }) => Monstruo.nombre !== MonstruoEliminar.nombre)

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