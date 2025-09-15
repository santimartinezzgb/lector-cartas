import { Heroe } from "./clases"

export const addHeroe = () => {
    const nombre = prompt("Introduce el nombre del héroe: ")
    const superpoder = prompt(`Introduce el superpoder de ${nombre}`)
    const planeta = prompt(`De que planeta viene ${nombre}`)
    const fuerza = Number(prompt(`Indroduce su fuerza (1-99): `))
    while (isNaN == true || (fuerza > 99 && fuerza < 1)) {
        fuerza = Number(prompt(`Indroduce su fuerza (1-99): `))
    }
    const vida = Number(prompt(`Indroduce su vida (1-99): `))
    while (isNaN == true || (vida > 99 && vida < 1)) {
        vida = Number(prompt(`Indroduce su vida (1-99): `))
    }
    const defensa = Number(prompt(`Indroduce su defensa (1-99): `))
    while (isNaN == true || (defensa > 99 && defensa < 1)) {
        defensa = Number(prompt(`Indroduce su defensa (1-99): `))
    }
    const nuevoHeroe = new Heroe(nombre, superpoder, planeta, fuerza, vida, defensa)
}

export const editarHeroe = () => {

}

export const borrarHeroe = () => {

}


export const salir = () => {
    process.exit()
}