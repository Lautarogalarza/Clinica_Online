import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-atender-paciente',
  templateUrl: './atender-paciente.component.html',
  styleUrls: ['./atender-paciente.component.scss']
})
export class AtenderPacienteComponent implements OnInit {
  @Output() emitCancelar: EventEmitter<any> = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }

  Cancelar() {

    this.emitCancelar.emit(false);
  }



}
