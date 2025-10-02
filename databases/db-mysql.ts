const mysql = require('mysql2/promise');
const { Monstruo } = require('../src/clases.ts')

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

        if (bool == true) {
            rows.forEach((Monstruo: Monstruo) => {
                console.log(`
    | Nombre: ${Monstruo.nombre} 
    | Tipo: ${Monstruo.tipo} 
    |   Fuerza: ${Monstruo.fuerza} 
    |   Vida: ${Monstruo.vida} 
    |   Defensa: ${Monstruo.defensa}
    |`);
            });
        } else {

            if (rows.length == 0) {
                console.log('La lista está vacía');

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
    passwordMYSQL: string,
    nombre_a_eliminar: string) => {


    try {
        const connection = await mysql.createConnection({
            host: 'localhost',
            user: usuarioMYSQL,
            password: passwordMYSQL,
            database: 'Monstruos'
        });

        await connection.execute(`delete from cartas where nombre="${nombre_a_eliminar}"`);
        await connection.end();

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