const mysql = require('mysql2/promise');
const { styleText } = require('util');


const addMonstruo_sql_db = (a, b, c, d, e, A, B) => {
    let nombre_tabla = "cartas";

    console.clear();

    async function conectarYConsultar(nom_tabla) {

        try {

            const connection = await mysql.createConnection({
                host: 'localhost',
                user: A,
                password: B,
                database: 'Monstruos'
            });


            const [rows] = await connection.execute(
                `INSERT INTO ${nom_tabla} (nombre, tipo, fuerza, vida, defensa) VALUES (?, ?, ?, ?, ?)`,
                [a, b, c, d, e]
            );

            await connection.end();

        } catch (error) {
            console.error('Error al conectar a MySQL:', error);

        }
    }

    const conectar = () => {

        return new Promise((resolve) => {
            // A los 2 segundos, ejecuta la función con resolve
            setTimeout(() => {
                resolve(conectarYConsultar(nombre_tabla));
            }, 3000)
        })
    }

    conectar()
}

const listarMonstruo_sql_db = (a, b) => {

    console.clear()
    let nombre_tabla = "cartas";

    async function conectarYConsultar(nom_tabla) {

        try {

            const connection = await mysql.createConnection({
                host: 'localhost',
                user: a,
                password: b,
                database: 'Monstruos'
            });

            const [rows] = await connection.execute(`select * from ${nom_tabla}`);
            await connection.end();

            rows.forEach((c, index) => {
                console.log(`
                    | ${index + 1}. ${c.nombre} 
                    | Tipo: ${c.tipo} 
                    | Fuerza: ${c.fuerza} 
                    | Vida: ${c.vida} 
                    | Defensa: ${c.defensa}
                    |________________________________________`)
            })

        } catch (error) {
            console.error('Error al conectar a MySQL:', error);

        }
    }

    conectarYConsultar(nombre_tabla)
}

module.exports = { addMonstruo_sql_db, listarMonstruo_sql_db }


