import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-profesional',
  templateUrl: './home-profesional.component.html',
  styleUrls: ['./home-profesional.component.scss']
})
export class HomeProfesionalComponent implements OnInit {

  habilitadoCargarHoras: boolean = false;
  habilitadoCargarTurnos: boolean = false;
  habilitadoCargarAtender: boolean = false;

  constructor() { }

  ngOnInit(): void {


  }

  CargarHoras() {


    this.habilitadoCargarHoras = true;
    this.habilitadoCargarTurnos = false;
    this.habilitadoCargarAtender = false;

  }

  CargarTurnos() {
    this.habilitadoCargarTurnos = true;
    this.habilitadoCargarHoras = false;
    this.habilitadoCargarAtender = false;
  }

  CargarAtender() {
  
    this.habilitadoCargarAtender = true;
    this.habilitadoCargarTurnos = false;
    this.habilitadoCargarHoras = false;
  }

  CancelarTurnos(boolean) {
    this.habilitadoCargarTurnos = boolean;
  }

  CancelarHoras(boolean) {
    this.habilitadoCargarHoras = boolean;
  }

  CancelarAtender(boolean) {
    this.habilitadoCargarAtender = boolean;
  }

}
