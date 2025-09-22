const mysql = require('mysql2/promise');
const prompt = require('prompt-sync')();
require('dotenv').config()


let nombre_tabla = "cartas";
const tablas = ['cartas'];


console.log('TABLAS DE LA BASE DE DATOS MONSTRUOS: ');
tablas.forEach((tabla, index) => {
    console.log((index + 1) + ". " + tabla);
});

let option = Number(prompt('Selecciona una tabla de la lista (por su orden): '));
while (isNaN(option) === true || option < 1 || option > 16) {
    option = Number(prompt('Selecciona una tabla EXISTENTE de la lista (por su orden): '));
}

const selectOption = (opt) => {
    nombre_tabla = tablas[opt - 1];
}
selectOption(option);

console.clear();

async function conectarYConsultar(nom_tabla, _user, _pwd) {

    try {// Intenta compilar el código siguiente

        // Conectar de forma asíncrona con mysql
        const connection = await mysql.createConnection({
            host: 'localhost',
            user: MYSQL_USER.process.env,
            password: MYSQL_PASSWORD.process.env,
            database: 'Monstruos'
        });

        // Mensaje para comprobar que el programa entró en la base de datos
        console.log('** Conexión a MySQL establecida correctamente **');
        console.log('                                                '); //Separación en terminal

        // Consulta de mysql:
        // En este caso seleccionadas las filas y los
        // tipos de cada atributo de la tabla elegida
        const [rows, fields] = await connection.execute(`select * from ${nom_tabla} `);

        console.log(`Tipos de cada atributo de la tabla ${nom_tabla}:`);
        console.log(fields);

        console.log('                                                '); //Separación en terminal

        console.log(`Elementos de la tabla ${nom_tabla}:`)
        console.log(rows)

        // Cierre de la conexión con mysql
        await connection.end();

    } catch (error) {// Si el try{} dió algún problema, el programa viene hasta catch{} e indica el error
        console.error('Error al conectar a MySQL:', error);

    } finally {// Mensaje final que aparece en cada intento de conexión con mysql
        console.log('** Intendo de conexión realizado **');
    }
}

const conectar = () => {
    // Devuelve una nueva promesa
    return new Promise((resolve) => {
        console.log("Configuración exitosa con: ", {
            host: "localhost",
            user: MYSQL_USER.process.env,
            database: "Monstruo"
        });
        console.log('Contectando base de datos...')

        // A los 2 segundos, compila la función con resolve
        setTimeout(() => {
            console.clear();
            resolve(conectarYConsultar(nombre_tabla, MYSQL_USER.process.env, MYSQL_PASSWORD.process.env));
        }, 3000)
    })
}

conectar()