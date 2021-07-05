export class Usuarios{
    _id?: number;
    nombre: string;
    apellido: string;
    edad: number;
    sexo: string;

    constructor(nombre: string, apellido: string, edad: number, sexo: string){
        this.nombre = nombre;
        this.apellido = apellido;
        this.edad = edad;
        this.sexo = sexo;
    }
}