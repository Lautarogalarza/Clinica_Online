export class Paciente {

    nombre: string;
    apellido: string;
    correo: string;
    contrasenia: string;
    foto1: any;
    foto2: any;

    constructor(nombre, correo, apellido, contraseña, foto1, foto2) {

        this.nombre = nombre;
        this.correo = correo;
        this.apellido = apellido;
        this.contrasenia = contraseña;
        this.foto1 = foto1;
        this.foto2 = foto2;


    }


}
