// Importaciones
const prompt = require("prompt-sync")()
const { addHeroe, editarHeroe, borrarHeroe, salir } = require("./funciones.js");

// Menú
while (true) {

    console.log(`MENÚ
        1. Añadir héroe
        2. Modificar héroe
        3. Eliminar héroe
        4. Salir`
    )

    const seleccion = Number(prompt("Selecciona una opción del menú: "));
    console.clear()

    switch (seleccion) {
        case 1: { addHeroe() } break;
        case 2: { editarHeroe() } break;
        case 3: { borrarHeroe() } break;
        case 4: { salir() } break;
    }


}