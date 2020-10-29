import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-pedir-turno',
  templateUrl: './pedir-turno.component.html',
  styleUrls: ['./pedir-turno.component.scss']
})
export class PedirTurnoComponent implements OnInit {
  @Output() emitCancelar: EventEmitter<any> = new EventEmitter();
  @Input() profesional;
  fecha;
  hora;
  dias = ["lunes", "martes", "miercoles", "jueves", "viernes", "sabado"]
  diasFiltrados = [];
  auxProf;
  constructor() {

  }

  ngOnInit(): void {
    this.CambiarUser();
  }

  CambiarUser(){
    if (this.auxProf != this.profesional.correo) {
      console.log(this.auxProf);
      this.ValidarDias();
    }
  }

  ValidarDias() {


    if (this.profesional.horas.dias["lunes"]) {
      this.diasFiltrados.push("lunes");
    }
    if (this.profesional.horas.dias["martes"]) {
      this.diasFiltrados.push("martes");
    }
    if (this.profesional.horas.dias["miercoles"]) {
      this.diasFiltrados.push("miercoles");
    }
    if (this.profesional.horas.dias["jueves"]) {
      this.diasFiltrados.push("jueves");
    }
    if (this.profesional.horas.dias["viernes"]) {
      this.diasFiltrados.push("viernes");
    }
    if (this.profesional.horas.dias["sabado"]) {
      this.diasFiltrados.push("sabado");
    }
    console.log(this.diasFiltrados);
    this.auxProf = this.profesional.correo;
    console.log(this.auxProf);

  }

  Cancelar() {
    this.emitCancelar.emit(false);
  }

}
