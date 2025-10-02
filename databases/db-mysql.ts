const mysql = require('mysql2/promise');
const { Monstruo } = require('../src/clases.ts');
const prompt = require('prompt-sync')();

type Monstruo = {
    nombre: string,
    tipo: string,
    fuerza: string,
    vida: string,
    defensa: string
}

// Método que añade un nuevo monstruo a la base de datos de MySQL workbench
const addMonstruo_sql_db = async (
    nombre: string,
    tipo: string,
    fuerza: string,
    vida: string,
    defensa: string,
    usuarioMYSQL: string,
    passwordMYSQL: string) => {

    console.clear()
    console.log('Monstruo añadido a la DB en MySQL')

    try {

        const connection = await mysql.createConnection({
            host: 'localhost',
            user: usuarioMYSQL,
            password: passwordMYSQL,
            database: 'Monstruos'
        });

        const [rows] = await connection.execute(
            `INSERT INTO cartas (nombre, tipo, fuerza, vida, defensa) VALUES (?, ?, ?, ?, ?)`,
            [nombre, tipo, fuerza, vida, defensa]
        );

        await connection.end();

    } catch (error) {
        console.error('Error al conectar a MySQL:', error);

    }
}

// Método que lista los monstruos de la base de datos de MySQL workbench
const listarMonstruo_sql_db = async (
    usuarioMYSQL: any,
    passwordMYSQL: any,
    bool: boolean) => {

    console.clear();

    try {

        const connection = await mysql.createConnection({
            host: '127.0.0.1',
            user: usuarioMYSQL,
            password: passwordMYSQL,
            database: 'Monstruos'
        });

        const [rows] = await connection.execute(`select * from cartas`);
        await connection.end();


        if (rows.length == 0) {
            console.log('La lista está vacía');

        } else {
            if (bool == true) {

                rows.forEach((Monstruo: Monstruo) => {
                    console.log(`Nombre: ${Monstruo.nombre}`);
                    console.log(`Tipo: ${Monstruo.tipo} `)
                    console.log(`Fuerza: ${Monstruo.fuerza}`)
                    console.log(`Vida: ${Monstruo.vida}`)
                    console.log(`Defensa: ${Monstruo.defensa}`);
                });
            } else {
                rows.forEach((Monstruo: Monstruo, index: string) => {
                    console.log(`${index + 1}. ${Monstruo.nombre}`);
                });
            }
        }

        return rows as Monstruo[];

    } catch (error) {
        console.error('Error al conectar a MySQL:', error);
    }

}

// Método que borra un monstruo de la base de datos de MySQL workbench
const borrarMonstruo_sql_db = async (
    usuarioMYSQL: string,
    passwordMYSQL: string) => {


    try {
        const connection = await mysql.createConnection({
            host: 'localhost',
            user: usuarioMYSQL,
            password: passwordMYSQL,
            database: 'Monstruos'
        });

        // Muestra la lista por nombres
        const [rows] = await connection.execute(`select * from cartas`);
        rows.forEach((Monstruo: Monstruo, index: string) => {
            console.log(`${index + 1}. ${Monstruo.nombre}`);
        });

        // Si la lista está vacía, avisa
        if (rows.length == 0) {
            console.log('La lista está vacía');

            // Si no está vacía, da opción de elegir cual eliminar
        } else {
            let eleccion_para_borrar = prompt('Introduce el nombre del monstruo a eliminar: ');

            // Se le añaden los métodos a parte con el símbolo ?, que provoca en el código que
            // en caso de ser null, esos métodos no se ejecutan. Así se evita el error de 
            // objeto posiblemente null
            eleccion_para_borrar?.toUpperCase().trim();

            await connection.execute(`delete from cartas where nombre="${eleccion_para_borrar}"`);
            await connection.end();
        }

    } catch (error) {
        console.error('Error al conectar a MySQL:', error);
    }
}


const editarMonstruo_sql_db = async (
    usuarioMYSQL: string,
    passwordMYSQL: string,
    eleccion: number,
    nuevo_dato: string,
    filtro: string) => {

    console.clear();
    try {
        const connection = await mysql.createConnection({
            host: 'localhost',
            user: usuarioMYSQL,
            password: passwordMYSQL,
            database: 'Monstruos'
        });

        switch (eleccion) {
            case 1: {
                await connection.execute(
                    `UPDATE cartas SET nombre = "${nuevo_dato.toUpperCase()}" WHERE nombre = "${filtro}"`
                );
            } break;
            case 2: {
                await connection.execute(
                    `UPDATE cartas SET tipo = "${nuevo_dato.toUpperCase()}" WHERE nombre = "${filtro}"`
                );
            } break;
            case 3: {
                await connection.execute(
                    `UPDATE cartas SET fuerza = "${nuevo_dato}" WHERE nombre = "${filtro}"`
                );
            } break;
            case 4: {
                await connection.execute(
                    `UPDATE cartas SET vida = "${nuevo_dato}" WHERE nombre = "${filtro}"`
                );
            } break;
            case 5: {
                await connection.execute(
                    `UPDATE cartas SET defensa = "${nuevo_dato}" WHERE nombre = "${filtro}"`
                );
            } break;
        }


        await connection.end();

    } catch (error) {
        console.error('Error al conectar a MySQL:', error);
    }

}


module.exports = { addMonstruo_sql_db, listarMonstruo_sql_db, borrarMonstruo_sql_db, editarMonstruo_sql_db }