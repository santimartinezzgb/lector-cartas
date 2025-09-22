const mysql = require('mysql2/promise');
const prompt = require('prompt-sync')();
require('dotenv').config()

const nombreUsuario = process.env.MYSQL_USER;
const nombrePassword = process.env.MYSQL_PASSWORD;
console.clear()
const nombreMonstruo = prompt('Introduce nombre del monstruo: ');
const tipoMonstruo = prompt('Introduce tipo del monstruo: ');
const fuerzaMonstruo = Number(prompt('Introduce fuerza del monstruo: '));
const vidaMonstruo = Number(prompt('Introduce vida del monstruo: '));
const defensaMonstruo = Number(prompt('Introduce defensa del monstruo: '));

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
            user: nombreUsuario,
            password: nombrePassword,
            database: 'Monstruos'
        });


        await connection.execute(
            `INSERT INTO ${nom_tabla} (nombre, tipo, fuerza, vida, defensa) VALUES (?, ?, ?, ?, ?)`,
            [nombreMonstruo, tipoMonstruo, fuerzaMonstruo, vidaMonstruo, defensaMonstruo]
        );

        // Cierre de la conexión con mysql
        await connection.end();
        console.log("Carta agregada correctamente a la base de datos.");

    } catch (error) {
        console.error('Error al conectar a MySQL:', error);

    } finally {
        console.log("Proceso finalizado");
    }
}

const conectar = () => {

    return new Promise((resolve) => {
        console.log("Agregando carta a la base de datos ...: ", {
            host: "localhost",
            user: nombreUsuario,
            database: "Monstruo"
        });

        // A los 2 segundos, ejecuta la función con resolve
        setTimeout(() => {
            console.clear();
            resolve(conectarYConsultar(nombre_tabla, nombreUsuario, nombrePassword));
        }, 3000)
    })
}

conectar()