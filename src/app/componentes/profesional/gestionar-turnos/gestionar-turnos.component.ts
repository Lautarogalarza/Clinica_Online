import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-gestionar-turnos',
  templateUrl: './gestionar-turnos.component.html',
  styleUrls: ['./gestionar-turnos.component.scss']
})
export class GestionarTurnosComponent implements OnInit {
  @Output() emitCancelar: EventEmitter<any> = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }


  Cancelar() {

    this.emitCancelar.emit(false);
  }



}
