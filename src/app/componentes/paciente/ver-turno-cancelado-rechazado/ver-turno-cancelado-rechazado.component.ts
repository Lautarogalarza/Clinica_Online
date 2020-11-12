import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-ver-turno-cancelado-rechazado',
  templateUrl: './ver-turno-cancelado-rechazado.component.html',
  styleUrls: ['./ver-turno-cancelado-rechazado.component.scss']
})
export class VerTurnoCanceladoRechazadoComponent implements OnInit {
  @Input() turno;
  @Output() emitCancelar: EventEmitter<any> = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }

  CancelarTurnoRechazado(){
    this.emitCancelar.emit(false);
  }


}
