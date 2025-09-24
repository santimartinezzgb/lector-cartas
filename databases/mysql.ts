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
const addMonstruo_sql_db = (
    nombre: string,
    tipo: string,
    fuerza: string,
    vida: string,
    defensa: string,
    usuarioMYSQL: string,
    passwordMYSQL: string
) => {
    let nombre_tabla = "cartas";
    console.clear()
    console.log('Monstruo añadido a la DB en MySQL')

    async function conectarYConsultar(nom_tabla: string) {

        try {

            const connection = await mysql.createConnection({
                host: 'localhost',
                user: usuarioMYSQL,
                password: passwordMYSQL,
                database: 'Monstruos'
            });


            const [rows] = await connection.execute(
                `INSERT INTO ${nom_tabla} (nombre, tipo, fuerza, vida, defensa) VALUES (?, ?, ?, ?, ?)`,
                [nombre, tipo, fuerza, vida, defensa]
            );

            await connection.end();

        } catch (error) {
            console.error('Error al conectar a MySQL:', error);

        }
    }

    const conectar = () => {

        return new Promise((resolve) => {
            resolve(conectarYConsultar(nombre_tabla));

        })
    }

    conectar()
}

// Método que lista los monstruos de la base de datos de MySQL workbench
const listarMonstruo_sql_db = async (usuarioMYSQL: string, passwordMYSQL: string, bool: boolean) => {

    console.clear()
    console.log('=========Lista de monstruos en MySQL=========');
    try {

        const connection = await mysql.createConnection({
            host: 'localhost',
            user: usuarioMYSQL,
            password: passwordMYSQL,
            database: 'Monstruos'
        });

        const [rows] = await connection.execute(`select * from cartas`);
        await connection.end();

        if (bool == true) {
            rows.forEach((Monstruo: Monstruo, index: string) => {
                console.log(`
                    | ${index + 1}. ${Monstruo.nombre} 
                    | Tipo: ${Monstruo.tipo} 
                    |   Fuerza: ${Monstruo.fuerza} 
                    |   Vida: ${Monstruo.vida} 
                    |   Defensa: ${Monstruo.defensa}
                    |________________________________________`);
            });
        } else {
            rows.forEach((Monstruo: Monstruo, index: string) => {
                console.log(`
                    | ${index + 1}. ${Monstruo.nombre}
                    |________________________________________`);
            });
        }

        return rows as Monstruo[];

    } catch (error) {
        console.error('Error al conectar a MySQL:', error);
    }

}

// Método que borra un monstruo de la base de datos de MySQL workbench
const borrarMonstruo_sql_db = (usuarioMYSQL: string, passwordMYSQL: string, nombre_a_eliminar: string) => {

    console.clear()
    let nombre_tabla = "cartas";
    console.clear()
    console.log(`${nombre_a_eliminar} eliminado de la DB en MySQL`);

    async function conectarYConsultar(nom_tabla: string) {

        try {
            const connection = await mysql.createConnection({
                host: 'localhost',
                user: usuarioMYSQL,
                password: passwordMYSQL,
                database: 'Monstruos'
            });

            await connection.execute(`delete from ${nom_tabla} where nombre="${nombre_a_eliminar}"`);
            await connection.end();

        } catch (error) {
            console.error('Error al conectar a MySQL:', error);
        }
    }

    (conectarYConsultar(nombre_tabla));

}

module.exports = { addMonstruo_sql_db, listarMonstruo_sql_db, borrarMonstruo_sql_db }