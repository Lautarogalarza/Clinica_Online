import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';


@Component({
  selector: 'app-rechazar-turno',
  templateUrl: './rechazar-turno.component.html',
  styleUrls: ['./rechazar-turno.component.scss']
})
export class RechazarTurnoComponent implements OnInit {
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
