// Importaciones
import prompt from "prompt-sync"
import { addHeroe, editarHeroe, borrarHeroe, salir } from "./funciones";

// Menú
while (true) {
    console.log(`MENÚ
        1. Añadir héroe
        2. Modificar héroe
        3. Eliminar héroe
        4. Salir`
    )

    const seleccion = Number(prompt('Selecciona una opción del menú: '));
    console.clear()

    switch (seleccion) {
        case 1: { addHeroe() }
        case 2: { editarHeroe() }
        case 3: { borrarHeroe() }
        case 4: { salir() }
    }


}