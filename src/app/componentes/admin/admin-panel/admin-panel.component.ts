import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.scss']
})
export class AdminPanelComponent implements OnInit {

  habilitadoCargarProf: boolean = false;
  habilitadoCargarAdmin: boolean = false;
  habilitadoAgregarEspecialidad:boolean=false;

  constructor() { }

  ngOnInit(): void {
  }

  CargarProf() {

    this.habilitadoCargarProf = true;
    this.habilitadoCargarAdmin = false;
    this.habilitadoAgregarEspecialidad=false;

  }

  CargarAgregar(){
    this.habilitadoAgregarEspecialidad=true;
    this.habilitadoCargarProf = false;
    this.habilitadoCargarAdmin = false;
  }

  CargarAdmin() {
    this.habilitadoCargarAdmin = true;
    this.habilitadoCargarProf = false;
    this.habilitadoAgregarEspecialidad=false;
  }

  CancelarCargarAdmin(boolean) {
    this.habilitadoCargarAdmin = boolean;
  }

  CancelarAgregarEspecialidad(boolean) {
    this.habilitadoAgregarEspecialidad = boolean;
  }


  CancelarHabilitarProf(boolean) {
    this.habilitadoCargarProf = boolean;
  }

}
