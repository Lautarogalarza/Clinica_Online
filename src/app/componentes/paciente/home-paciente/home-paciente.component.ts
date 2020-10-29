import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/servicios/auth.service';

@Component({
  selector: 'app-home-paciente',
  templateUrl: './home-paciente.component.html',
  styleUrls: ['./home-paciente.component.scss']
})
export class HomePacienteComponent implements OnInit {

  constructor(private context: AngularFireDatabase, private auth: AuthService) { }

  usuarios: Observable<any[]>;
  listadoUsuarios = [];
  listadoPacientes = [];
  listadoProfesionales = [];
  listaTurnos = [];
  profesional;
  pedirTurno: boolean = false;

  ngOnInit(): void {
    this.usuarios = this.context.list('usuarios').valueChanges();
    this.usuarios.subscribe(usuarios => {
      this.listadoUsuarios = usuarios;
      this.CargarListas();
    }, error => console.log(error));
    this.TraerTurnos();
  }

  TraerTurnos() {
    this.context.list('turnos').valueChanges().subscribe(turnos => {
      this.listaTurnos = turnos;
      this.auth.GetCurrentUser().then(usuario => {
        this.listaTurnos = this.listaTurnos.filter(t => t.idPaciente == usuario.uid)
      })
    });
  }

  TomarProfesional(event) {
    this.profesional=event;
    this.pedirTurno = true;
  }

  CargarListas() {//USAR PIPES
    this.listadoProfesionales = this.listadoUsuarios.filter(p => p.perfil == "profesional" && p.habilitado == true);
    this.listadoPacientes = this.listadoUsuarios.filter(p => p.perfil == "paciente");
  }

  Cancelar(boolean) {
    this.pedirTurno = boolean;

  }



}
