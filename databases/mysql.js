const mysql = require('mysql2/promise');
require('dotenv').config()

const nombreUsuario = process.env.MYSQL_USER;
const nombrePassword = process.env.MYSQL_PASSWORD;

const globalMYSQL = (a, b, c, d, e, A, B) => {
    let nombre_tabla = "cartas";
    const tablas = ['cartas'];


    console.log('TABLAS DE LA BASE DE DATOS MONSTRUOS: ');
    tablas.forEach((tabla, index) => {
        console.log((index + 1) + ". " + tabla);
    });


    console.clear();

    async function conectarYConsultar(nom_tabla, _user, _pwd) {

        try {// Intenta compilar el código siguiente

            // Conectar de forma asíncrona con mysql
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

            // Cierre de la conexión con mysql
            await connection.end();

        } catch (error) {
            console.error('Error al conectar a MySQL:', error);

        }
    }

    const conectar = () => {

        return new Promise((resolve) => {
            // A los 2 segundos, ejecuta la función con resolve
            setTimeout(() => {
                resolve(conectarYConsultar(nombre_tabla, nombreUsuario, nombrePassword));
            }, 3000)
        })
    }

    conectar()
}

module.exports = { globalMYSQL }


