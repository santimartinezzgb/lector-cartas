// Importaciones--------------------------------------------------------------------------------------------------------------------
const fs = require('fs');
const prompt = require('prompt-sync')();
const mongoose = require('mongoose');
require('dotenv').config()
const { addMonstruo_sql_db, listarMonstruo_sql_db, borrarMonstruo_sql_db } = require('../databases/db-mysql.ts');
const { Monstruo } = require('./clases.ts');
const { addMonstruo_mongo, listarMonstruo_mongo, borrarMonstruo_mongo, editarMonstruo_mongo } = require("../databases/db-mongodb.ts");


// Variables de entorno ------------------------------------------------------------------------------------------------------------
const nombreUsuario = process.env.MYSQL_USER;       // Variables de MySQL 
const nombrePassword = process.env.MYSQL_PASSWORD;

const userMongo = process.env.MONGO_USER;           // Variables de Mongo
const userPassword = process.env.MONGO_PASSWORD;

// Conexiones ----------------------------------------------------------------------------------------------------------------------
async function conexionMongo() {

    await mongoose.connect(`mongodb+srv://${userMongo}:${userPassword}@cluster0.fgumghx.mongodb.net/Monstruos`)
        .then(console.log('Conexión con MongoDB establecida con éxito!'))
        .catch((err: Error) => console.log('Se ha producido un error en el intento de conexión: ', err))
}
conexionMongo();


// Lecturas de bases de datos JSON y txt -------------------------------------------------------------------------------------------
let datosJSON = JSON.parse(fs.readFileSync('./databases/datos.json', 'utf8'));
let datosTxt = fs.readFileSync(`./databases/datos.txt`, `utf8`).split(`\n`).filter((line: string) => line.trim());


// Métodos auxiliares --------------------------------------------------------------------------------------------------------------
const limpiar = async () => { console.clear() } // Método para limpiar terminal

const atributo = (atr: string) => { // Control de datos para atributos
    let puntuacion = Number(prompt(`Indroduce su ${atr} (1-99): `))
    while (puntuacion > 99 || puntuacion < 1 || isNaN(puntuacion) == true) {
        puntuacion = Number(prompt(`Indroduce puntuación válida (1-99): `))
    }
    return puntuacion
}
const eleccion = (conTxt: boolean): Number => { // Elecciones de formatos
    limpiar()

    if (conTxt) {

        console.log(`
        ╔═══════════════╗
            1. JSON
            2. TXT
            3. MYSQL
            4. MongoDB
        ╚═══════════════╝
            `);

        let formatoIntroduccionDeDatos = Number(prompt(`Formato: `));

        while (formatoIntroduccionDeDatos < 1 || formatoIntroduccionDeDatos > 4 || isNaN(formatoIntroduccionDeDatos) == true) {
            formatoIntroduccionDeDatos = Number(prompt(`Selecciona formato válido a guardar: `))
        }
        return formatoIntroduccionDeDatos;
    } else {
        console.log(`
        ╔═══════════════╗
            1. JSON
            2. MYSQL
        ╚═══════════════╝
            `);

        let formatoIntroduccionDeDatos = Number(prompt(`Formato: `));

        while (formatoIntroduccionDeDatos < 1 || formatoIntroduccionDeDatos > 3 || isNaN(formatoIntroduccionDeDatos) == true) {
            formatoIntroduccionDeDatos = Number(prompt(`Selecciona formato válido a guardar: `))
        }
        return formatoIntroduccionDeDatos;
    }
}
const salida = async (numero: number, tiempo: number) => {
    setTimeout(() => {
        limpiar()
        console.log(`Saliendo del programa en...`)
        console.log(`
        =======
        == ${numero} ==
        =======`)
    }, tiempo)
}


// MÉTODOS PRINCIPALES--------------------------------------------------------------------------------------------------------------
const addMonstruo = async () => { // Añadir nuevo monstruo

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

    const tipo = prompt(`Introduce el tipo de ${nombre}: `).toUpperCase()
    let fuerza = atributo(`fuerza`);
    let vida = atributo(`vida`);
    let defensa = atributo(`defensa`);

    let nuevoMostruo = new Monstruo(nombre, tipo, fuerza, vida, defensa);

    switch (eleccion(true)) {
        case 1: {
            // Paso de datos a la base de datos JSON
            await datosJSON.push(nuevoMostruo);
            await fs.writeFileSync(`./databases/datos.json`, JSON.stringify(datosJSON, null, 2));

            limpiar()

            console.log(`${nuevoMostruo.nombre} añadido a la DB en JSON`)
        } break;
        case 2: {
            const nuevoMonstruoFormateadoTxt = [
                `Monstruo: ` + nuevoMostruo.nombre,
                `\ntipo: ` + nuevoMostruo.tipo,
                `\nFuerza: ` + nuevoMostruo.fuerza,
                `\nVida: ` + nuevoMostruo.vida,
                `\nDefensa: ` + nuevoMostruo.defensa,
                `\n-------------------------------------------`
            ]

            // Paso de datos a la base de datos txt
            await datosTxt.push(nuevoMonstruoFormateadoTxt.join(''));
            fs.writeFileSync(`./databases/datos.txt`, datosTxt.join(`\n`));

            limpiar()

            console.log(`${nuevoMostruo.nombre} añadido a la DB en txt`)
        } case 3: {
            await addMonstruo_sql_db(nombre, tipo, fuerza, vida, defensa, nombreUsuario, nombrePassword)
        } break;
        case 4: {

            await addMonstruo_mongo(nombre, tipo, fuerza, vida, defensa)
        } break;
    }

}

