// Importaciones
const prompt = require("prompt-sync")()
const { addHeroe, editarHeroe, listarHeroes, borrarHeroe, salir, limpiar } = require("./funciones.js");
let inicio = true;
const { conexionMongo } = require('./api-mongo.js')

limpiar()
conexionMongo()
// Menú interactivo
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
    limpiar()

    switch (seleccion) { // Según seleccion entra en el método correspondiente
        case 1: { addHeroe() } break;
        case 2: { editarHeroe() } break;
        case 3: { listarHeroes() } break;
        case 4: { borrarHeroe() } break;
        case 5: { salir(); inicio = false } break;
        default: {
            console.log(`
                ╔══════════════════════════════════╗
 ═════════>     ║   Selecciona una opción válida   ║
                ╚══════════════════════════════════╝
            `)
        }
    }


}