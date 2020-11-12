import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { Turno } from 'src/app/clases/turno';
import { AuthService } from 'src/app/servicios/auth.service';

@Component({
  selector: 'app-gestionar-turnos',
  templateUrl: './gestionar-turnos.component.html',
  styleUrls: ['./gestionar-turnos.component.scss']
})
export class GestionarTurnosComponent implements OnInit {
  @Output() emitCancelar: EventEmitter<any> = new EventEmitter();
  usuarios: Observable<any[]>;
  listadoUsuarios = [];
  listaDos = [];
  cancelarTurnoHabilitado: boolean = false;
  rechazoCancelacion: boolean = true;
  turno;

  constructor(private context: AngularFireDatabase, private authService: AuthService) { }

  ngOnInit(): void {

    this.usuarios = this.context.list('turnos').valueChanges();
    this.usuarios.subscribe(usuarios => {
      this.listadoUsuarios = usuarios;
      this.Prueba();
      this.TraerTurnos();
    }, error => console.log(error));
  }


  TraerTurnos() {
    this.authService.GetCurrentUser().then(response => {
      this.listadoUsuarios = this.listadoUsuarios.filter(p => p.estado == "PENDIENTE"
        && p.idProfesional == response.uid);
    });
  }

  Prueba() {
    for (let index = 0; index < 50; index++) {
      this.listaDos.push(this.listadoUsuarios[0]);

    }
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
    this.cancelarTurnoHabilitado = boolean;
    this.rechazoCancelacion = true;
  }
}
