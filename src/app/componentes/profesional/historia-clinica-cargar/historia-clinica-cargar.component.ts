import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { TurnosService } from 'src/app/servicios/turnos.service';
import { Location } from '@angular/common';
@Component({
  selector: 'app-historia-clinica-cargar',
  templateUrl: './historia-clinica-cargar.component.html',
  styleUrls: ['./historia-clinica-cargar.component.scss']
})
export class HistoriaClinicaCargarComponent implements OnInit {

  
  turno;
  datosPaciente;
  datosExtra = [];
  datosExtraPaciente;
  dato: string;
  datoValor: string;
  resenia: string = "";
  peso;
  encuestaResultado = "Muy satisfactorio";
  estatura;
  contador = 0;
  presion;
  edad;
  temperatura;
  habilitado: boolean = false;
  botonesHabilitados:boolean=true;
  EncuestaHabilitada:boolean=false;
  mensaje;

  constructor(private turnoService: TurnosService, private location: Location, private context: AngularFireDatabase) { }

  ngOnInit(): void {

    this.turno = this.turnoService.turno;
    console.log(this.turno);
  }


  OnItemChange(event) {
    this.encuestaResultado = event.target.value;
  }


  Cerrar() {
    this.location.back();
  }


  CerrarEncuesta() {
    this.habilitado = false;
  }

  CargarMensaje(mensaje: string) {

    this.mensaje = mensaje;

    setTimeout(() => {
      this.mensaje = null;
    }, 4000);

  }



  AgregarEspecialidades() {

    if (this.contador < 3) {
      this.datosExtra[this.dato] = this.datoValor;
      console.log(this.datosExtra);
      this.contador++
    }
    else {
      this.CargarMensaje('solo podes agregar 3')
    }

    this.dato = null;
    this.datoValor = null;
  }

  GuardarTurnoCompleto() {

    this.resenia;
    this.encuestaResultado;
    this.context.list('turnos').update(this.turno.idTurno, {
      estado: "ATENDIDO",
      encuestaProfesional: this.encuestaResultado,
      comentarioProfesional: this.resenia,
      datosPaciente: this.datosPaciente
    });
  
  }

  GuardarDatos() {

    if (this.peso != null && this.estatura != null && this.presion != null && this.edad != null && this.temperatura != null) {

      let datosExtra;
      let datoExtraAux;

      for (const [key, value] of Object.entries(this.datosExtra)) {
        datosExtra = {
          ...datosExtra, [key]: value
        }
      }

      datosExtra == undefined ? datoExtraAux = "" : datoExtraAux = datosExtra

      this.datosPaciente = {
        Peso: this.peso,
        Estatura: this.estatura,
        Presion: this.presion,
        Edad: this.edad,
        TemperaturaCorporal: this.temperatura,
        datosExtra: datoExtraAux
      }

      this.EncuestaHabilitada = true;
      this.botonesHabilitados = false

    }
    else {
      this.CargarMensaje("Faltan datos");
    }

  }


  BorrarEspecialidades(especialidad: string) {
    let index = this.datosPaciente.indexOf(especialidad)
    this.datosPaciente.splice(index, 1)
  }

  TurnoRechazadoCancelar(boolean){
    this.EncuestaHabilitada = boolean;
    this.botonesHabilitados = true;
  }
 

}
