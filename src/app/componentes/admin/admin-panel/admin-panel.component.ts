import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.scss']
})
export class AdminPanelComponent implements OnInit {

  habilitadoCargarProf: boolean = false;
  habilitadoCargarAdmin: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  CargarProf() {

    this.habilitadoCargarProf = true;
    this.habilitadoCargarAdmin = false;

  }

  CargarAdmin() {
    this.habilitadoCargarAdmin = true;
    this.habilitadoCargarProf = false;
  }

  CancelarCargarAdmin(boolean) {
    this.habilitadoCargarAdmin = boolean;
  }

  CancelarHabilitarProf(boolean) {
    this.habilitadoCargarProf = boolean;
  }

}
