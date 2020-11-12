import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-agregar-especialidad',
  templateUrl: './agregar-especialidad.component.html',
  styleUrls: ['./agregar-especialidad.component.scss']
})
export class AgregarEspecialidadComponent implements OnInit {
  @Output() emitCancelar: EventEmitter<any> = new EventEmitter();
  usuarios: Observable<any[]>;
  listadoUsuarios = [];
  mostrarProfesional=false;
  constructor(private context: AngularFireDatabase) { }

  ngOnInit(): void {
    this.usuarios = this.context.list('usuarios').valueChanges();
    this.usuarios.subscribe(usuarios => {
      this.listadoUsuarios = usuarios;
      this.listadoUsuarios = this.listadoUsuarios.filter(p => p.perfil == "profesional" && p.habilitado == true);
    }, error => console.log(error));


  }

  Cancelar() {
    console.log("asdasdasd");
    this.emitCancelar.emit(false);
  }

  AgregarEspecialidad(profesional) {
    this.mostrarProfesional=true;
  }

  AgregarEspecialidades(){

  }

  BorrarEspecialidades(especialidad){

  }


}
