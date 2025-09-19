class Monstruo {
    nombre: string
    tipo: string
    fuerza: number
    vida: number
    defensa: number
    constructor(nombre: string, tipo: string, fuerza: number, vida: number, defensa: number) {
        this.nombre = nombre
        this.tipo = tipo
        this.fuerza = fuerza
        this.vida = vida
        this.defensa = defensa
    }
}

module.exports = Monstruo