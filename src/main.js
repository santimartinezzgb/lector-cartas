// Importaciones
const prompt = require("prompt-sync")()
const { addHeroe, editarHeroe, listarHeroes, borrarHeroe, salir } = require("./funciones.js");
let inicio = true;

/*
Elección antes de entrar en el programa para elegir
la forma de leer y guardar el programa
*/
console.log(`
    1. JSON
    2. .txt`
)
const lector = Number(prompt('Lector por JSON o .txt: '));
const bool = lector == 1 ? true : false;

// Menú
console.clear()
while (inicio == true) {

    console.log(`
  ╔════════════════════════════╗
  ║    🦸 MENÚ DE HÉROES 🦸    ║
  ╚════════════════════════════╝
  ┌─────────────────────────────┐
  │  1. ➕ Añadir héroe         │
  │  2. ✏️ Modificar héroe       │
  │  3. 📜 Listar héroes        │
  │  4. 🗑️ Eliminar héroe        │
  │  5. 🚪 Salir                │
  └─────────────────────────────┘
`);

    const seleccion = Number(prompt("Selecciona una opción del menú: "));
    console.clear()

    switch (seleccion) {
        case 1: { addHeroe(bool) } break;
        case 2: { editarHeroe() } break;
        case 3: { listarHeroes(bool) } break;
        case 4: { borrarHeroe() } break;
        case 5: {
            salir()
            inicio = false
        } break;
        default: {
            console.clear("Selecciona una opción válida")
        }
    }


}