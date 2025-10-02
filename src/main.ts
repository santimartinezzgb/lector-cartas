// Importaciones
const prompt = require("prompt-sync")();
const { addMonstruo, editarMonstruo, listarMonstruos, borrarMonstruo, salir, limpiar } = require("./funciones.ts");
let inicio = true;

limpiar()

async function main() {

    // Menú interactivo
    while (inicio == true) {

        console.log(`
  ╔═════════════════════════╗
       MENÚ DE MONSTRUOS      
  ╚═════════════════════════╝
  ┌─────────────────────────┐
  1. Añadir monstruo      
  2. Modificar monstruo   
  3. Listar monstruo      
  4. Eliminar monstruo    
  5. Salir                
  └─────────────────────────┘
  `);

        const seleccion = Number(prompt('Selecciona una opción: '));
        limpiar()

        switch (seleccion) { // Según seleccion entra en el método correspondiente
            case 1: {
                await addMonstruo()
            } break;
            case 2: {
                await editarMonstruo()
            } break;
            case 3: {
                await listarMonstruos();
            } break;
            case 4: {
                await borrarMonstruo()
            } break;
            case 5: {
                await salir();
                inicio = false;
            } break;
            default: {
                console.log(`
                ╔══════════════════════════════════╗
                    Selecciona una opción válida   
                ╚══════════════════════════════════╝
                `);
            }
        }


    }


}
main()