const editarMonstruo = async () => { // Editar monstruo

    limpiar()

    switch (eleccion(true)) {
        case 1: {
            console.log(`MONSTRUOS`)

            await datosJSON.forEach((Monstruo: { nombre: string; }, index: number) => {
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
           Atributos de ${elegido.nombre}
           1. nombre                     
           2. tipo                       
           3. fuerza                     
           4. vida                       
           5. defensa                    
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
        } break;
        case 4: {
            await listarMonstruo_mongo(false)
            const eleccion = prompt('Selecciona monstruo a editar: ');
            console.log(`
        ╔═════════════════════════════════╗
           Atributos de ${eleccion.nombre}
           1. nombre                     
           2. tipo                       
           3. fuerza                     
           4. vida                       
           5. defensa                    
        ╚═════════════════════════════════╝
        `)
            let atributo = Number(prompt('Selecciona atributo a editar (por su orden): '));
            while (atributo < 1 || atributo > 5 || isNaN(atributo) == true) {
                atributo = Number(prompt(`Selecciona atributo válido a editar: `))
            }
            const datoEditado = prompt('Selecciona nuevo valor: ')
            await editarMonstruo_mongo(eleccion, atributo, datoEditado);
        } break;
    }
}

const listarMonstruos = async () => { // Listar monstruos

    switch (eleccion(true)) {
        case 1: {
            limpiar()
            console.log(`
            ╔═════════════════════════════════╗
               1. Nombre                     
               2. Tipo                       
               3. Fuerza                     
               4. Vida                       
               5. Defensa                    
               6. Todos los datos                        
            ╚═════════════════════════════════╝
            `)

            let seleccionAtributo = Number(prompt("Seleciona atributo por el que listar: "));

            while (seleccionAtributo < 1 || seleccionAtributo > 6 || isNaN(seleccionAtributo) == true) {
                seleccionAtributo = Number(prompt(`Selecciona atributo válido por el que listar: `))
            }

            limpiar()

            switch (seleccionAtributo) {
                case 1:
                    await datosJSON.forEach((Monstruo: { nombre: string; }, index: number) => {
                        console.log(`${index + 1}. ${Monstruo.nombre}`)
                    }); break;
                case 2:
                    await datosJSON.forEach((Monstruo: { nombre: string, tipo: string }, index: number) => {
                        console.log(`${index + 1}. EL tipo de ${Monstruo.nombre} es ${Monstruo.tipo}`)
                    }); break;
                case 3:
                    await datosJSON.forEach((Monstruo: { nombre: string, fuerza: number }, index: number) => {
                        console.log(`${index + 1}. Fuerza de ${Monstruo.nombre}: ${Monstruo.fuerza}`)
                    }); break;
                case 4:
                    await datosJSON.forEach((Monstruo: { nombre: string, vida: number }, index: number) => {
                        console.log(`${index + 1}. Vida de ${Monstruo.nombre}: ${Monstruo.vida}`)
                    }); break;
                case 5:
                    await datosJSON.forEach((Monstruo: { nombre: string, defensa: number }, index: number) => {
                        console.log(`${index + 1}. Defensa de ${Monstruo.nombre}: ${Monstruo.defensa}`)
                    }); break;
                case 6:
                    await datosJSON.forEach((Monstruo: { nombre: string, tipo: string, fuerza: number, vida: number, defensa: number }, index: number) => {
                        console.log(`\n${index + 1}. ${Monstruo.nombre} tiene es tipo ${Monstruo.tipo}.\nSus atributos son ${Monstruo.fuerza} de fuerza, ${Monstruo.vida} de vida y ${Monstruo.defensa} de defensa`)
                    }); break;
            }
        } break;
        case 2: {
            limpiar();

            console.log(`HÉROES`)
            console.log(datosTxt.join(`\n`));
        } break;
        case 3: {
            limpiar();
            await listarMonstruo_sql_db(true);
        } break;
        case 4: {
            limpiar()
            await listarMonstruo_mongo(true)
        } break;
    }
}

const borrarMonstruo = async () => { // Borrar monstruo

    switch (eleccion(true)) {
        case 1: {
            if (datosJSON.length > 0) {

                console.log(`HÉROES`)

                await datosJSON.forEach((Monstruo: { nombre: string }, index: number) => {
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

                await fs.writeFileSync(`./databases/datos.json`, JSON.stringify(datosJSON, null, 2));

                console.log(`${nombreDelEliminado} ha sido eliminado`)

            } else {
                console.log(`No hay héroes en la lista`)
            }
        } break;
        case 2: {
            const nombre_a_eliminar = prompt('Introduce el nombre del monstruo a eliminar: ').toUpperCase();
            await borrarMonstruo_sql_db(nombreUsuario, nombrePassword, nombre_a_eliminar)
        } case 4: {
            limpiar();
            await listarMonstruo_mongo(false)

            const eleccion_para_borrar = prompt('Selecciona un monstruo de la lista (por nombre): ').toUpperCase().trim();
            await borrarMonstruo_mongo(eleccion_para_borrar);
        } break;
    }

}

const salir = async () => { // Salir del programa

    limpiar()

    salida(3, 1000);
    salida(2, 2000);
    salida(1, 3000);

    setTimeout(() => {
        limpiar()
        process.exit();
    }, 4000)
}


// Exportación de métodos ----------------------------------------------------------------------------------------------------------------
module.exports = { addMonstruo, editarMonstruo, listarMonstruos, borrarMonstruo, salir, limpiar }