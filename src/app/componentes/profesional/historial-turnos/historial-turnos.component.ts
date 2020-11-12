import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/servicios/auth.service';

@Component({
  selector: 'app-historial-turnos',
  templateUrl: './historial-turnos.component.html',
  styleUrls: ['./historial-turnos.component.scss']
})
export class HistorialTurnosComponent implements OnInit {
  @Output() emitCancelar: EventEmitter<any> = new EventEmitter();
  usuarios: Observable<any[]>;
  listadoUsuarios = [];
  listaDos = [];
  cancelarTurnoHabilitado: boolean = false;
  rechazoCancelacion: boolean = true;
  turno;
  verCanceladoTurnoHabilitado:boolean = false;
  verAceptadoTurnoHabilitado:boolean = false;

  constructor(private context: AngularFireDatabase, private authService: AuthService) { }

  ngOnInit(): void {

    this.usuarios = this.context.list('turnos').valueChanges();
    this.usuarios.subscribe(usuarios => {
      this.listadoUsuarios = usuarios;
      this.TraerTurnos();
    }, error => console.log(error));
  }


  TraerTurnos() {
    this.authService.GetCurrentUser().then(response => {
      this.listadoUsuarios = this.listadoUsuarios.filter(p => p.estado != "PENDIENTE"
        && p.idProfesional == response.uid);
    });
  }




  Cancelar() {
    this.emitCancelar.emit(false);
  }



  AceptarTurno(turno) {
    this.context.list('turnos').update(turno.idTurno, {
      estado: "ACEPTADO"
    });
  }

  RechazarTurno(turno) {
    this.cancelarTurnoHabilitado = true;
    this.rechazoCancelacion = false;
    this.turno=turno
  }

  TurnoRechazadoCancelar(boolean){
    this.verCanceladoTurnoHabilitado = boolean;
    this.verAceptadoTurnoHabilitado = boolean;
    this.rechazoCancelacion = true;
  }

  VerTurnoAceptado(turno){
    this.verAceptadoTurnoHabilitado = true;
    this.rechazoCancelacion = false;
    this.turno=turno
  }

  VerTurnoCanceladoRechazado(turno){
    this.verCanceladoTurnoHabilitado = true;
    this.rechazoCancelacion = false;
    this.turno=turno
  }
}
