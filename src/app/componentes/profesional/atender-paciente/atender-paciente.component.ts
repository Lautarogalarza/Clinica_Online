import { DatePipe } from '@angular/common';
import { Route } from '@angular/compiler/src/core';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/servicios/auth.service';
import { TurnosService } from 'src/app/servicios/turnos.service';

@Component({
  selector: 'app-atender-paciente',
  templateUrl: './atender-paciente.component.html',
  styleUrls: ['./atender-paciente.component.scss']
})
export class AtenderPacienteComponent implements OnInit {
  @Output() emitCancelar: EventEmitter<any> = new EventEmitter();
  usuarios: Observable<any[]>;
  listadoUsuarios = [];
  cancelarTurnoHabilitado: boolean = false;
  rechazoCancelacion: boolean = true;
  listaDos = [];
  turno;
  constructor(private context: AngularFireDatabase, private authService: AuthService, private router:Router,private turnoService:TurnosService,private datePipe : DatePipe) { }

  ngOnInit(): void {

    this.usuarios = this.context.list('turnos').valueChanges();
    this.usuarios.subscribe(usuarios => {
      this.listadoUsuarios = usuarios;
      this.TraerTurnos();
    }, error => console.log(error));

  }

  TraerTurnos() {
    let hoy = new Date();
    let nuevaFecha = this.datePipe.transform(hoy, "yyyy-MM-dd");
    console.log(nuevaFecha);     
    this.authService.GetCurrentUser().then(response => {
      this.listadoUsuarios = this.listadoUsuarios.filter(p => p.estado == "ACEPTADO"
        && p.idProfesional == response.uid && nuevaFecha==p.solicitudFecha);
    });
  }

  Atender(turno) {
    this.turnoService.turno = turno;
    this.router.navigate(['/atencion'])
  }

  CancelarTurno(turno){
    this.cancelarTurnoHabilitado = true;
    this.rechazoCancelacion = false;
    this.turno=turno
  }

  TurnoRechazadoCancelar(boolean){
    this.cancelarTurnoHabilitado = boolean;
    this.rechazoCancelacion = true;
  }

  Cancelar() {

    this.emitCancelar.emit(false);
  }



}
