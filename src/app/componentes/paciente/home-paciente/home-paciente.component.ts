import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home-paciente',
  templateUrl: './home-paciente.component.html',
  styleUrls: ['./home-paciente.component.scss']
})
export class HomePacienteComponent implements OnInit {

  constructor(private context: AngularFireDatabase) { }

  usuarios: Observable<any[]>;
  listadoUsuarios = [];
  listadoPacientes = [];
  listadoProfesionales = [];

  ngOnInit(): void {
    this.usuarios = this.context.list('usuarios').valueChanges();
    this.usuarios.subscribe(usuarios => {
      this.listadoUsuarios = usuarios;
      this.CargarListas();
    }, error => console.log(error));
  }


  CargarListas(){//USAR PIPES
    this.listadoProfesionales = this.listadoUsuarios.filter(p=> p.perfil =="profesional" && p.habilitado ==true);
    this.listadoPacientes = this.listadoUsuarios.filter(p=> p.perfil =="paciente");
  }

}
