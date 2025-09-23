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

    console.clear();

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
const listarMonstruo_sql_db = (usuarioMYSQL: string, passwordMYSQL: string, bool: boolean) => {

    console.clear()
    console.log('Pulsa 5 para revisar listado')
    let nombre_tabla = "cartas";

    async function conectarYConsultar(nom_tabla: string) {

        try {

            const connection = await mysql.createConnection({
                host: 'localhost',
                user: usuarioMYSQL,
                password: passwordMYSQL,
                database: 'Monstruos'
            });

            const [rows] = await connection.execute(`select * from ${nom_tabla}`);
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

        } catch (error) {
            console.error('Error al conectar a MySQL:', error);
        }
    }

    (conectarYConsultar(nombre_tabla));

}

module.exports = { addMonstruo_sql_db, listarMonstruo_sql_db }