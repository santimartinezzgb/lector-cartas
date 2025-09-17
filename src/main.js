// Importaciones
const prompt = require("prompt-sync")()
const { addMonstruo, editarMonstruo, listarMonstruos, borrarMonstruo, salir, limpiar } = require("./funciones.js");
let inicio = true;
const { conexionMongo } = require('./api-mongo.js')

limpiar()
conexionMongo()
// Menú interactivo
while (inicio == true) {

    console.log(`
  ╔════════════════════════════╗
  ║     MENÚ DE MONSTRUOS      ║
  ╚════════════════════════════╝
  ┌─────────────────────────────┐
  │  1. ➕ Añadir monstruo      │
  │  2. ✏️  Modificar monstruo   │
  │  3. 📜 Listar monstruo      │
  │  4. 🗑️  Eliminar monstruo    │
  │  5. 🚪 Salir                │
  └─────────────────────────────┘
`);

    const seleccion = Number(prompt("Selecciona una opción del menú: "));
    limpiar()

    switch (seleccion) { // Según seleccion entra en el método correspondiente
        case 1: { addMonstruo() } break;
        case 2: { editarMonstruo() } break;
        case 3: { listarMonstruos() } break;
        case 4: { borrarMonstruo() } break;
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