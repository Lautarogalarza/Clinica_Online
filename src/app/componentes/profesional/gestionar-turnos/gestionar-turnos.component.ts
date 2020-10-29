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

    console.log(this.listaDos);
  }


  Cancelar() {

    this.emitCancelar.emit(false);
  }

  CargarTurnosBD() {

    let fecha = "2020-10-29";
    let hora = "08:00";
    let pacienteId = "5GAnWpwbmQaDiTx3R05WlShzqZ52";
    let especialidad = "Bromatologia";

    let turno = new Turno(
      "PENDIENTE",
      fecha,
      hora,
      especialidad,
      "",
      "",
      "",
      "",
      "TYnPXppKVdMnoQ8cyZZQg8MIu8o1",
      "paciente@paciente.com",
      pacienteId,
      "profesional@profesional.com"

    );

    this.context.list('turnos').set(pacienteId + fecha + hora, turno);

    console.log(turno);

  }

  AceptarTurno(turno) {
    this.context.list('turnos').update(turno.idPaciente + turno.solicitudFecha + turno.solicitudHora, {
      estado: "ACEPTADO"
    });
  }

  RechazarTurno(turno) {
    this.context.list('turnos').update(turno.idPaciente + turno.solicitudFecha + turno.solicitudHora, {
      estado: "RECHAZADO"
    });
  }



}
