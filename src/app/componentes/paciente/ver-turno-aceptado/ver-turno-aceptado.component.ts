import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

@Component({
  selector: 'app-ver-turno-aceptado',
  templateUrl: './ver-turno-aceptado.component.html',
  styleUrls: ['./ver-turno-aceptado.component.scss']
})
export class VerTurnoAceptadoComponent implements OnInit {
  @Input() turno;
  @Output() emitCancelar: EventEmitter<any> = new EventEmitter();
  habilitado: boolean = false;
  resenia: string = "";
  encuestaResultado = "Muy satisfactorio";
  botonesHabilitados:boolean=true;
  EncuestaHabilitada:boolean=false;

  
  constructor(private context:AngularFireDatabase) { }

  ngOnInit(): void {
  }

  CancelarTurnoRechazado(){
    this.emitCancelar.emit(false);
  }

  TurnoRechazadoCancelar(boolean){
    this.EncuestaHabilitada = boolean;
    this.botonesHabilitados = true;
  }
 

  AceptarEncuesta(){
    this.EncuestaHabilitada=true;
    this.botonesHabilitados = false;
    }
}
