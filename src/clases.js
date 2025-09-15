export class Heroe {
    constructor(nombre, superpoder, planeta, fuerza, vida, defensa) {
        this.nombre = nombre
        this.superpoder = superpoder
        this.planeta = planeta
        this.fuerza = fuerza
        this.vida = vida
        this.defensa = defensa
    }

    saludar() {
        console.log(`Hola mundo, mi nombre es ${this.nombre} y vengo del planeta ${this.planeta}`)
    }
    mostrarAtributos() {
        console.log(`Mis atributos son:
            Fuerza: ${this.fuerza}
            Vida: ${this.vida}
            Defensa: ${this.defensa}`
        )
    }
}