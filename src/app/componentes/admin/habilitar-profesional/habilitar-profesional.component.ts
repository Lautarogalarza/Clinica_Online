import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-habilitar-profesional',
  templateUrl: './habilitar-profesional.component.html',
  styleUrls: ['./habilitar-profesional.component.scss']
})
export class HabilitarProfesionalComponent implements OnInit {

  @Output() emitCancelar: EventEmitter<any> = new EventEmitter();
  usuarios: Observable<any[]>;
  listadoUsuarios = [];

  constructor(private context: AngularFireDatabase) { }

  ngOnInit(): void {
    this.usuarios = this.context.list('usuarios').valueChanges();
    this.usuarios.subscribe(usuarios => {
      this.listadoUsuarios = usuarios;
      this.listadoUsuarios = this.listadoUsuarios.filter(p => p.perfil == "profesional" && p.habilitado == false);
    }, error => console.log(error));

  }

  Cancelar() {

    this.emitCancelar.emit(false);
  }


  ActivarProfesional(profesional) {
    this.context.list('usuarios').update(profesional.id, { habilitado: true })
  }

}
