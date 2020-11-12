import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

@Component({
  selector: 'app-cancelar-turno',
  templateUrl: './cancelar-turno.component.html',
  styleUrls: ['./cancelar-turno.component.scss']
})
export class CancelarTurnoComponent implements OnInit {
@Input() turno;
@Output() emitCancelar: EventEmitter<any> = new EventEmitter();
resenia="";
  constructor(private context:AngularFireDatabase) { }

  ngOnInit(): void {
  }

  CargarTurnoRechazado() {
    this.context.list('turnos').update(this.turno.idTurno, {
      estado: "CANCELADO",
      razonCancelacion: this.resenia
    });

    this.CancelarTurnoRechazado();

  }

  CancelarTurnoRechazado(){
    this.emitCancelar.emit(false);
  }


}
