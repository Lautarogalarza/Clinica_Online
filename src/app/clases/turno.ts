export class Turno {
    estado: string;
    solicitudFecha: string;
    solicitudHora: string;
    area: string;
    encuestaProfesional: string;
    encuestaPaciente: string;
    comentarioProfesional: string;
    comentarioPaciente: string;
    idProfesional: string;
    paciente:string;
    idPaciente:string;
    profesionalCorreo:string;

    constructor(
        estado: string,
        solicitudFecha: string,
        solicitudHora: string,
        area: string,
        encuestaProfesional: string,
        encuestaPaciente: string,
        comentarioProfesional: string,
        comentarioPaciente: string,
        idProfesional: string,
        paciente:string,
        idPaciente:string,
        profesionalCorreo
    ) {
        this.estado = estado;
        this.solicitudFecha = solicitudFecha;
        this.solicitudHora = solicitudHora;
        this.area = area;
        this.encuestaProfesional = encuestaProfesional;
        this.encuestaPaciente = encuestaPaciente;
        this.comentarioProfesional = comentarioProfesional;
        this.comentarioPaciente = comentarioPaciente;
        this.idProfesional = idProfesional
        this.paciente= paciente;
        this.idPaciente= idPaciente;
        this.profesionalCorreo= profesionalCorreo;
    }

}
