// Importaciones
const prompt = require("prompt-sync")()
const { addHeroe, editarHeroe, listarHeroes, borrarHeroe, salir } = require("./funciones.js");

// Menú
while (true) {

    console.log(`MENÚ
        1. Añadir héroe
        2. Modificar héroe
        3. Listar
        4. Eliminar héroe
        5. Salir`
    )

    const seleccion = Number(prompt("Selecciona una opción del menú: "));
    console.clear()

    switch (seleccion) {
        case 1: { addHeroe() } break;
        case 2: { editarHeroe() } break;
        case 3: { listarHeroes() } break;
        case 4: { borrarHeroe() } break;
        case 5: { salir() } break;
    }


}